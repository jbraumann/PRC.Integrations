"""Blender operators for the PRC add-on (one per button + the modal driver)."""

from __future__ import annotations

import webbrowser

import bpy
import mathutils

from . import grpc_client as _client
from . import node_groups as _ng
from . import reader as _reader


# ---------------------------------------------------------------------------
# Setup Robot (modal — owns the timer that drives live visualisation)
# ---------------------------------------------------------------------------

def _existing_a_objects() -> list[str]:
    return [n for n in (f"A{i}" for i in range(0, 8)) if n in bpy.data.objects]


class PRC_OT_setup_robot(bpy.types.Operator):
    """Connect, set up the robot, and start the live feedback loop.

    Spawns a worker thread for the gRPC handshake and a feedback consumer
    thread for the streaming state updates. A bpy.app.timers tick (started
    by the worker on success) drives the viewport at ~10 Hz.
    """

    bl_idname = "prc.setup_robot"
    bl_label = "Setup Robot"
    bl_options = {"REGISTER"}

    replace_geometry: bpy.props.BoolProperty(
        name="Replace existing A0..A6 geometry",
        description=(
            "If checked, existing A0..A6 / A1..A6 objects in the scene are "
            "replaced with the meshes returned by the server. Uncheck to "
            "keep what's there — live feedback will still drive whatever "
            "objects are already named A0..A6."
        ),
        default=True,
    )

    def invoke(self, context, event):
        if _existing_a_objects():
            return context.window_manager.invoke_props_dialog(self, width=380)
        return self.execute(context)

    def draw(self, context):
        layout = self.layout
        existing = _existing_a_objects()
        col = layout.column()
        col.label(text=f"Found existing objects: {', '.join(existing)}", icon="INFO")
        col.label(text="Replace them with the server's robot geometry?")
        col.separator()
        col.prop(self, "replace_geometry")

    def execute(self, context):
        if _client.is_setup_done():
            self.report({"INFO"}, "Already set up.")
            return {"CANCELLED"}

        scene = context.scene

        # Read persisted settings (if any) from the scene on the main thread
        # and pass them into the worker — bpy data must not be touched there.
        saved_settings: dict = {}
        try:
            import json as _json
            raw = scene.prc.settings_json or ""
            if raw:
                parsed = _json.loads(raw)
                if isinstance(parsed, dict):
                    saved_settings = {str(k): str(v) for k, v in parsed.items()}
        except Exception:  # noqa: BLE001
            saved_settings = {}

        tool = scene.prc_tool
        tool_snapshot = {
            "tool_id":  int(tool.tool_id),
            "tool_x":   float(tool.tool_x),
            "tool_y":   float(tool.tool_y),
            "tool_z":   float(tool.tool_z),
            "tool_a":   float(tool.tool_a),
            "tool_b":   float(tool.tool_b),
            "tool_c":   float(tool.tool_c),
            "tool_qw":  float(tool.tool_qw),
            "tool_qx":  float(tool.tool_qx),
            "tool_qy":  float(tool.tool_qy),
            "tool_qz":  float(tool.tool_qz),
        }

        snapshot = {
            "client_id": scene.prc.client_id,
            "robot_type": scene.prc.robot_type,
            "robot_driver": scene.prc.robot_driver,
            "replace_geometry": bool(self.replace_geometry),
            "saved_settings": saved_settings,
            "tool": tool_snapshot,
        }
        _client.start_setup(snapshot)
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Generate Geometry Node Groups
# ---------------------------------------------------------------------------

class PRC_OT_generate_node_groups(bpy.types.Operator):
    """Create the PRC Geometry Node groups and the PRC_Program carrier object. Idempotent."""

    bl_idname = "prc.generate_node_groups"
    bl_label = "Generate Geometry Node Groups"
    bl_options = {"REGISTER", "UNDO"}

    def execute(self, context):
        created, upgraded, kept = _ng.ensure_node_groups()
        _ng.ensure_carrier_object()
        self.report(
            {"INFO"},
            f"Node groups: created {created}, upgraded {upgraded}, kept {kept}.",
        )
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Open Settings (browser)
# ---------------------------------------------------------------------------

class PRC_OT_open_settings(bpy.types.Operator):
    """Open the PRC server settings page in the default browser."""

    bl_idname = "prc.open_settings"
    bl_label = "Open Settings"

    def execute(self, context):
        webbrowser.open_new("https://127.0.0.1:5001")
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Load Task from GN
# ---------------------------------------------------------------------------

