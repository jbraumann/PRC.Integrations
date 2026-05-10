"""gRPC connection management, threading, robot mesh loading, and feedback handling."""

from __future__ import annotations

import json
import math
import os
import queue
import threading
from typing import Optional

import bpy
import mathutils

import grpc

from . import prc_pb2
from . import prc_pb2_grpc
from . import properties as _props


# ---------------------------------------------------------------------------
# Module-level shared state
# ---------------------------------------------------------------------------

_xforms: list[Optional[mathutils.Matrix]] = [None] * 8
_xforms_dirty: bool = False
_xforms_lock = threading.Lock()

_tcp_xform: Optional[mathutils.Matrix] = None
_tcp_dirty: bool = False
_tcp_lock = threading.Lock()

_status_queue: "queue.Queue[str]" = queue.Queue()

_stop_event: Optional[threading.Event] = None
_channel = None
_stub = None
_settings: dict[str, str] = {}
_robot_id: str = ""
_link_count: int = 0
_link_offset: int = 1  # 1 if base is missing (A1..A6), 0 if base is included (A0..A6)

_worker_thread: Optional[threading.Thread] = None
_feedback_thread: Optional[threading.Thread] = None

# Coalescing flag for the event-driven main-thread tick: background threads
# call _wake_main_thread() to schedule a one-shot drain; if a tick is already
# pending the call is a no-op so a burst of feedback messages collapses into
# a single redraw.
_tick_pending_lock = threading.Lock()
_tick_pending: bool = False

# Captured from the SimulationResult of the most recent successful AddRobotTask.
# 0.0 means "no task loaded yet" (also the case if the loaded task has no
# motion). Used by the Robot Animation bake operator to derive a frame count.
_last_task_duration_s: float = 0.0


def last_task_duration_seconds() -> float:
    return _last_task_duration_s


def get_simulated_state_matrices(normalized: float) -> Optional[list[mathutils.Matrix]]:
    """Synchronous GetSimulatedRobotState — returns the per-link world
    matrices for the given normalized toolpath position (0..1). None on
    error or if no robot data is in the reply. Bypasses the feedback
    stream entirely (stream_update=False)."""
    if _stub is None or not _robot_id:
        return None
    try:
        reply = _stub.GetSimulatedRobotState(prc_pb2.GetSimulatedRobotStateRequest(
            id=_robot_id,
            normalized_state=float(max(0.0, min(1.0, normalized))),
            stream_update=False,
        ))
    except Exception:  # noqa: BLE001
        return None
    if not reply.robot_transformations:
        return None
    arr = reply.robot_transformations[0].transformation
    return [_prc_matrix_to_blender(m) for m in arr]


# ---------------------------------------------------------------------------
# Public helpers used by operators / properties
# ---------------------------------------------------------------------------

def is_connected() -> bool:
    return _stub is not None


def is_setup_done() -> bool:
    return _robot_id != ""


def post_status(msg: str) -> None:
    _status_queue.put(msg)
    _wake_main_thread()


def drain_status() -> Optional[str]:
    last = None
    while True:
        try:
            last = _status_queue.get_nowait()
        except queue.Empty:
            break
    return last


def take_xforms_snapshot() -> Optional[list[Optional[mathutils.Matrix]]]:
    """Return a copy of `_xforms` if dirty since last call; else None."""
    global _xforms_dirty
    with _xforms_lock:
        if not _xforms_dirty:
            return None
        snapshot = list(_xforms)
        _xforms_dirty = False
    return snapshot


def take_tcp_snapshot() -> Optional[mathutils.Matrix]:
    """Return the latest TCP world-frame matrix if dirty; else None."""
    global _tcp_dirty
    with _tcp_lock:
        if not _tcp_dirty or _tcp_xform is None:
            return None
        snapshot = _tcp_xform.copy()
        _tcp_dirty = False
    return snapshot


def link_offset() -> int:
    """0 if A0..A6, 1 if A1..A6 (set after GetRobotData)."""
    return _link_offset


def _persist_settings_to_scene(snapshot_dict: dict) -> None:
    """Schedule a main-thread write of the settings dict to
    Scene.prc.settings_json so it travels with the .blend file."""
    snapshot_copy = dict(snapshot_dict)

    def _apply():
        scene = bpy.context.scene
        if scene is not None and hasattr(scene, "prc"):
            try:
                scene.prc.settings_json = json.dumps(snapshot_copy)
            except Exception:  # noqa: BLE001
                pass
        return None

    bpy.app.timers.register(_apply, first_interval=0.0)


# ---------------------------------------------------------------------------
# Event-driven main-thread tick (replaces a 10 Hz polling timer)
# ---------------------------------------------------------------------------
#
# Background threads (the gRPC feedback consumer, the setup worker via
# `post_status`) call `_wake_main_thread()` whenever they have something
# to surface. The first call schedules a one-shot 0-interval timer; further
# calls during the same burst are no-ops thanks to `_tick_pending`. The
# tick drains the status queue, applies any dirty robot / TCP transforms,
# and tags 3D viewports for redraw — only when there's actual work, so a
# fast burst of feedback messages collapses into a single redraw rather
# than the 10 redraws/sec the old polling timer used to do unconditionally.

def _wake_main_thread() -> None:
    """Schedule a one-shot main-thread tick to drain queues and apply
    pending viewport updates. Safe to call from any thread; coalesces
    bursts so only one tick is registered until it actually runs."""
    global _tick_pending
    with _tick_pending_lock:
        if _tick_pending:
            return
        _tick_pending = True
    try:
        bpy.app.timers.register(_main_thread_tick, first_interval=0.0)
    except Exception:  # noqa: BLE001
        # Registration failed — clear the flag so a future caller can retry.
        with _tick_pending_lock:
            _tick_pending = False


def _main_thread_tick() -> Optional[float]:
    """One-shot tick: drain the status queue, apply the latest robot
    transforms / TCP frame, redraw 3D viewports if anything changed.
    Returns None so Blender deregisters the timer."""
    global _tick_pending
    # Clear the flag *before* draining so a feedback message arriving
    # during this tick reliably re-arms a follow-up tick. The worst case
    # is one redundant empty tick — cheap.
    with _tick_pending_lock:
        _tick_pending = False

    scene = bpy.context.scene
    if scene is not None and hasattr(scene, "prc"):
        msg = drain_status()
        if msg is not None:
            scene.prc.status_message = msg

    snapshot = take_xforms_snapshot()
    redraw = False
    if snapshot is not None:
        offset = link_offset()
        for i, mat in enumerate(snapshot):
            if mat is None:
                continue
            if offset == 1 and i == 0:
                # PRC sends transformation[0] = base; skip when we built A1..A6 only.
                continue
            obj = bpy.data.objects.get(f"A{i}")
            if obj is not None:
                obj.matrix_world = mat
                redraw = True

    tcp_snapshot = take_tcp_snapshot()
    if tcp_snapshot is not None:
        tcp_obj = bpy.data.objects.get(TCP_OBJECT_NAME)
        if tcp_obj is None:
            _ensure_tcp_marker()
            tcp_obj = bpy.data.objects.get(TCP_OBJECT_NAME)
        if tcp_obj is not None:
            tcp_obj.matrix_world = tcp_snapshot
            redraw = True

    if redraw:
        # Setting matrix_world from a timer doesn't auto-trigger a redraw in
        # Blender 5 — explicitly tag every 3D viewport.
        for window in bpy.context.window_manager.windows:
            for area in window.screen.areas:
                if area.type == "VIEW_3D":
                    area.tag_redraw()

    return None


# ---------------------------------------------------------------------------
# Connection
# ---------------------------------------------------------------------------

def _addon_dir() -> str:
    return os.path.dirname(os.path.realpath(__file__))


def _open_channel():
    cert_path = os.path.join(_addon_dir(), "PRCServerCertificate.pem")
    with open(cert_path, "rb") as f:
        credentials = grpc.ssl_channel_credentials(f.read())
    options = [
        ("grpc.max_send_message_length", -1),
        ("grpc.max_receive_message_length", -1),
        # Keepalive: probe the long-lived feedback stream so half-dead
        # connections (laptop sleep/wake, network blips) get noticed
        # within ~30 s instead of hanging until the next app restart.
        ("grpc.keepalive_time_ms", 30_000),
        ("grpc.keepalive_timeout_ms", 10_000),
        ("grpc.keepalive_permit_without_calls", 1),
        ("grpc.http2.max_pings_without_data", 0),
    ]
    return grpc.secure_channel("127.0.0.1:5001", credentials, options)


# ---------------------------------------------------------------------------
# Setup pipeline (runs on worker thread)
# ---------------------------------------------------------------------------

def start_setup(scene_props_snapshot: dict) -> None:
    """Spawn the worker thread to perform the full setup pipeline."""
    global _worker_thread, _stop_event

    if _worker_thread is not None and _worker_thread.is_alive():
        post_status("Setup already in progress.")
        return

    _stop_event = threading.Event()
    _worker_thread = threading.Thread(
        target=_setup_pipeline,
        args=(scene_props_snapshot,),
        daemon=True,
    )
    _worker_thread.start()


def _setup_pipeline(props: dict) -> None:
    global _channel, _stub, _settings, _robot_id, _link_count, _link_offset
    global _feedback_thread

    try:
        post_status("Opening secure channel to 127.0.0.1:5001 ...")
        _channel = _open_channel()
        _stub = prc_pb2_grpc.ParametricRobotControlServiceStub(_channel)

        post_status("Pinging server ...")
        _stub.SendPing(prc_pb2.Ping(payload="hello", time_ms=0))

        client_id = props["client_id"]
        # robot_type is already the full preset class string (e.g.
        # "KUKA.KUKA_KR610R11002"); robot_driver is the driver class string
        # (e.g. "KUKA.KSS_KRL_Driver"). Both come from the EnumProperty.
        preset_class = props["robot_type"]
        driver_class = props.get("robot_driver", "KUKA.KSS_KRL_Driver")

        identity_cs = prc_pb2.CoordinateSystem(
            origin=prc_pb2.Vector3(x=0, y=0, z=0),
            x_axis=prc_pb2.Vector3(x=1, y=0, z=0),
            y_axis=prc_pb2.Vector3(x=0, y=1, z=0),
        )

        # Tool dictionary — always include "0" (identity) so default motion
        # groups still resolve. The user's configured tool is added at its
        # own ID; if the user picked ID 0, their TCP overrides the default.
        tools = {
            "0": prc_pb2.Tool(
                tool_id="0",
                tool_type=prc_pb2.FrameType.FIXED,
                tcp=prc_pb2.CartesianPosition(cs=identity_cs),
            ),
        }
        tool_snapshot = props.get("tool") or {}
        brand = _props.DRIVER_BRAND.get(driver_class, "")
        user_tool = _build_user_tool(tool_snapshot, brand)
        if user_tool is not None:
            tools[user_tool.tool_id] = user_tool

        robot = prc_pb2.Robot(
            preset_robot_class=preset_class,
            robot_driver_class=driver_class,
            friendly_id=preset_class,
            initial_base=prc_pb2.Base(
                base_id="0",
                base_frame=prc_pb2.CartesianPosition(cs=identity_cs),
            ),
            tool_dictionary=tools,
            # Server's GetRobotData converter NREs when MetaData is null,
            # so always populate it.
            data=prc_pb2.MetaData(id=client_id),
        )

        post_status(f"Setting up robot ({preset_class}) ...")
        setup_reply = _stub.SetupRobot(prc_pb2.SetupRobotRequest(
            client_id=client_id,
            software_version="0.1",
            robot_setup=robot,
        ))
        _robot_id = setup_reply.id
        server_settings = dict(setup_reply.robot_settings.settings_dictionary)

        # Prefer settings persisted in the .blend file over server defaults
        # (matches the GH pattern). Empty saved dict ⇒ accept server values.
        saved_settings = props.get("saved_settings") or {}
        if saved_settings:
            _settings = dict(saved_settings)
            post_status(
                f"Restored {len(_settings)} saved setting(s) from .blend."
            )
        else:
            _settings = server_settings
        _persist_settings_to_scene(_settings)

        replace_geometry = bool(props.get("replace_geometry", True))

        post_status("Requesting robot geometry ...")
        try:
            rd_reply = _stub.GetRobotData(prc_pb2.GetRobotDataRequest(id=_robot_id))
            if rd_reply.status and rd_reply.status != "OK":
                raise RuntimeError(rd_reply.status)
            _record_link_layout(rd_reply)
            if replace_geometry:
                _build_meshes_request_main_thread(rd_reply)
            else:
                post_status("Keeping existing A* geometry; live feedback will drive it.")
        except Exception as e:  # noqa: BLE001
            # Some server builds NRE inside GetRobotData. Don't abort setup —
            # fall back to empty placeholder objects so feedback transforms
            # still drive something visible in the viewport.
            post_status(f"GetRobotData unavailable ({e!r}); using placeholders.")
            if replace_geometry:
                _build_placeholders_request_main_thread()
            else:
                # Assume the user-authored A0..A6 are present; default to the
                # 7-link layout so transformation[0] maps to A0.
                global _link_count, _link_offset
                _link_count = 7
                _link_offset = 0

        post_status("Subscribing to feedback stream ...")
        feedback_stream = _stub.SubscribeRobotFeedback(
            prc_pb2.SubscribeRobotFeedbackRequest(id=_robot_id)
        )
        _feedback_thread = threading.Thread(
            target=_feedback_loop,
            args=(feedback_stream,),
            daemon=True,
        )
        _feedback_thread.start()

        post_status(f"Ready. Robot ID: {_robot_id}")
        _set_setup_done(True)

    except Exception as e:  # noqa: BLE001
        post_status(f"Setup failed: {e!r}")
        _disconnect_internal()


def _set_setup_done(value: bool) -> None:
    """Toggle the scene flag from the main thread."""
    def _apply():
        scene = bpy.context.scene
        if scene and hasattr(scene, "prc"):
            scene.prc.setup_done = value
        return None  # unregister timer

    bpy.app.timers.register(_apply, first_interval=0.0)