class PRC_OT_load_task(bpy.types.Operator):
    """Read the evaluated PRC_Program geometry and submit it as a Task."""

    bl_idname = "prc.load_task"
    bl_label = "Load Task from Geometry Nodes"
    bl_options = {"REGISTER"}

    @classmethod
    def poll(cls, context):
        return _client.is_setup_done()

    def execute(self, context):
        scene = context.scene
        try:
            task = _reader.build_task_from_carrier(scene)
        except Exception as e:  # noqa: BLE001
            self.report({"ERROR"}, str(e))
            scene.prc.status_message = f"Reader: {e}"
            return {"CANCELLED"}

        is_valid, info = _client.add_task(task)
        scene.prc.status_message = info
        if not is_valid:
            self.report({"WARNING"}, f"Task accepted but flagged invalid. {info}")
        else:
            self.report({"INFO"}, info)
        # Refresh the viewport at the current slider position so the user
        # sees the new task without having to nudge the slider first.
        _client.update_simulation(scene.prc.simulation_slider)
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Disconnect
# ---------------------------------------------------------------------------

class PRC_OT_disconnect(bpy.types.Operator):
    """Disconnect from the PRC server and reset state."""

    bl_idname = "prc.disconnect"
    bl_label = "Disconnect"

    def execute(self, context):
        _client.disconnect()
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Bake helpers
# ---------------------------------------------------------------------------

def _ensure_bake_object(scene, name: str) -> bpy.types.Object:
    mesh_name = name + "_Mesh"
    mesh = bpy.data.meshes.get(mesh_name)
    if mesh is None:
        mesh = bpy.data.meshes.new(mesh_name)
    obj = bpy.data.objects.get(name)
    if obj is None:
        obj = bpy.data.objects.new(name, mesh)
        scene.collection.objects.link(obj)
    else:
        if obj.data is not mesh:
            obj.data = mesh
    obj["prc_owner"] = _ng.PRC_OWNER_VALUE
    obj["prc_bake_kind"] = name.split("_")[1] if name.count("_") >= 2 else "Path"
    return obj


def _stamp_path_attributes(
    mesh,
    positions,
    rotations,
    motion_mode: str,   # "LIN", "PTP", "FIRST_PTP"
    speed: float,
    tool_id: int,
    posture: int,
):
    """Replace mesh geometry with one vertex per (position, rotation) and
    store the full set of prc_* attributes that the reader expects.

    motion_mode:
      LIN       — every point: motion=2, group_type=0  (one CP group)
      PTP       — every point: motion=1, group_type=1  (one PTP group)
      FIRST_PTP — point 0:     motion=1, group_type=1  (a one-point PTP group)
                  rest:        motion=2, group_type=0  (a CP group)

    The reader segments motion groups on prc_motion_group transitions, so
    each bake gets a fresh random ID per group; this lets users join
    several baked paths together via plain Join Geometry without their
    motion groups merging.
    """
    import random as _random

    n = len(positions)
    mesh.clear_geometry()
    if n == 0:
        return
    mesh.vertices.add(n)
    for i, p in enumerate(positions):
        mesh.vertices[i].co = p

    def _new(name, dtype):
        existing = mesh.attributes.get(name)
        if existing is not None:
            mesh.attributes.remove(existing)
        return mesh.attributes.new(name=name, type=dtype, domain="POINT")

    a_motion = _new("prc_motion", "INT")
    a_speed  = _new("prc_speed",  "FLOAT")
    a_orient = _new("prc_orient", "QUATERNION")
    a_gtype  = _new("prc_group_type", "INT")
    a_tool   = _new("prc_tool_id", "INT")
    a_post   = _new("prc_posture", "INT")
    a_mg     = _new("prc_motion_group", "INT")

    def _set_quat(d, q):
        d.value = (q.w, q.x, q.y, q.z)

    # PTP speed is NaN — KUKA reads PTP speed as a percentage, so the
    # LIN-style m/s value would be misinterpreted (e.g. 0.05 → 0%). NaN
    # tells PRC to fall back to the previous / server-configured speed.
    ptp_speed = float("nan")

    mg_id_a = _random.randint(1, 2_000_000_000)
    mg_id_b = _random.randint(1, 2_000_000_000)

    if motion_mode == "PTP":
        for i in range(n):
            a_motion.data[i].value = 1
            a_gtype.data[i].value = 1
            a_speed.data[i].value = ptp_speed
            _set_quat(a_orient.data[i], rotations[i])
            a_tool.data[i].value = tool_id
            a_post.data[i].value = posture
            a_mg.data[i].value = mg_id_a
    elif motion_mode == "FIRST_PTP":
        # Point 0: PTP — its own one-point motion group.
        a_motion.data[0].value = 1
        a_gtype.data[0].value  = 1
        a_speed.data[0].value  = ptp_speed
        _set_quat(a_orient.data[0], rotations[0])
        a_tool.data[0].value   = tool_id
        a_post.data[0].value   = posture
        a_mg.data[0].value     = mg_id_a
        # Rest: LIN — separate Cartesian motion group.
        for i in range(1, n):
            a_motion.data[i].value = 2
            a_gtype.data[i].value = 0
            a_speed.data[i].value = speed
            _set_quat(a_orient.data[i], rotations[i])
            a_tool.data[i].value = tool_id
            a_post.data[i].value = posture
            a_mg.data[i].value = mg_id_b
    else:  # LIN
        for i in range(n):
            a_motion.data[i].value = 2
            a_gtype.data[i].value = 0
            a_speed.data[i].value = speed
            _set_quat(a_orient.data[i], rotations[i])
            a_tool.data[i].value = tool_id
            a_post.data[i].value = posture
            a_mg.data[i].value = mg_id_a

    mesh.update()