def _set_task_loaded(value: bool) -> None:
    """Toggle the scene flag. Applied immediately when called on the main
    thread so that downstream main-thread code (e.g. update_simulation)
    sees the new value within the same operator tick. Off-thread callers
    are deferred via a 0-interval timer to keep scene writes main-thread."""
    def _apply():
        scene = bpy.context.scene
        if scene and hasattr(scene, "prc"):
            scene.prc.task_loaded = value
        return None

    if threading.current_thread() is threading.main_thread():
        _apply()
    else:
        bpy.app.timers.register(_apply, first_interval=0.0)


# ---------------------------------------------------------------------------
# Robot mesh build (deferred to the main thread via bpy.app.timers)
# ---------------------------------------------------------------------------

def _build_meshes_request_main_thread(rd_reply) -> None:
    # Capture the geometry payload now; the protobuf message is thread-safe to read.
    custom_robot = rd_reply.robot_data.custom_robot
    geometry = list(custom_robot.geometry)

    def _apply():
        try:
            _build_robot_meshes(geometry)
        except Exception as e:  # noqa: BLE001
            post_status(f"Mesh build failed: {e!r}")
        return None

    bpy.app.timers.register(_apply, first_interval=0.0)


def _unit_is_alarmed(unit) -> bool:
    """A simulation step counts as alarmed if any of its issue flags are set.

    Defensive against server builds that don't always populate the top-level
    `alarm` bool even when per-axis arrays do (out-of-reach in particular)."""
    if bool(unit.alarm):
        return True
    # `any()` on protobuf RepeatedScalarContainer is true if any element is True.
    if any(unit.outofreach):
        return True
    if any(unit.collision):
        return True
    if any(unit.singularity):
        return True
    if any(unit.external_axis_outofreach):
        return True
    return False


def _decimate_simulation_results(units) -> tuple[list[tuple[float, float, float]], list[bool]]:
    """Walk the simulation results, dropping redundant interpolated steps.
    Returns (verts_in_metres, alarm_per_vert). Always keeps first/last and
    every step that flips the alarm state, so colour transitions are exact.
    Run on the gRPC thread."""
    verts: list[tuple[float, float, float]] = []
    alarms: list[bool] = []
    n = len(units)
    if n == 0:
        return verts, alarms

    threshold_sq = TOOLPATH_DECIMATE_DIST_M * TOOLPATH_DECIMATE_DIST_M

    first = units[0]
    last_pos = (first.position.m41 / 1000.0,
                first.position.m42 / 1000.0,
                first.position.m43 / 1000.0)
    last_alarm = _unit_is_alarmed(first)
    verts.append(last_pos)
    alarms.append(last_alarm)

    for i in range(1, n - 1):
        u = units[i]
        m = u.position
        cur = (m.m41 / 1000.0, m.m42 / 1000.0, m.m43 / 1000.0)
        a = _unit_is_alarmed(u)
        dx = cur[0] - last_pos[0]
        dy = cur[1] - last_pos[1]
        dz = cur[2] - last_pos[2]
        if (dx * dx + dy * dy + dz * dz) > threshold_sq or a != last_alarm:
            verts.append(cur)
            alarms.append(a)
            last_pos = cur
            last_alarm = a

    if n > 1:
        u = units[n - 1]
        m = u.position
        verts.append((m.m41 / 1000.0, m.m42 / 1000.0, m.m43 / 1000.0))
        alarms.append(_unit_is_alarmed(u))

    alarm_count = sum(1 for a in alarms if a)
    post_status(
        f"Toolpath: {len(verts)} verts ({alarm_count} alarmed) "
        f"from {n} simulation steps."
    )
    return verts, alarms


def _split_into_runs(verts: list[tuple[float, float, float]],
                     alarms: list[bool]) -> tuple[list[list[tuple[float, float, float]]],
                                                  list[list[tuple[float, float, float]]]]:
    """Partition the polyline into ok-runs and alarm-runs, where each run is
    a continuous chain of points that becomes one Curve spline. An edge is
    alarm if EITHER endpoint is alarmed — the colour boundary falls on the
    transition vertex (which appears in both the last ok-run and the first
    alarm-run for a clean visual seam)."""
    ok_runs: list[list] = []
    alarm_runs: list[list] = []
    cur: list = []
    cur_is_alarm: Optional[bool] = None

    for i in range(len(verts) - 1):
        edge_alarm = bool(alarms[i] or alarms[i + 1])
        if cur_is_alarm is None:
            cur = [verts[i], verts[i + 1]]
            cur_is_alarm = edge_alarm
        elif edge_alarm == cur_is_alarm:
            cur.append(verts[i + 1])
        else:
            (alarm_runs if cur_is_alarm else ok_runs).append(cur)
            cur = [verts[i], verts[i + 1]]
            cur_is_alarm = edge_alarm

    if cur:
        (alarm_runs if cur_is_alarm else ok_runs).append(cur)

    return ok_runs, alarm_runs


def _ensure_toolpath_materials() -> tuple["bpy.types.Material", "bpy.types.Material"]:
    """Create or fetch the two toolpath materials. Treated as INDICATOR
    under the PRC robot recipe — informational/luminous so the path reads
    against the robot regardless of viewport shading mode."""
    def _make(name: str, color_lin: tuple[float, float, float]):
        mat = bpy.data.materials.get(name)
        if mat is None:
            mat = bpy.data.materials.new(name)
        base_color_linear = (color_lin[0], color_lin[1], color_lin[2], 1.0)
        mat.diffuse_color = base_color_linear
        _apply_robot_recipe(mat, base_color_linear, "INDICATOR")
        return mat

    # Linear-RGB. OK = white (reads cleanly against the robot under any
    # shading mode), Alarm = saturated red.
    mat_ok    = _make(TOOLPATH_OK_MATERIAL_NAME,    (1.0, 1.0, 1.0))
    mat_alarm = _make(TOOLPATH_ALARM_MATERIAL_NAME, (0.9, 0.05, 0.05))
    return mat_ok, mat_alarm


def _build_toolpath_request_main_thread(verts: list[tuple[float, float, float]],
                                         alarms: list[bool]) -> None:
    """Schedule a main-thread (re)build of the PRC_Toolpath polylines from
    the simulated TCP positions. Replaces any existing toolpath."""
    verts_snapshot = list(verts)
    alarms_snapshot = list(alarms)

    def _apply():
        try:
            _build_toolpath(verts_snapshot, alarms_snapshot)
        except Exception as e:  # noqa: BLE001
            post_status(f"Toolpath build failed: {e!r}")
        return None

    bpy.app.timers.register(_apply, first_interval=0.0)


TOOLPATH_BEVEL_DEPTH_M = 0.0025  # 2.5 mm tube radius => 5 mm diameter


def _create_curve_polyline(name: str,
                           runs: list[list[tuple[float, float, float]]],
                           material: "bpy.types.Material",
                           collection: "bpy.types.Collection") -> None:
    """Build a single Curve object with one POLY spline per run, beveled to
    a thin tube. Curves have actual surface geometry (unlike wire meshes),
    so materials apply correctly in Solid, Material Preview, and Rendered
    shading modes alike."""
    if not runs:
        return
    curve_data = bpy.data.curves.new(name + "_Curve", type="CURVE")
    curve_data.dimensions = "3D"
    curve_data.bevel_depth = TOOLPATH_BEVEL_DEPTH_M
    curve_data.bevel_resolution = 2  # 6-sided cross-section: cheap, looks fine

    for run in runs:
        if len(run) < 2:
            continue
        spline = curve_data.splines.new("POLY")
        spline.points.add(len(run) - 1)  # spline starts with one point
        for i, (x, y, z) in enumerate(run):
            spline.points[i].co = (x, y, z, 1.0)

    obj = bpy.data.objects.new(name, curve_data)
    collection.objects.link(obj)
    obj.data.materials.append(material)
    obj.show_in_front = True
    obj.hide_select = True


def _remove_toolpath_object(name: str) -> None:
    """Delete a toolpath object regardless of whether it's a mesh or a curve
    (we used to build wire meshes; we now build beveled curves)."""
    obj = bpy.data.objects.get(name)
    if obj is None:
        return
    data = obj.data
    bpy.data.objects.remove(obj, do_unlink=True)
    if data is None:
        return
    if isinstance(data, bpy.types.Curve):
        if data.users == 0:
            bpy.data.curves.remove(data)
    elif isinstance(data, bpy.types.Mesh):
        if data.users == 0:
            bpy.data.meshes.remove(data)


def _build_toolpath(verts: list[tuple[float, float, float]], alarms: list[bool]) -> None:
    """Replace the toolpath with two fresh Curve objects (beveled tubes)
    nested under the PRC_Toolpath sub-collection:
      PRC_Toolpath_OK     — valid segments
      PRC_Toolpath_Alarm  — segments where either endpoint is alarmed."""
    # Clean up the new objects AND any legacy "PRC_Toolpath" object from
    # earlier add-on versions (which used wire meshes), so Load Task on an
    # old .blend doesn't leave orphans behind.
    for stale_name in (TOOLPATH_OK_OBJECT_NAME, TOOLPATH_ALARM_OBJECT_NAME, "PRC_Toolpath"):
        _remove_toolpath_object(stale_name)

    if len(verts) < 2:
        return

    ok_runs, alarm_runs = _split_into_runs(verts, alarms)
    target_collection = _ensure_toolpath_collection()
    mat_ok, mat_alarm = _ensure_toolpath_materials()

    _create_curve_polyline(TOOLPATH_OK_OBJECT_NAME, ok_runs, mat_ok, target_collection)
    _create_curve_polyline(TOOLPATH_ALARM_OBJECT_NAME, alarm_runs, mat_alarm, target_collection)


def _build_user_tool(tool_snapshot: dict, driver_brand: str) -> Optional["prc_pb2.Tool"]:
    """Convert a tool-props snapshot into a prc_pb2.Tool, encoding the
    rotation according to the driver's convention. Returns None if the
    snapshot has no usable data."""
    if not tool_snapshot:
        return None

    tool_id = int(tool_snapshot.get("tool_id", 0))
    x_mm = float(tool_snapshot.get("tool_x", 0.0))
    y_mm = float(tool_snapshot.get("tool_y", 0.0))
    z_mm = float(tool_snapshot.get("tool_z", 0.0))
    a = float(tool_snapshot.get("tool_a", 0.0))
    b = float(tool_snapshot.get("tool_b", 0.0))
    c = float(tool_snapshot.get("tool_c", 0.0))
    qw = float(tool_snapshot.get("tool_qw", 1.0))
    qx = float(tool_snapshot.get("tool_qx", 0.0))
    qy = float(tool_snapshot.get("tool_qy", 0.0))
    qz = float(tool_snapshot.get("tool_qz", 0.0))

    encoding = _props.TOOL_ENCODING_BY_BRAND.get(driver_brand, "ZYX")

    if encoding == "QUATERNION":
        # Build Matrix4x4 from quaternion + translation.
        q = mathutils.Quaternion((qw, qx, qy, qz))
        try:
            q.normalize()
        except Exception:  # noqa: BLE001
            q = mathutils.Quaternion()
        rot = q.to_matrix().to_4x4()
        rot.translation = mathutils.Vector((x_mm / 1000.0, y_mm / 1000.0, z_mm / 1000.0))
        rot.transpose()
        m = prc_pb2.Matrix4x4()
        m.m11, m.m12, m.m13, m.m14 = rot[0][0], rot[0][1], rot[0][2], rot[0][3]
        m.m21, m.m22, m.m23, m.m24 = rot[1][0], rot[1][1], rot[1][2], rot[1][3]
        m.m31, m.m32, m.m33, m.m34 = rot[2][0], rot[2][1], rot[2][2], rot[2][3]
        m.m41 = rot[3][0] * 1000.0
        m.m42 = rot[3][1] * 1000.0
        m.m43 = rot[3][2] * 1000.0
        m.m44 = rot[3][3]
        tcp = prc_pb2.CartesianPosition(matrix=m)
    else:
        if encoding == "RPY":
            fmt = prc_pb2.EulerFormat.RPY
        elif encoding == "AXISANGLE":
            fmt = prc_pb2.EulerFormat.AXISANGLE
        else:
            fmt = prc_pb2.EulerFormat.ZYX
        tcp = prc_pb2.CartesianPosition(
            euler=prc_pb2.Euler(
                x=x_mm, y=y_mm, z=z_mm, a=a, b=b, c=c, format=fmt,
            )
        )

    return prc_pb2.Tool(
        tool_id=str(tool_id),
        tool_type=prc_pb2.FrameType.FIXED,
        tcp=tcp,
    )


def _record_link_layout(rd_reply) -> None:
    """Set _link_count / _link_offset from the GetRobotData reply without
    touching bpy.data. Used when the user opts to keep existing geometry."""
    global _link_count, _link_offset
    n = len(rd_reply.robot_data.custom_robot.geometry)
    _link_count = n
    _link_offset = 0 if n == 7 else 1


def _build_placeholders_request_main_thread() -> None:
    def _apply():
        try:
            _build_placeholder_links()
        except Exception as e:  # noqa: BLE001
            post_status(f"Placeholder build failed: {e!r}")
        return None

    bpy.app.timers.register(_apply, first_interval=0.0)


def _build_placeholder_links() -> None:
    """Create A0..A6 empties so feedback transforms have something to drive
    when GetRobotData is unavailable. PRC sends transformation[0]=base and
    transformation[1..6] = A1..A6, so we always include A0 and treat
    link_offset as 0."""
    global _link_count, _link_offset
    _link_count = 7
    _link_offset = 0

    for name in [f"A{i}" for i in range(0, 8)]:
        obj = bpy.data.objects.get(name)
        if obj is not None:
            mesh = obj.data
            bpy.data.objects.remove(obj, do_unlink=True)
            if isinstance(mesh, bpy.types.Mesh) and mesh.users == 0:
                bpy.data.meshes.remove(mesh)

    carrier = bpy.data.objects.get("PRC_Program")
    target_collection = _ensure_robot_collection()

    for i in range(7):
        empty = bpy.data.objects.new(f"A{i}", None)
        empty.empty_display_type = "ARROWS"
        empty.empty_display_size = 0.15
        target_collection.objects.link(empty)
        if carrier is not None:
            empty.parent = carrier

    # TCP first — Tool Empty parents to it.
    _ensure_tcp_marker()
    _ensure_tool_empty()
    post_status("Placeholders A0..A6 ready.")