# ---------------------------------------------------------------------------
# Bake Animation Path
# ---------------------------------------------------------------------------

class PRC_OT_bake_animation_path(bpy.types.Operator):
    """Sample the source object's world transform across a frame range and
    write the result to a path mesh that the carrier tree can consume via
    a PRC Animation Helper node."""

    bl_idname = "prc.bake_animation_path"
    bl_label = "Bake Animation"
    bl_options = {"REGISTER", "UNDO"}

    def execute(self, context):
        scene = context.scene
        props = scene.prc_anim_bake

        src = props.source
        if src is None:
            self.report({"ERROR"}, "Pick a source Object first.")
            return {"CANCELLED"}

        if props.frame_end < props.frame_start:
            self.report({"ERROR"}, "Frame End must be >= Frame Start.")
            return {"CANCELLED"}

        out_name = f"PRC_AnimPath_{src.name}"
        out = _ensure_bake_object(scene, out_name)

        positions: list[mathutils.Vector] = []
        rotations: list[mathutils.Quaternion] = []

        saved_frame = scene.frame_current
        try:
            f = props.frame_start
            step = max(1, props.step)
            while f <= props.frame_end:
                scene.frame_set(f)
                mw = src.matrix_world.copy()
                positions.append(mw.translation.copy())
                rotations.append(mw.to_quaternion())
                f += step
        finally:
            scene.frame_set(saved_frame)

        if not positions:
            self.report({"ERROR"}, "No frames in range.")
            return {"CANCELLED"}

        _stamp_path_attributes(
            out.data, positions, rotations,
            motion_mode=props.motion_type,
            speed=props.speed,
            tool_id=props.tool_id,
            posture=props.posture,
        )

        self.report({"INFO"}, f"Baked {len(positions)} samples to '{out_name}'.")
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Bake Grease Pencil Path
# ---------------------------------------------------------------------------

def _gp_extract_points(gp_obj, layer_index: int, frame_index: int):
    """Walk a Grease Pencil v3 object and return a flat list of world-space
    point positions taken from the chosen layer / frame's strokes (joined
    end-to-end)."""
    if gp_obj is None or gp_obj.type != "GREASEPENCIL":
        return []

    data = gp_obj.data
    layers = list(data.layers) if hasattr(data, "layers") else []
    if not layers:
        return []
    layer = layers[max(0, min(layer_index, len(layers) - 1))]

    frames = list(layer.frames) if hasattr(layer, "frames") else []
    if not frames:
        return []
    frame = frames[max(0, min(frame_index, len(frames) - 1))]

    # In Blender 4.4+ GPv3, frame.drawing.strokes; in some intermediate
    # versions, frame.drawing.curves. Try drawing.strokes first.
    drawing = getattr(frame, "drawing", None) or getattr(frame, "data", None)
    if drawing is None:
        return []

    strokes = (
        getattr(drawing, "strokes", None)
        or getattr(drawing, "curves", None)
        or []
    )

    mw = gp_obj.matrix_world
    pts: list[mathutils.Vector] = []
    for stroke in strokes:
        stroke_pts = getattr(stroke, "points", None)
        if not stroke_pts:
            continue
        for p in stroke_pts:
            co = getattr(p, "position", None) or getattr(p, "co", None)
            if co is None:
                continue
            v = mathutils.Vector((co[0], co[1], co[2]))
            pts.append(mw @ v)
    return pts