def _build_robot_meshes(polymeshes: list) -> None:
    global _link_count, _link_offset

    n = len(polymeshes)
    _link_count = n
    _link_offset = 0 if n == 7 else 1  # 7 entries => base included as A0

    # Remove stale joint objects first. Tool / TCP / PRC_Toolpath are
    # explicitly preserved so user-attached geometry survives re-setup.
    for name in [f"A{i}" for i in range(0, 8)]:
        obj = bpy.data.objects.get(name)
        if obj is not None:
            mesh = obj.data
            bpy.data.objects.remove(obj, do_unlink=True)
            if mesh and mesh.users == 0:
                bpy.data.meshes.remove(mesh)

    for idx, poly in enumerate(polymeshes):
        link_name = f"A{idx if _link_offset == 0 else idx + 1}"
        _create_link_object(link_name, poly)

    # TCP first — Tool Empty parents to it.
    _ensure_tcp_marker()
    _ensure_tool_empty()
    post_status(f"Loaded {n} robot link(s).")


TOOL_OBJECT_NAME = "Tool"
TCP_OBJECT_NAME = "TCP"

# Bump to force rebuild of existing TCP markers when the geometry recipe
# changes (size, segment count, arrowhead, etc.). The version tag lives
# on the object as a custom property; mismatches trigger a regen.
TCP_MARKER_VERSION = 3

# Bump to force re-anchoring of existing Tool Empties when the anchoring
# rule changes. v1 = pre-fix (parented to A6, pinned at world origin),
# v2 = parented to A6 with parent_inverse identity, v3 = parented to the
# TCP marker so tool geometry tracks the simulated TCP including any
# user-configured TCP offset.
TOOL_EMPTY_VERSION = 3
TOOLPATH_COLLECTION_NAME = "PRC_Toolpath"
TOOLPATH_OK_OBJECT_NAME = "PRC_Toolpath_OK"
TOOLPATH_ALARM_OBJECT_NAME = "PRC_Toolpath_Alarm"
TOOLPATH_OK_MATERIAL_NAME = "PRC_Toolpath_Material"
TOOLPATH_ALARM_MATERIAL_NAME = "PRC_Toolpath_Alarm_Material"

# 1 mm decimation threshold — drops redundant interpolated steps that the
# server emits between exact targets. Alarm transitions are always preserved
# so the colour boundary is exact.
TOOLPATH_DECIMATE_DIST_M = 0.001


def _flange_object() -> Optional["bpy.types.Object"]:
    """Return the object representing the flange (A6 conventionally)."""
    return bpy.data.objects.get("A6")


def _ensure_tool_empty() -> None:
    """Create / re-anchor the persistent 'Tool' Empty as a child of the
    TCP marker so tool geometry tracks the simulated TCP — including any
    user-configured TCP offset — rather than just the flange (A6).

    Pre-v3 Tool Empties were parented to A6, which puts tool geometry at
    the flange position regardless of TCP offset. The version tag drives
    auto-migration: anything below TOOL_EMPTY_VERSION gets re-parented to
    TCP and re-zeroed."""
    target_collection = _ensure_robot_collection()

    # TCP marker is the new parent — make sure it exists.
    tcp = bpy.data.objects.get(TCP_OBJECT_NAME)
    if tcp is None:
        _ensure_tcp_marker()
        tcp = bpy.data.objects.get(TCP_OBJECT_NAME)
    if tcp is None:
        return  # still no TCP — bail rather than parent to A6 again

    obj = bpy.data.objects.get(TOOL_OBJECT_NAME)
    just_created = obj is None
    if obj is None:
        obj = bpy.data.objects.new(TOOL_OBJECT_NAME, None)
        obj.empty_display_type = "ARROWS"
        obj.empty_display_size = 0.05
        target_collection.objects.link(obj)

    cur_version = int(obj.get("prc_tool_empty_version", 0))

    if just_created:
        # Fresh Empty — sit exactly at TCP. Setting parent_inverse to
        # identity is the critical step (Blender otherwise auto-computes
        # an inverse that pins the Empty to its pre-parent world
        # position, which was the world-origin bug).
        obj.parent = tcp
        obj.matrix_parent_inverse = mathutils.Matrix.Identity(4)
        obj.matrix_local = mathutils.Matrix.Identity(4)
        obj["prc_tool_empty_version"] = TOOL_EMPTY_VERSION
    elif cur_version < TOOL_EMPTY_VERSION or obj.parent is not tcp:
        # Migration or accidental re-parent — re-anchor to TCP while
        # preserving the Empty's world transform. Children of Tool stay
        # visually in place; their tracking just switches from A6 to TCP
        # for future feedback ticks.
        world = obj.matrix_world.copy()
        obj.parent = tcp
        obj.matrix_world = world
        obj["prc_tool_empty_version"] = TOOL_EMPTY_VERSION
    else:
        # Steady state — already on TCP at the current version. Preserve
        # the user's local offset across re-setup so any custom TCP
        # refinement and any attached tool geometry survive untouched.
        local = obj.matrix_local.copy()
        obj.parent = tcp
        obj.matrix_local = local


def _ensure_tcp_marker() -> None:
    """Create or upgrade the live-TCP marker as a slim XYZ-axis mesh.

    Unparented; its world matrix is updated from RobotState.tool_frame on
    every feedback tick. Three thin rods along +X / +Y / +Z, each tipped
    with a small arrowhead cone (slightly wider than the rod) so the
    direction along each axis is unambiguous. Each axis gets its own
    material — red / green / blue — covering rod and cone."""
    target_collection = _ensure_robot_collection()
    existing = bpy.data.objects.get(TCP_OBJECT_NAME)
    if (
        existing is not None
        and existing.type == "MESH"
        and int(existing.get("prc_tcp_version", 0)) >= TCP_MARKER_VERSION
    ):
        return  # already the current mesh marker
    if existing is not None:
        # Upgrade path — old Empty marker, or a mesh marker built before
        # the latest size recipe. Keep its world transform so the
        # live-feedback path doesn't visually skip.
        world = existing.matrix_world.copy()
        old_data = existing.data
        bpy.data.objects.remove(existing, do_unlink=True)
        if old_data is not None and getattr(old_data, "users", 1) == 0:
            try:
                old_data.id_data.user_clear()
            except Exception:  # noqa: BLE001
                pass
    else:
        world = mathutils.Matrix.Identity(4)

    length = 0.075  # 7.5 cm — 50% larger than the original 5 cm marker
    thickness = 0.003  # 3 mm — matches the length scaling
    cone_radius = 0.003  # 6 mm tip diameter — slightly wider than the rod
    cone_height = 0.010  # 10 mm arrowhead — short enough not to dominate
    cone_segments = 8

    verts: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []
    face_material_index: list[int] = []

    def _append_rod(axis_idx: int):
        """Append a 0..length rod along axis_idx (0=X, 1=Y, 2=Z) with a
        square thickness*thickness cross-section. Adds 8 verts + 6 quads."""
        base = len(verts)
        t = thickness * 0.5
        L = length

        # Build the 8 corners. The axis we extend along uses 0..L; the other
        # two axes use ±t.
        for sign_a in (-1, 1):
            for sign_b in (-1, 1):
                for end in (0.0, L):
                    coords = [0.0, 0.0, 0.0]
                    coords[axis_idx] = end
                    others = [i for i in range(3) if i != axis_idx]
                    coords[others[0]] = sign_a * t
                    coords[others[1]] = sign_b * t
                    verts.append((coords[0], coords[1], coords[2]))

        # Faces of the rod (vertex indices are local-base + 0..7). The order
        # of vertices appended above is (sign_a, sign_b, end_idx) iterating
        # outermost to innermost: (-,-,0)=0, (-,-,L)=1, (-,+,0)=2, (-,+,L)=3,
        # (+,-,0)=4, (+,-,L)=5, (+,+,0)=6, (+,+,L)=7.
        # Six quads — start cap, end cap, four sides.
        rod_faces = [
            (base + 0, base + 2, base + 6, base + 4),  # start cap (end=0)
            (base + 1, base + 5, base + 7, base + 3),  # end cap   (end=L)
            (base + 0, base + 4, base + 5, base + 1),  # side sign_b=-
            (base + 2, base + 3, base + 7, base + 6),  # side sign_b=+
            (base + 0, base + 1, base + 3, base + 2),  # side sign_a=-
            (base + 4, base + 6, base + 7, base + 5),  # side sign_a=+
        ]
        faces.extend(rod_faces)
        face_material_index.extend([axis_idx] * len(rod_faces))

    def _append_cone(axis_idx: int):
        """Append an arrowhead cone at the +end of the rod along axis_idx.
        Base ring sits at axis = length, apex at axis = length + cone_height.
        Adds cone_segments + 1 verts and cone_segments + 1 faces (one n-gon
        base cap + cone_segments side triangles)."""
        base = len(verts)
        others = [i for i in range(3) if i != axis_idx]

        # Base ring of cone_segments verts on a circle of radius cone_radius.
        for s in range(cone_segments):
            a = 2.0 * math.pi * s / cone_segments
            coords = [0.0, 0.0, 0.0]
            coords[axis_idx] = length
            coords[others[0]] = cone_radius * math.cos(a)
            coords[others[1]] = cone_radius * math.sin(a)
            verts.append((coords[0], coords[1], coords[2]))

        apex_coords = [0.0, 0.0, 0.0]
        apex_coords[axis_idx] = length + cone_height
        apex_idx = len(verts)
        verts.append((apex_coords[0], apex_coords[1], apex_coords[2]))

        # Base cap as a single n-gon. Wind it so the normal points back along
        # -axis (away from the apex), matching the rod's outward-facing caps.
        base_cap = tuple(base + (cone_segments - 1 - s) for s in range(cone_segments))
        faces.append(base_cap)
        face_material_index.append(axis_idx)

        # Side triangles: each adjacent pair of base-ring verts plus the apex.
        for s in range(cone_segments):
            s_next = (s + 1) % cone_segments
            faces.append((base + s, base + s_next, apex_idx))
            face_material_index.append(axis_idx)

    for axis in (0, 1, 2):  # X, Y, Z
        _append_rod(axis)
        _append_cone(axis)

    mesh_data = bpy.data.meshes.new(TCP_OBJECT_NAME + "_Mesh")
    mesh_data.from_pydata(verts, [], faces)
    mesh_data.update()

    # Create / fetch the three axis materials. Use srgb→linear conversion
    # so the displayed hue matches the colour we asked for, then apply the
    # PRC robot recipe's INDICATOR category (luminous, slight clearcoat).
    for slot_idx, (axis_name, srgb) in enumerate([
        ("TCP_X", (1.0, 0.0, 0.0)),
        ("TCP_Y", (0.0, 1.0, 0.0)),
        ("TCP_Z", (0.0, 0.0, 1.0)),
    ]):
        mat = bpy.data.materials.get(axis_name)
        if mat is None:
            mat = bpy.data.materials.new(axis_name)
        rl = _srgb_to_linear(srgb[0])
        gl = _srgb_to_linear(srgb[1])
        bl = _srgb_to_linear(srgb[2])
        base_color_linear = (rl, gl, bl, 1.0)
        mat.diffuse_color = base_color_linear
        _apply_robot_recipe(mat, base_color_linear, "INDICATOR")
        mesh_data.materials.append(mat)

    for poly_idx, poly in enumerate(mesh_data.polygons):
        poly.material_index = face_material_index[poly_idx]
        poly.use_smooth = False  # crisp facets read better at this scale
    mesh_data.update()

    obj = bpy.data.objects.new(TCP_OBJECT_NAME, mesh_data)
    target_collection.objects.link(obj)
    obj.matrix_world = world
    obj["prc_tcp_version"] = TCP_MARKER_VERSION
    # Keep the marker out of selection clicks so it doesn't get in the way.
    obj.hide_select = True
    obj.show_in_front = True


def _ensure_toolpath_collection() -> "bpy.types.Collection":
    """Sub-collection nesting both PRC_Toolpath_OK and PRC_Toolpath_Alarm so
    they show up grouped under a single 'PRC_Toolpath' entry in the Outliner.
    Lives inside the PRC Robot collection."""
    parent = _ensure_robot_collection()
    coll = bpy.data.collections.get(TOOLPATH_COLLECTION_NAME)
    if coll is None:
        coll = bpy.data.collections.new(TOOLPATH_COLLECTION_NAME)
    if coll.name not in parent.children:
        # Detach from any other parent first to avoid double-linking errors.
        for other in bpy.data.collections:
            if coll.name in other.children:
                other.children.unlink(coll)
        if coll.name not in bpy.context.scene.collection.children:
            parent.children.link(coll)
        else:
            bpy.context.scene.collection.children.unlink(coll)
            parent.children.link(coll)
    return coll


def _ensure_robot_collection() -> "bpy.types.Collection":
    """Sub-collection 'PRC Robot' nested under the active scene's collection.
    Used as the link target for A0..A6 so the Outliner stays tidy."""
    name = "PRC Robot"
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
    if coll.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(coll)
    return coll


def _create_link_object(name: str, polymesh) -> None:
    """Create one Blender object per PolyMesh.

    Each contained Mesh becomes a separate vertex/face block on the same
    bpy.types.Mesh, with its own material slot so colours are preserved.
    The link object is parented to PRC_Program (if it exists) and placed
    in the 'PRC Robot' sub-collection.
    """
    bmesh_data = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, bmesh_data)
    target_collection = _ensure_robot_collection()
    target_collection.objects.link(obj)
    carrier = bpy.data.objects.get("PRC_Program")
    if carrier is not None:
        obj.parent = carrier

    all_verts: list[tuple[float, float, float]] = []
    all_faces: list[tuple[int, ...]] = []
    face_material_index: list[int] = []

    for mesh_idx, mesh in enumerate(polymesh.meshes):
        mat = _make_material(name, mesh_idx, mesh.mesh_color)
        bmesh_data.materials.append(mat)
        base = len(all_verts)
        for v in mesh.vertices:
            all_verts.append((v.x / 1000.0, v.y / 1000.0, v.z / 1000.0))
        for f in mesh.faces:
            if f.z == f.w:
                all_faces.append((base + f.x, base + f.y, base + f.z))
            else:
                all_faces.append((base + f.x, base + f.y, base + f.z, base + f.w))
            face_material_index.append(mesh_idx)

    bmesh_data.from_pydata(all_verts, [], all_faces)
    bmesh_data.update()
    for poly_idx, poly in enumerate(bmesh_data.polygons):
        poly.material_index = face_material_index[poly_idx]
        poly.use_smooth = True
    bmesh_data.update()

    # Apply initial transform: PRC matrix is row-major mm → transpose, divide.
    obj.matrix_world = _prc_matrix_to_blender(polymesh.transform)

    _apply_smooth_by_angle(obj, math.radians(45))