def _resample_polyline(pts: list[mathutils.Vector], spacing: float) -> list[mathutils.Vector]:
    """Resample a polyline at a fixed arc-length spacing. Endpoints are
    preserved. spacing <= 0 returns the input unchanged."""
    if spacing <= 0.0 or len(pts) < 2:
        return pts
    out = [pts[0]]
    leftover = 0.0
    for i in range(1, len(pts)):
        a = pts[i - 1]
        b = pts[i]
        seg = b - a
        seg_len = seg.length
        if seg_len <= 1e-12:
            continue
        # Travel along the segment in `spacing` steps.
        d = spacing - leftover
        while d <= seg_len:
            t = d / seg_len
            out.append(a + seg * t)
            d += spacing
        leftover = (seg_len - (d - spacing)) % spacing
    if (out[-1] - pts[-1]).length > 1e-9:
        out.append(pts[-1])
    return out


def _orient_along_polyline(
    pts: list[mathutils.Vector],
    up_world: mathutils.Vector,
) -> list[mathutils.Quaternion]:
    """Construct a per-point orientation: local +X = polyline tangent,
    local +Z = world-up projected perpendicular to the tangent."""
    n = len(pts)
    out: list[mathutils.Quaternion] = [mathutils.Quaternion()] * n
    if n == 0:
        return out
    if up_world.length < 1e-9:
        up_world = mathutils.Vector((0.0, 0.0, 1.0))
    up = up_world.normalized()

    for i in range(n):
        if n == 1:
            tangent = mathutils.Vector((1.0, 0.0, 0.0))
        elif i == 0:
            tangent = (pts[1] - pts[0])
        elif i == n - 1:
            tangent = (pts[-1] - pts[-2])
        else:
            tangent = (pts[i + 1] - pts[i - 1])
        if tangent.length < 1e-12:
            tangent = mathutils.Vector((1.0, 0.0, 0.0))
        tangent.normalize()

        # local +Z = up minus its projection onto tangent, then normalize
        z = up - tangent * up.dot(tangent)
        if z.length < 1e-9:
            # tangent ≈ ±up: pick an arbitrary perpendicular
            z = mathutils.Vector((0.0, 0.0, 1.0)).cross(tangent)
            if z.length < 1e-9:
                z = mathutils.Vector((0.0, 1.0, 0.0)).cross(tangent)
        z.normalize()

        y = z.cross(tangent).normalized()

        # Build matrix with columns = (x, y, z) where x=tangent
        mtx = mathutils.Matrix((
            (tangent.x, y.x, z.x),
            (tangent.y, y.y, z.y),
            (tangent.z, y.z, z.z),
        ))
        out[i] = mtx.to_quaternion()
    return out


class PRC_OT_bake_grease_pencil_path(bpy.types.Operator):
    """Convert a Grease Pencil drawing to a PRC path mesh."""

    bl_idname = "prc.bake_grease_pencil_path"
    bl_label = "Bake Grease Pencil"
    bl_options = {"REGISTER", "UNDO"}

    def execute(self, context):
        scene = context.scene
        props = scene.prc_gp_bake

        src = props.source
        if src is None or src.type != "GREASEPENCIL":
            self.report({"ERROR"}, "Pick a Grease Pencil object.")
            return {"CANCELLED"}

        raw_pts = _gp_extract_points(src, props.layer_index, props.frame_index)
        if not raw_pts:
            self.report({"ERROR"}, "No stroke points found on the chosen layer/frame.")
            return {"CANCELLED"}

        pts = _resample_polyline(raw_pts, props.sample_distance)

        if props.orient_mode == "EMPTY_UP" and props.up_object is not None:
            up_w = props.up_object.matrix_world.to_3x3() @ mathutils.Vector((0.0, 0.0, 1.0))
        else:
            up_w = mathutils.Vector((0.0, 0.0, 1.0))

        rotations = _orient_along_polyline(pts, up_w)

        out_name = f"PRC_GPPath_{src.name}"
        out = _ensure_bake_object(scene, out_name)

        _stamp_path_attributes(
            out.data, pts, rotations,
            motion_mode=props.motion_type,
            speed=props.speed,
            tool_id=props.tool_id,
            posture=props.posture,
        )

        self.report({"INFO"}, f"Baked {len(pts)} points to '{out_name}'.")
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Bake Robot Animation
# ---------------------------------------------------------------------------

def _effective_fps(scene) -> float:
    """Scene render FPS, with 25.0 fallback for unset/degenerate values."""
    try:
        f = float(scene.render.fps) / float(scene.render.fps_base or 1.0)
        return f if f > 0.5 else 25.0
    except Exception:  # noqa: BLE001
        return 25.0


def robot_anim_estimate(scene) -> tuple[float, float, int]:
    """Return (duration_s, fps, frame_count). Used by the panel and the
    operator. frame_count is 0 if there's no task to bake."""
    duration = _client.last_task_duration_seconds()
    props = scene.prc_robot_anim_bake
    fps = float(props.fps_override) if props.fps_override > 0 else _effective_fps(scene)
    frames = max(2, int(round(duration * fps))) if duration > 0.0 else 0
    return duration, fps, frames


def _wipe_named_collection_contents(coll_name: str) -> "bpy.types.Collection | None":
    """If a collection with this exact name exists, remove every object
    in it (and any owned mesh datablocks no longer referenced) and return
    the empty collection. Otherwise return None — caller is responsible
    for creating a fresh one."""
    coll = bpy.data.collections.get(coll_name)
    if coll is None:
        return None
    # Snapshot the object list — we mutate during iteration.
    for obj in list(coll.objects):
        mesh = obj.data if obj.type == "MESH" else None
        try:
            bpy.data.objects.remove(obj, do_unlink=True)
        except Exception:  # noqa: BLE001
            pass
        # Remove the mesh if nothing else references it.
        if mesh is not None and mesh.users == 0:
            try:
                bpy.data.meshes.remove(mesh)
            except Exception:  # noqa: BLE001
                pass
    return coll


def _ensure_collection(scene, coll_name: str) -> "bpy.types.Collection":
    coll = bpy.data.collections.get(coll_name)
    if coll is None:
        coll = bpy.data.collections.new(coll_name)
        scene.collection.children.link(coll)
    elif coll.name not in {c.name for c in scene.collection.children}:
        # Existing collection that isn't linked to the scene — link it so
        # the user can see it in the Outliner.
        try:
            scene.collection.children.link(coll)
        except RuntimeError:
            pass
    return coll


def _present_link_indices() -> list[int]:
    """Indices of A{i} objects that currently exist in bpy.data, taking
    the link offset into account (A0..A6 for 7-link, A1..A6 for 6-link)."""
    offset = _client.link_offset()
    out: list[int] = []
    for i in range(0 if offset == 0 else 1, 8):
        if bpy.data.objects.get(f"A{i}") is not None:
            out.append(i)
    return out