def _srgb_to_linear(c: float) -> float:
    """Convert an sRGB-encoded channel (0..1) to linear-RGB.

    Blender stores material colours in linear space; if you assign the raw
    sRGB float (just `c / 255`) the display pipeline re-applies gamma on
    top, which over-brightens mid-tone greens and pushes orange to yellow.
    """
    if c <= 0.04045:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4


# ---------------------------------------------------------------------------
# Robot material recipe — three-category Principled BSDF setup driven by the
# incoming sRGB color. PRC sends only base colors; we promote each into a
# physically-tuned graph so the renders read as paint / cast / indicator
# rather than flat colored plastic.
# ---------------------------------------------------------------------------

def _classify_robot_color(r: float, g: float, b: float) -> str:
    """Classify an sRGB (0..1) color into PAINTED or DARK_CAST. INDICATOR
    is intentionally NOT returned here — it's reserved for the TCP marker
    and the toolpath, which call _apply_robot_recipe with that category
    explicitly. Robot link meshes are paint or cast even if PRC happens
    to send them as pure RGB."""
    if max(r, g, b) < 0.20:
        return "DARK_CAST"
    return "PAINTED"


def _bsdf_set(node, name: str, value) -> None:
    """Best-effort default_value setter — silently skips when the socket
    isn't present in this Blender version (Principled BSDF input names
    drift between 3.x / 4.x / 5.x)."""
    sock = node.inputs.get(name)
    if sock is None:
        return
    try:
        sock.default_value = value
    except (TypeError, AttributeError):
        pass


def _add_noise_to_normal(nt, bsdf, scale: float, strength: float, location_y: float = -300.0) -> None:
    """Procedural noise → Bump → BSDF Normal chain, used to break up
    reflections so paint / cast surfaces don't read as flat color."""
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.location = (-600.0, location_y)
    sock = noise.inputs.get("Scale")
    if sock is not None:
        try:
            sock.default_value = scale
        except (TypeError, AttributeError):
            pass

    bump = nt.nodes.new("ShaderNodeBump")
    bump.location = (-200.0, location_y)
    sock = bump.inputs.get("Strength")
    if sock is not None:
        try:
            sock.default_value = strength
        except (TypeError, AttributeError):
            pass

    factor = noise.outputs.get("Fac") or noise.outputs.get("Factor") or noise.outputs[0]
    nt.links.new(factor, bump.inputs["Height"])

    if "Normal" in bsdf.inputs:
        nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])


def _apply_robot_recipe(mat: "bpy.types.Material", base_color_linear: tuple, category: str) -> None:
    """Wipe and rebuild mat's node tree following the PRC recipe for the
    given category ('PAINTED' | 'DARK_CAST' | 'INDICATOR')."""
    if not mat.use_nodes:
        mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)

    out = nt.nodes.new("ShaderNodeOutputMaterial")
    out.location = (400.0, 0.0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (0.0, 0.0)
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])

    _bsdf_set(bsdf, "Base Color", base_color_linear)

    if category == "PAINTED":
        # Automotive 2K paint with thin clearcoat.
        _bsdf_set(bsdf, "Metallic", 0.0)
        _bsdf_set(bsdf, "Roughness", 0.32)
        _bsdf_set(bsdf, "Specular IOR Level", 0.5)
        _bsdf_set(bsdf, "Coat Weight", 0.35)
        _bsdf_set(bsdf, "Coat Roughness", 0.08)
        _bsdf_set(bsdf, "Coat IOR", 1.5)
        _add_noise_to_normal(nt, bsdf, scale=550.0, strength=0.15)
    elif category == "DARK_CAST":
        # Cast aluminum with thick industrial coating, more matte.
        _bsdf_set(bsdf, "Metallic", 0.0)
        _bsdf_set(bsdf, "Roughness", 0.45)
        _bsdf_set(bsdf, "Specular IOR Level", 0.45)
        _bsdf_set(bsdf, "Coat Weight", 0.18)
        _bsdf_set(bsdf, "Coat Roughness", 0.18)
        _add_noise_to_normal(nt, bsdf, scale=300.0, strength=0.30)
    else:
        # INDICATOR — informational/luminous, no procedural detail.
        _bsdf_set(bsdf, "Metallic", 0.0)
        _bsdf_set(bsdf, "Roughness", 0.25)
        _bsdf_set(bsdf, "Coat Weight", 0.5)
        _bsdf_set(bsdf, "Coat Roughness", 0.05)
        _bsdf_set(bsdf, "Emission Color", base_color_linear)
        _bsdf_set(bsdf, "Emission Strength", 1.5)


def _make_material(link_name: str, mesh_idx: int, color_int4) -> bpy.types.Material:
    # PRC's Int4 ARGB layout: x=A, y=R, z=G, w=B.
    a = max(0, min(255, color_int4.x)) / 255.0
    r = max(0, min(255, color_int4.y)) / 255.0
    g = max(0, min(255, color_int4.z)) / 255.0
    b = max(0, min(255, color_int4.w)) / 255.0
    if (a, r, g, b) == (0.0, 0.0, 0.0, 0.0):
        a = 1.0
        r = g = b = 155 / 255.0  # PoC default grey

    category = _classify_robot_color(r, g, b)

    rl = _srgb_to_linear(r)
    gl = _srgb_to_linear(g)
    bl = _srgb_to_linear(b)
    base_color_linear = (rl, gl, bl, a)

    mat = bpy.data.materials.new(name=f"{link_name}_M{mesh_idx}")
    # Solid-mode viewport shading reads diffuse_color (linear).
    mat.diffuse_color = base_color_linear
    _apply_robot_recipe(mat, base_color_linear, category)

    return mat


def _apply_smooth_by_angle(obj: bpy.types.Object, angle_rad: float) -> None:
    """Apply Blender 4.2+'s 'Smooth by Angle' modifier so edges below the
    threshold are shaded smoothly while sharper edges stay crisp.

    Falls back silently to plain smooth-shading (already set on the polygons
    by the caller) if the operator isn't available — e.g. on older Blender
    builds where the essentials asset library isn't loaded.
    """
    try:
        with bpy.context.temp_override(
            active_object=obj,
            selected_objects=[obj],
            object=obj,
            selected_editable_objects=[obj],
        ):
            bpy.ops.object.shade_smooth_by_angle(angle=angle_rad)
    except Exception:  # noqa: BLE001
        pass