class PRC_OT_bake_robot_animation(bpy.types.Operator):
    """Bake the simulated robot motion into a self-contained Blender
    animation. Copies the A* link geometry into a dedicated collection
    and writes one keyframe per frame on each copy's location and
    rotation_quaternion. The result plays back without PRC running."""

    bl_idname = "prc.bake_robot_animation"
    bl_label = "Bake Robot Animation"
    bl_options = {"REGISTER", "UNDO"}

    @classmethod
    def poll(cls, context):
        return _client.is_setup_done() and _client.last_task_duration_seconds() > 0.0

    def execute(self, context):
        scene = context.scene
        props = scene.prc_robot_anim_bake

        target_name = (props.target_name or "PRC_RobotAnim").strip()
        if not target_name:
            self.report({"ERROR"}, "Target Name cannot be empty.")
            return {"CANCELLED"}

        duration, fps, frame_count = robot_anim_estimate(scene)
        if frame_count <= 0:
            self.report({"ERROR"}, "No task duration. Press 'Load Task' first.")
            return {"CANCELLED"}

        link_indices = _present_link_indices()
        if not link_indices:
            self.report({"ERROR"}, "No A* link objects to copy. Run 'Setup Robot' first.")
            return {"CANCELLED"}

        # If a collection with the chosen name already exists, replace its
        # contents. Otherwise leave the file untouched and create fresh.
        wiped = _wipe_named_collection_contents(target_name)
        coll = wiped if wiped is not None else _ensure_collection(scene, target_name)
        if wiped is not None and target_name not in {c.name for c in scene.collection.children}:
            # Re-link after wipe in case the collection got orphaned.
            try:
                scene.collection.children.link(coll)
            except RuntimeError:
                pass

        # Build copies — object + its own mesh datablock.
        copies: list[tuple[int, bpy.types.Object]] = []
        for i in link_indices:
            src = bpy.data.objects.get(f"A{i}")
            if src is None:
                continue
            new_obj = src.copy()
            new_obj.name = f"{target_name}_A{i}"
            if src.data is not None and hasattr(src.data, "copy"):
                new_obj.data = src.data.copy()
                new_obj.data.name = f"{target_name}_A{i}_Mesh"
            new_obj.animation_data_clear()
            new_obj.rotation_mode = "QUATERNION"
            # Unlink from any inherited collections, link only into ours.
            for c in list(new_obj.users_collection):
                try:
                    c.objects.unlink(new_obj)
                except RuntimeError:
                    pass
            try:
                coll.objects.link(new_obj)
            except RuntimeError:
                pass
            copies.append((i, new_obj))

        if not copies:
            self.report({"ERROR"}, "Failed to copy link geometry.")
            return {"CANCELLED"}

        frame_start = int(props.frame_start)
        frame_end   = frame_start + frame_count - 1
        saved_frame = scene.frame_current
        offset = _client.link_offset()

        # Force LINEAR interpolation on inserted keyframes by overriding the
        # "default interpolation" user preference for the duration of the
        # bake. Setting it ahead of `keyframe_insert` keeps us out of the
        # Action data structure, which differs between Blender 4.x (flat
        # `Action.fcurves`) and 5.x (slotted `Action.layers[].strips[]`).
        prefs_edit = bpy.context.preferences.edit
        saved_interp = getattr(prefs_edit, "keyframe_new_interpolation_type", None)
        try:
            try:
                prefs_edit.keyframe_new_interpolation_type = "LINEAR"
            except (AttributeError, TypeError):
                pass

            for f in range(frame_count):
                normalized = 0.0 if frame_count == 1 else f / float(frame_count - 1)
                matrices = _client.get_simulated_state_matrices(normalized)
                if matrices is None:
                    self.report({"ERROR"},
                                f"GetSimulatedRobotState failed at frame {f} "
                                f"(normalized={normalized:.3f}).")
                    return {"CANCELLED"}

                target_frame = frame_start + f
                scene.frame_set(target_frame)

                for i, obj in copies:
                    if offset == 1 and i == 0:
                        # Server's transformation[0] is the base in 6-link
                        # mode — but we won't have an A0 in this branch
                        # anyway, so this is defensive.
                        continue
                    if i >= len(matrices) or matrices[i] is None:
                        continue
                    obj.matrix_world = matrices[i]
                    obj.keyframe_insert(data_path="location",            frame=target_frame)
                    obj.keyframe_insert(data_path="rotation_quaternion", frame=target_frame)
        finally:
            scene.frame_set(saved_frame)
            if saved_interp is not None:
                try:
                    prefs_edit.keyframe_new_interpolation_type = saved_interp
                except (AttributeError, TypeError):
                    pass

        if props.set_scene_range:
            scene.frame_start = frame_start
            scene.frame_end   = frame_end

        self.report(
            {"INFO"},
            f"Baked {frame_count} frames (duration {duration:.2f}s @ {fps:.0f} fps) "
            f"into collection '{target_name}'.",
        )
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Build Studio Environment
# ---------------------------------------------------------------------------

class PRC_OT_build_studio(bpy.types.Operator):
    """Build (or rebuild) a 360°-friendly product-shot studio around the
    robot: revolved cyclorama backdrop, overhead key light, and a ring of
    rim/fill lights. Sized off the robot collection's bounding box."""

    bl_idname = "prc.build_studio"
    bl_label = "Build Studio Environment"
    bl_options = {"REGISTER", "UNDO"}

    def execute(self, context):
        from . import studio as _studio

        props = context.scene.prc_studio
        try:
            _studio.build_studio(
                floor_radius_mult=float(props.floor_radius_mult),
                wall_height_mult=float(props.wall_height_mult),
                key_power=float(props.key_power),
                rim_count=int(props.rim_count),
                rim_power=float(props.rim_power),
            )
        except RuntimeError as exc:
            self.report({"ERROR"}, str(exc))
            return {"CANCELLED"}

        self.report({"INFO"}, "Studio environment built.")
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

classes = (
    PRC_OT_setup_robot,
    PRC_OT_generate_node_groups,
    PRC_OT_open_settings,
    PRC_OT_load_task,
    PRC_OT_disconnect,
    PRC_OT_bake_animation_path,
    PRC_OT_bake_grease_pencil_path,
    PRC_OT_bake_robot_animation,
    PRC_OT_build_studio,
)


def register():
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