def _prc_matrix_to_blender(m) -> mathutils.Matrix:
    """Convert prc_pb2.Matrix4x4 (row-major mm) to mathutils.Matrix (column-major m)."""
    result = mathutils.Matrix((
        (m.m11, m.m12, m.m13, m.m14),
        (m.m21, m.m22, m.m23, m.m24),
        (m.m31, m.m32, m.m33, m.m34),
        (m.m41 / 1000.0, m.m42 / 1000.0, m.m43 / 1000.0, m.m44),
    ))
    result.transpose()
    return result


# ---------------------------------------------------------------------------
# Feedback consumer (runs on its own thread)
# ---------------------------------------------------------------------------

def _consume_feedback_stream(stream) -> None:
    """Drain one feedback stream until it ends or stop is signalled."""
    global _xforms, _xforms_dirty, _settings, _tcp_xform, _tcp_dirty
    for feedback in stream:
        if _stop_event is not None and _stop_event.is_set():
            return
        field = feedback.WhichOneof("data_package")
        wake = False
        if field == "robot_state_data":
            state = feedback.robot_state_data
            if state.robot_transformations:
                arr = state.robot_transformations[0].transformation
                new_xforms: list[Optional[mathutils.Matrix]] = [None] * 8
                for j, x in enumerate(arr):
                    if j >= len(new_xforms):
                        break
                    new_xforms[j] = _prc_matrix_to_blender(x)
                with _xforms_lock:
                    _xforms = new_xforms
                    _xforms_dirty = True
                wake = True
            # tool_frame: the simulated TCP in world space.
            tf = state.tool_frame
            # Detect "unset" (all-zero) by checking the last row's W: a
            # valid homogeneous matrix has m44 = 1.
            if tf.m44 != 0.0:
                with _tcp_lock:
                    _tcp_xform = _prc_matrix_to_blender(tf)
                    _tcp_dirty = True
                wake = True
            if wake:
                _wake_main_thread()
        elif field == "settings_data":
            # Server pushed a settings update (e.g. user changed Base via
            # the WebUI). Refresh the in-memory copy and persist so the
            # change survives a save/reload.
            new_settings = dict(feedback.settings_data.settings_dictionary)
            _settings = new_settings
            _persist_settings_to_scene(_settings)
            post_status(f"Settings updated ({len(_settings)} entries).")


def _feedback_loop(stream) -> None:
    """Consume the feedback stream, transparently re-subscribing if the
    server closes it (e.g. transient network blip caught by keepalive).

    Stops permanently when the user disconnects (`_stop_event` set) or the
    stub is gone. Each reconnect attempt re-uses the existing channel and
    robot ID, so no UI re-setup is required."""
    cur_stream = stream
    while True:
        try:
            _consume_feedback_stream(cur_stream)
            # Stream ended cleanly (server closed it). Try to resubscribe
            # if we're still meant to be connected.
            if _stop_event is not None and _stop_event.is_set():
                return
            if _stub is None or not _robot_id:
                return
            post_status("Feedback stream ended; reconnecting ...")
        except grpc.RpcError as e:
            if _stop_event is not None and _stop_event.is_set():
                return
            if _stub is None or not _robot_id:
                post_status(f"Feedback stream ended: {e.code()}")
                return
            post_status(f"Feedback stream lost ({e.code()}); reconnecting ...")
        except Exception as e:  # noqa: BLE001
            post_status(f"Feedback error: {e!r}")
            return

        # Re-subscribe. If this fails immediately (server unreachable), bail
        # out — the user can hit Disconnect and try again.
        try:
            cur_stream = _stub.SubscribeRobotFeedback(
                prc_pb2.SubscribeRobotFeedbackRequest(id=_robot_id)
            )
            post_status("Feedback stream reconnected.")
        except Exception as e:  # noqa: BLE001
            post_status(f"Feedback reconnect failed: {e!r}")
            return


# ---------------------------------------------------------------------------
# Task submission
# ---------------------------------------------------------------------------

def add_task(task: prc_pb2.Task) -> tuple[bool, str]:
    """Submit a task to the server. Returns (is_valid, info_string).

    Also schedules a main-thread rebuild of the PRC_Toolpath polyline from
    the simulation result so the user sees the simulated TCP path in the
    viewport.
    """
    if _stub is None or not _robot_id:
        return False, "Not connected. Press 'Setup Robot' first."
    try:
        request = prc_pb2.AddRobotTaskRequest(
            id=_robot_id,
            robot_task=task,
            robot_settings=prc_pb2.Settings(settings_dictionary=_settings),
        )
        reply = _stub.AddRobotTask(request)
        result = reply.simulation_result_data
        global _last_task_duration_s
        _last_task_duration_s = float(result.time or 0.0)
        _set_task_loaded(True)
        # Snapshot the toolpath vertices + alarms on the gRPC thread, with
        # in-line decimation to keep the build fast on long programs. Always
        # keep the first/last step and any step that's > 1 mm from the last
        # kept one OR has a different alarm state.
        verts, alarms = _decimate_simulation_results(result.simulation_results)
        _build_toolpath_request_main_thread(verts, alarms)
        snippet = (result.code or "").strip().splitlines()
        first_line = snippet[0] if snippet else "(no code)"
        info = f"valid={result.is_valid}, t={result.time:.2f}s, code: {first_line[:60]}"
        return result.is_valid, info
    except Exception as e:  # noqa: BLE001
        return False, f"AddRobotTask failed: {e!r}"


def update_simulation(value: float) -> None:
    """Triggered from the slider's update callback. Returns silently if not ready."""
    if _stub is None or not _robot_id:
        return
    scene = bpy.context.scene
    if scene is None or not getattr(scene.prc, "task_loaded", False):
        post_status("No task loaded — press 'Load Task from Geometry Nodes' first.")
        return
    try:
        _stub.GetSimulatedRobotState(prc_pb2.GetSimulatedRobotStateRequest(
            id=_robot_id,
            normalized_state=float(value),
            stream_update=True,
        ))
    except Exception as e:  # noqa: BLE001
        post_status(f"GetSimulatedRobotState failed: {e!r}")


# ---------------------------------------------------------------------------
# Disconnect
# ---------------------------------------------------------------------------

def disconnect() -> None:
    _disconnect_internal()
    _set_setup_done(False)
    _set_task_loaded(False)
    post_status("Disconnected.")


def _disconnect_internal() -> None:
    global _channel, _stub, _settings, _robot_id, _link_count, _link_offset
    global _worker_thread, _feedback_thread, _stop_event

    if _stop_event is not None:
        _stop_event.set()
    if _feedback_thread is not None:
        _feedback_thread.join(timeout=2.0)
    if _worker_thread is not None and _worker_thread is not threading.current_thread():
        _worker_thread.join(timeout=2.0)
    if _channel is not None:
        try:
            _channel.close()
        except Exception:  # noqa: BLE001
            pass

    _channel = None
    _stub = None
    _settings = {}
    _robot_id = ""
    _link_count = 0
    _link_offset = 1
    _worker_thread = None
    _feedback_thread = None
    _stop_event = None


# Accessor used by reader.py
def stub():
    return _stub


def settings_dict() -> dict[str, str]:
    return _settings
