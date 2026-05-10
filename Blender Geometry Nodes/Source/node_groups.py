"""Idempotent construction of the PRC Geometry Nodes node groups and the carrier object."""

from __future__ import annotations

import bpy

from . import properties as _props  # noqa: F401  (kept for future use)


PRC_OWNER_TAG = "prc_owner"
PRC_OWNER_VALUE = "PRC_Blender"
PRC_VERSION = 21  # bump to force rebuild of existing PRC-owned node groups

# Bumped whenever the canonical starter tree layout changes. Pressing
# "Generate Geometry Node Groups" on a carrier tree with an older starter
# version regenerates the inner wiring with the new template.
STARTER_TREE_VERSION = 5
STARTER_VERSION_KEY = "prc_starter_version"

CARRIER_OBJECT_NAME = "PRC_Program"

NG_AXIS = "PRC AXIS Move"
NG_PTP = "PRC PTP Move"
NG_LIN = "PRC LIN Move"
NG_PTP_GROUP = "PRC PTP Motion Group"
NG_CP_GROUP = "PRC Cartesian Motion Group"
NG_ACTION_GROUP = "PRC Action Group"
NG_TASK = "PRC Task"
NG_CURVE_HELPER = "PRC Curve Helper"
NG_MESH_PATH_HELPER = "PRC Mesh Path Helper"
NG_ANIMATION_HELPER = "PRC Animation Helper"
NG_GREASE_PENCIL_HELPER = "PRC Grease Pencil Helper"
NG_APPROACH_RETRACT = "PRC Approach Retract"
NG_ORIENT_TO_POINT = "PRC Orient to Point"
NG_INSERT_CODE = "PRC Insert Code"

# Node groups whose interface exposes an internal "Seed" Int input.
# NODE_OT_add_prc_group randomises the per-instance default and hides the
# socket on the inserted node so two separately-inserted Motion Group /
# Action Group / Curve Helper instances stamp different prc_motion_group
# IDs even when their input geometry is identical — without surfacing the
# salt as a confusing knob in the node UI.
_RANDOM_SEED_GROUP_NAMES = frozenset({
    NG_PTP_GROUP, NG_CP_GROUP, NG_ACTION_GROUP, NG_CURVE_HELPER,
})


def _supports_string_attrs() -> bool:
    """STRING-typed attributes via Store Named Attribute land in Blender 5.2.
    Older Blender versions silently drop string writes, so the Insert Code
    node group is only emitted when this returns True."""
    return bpy.app.version >= (5, 2, 0)


def _all_group_names() -> tuple[str, ...]:
    base = (
        NG_AXIS, NG_PTP, NG_LIN,
        NG_PTP_GROUP, NG_CP_GROUP, NG_ACTION_GROUP,
        NG_TASK,
        NG_CURVE_HELPER,
        NG_MESH_PATH_HELPER,
        NG_ANIMATION_HELPER,
        NG_GREASE_PENCIL_HELPER,
        NG_APPROACH_RETRACT,
        NG_ORIENT_TO_POINT,
    )
    if _supports_string_attrs():
        base = base + (NG_INSERT_CODE,)
    return base


# Order matters: helper builders that reference other PRC node groups
# (Curve Helper uses PTP / Cartesian Motion Groups) must come AFTER the
# groups they reference.
ALL_GROUP_NAMES = _all_group_names()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _is_ours(ng: bpy.types.NodeTree) -> bool:
    return ng.get(PRC_OWNER_TAG) == PRC_OWNER_VALUE


def _is_current_version(ng: bpy.types.NodeTree) -> bool:
    return int(ng.get("prc_version", 0)) >= PRC_VERSION


def _tag(ng: bpy.types.NodeTree) -> None:
    ng[PRC_OWNER_TAG] = PRC_OWNER_VALUE
    ng["prc_version"] = PRC_VERSION


def _wipe_internals(ng: bpy.types.NodeTree) -> None:
    """Clear nodes and interface sockets while keeping the NodeTree itself
    (so existing references in user-authored trees stay valid)."""
    for n in list(ng.nodes):
        ng.nodes.remove(n)
    for item in list(ng.interface.items_tree):
        ng.interface.remove(item)


def _add_socket(ng, in_out: str, socket_type: str, name: str):
    """Wraps the 4.x interface API."""
    return ng.interface.new_socket(name=name, in_out=in_out, socket_type=socket_type)


def _link(ng, from_socket, to_socket):
    return ng.links.new(from_socket, to_socket)


def _typed_socket(sockets, blender_type: str):
    """Return the first enabled socket whose RNA type matches. Used for
    nodes with multiple typed sockets sharing the same visible name —
    Sample Index's 'Value' inputs/outputs, Capture Attribute, Store
    Named Attribute, Accumulate Field, Input Named Attribute. Whichever
    socket is enabled is the one matching the node's active data_type.

    blender_type values: 'VALUE' (Float), 'INT', 'VECTOR', 'BOOLEAN',
    'ROTATION' (Quaternion), 'STRING', 'GEOMETRY'."""
    for sock in sockets:
        if sock.type == blender_type and sock.enabled:
            return sock
    return None


def _typed_socket_named(sockets, name: str, blender_type: str):
    """Like _typed_socket but also requires a matching visible name —
    needed for Accumulate Field which has 'Leading', 'Trailing', and
    'Total' output groups, each with one enabled socket per active
    data_type."""
    for sock in sockets:
        if sock.name == name and sock.type == blender_type and sock.enabled:
            return sock
    return None


_CAPTURE_DATA_TYPE_TO_SOCKET_TYPE = {
    # Translates the legacy attribute `data_type` enum that the rest of
    # the codebase still uses ('FLOAT', 'INT', 'FLOAT_VECTOR', …) to the
    # `capture_items.new(socket_type, …)` enum used by the modern API.
    "FLOAT":         "FLOAT",
    "INT":           "INT",
    "FLOAT_VECTOR":  "VECTOR",
    "FLOAT_COLOR":   "RGBA",
    "BOOLEAN":       "BOOLEAN",
    "QUATERNION":    "ROTATION",
    "FLOAT4X4":      "MATRIX",
    "STRING":        "STRING",
}


def _capture_attribute_set_data_type(node, data_type: str, name: str = "Value") -> None:
    """Configure a GeometryNodeCaptureAttribute to capture one value of
    the given Blender data_type. Targets Blender 4.4+'s `capture_items`
    collection (Blender ≤ 4.3 is unsupported)."""
    items = node.capture_items
    while len(items) > 0:
        items.remove(items[0])
    items.new(_CAPTURE_DATA_TYPE_TO_SOCKET_TYPE[data_type], name)


def _multi_link(ng, srcs_top_to_bottom, multi_in_socket):
    """Link multiple source sockets into a multi-input socket in a
    deterministic order. `srcs_top_to_bottom` is in desired evaluation
    order (the first element ends up as Join Geometry's first input).

    Why iterate in reverse: `NodeLink.multi_input_socket_index` is exposed
    by RNA but read-only from Python (PROP_EDITABLE cleared), so writing
    it does nothing. Blender auto-assigns the index based on link
    creation order in a way that effectively reverses the evaluation
    order vs. the call sequence — newer links sort earlier. Adding in
    reverse compensates so srcs[0] is processed first by Join Geometry."""
    for src in reversed(srcs_top_to_bottom):
        ng.links.new(src, multi_in_socket)


def _new_node(ng, node_type: str, location: tuple[float, float] = (0.0, 0.0)):
    n = ng.nodes.new(node_type)
    n.location = location
    return n


# ---------------------------------------------------------------------------
# Motion command node groups
# ---------------------------------------------------------------------------

def _build_axis_move(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A1")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A2")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A3")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A4")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A5")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "A6")
    # Speed is an Int forwarded to PRC unchanged (KUKA expects whole numbers).
    _add_socket(ng, "INPUT", "NodeSocketInt", "Speed")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    iface = ng.interface.items_tree
    defaults = {"A1": 0.0, "A2": -90.0, "A3": 90.0, "A4": 0.0, "A5": 0.0, "A6": 0.0}
    for item in iface:
        if item.name in defaults:
            try:
                item.default_value = defaults[item.name]
            except Exception:  # noqa: BLE001
                pass
        elif item.name == "Speed":
            try:
                item.default_value = 10
            except Exception:  # noqa: BLE001
                pass

    group_in = _new_node(ng, "NodeGroupInput", (-600, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1600, 0))

    # Single point at origin.
    points = _new_node(ng, "GeometryNodePoints", (-300, 0))
    points.inputs["Count"].default_value = 1

    # Chain Store Named Attribute nodes.
    geo = points.outputs["Points"]
    x = 0
    store_specs = [
        ("prc_motion", None,                         "INT",   0),
        ("prc_speed",  group_in.outputs["Speed"],    "FLOAT", None),
        ("prc_a1",     group_in.outputs["A1"],       "FLOAT", None),
        ("prc_a2",     group_in.outputs["A2"],       "FLOAT", None),
        ("prc_a3",     group_in.outputs["A3"],       "FLOAT", None),
        ("prc_a4",     group_in.outputs["A4"],       "FLOAT", None),
        ("prc_a5",     group_in.outputs["A5"],       "FLOAT", None),
        ("prc_a6",     group_in.outputs["A6"],       "FLOAT", None),
    ]
    for attr_name, value_socket, data_type, value in store_specs:
        store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
        store.data_type = data_type
        store.domain = "POINT"
        store.inputs["Name"].default_value = attr_name
        _link(ng, geo, store.inputs["Geometry"])
        if value_socket is not None:
            _link(ng, value_socket, store.inputs["Value"])
        elif value is not None:
            _set_store_value(store, data_type, value)
        geo = store.outputs["Geometry"]
        x += 200

    geo = _to_mesh(ng, geo, x)
    _link(ng, geo, group_out.inputs["Geometry"])


def _build_ptp_move(ng: bpy.types.NodeTree) -> None:
    # Object: optional Empty / object whose world transform drives the waypoint.
    _add_socket(ng, "INPUT", "NodeSocketObject", "Object")
    # Position / Rotation are added on top of the Object transform (or used
    # alone if Object is left unset).
    _add_socket(ng, "INPUT", "NodeSocketVector", "Position")
    _add_socket(ng, "INPUT", "NodeSocketRotation", "Rotation")
    # Speed is an Int forwarded to PRC unchanged (KUKA expects whole numbers).
    _add_socket(ng, "INPUT", "NodeSocketInt", "Speed")
    # Posture is an Int (zero-padded to 3 digits at read time): GN's
    # Store Named Attribute does not support STRING attributes.
    _add_socket(ng, "INPUT", "NodeSocketInt", "Posture")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Speed":
            try:
                item.default_value = 10
            except Exception:  # noqa: BLE001
                pass
        elif item.name == "Posture":
            try:
                item.default_value = 10  # "010"
            except Exception:  # noqa: BLE001
                pass

    group_in = _new_node(ng, "NodeGroupInput", (-800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1400, 0))

    eff_pos, eff_rot = _object_plus_offset(
        ng, group_in.outputs["Object"],
        group_in.outputs["Position"], group_in.outputs["Rotation"],
        location=(-500, -200),
    )

    points = _new_node(ng, "GeometryNodePoints", (-200, 0))
    points.inputs["Count"].default_value = 1
    _link(ng, eff_pos, points.inputs["Position"])

    x = 0
    geo = points.outputs["Points"]

    motion_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    motion_store.data_type = "INT"
    motion_store.domain = "POINT"
    motion_store.inputs["Name"].default_value = "prc_motion"
    _set_store_value(motion_store, "INT", 1)
    _link(ng, geo, motion_store.inputs["Geometry"])
    geo = motion_store.outputs["Geometry"]
    x += 200

    orient_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    orient_store.data_type = "QUATERNION"
    orient_store.domain = "POINT"
    orient_store.inputs["Name"].default_value = "prc_orient"
    _link(ng, geo, orient_store.inputs["Geometry"])
    _link(ng, eff_rot, orient_store.inputs["Value"])
    geo = orient_store.outputs["Geometry"]
    x += 200

    speed_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    speed_store.data_type = "FLOAT"
    speed_store.domain = "POINT"
    speed_store.inputs["Name"].default_value = "prc_speed"
    _link(ng, geo, speed_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Speed"], speed_store.inputs["Value"])
    geo = speed_store.outputs["Geometry"]
    x += 200

    posture_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    posture_store.data_type = "INT"
    posture_store.domain = "POINT"
    posture_store.inputs["Name"].default_value = "prc_posture"
    _link(ng, geo, posture_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Posture"], posture_store.inputs["Value"])
    geo = posture_store.outputs["Geometry"]
    x += 200

    geo = _to_mesh(ng, geo, x)
    _link(ng, geo, group_out.inputs["Geometry"])


def _build_lin_move(ng: bpy.types.NodeTree) -> None:
    # Object: optional Empty / object whose world transform drives the waypoint.
    _add_socket(ng, "INPUT", "NodeSocketObject", "Object")
    _add_socket(ng, "INPUT", "NodeSocketVector", "Position")
    _add_socket(ng, "INPUT", "NodeSocketRotation", "Rotation")
    _add_socket(ng, "INPUT", "NodeSocketFloat", "Speed")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Speed":
            try:
                item.default_value = 0.05
            except Exception:  # noqa: BLE001
                pass

    group_in = _new_node(ng, "NodeGroupInput", (-800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1200, 0))

    eff_pos, eff_rot = _object_plus_offset(
        ng, group_in.outputs["Object"],
        group_in.outputs["Position"], group_in.outputs["Rotation"],
        location=(-500, -200),
    )

    points = _new_node(ng, "GeometryNodePoints", (-200, 0))
    points.inputs["Count"].default_value = 1
    _link(ng, eff_pos, points.inputs["Position"])

    geo = points.outputs["Points"]
    x = 0

    motion_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    motion_store.data_type = "INT"
    motion_store.domain = "POINT"
    motion_store.inputs["Name"].default_value = "prc_motion"
    _set_store_value(motion_store, "INT", 2)
    _link(ng, geo, motion_store.inputs["Geometry"])
    geo = motion_store.outputs["Geometry"]
    x += 200

    orient_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    orient_store.data_type = "QUATERNION"
    orient_store.domain = "POINT"
    orient_store.inputs["Name"].default_value = "prc_orient"
    _link(ng, geo, orient_store.inputs["Geometry"])
    _link(ng, eff_rot, orient_store.inputs["Value"])
    geo = orient_store.outputs["Geometry"]
    x += 200

    speed_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    speed_store.data_type = "FLOAT"
    speed_store.domain = "POINT"
    speed_store.inputs["Name"].default_value = "prc_speed"
    _link(ng, geo, speed_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Speed"], speed_store.inputs["Value"])
    geo = speed_store.outputs["Geometry"]
    x += 200

    geo = _to_mesh(ng, geo, x)
    _link(ng, geo, group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Motion group node groups
# ---------------------------------------------------------------------------

def _build_motion_group(ng: bpy.types.NodeTree, group_type: int) -> None:
    """group_type: 0 = CP, 1 = PTP.

    Stamps a unique-ish prc_motion_group ID computed from the input
    geometry's first-point position, the per-instance Seed, and the
    group_type. Plain Join Geometry is enough downstream — adjacent groups
    end up with different IDs because the position-based hash + the
    Seed-defaults-to-random-on-add strategy makes collisions vanishingly
    unlikely in practice.
    """
    _add_socket(ng, "INPUT", "NodeSocketGeometry", "Geometry")
    # Tool ID is an Int (stringified at read time): GN's Store Named
    # Attribute does not support STRING attributes.
    _add_socket(ng, "INPUT", "NodeSocketInt", "Tool ID")
    # Seed: internal salt for the prc_motion_group hash. Defaults to 0 at
    # the group level; NODE_OT_add_prc_group randomises the per-instance
    # default and hides the socket on the inserted node.
    _add_socket(ng, "INPUT", "NodeSocketInt", "Seed")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Tool ID":
            try:
                item.default_value = 0
            except Exception:  # noqa: BLE001
                pass
        elif item.name == "Seed":
            try:
                item.default_value = 0
            except Exception:  # noqa: BLE001
                pass

    group_in = _new_node(ng, "NodeGroupInput", (-800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1200, 0))

    geo = group_in.outputs["Geometry"]
    x = 0

    tool_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    tool_store.data_type = "INT"
    tool_store.domain = "POINT"
    tool_store.inputs["Name"].default_value = "prc_tool_id"
    _link(ng, geo, tool_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Tool ID"], tool_store.inputs["Value"])
    geo = tool_store.outputs["Geometry"]
    x += 200

    type_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    type_store.data_type = "INT"
    type_store.domain = "POINT"
    type_store.inputs["Name"].default_value = "prc_group_type"
    _set_store_value(type_store, "INT", group_type)
    _link(ng, geo, type_store.inputs["Geometry"])
    geo = type_store.outputs["Geometry"]
    x += 200

    mg_id = _build_motion_group_id(
        ng, geo, group_in.outputs["Seed"], group_type, location=(x - 200, -350),
    )
    mg_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    mg_store.data_type = "INT"
    mg_store.domain = "POINT"
    mg_store.inputs["Name"].default_value = "prc_motion_group"
    _link(ng, geo, mg_store.inputs["Geometry"])
    sv_in = _typed_socket(mg_store.inputs, "INT")
    if sv_in is not None:
        _link(ng, mg_id, sv_in)
    else:
        _link(ng, mg_id, mg_store.inputs["Value"])
    geo = mg_store.outputs["Geometry"]

    _link(ng, geo, group_out.inputs["Geometry"])


def _build_motion_group_id(ng, source_geo, seed_socket, group_type: int, location):
    """Compute a single-value INT field that hashes (first-point position,
    Seed, group_type) into a 32-bit integer. Returns the output socket of
    the final FloatToInt node.

    Anchoring on the first vertex's position means two different waypoint
    clouds get different IDs even when they share the same Seed — a safety
    net for copy-pasted nodes whose hidden Seed defaults match."""
    lx, ly = location

    # Pull the first point's position out of the input geometry.
    pos_field = _new_node(ng, "GeometryNodeInputPosition", (lx, ly - 100))
    samp_first = _new_node(ng, "GeometryNodeSampleIndex", (lx + 200, ly - 100))
    samp_first.data_type = "FLOAT_VECTOR"
    samp_first.domain = "POINT"
    _link(ng, source_geo, samp_first.inputs["Geometry"])
    sf_val_in = _typed_socket(samp_first.inputs, "VECTOR")
    if sf_val_in is not None:
        _link(ng, pos_field.outputs["Position"], sf_val_in)
    samp_first.inputs["Index"].default_value = 0
    first_pos = _typed_socket(samp_first.outputs, "VECTOR")

    sep = _new_node(ng, "ShaderNodeSeparateXYZ", (lx + 400, ly - 100))
    if first_pos is not None:
        _link(ng, first_pos, sep.inputs[0])

    # hash = x*73.13 + y*19349.7 + z*8349.79 + seed + group_type*1009
    mul_x = _new_node(ng, "ShaderNodeMath", (lx + 600, ly + 50))
    mul_x.operation = "MULTIPLY"
    _link(ng, sep.outputs["X"], mul_x.inputs[0])
    mul_x.inputs[1].default_value = 73.13

    mul_y = _new_node(ng, "ShaderNodeMath", (lx + 600, ly - 50))
    mul_y.operation = "MULTIPLY"
    _link(ng, sep.outputs["Y"], mul_y.inputs[0])
    mul_y.inputs[1].default_value = 19349.7

    mul_z = _new_node(ng, "ShaderNodeMath", (lx + 600, ly - 150))
    mul_z.operation = "MULTIPLY"
    _link(ng, sep.outputs["Z"], mul_z.inputs[0])
    mul_z.inputs[1].default_value = 8349.79

    add_xy = _new_node(ng, "ShaderNodeMath", (lx + 800, ly))
    add_xy.operation = "ADD"
    _link(ng, mul_x.outputs["Value"], add_xy.inputs[0])
    _link(ng, mul_y.outputs["Value"], add_xy.inputs[1])

    add_xyz = _new_node(ng, "ShaderNodeMath", (lx + 1000, -50 + ly))
    add_xyz.operation = "ADD"
    _link(ng, add_xy.outputs["Value"], add_xyz.inputs[0])
    _link(ng, mul_z.outputs["Value"], add_xyz.inputs[1])

    add_seed = _new_node(ng, "ShaderNodeMath", (lx + 1200, ly - 100))
    add_seed.operation = "ADD"
    _link(ng, add_xyz.outputs["Value"], add_seed.inputs[0])
    _link(ng, seed_socket, add_seed.inputs[1])

    add_gt = _new_node(ng, "ShaderNodeMath", (lx + 1400, ly - 150))
    add_gt.operation = "ADD"
    _link(ng, add_seed.outputs["Value"], add_gt.inputs[0])
    add_gt.inputs[1].default_value = float(group_type) * 1009.0

    # Wrap into [0, 2_000_000_000) so the FloatToInt below stays inside
    # INT32 range, then floor to integer. Using direct math (rather than
    # routing through a Random Value node) keeps the field evaluation
    # explicit and avoids subtle per-element-vs-single-value confusion
    # when the hash input contains per-element terms.
    abs_hash = _new_node(ng, "ShaderNodeMath", (lx + 1600, ly - 150))
    abs_hash.operation = "ABSOLUTE"
    _link(ng, add_gt.outputs["Value"], abs_hash.inputs[0])

    mod_hash = _new_node(ng, "ShaderNodeMath", (lx + 1800, ly - 150))
    mod_hash.operation = "MODULO"
    _link(ng, abs_hash.outputs["Value"], mod_hash.inputs[0])
    mod_hash.inputs[1].default_value = 2_000_000_000.0

    to_int = _new_node(ng, "FunctionNodeFloatToInt", (lx + 2000, ly - 150))
    to_int.rounding_mode = "FLOOR"
    _link(ng, mod_hash.outputs["Value"], to_int.inputs[0])

    return to_int.outputs[0]


# ---------------------------------------------------------------------------
# Task node group
# ---------------------------------------------------------------------------

def _build_task(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketGeometry", "Geometry")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    group_in = _new_node(ng, "NodeGroupInput", (-200, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (200, 0))
    _link(ng, group_in.outputs["Geometry"], group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Helpers — high-level utilities that wire several PRC nodes internally.
# ---------------------------------------------------------------------------

def _build_curve_helper(ng: bpy.types.NodeTree) -> None:
    """A one-stop shop for Curve-driven toolpaths. Each spline of the
    source curve becomes its own motion group.

    Inputs:
      Curve         (Object)  : the source curve. Splines inside it are
                                 treated as separate motion groups — a
                                 3-spline curve produces 3 groups.
      Divisions     (Int)     : number of waypoints sampled per spline.
      Orientation   (Object)  : optional Empty whose world rotation is
                                 used for every waypoint. Unset = identity.
      Speed         (Float)   : LIN speed (m/s). PTP waypoints (when First
                                 as PTP is enabled) emit NaN so PRC's
                                 server-configured PTP speed is used.
      First as PTP  (Bool)    : if True, each spline emits TWO motion
                                 groups — a PTP group containing the
                                 spline's first sample, and a Cartesian
                                 group containing the remaining samples
                                 as LIN motions.
      Posture       (Int)     : posture for the PTP motions (zero-padded
                                 to 3 digits at read time).
      Seed          (Int)     : internal per-instance salt for the
                                 prc_motion_group hash. Randomised on
                                 insert by NODE_OT_add_prc_group and
                                 hidden on the node UI — not a user knob.

    Output:
      Geometry — N Cartesian Motion Groups when First as PTP is False;
      N pairs of (PTP Motion Group + Cartesian Motion Group) when True.
      Each motion group carries a unique prc_motion_group ID so the
      reader can distinguish them even after plain Join Geometry.
    """
    _add_socket(ng, "INPUT", "NodeSocketObject",  "Curve")
    _add_socket(ng, "INPUT", "NodeSocketInt",     "Divisions")
    _add_socket(ng, "INPUT", "NodeSocketObject",  "Orientation")
    _add_socket(ng, "INPUT", "NodeSocketFloat",   "Speed")
    _add_socket(ng, "INPUT", "NodeSocketBool",    "First as PTP")
    _add_socket(ng, "INPUT", "NodeSocketInt",     "Posture")
    _add_socket(ng, "INPUT", "NodeSocketInt",     "Seed")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Divisions":
            try: item.default_value = 10
            except Exception: pass
        elif item.name == "Speed":
            try: item.default_value = 0.05
            except Exception: pass
        elif item.name == "First as PTP":
            try: item.default_value = False
            except Exception: pass
        elif item.name == "Posture":
            try: item.default_value = 10
            except Exception: pass
        elif item.name == "Seed":
            try: item.default_value = 0
            except Exception: pass

    group_in  = _new_node(ng, "NodeGroupInput",  (-2800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (3400, 0))

    # ------------------------------------------------------------------
    # Curve sampling, with spline_id captured on the CURVE domain so each
    # output point carries "which spline did I come from" downstream.
    # ------------------------------------------------------------------
    obj_curve = _new_node(ng, "GeometryNodeObjectInfo", (-2500, 250))
    # RELATIVE = transform the source geometry into the carrier object's
    # space (the carrier is at world origin, so this is world-space). With
    # ORIGINAL the curve vertices come back in the source's local space,
    # i.e. clustered around (0, 0, 0) regardless of where the user placed
    # the curve in the scene.
    obj_curve.transform_space = "RELATIVE"
    _link(ng, group_in.outputs["Curve"], obj_curve.inputs["Object"])

    spline_idx_field = _new_node(ng, "GeometryNodeInputIndex", (-2400, 100))

    capture_spline = _new_node(ng, "GeometryNodeCaptureAttribute", (-2200, 250))
    _capture_attribute_set_data_type(capture_spline, "INT", name="Spline ID")
    capture_spline.domain = "CURVE"
    _link(ng, obj_curve.outputs["Geometry"], capture_spline.inputs["Geometry"])
    cap_in = _typed_socket(capture_spline.inputs, "INT")
    if cap_in is not None:
        _link(ng, spline_idx_field.outputs["Index"], cap_in)
    captured_curve_geo = capture_spline.outputs["Geometry"]
    spline_id_field = _typed_socket(capture_spline.outputs, "INT")

    c2p = _new_node(ng, "GeometryNodeCurveToPoints", (-1900, 250))
    c2p.mode = "COUNT"
    _link(ng, captured_curve_geo, c2p.inputs["Curve"])
    _link(ng, group_in.outputs["Divisions"], c2p.inputs["Count"])
    raw_points = c2p.outputs["Points"]

    # Capture the original point index BEFORE any branching, so both Path
    # B clouds (after Delete Geometry) can sort back into spline order via
    # the same orig_idx field.
    orig_idx_field = _new_node(ng, "GeometryNodeInputIndex", (-1700, 100))
    capture_orig = _new_node(ng, "GeometryNodeCaptureAttribute", (-1500, 250))
    _capture_attribute_set_data_type(capture_orig, "INT", name="Original Index")
    capture_orig.domain = "POINT"
    _link(ng, raw_points, capture_orig.inputs["Geometry"])
    cap_orig_in = _typed_socket(capture_orig.inputs, "INT")
    if cap_orig_in is not None:
        _link(ng, orig_idx_field.outputs["Index"], cap_orig_in)
    points_socket = capture_orig.outputs["Geometry"]
    orig_idx_captured = _typed_socket(capture_orig.outputs, "INT")

    # ------------------------------------------------------------------
    # Detect "first point of each spline" on the resulting point cloud.
    # Compare current point's spline_id with the previous point's; the
    # very first point (idx == 0) is always a spline start.
    # ------------------------------------------------------------------
    pt_idx = _new_node(ng, "GeometryNodeInputIndex", (-1300, 100))

    idx_minus_1 = _new_node(ng, "ShaderNodeMath", (-1100, 100))
    idx_minus_1.operation = "SUBTRACT"
    _link(ng, pt_idx.outputs["Index"], idx_minus_1.inputs[0])
    idx_minus_1.inputs[1].default_value = 1.0

    idx_minus_1_int = _new_node(ng, "FunctionNodeFloatToInt", (-900, 100))
    idx_minus_1_int.rounding_mode = "FLOOR"
    _link(ng, idx_minus_1.outputs["Value"], idx_minus_1_int.inputs[0])

    # Sample the previous point's spline_id (clamp keeps idx=0 stable —
    # we explicitly check idx==0 below to flag it as a boundary anyway).
    samp_prev_spline = _new_node(ng, "GeometryNodeSampleIndex", (-700, 100))
    samp_prev_spline.data_type = "INT"
    samp_prev_spline.domain = "POINT"
    _link(ng, points_socket, samp_prev_spline.inputs["Geometry"])
    sps_val_in = _typed_socket(samp_prev_spline.inputs, "INT")
    if spline_id_field is not None and sps_val_in is not None:
        _link(ng, spline_id_field, sps_val_in)
    _link(ng, idx_minus_1_int.outputs[0], samp_prev_spline.inputs["Index"])
    prev_spline_id = _typed_socket(samp_prev_spline.outputs, "INT")

    # is_at_zero = (idx < 0.5)
    is_at_zero_n = _new_node(ng, "ShaderNodeMath", (-700, -100))
    is_at_zero_n.operation = "LESS_THAN"
    _link(ng, pt_idx.outputs["Index"], is_at_zero_n.inputs[0])
    is_at_zero_n.inputs[1].default_value = 0.5

    # spline_changed = |spline_id - prev_spline_id| > 0.5
    diff_n = _new_node(ng, "ShaderNodeMath", (-500, 100))
    diff_n.operation = "SUBTRACT"
    if spline_id_field is not None:
        _link(ng, spline_id_field, diff_n.inputs[0])
    if prev_spline_id is not None:
        _link(ng, prev_spline_id, diff_n.inputs[1])
    abs_diff_n = _new_node(ng, "ShaderNodeMath", (-300, 100))
    abs_diff_n.operation = "ABSOLUTE"
    _link(ng, diff_n.outputs["Value"], abs_diff_n.inputs[0])
    spline_changed_n = _new_node(ng, "ShaderNodeMath", (-100, 100))
    spline_changed_n.operation = "GREATER_THAN"
    _link(ng, abs_diff_n.outputs["Value"], spline_changed_n.inputs[0])
    spline_changed_n.inputs[1].default_value = 0.5

    # is_first_of_spline = is_at_zero OR spline_changed (MAXIMUM = OR for 0/1)
    is_first_n = _new_node(ng, "ShaderNodeMath", (100, 0))
    is_first_n.operation = "MAXIMUM"
    _link(ng, is_at_zero_n.outputs["Value"], is_first_n.inputs[0])
    _link(ng, spline_changed_n.outputs["Value"], is_first_n.inputs[1])
    is_first_of_spline = is_first_n.outputs["Value"]

    # not_is_first = 1 - is_first (used as Selection for Delete Geometry).
    not_is_first_n = _new_node(ng, "ShaderNodeMath", (300, 0))
    not_is_first_n.operation = "SUBTRACT"
    not_is_first_n.inputs[0].default_value = 1.0
    _link(ng, is_first_of_spline, not_is_first_n.inputs[1])

    # ------------------------------------------------------------------
    # Orientation + speed sources.
    # ------------------------------------------------------------------
    obj_orient = _new_node(ng, "GeometryNodeObjectInfo", (-2500, -550))
    obj_orient.transform_space = "RELATIVE"
    _link(ng, group_in.outputs["Orientation"], obj_orient.inputs["Object"])
    rot_socket = obj_orient.outputs["Rotation"]

    speed_socket   = group_in.outputs["Speed"]
    posture_socket = group_in.outputs["Posture"]

    # ==================================================================
    # Per-spline prc_motion_group ID. Hash (Seed, spline_id, slot, the
    # spline's first-sample position) directly into an INT — no Random
    # Value indirection. The first-position term makes two Curve Helpers
    # pointing at different curves produce different IDs even when they
    # share Seed defaults; spline_id keeps the splines inside one helper
    # distinct; slot differentiates the PTP cloud (slot=1) from the CP
    # cloud (slot=2) within First-as-PTP mode.
    # ==================================================================

    # First-point-of-this-spline position: sample at idx = spline_id * Divisions.
    # Each output point evaluates this at its own spline's first index, so the
    # value is constant within a spline and varies across splines.
    first_idx_n = _new_node(ng, "ShaderNodeMath", (300, -1100))
    first_idx_n.operation = "MULTIPLY"
    if spline_id_field is not None:
        _link(ng, spline_id_field, first_idx_n.inputs[0])
    _link(ng, group_in.outputs["Divisions"], first_idx_n.inputs[1])
    first_idx_int = _new_node(ng, "FunctionNodeFloatToInt", (500, -1100))
    first_idx_int.rounding_mode = "FLOOR"
    _link(ng, first_idx_n.outputs["Value"], first_idx_int.inputs[0])

    pos_field = _new_node(ng, "GeometryNodeInputPosition", (300, -1250))
    samp_first = _new_node(ng, "GeometryNodeSampleIndex", (700, -1100))
    samp_first.data_type = "FLOAT_VECTOR"
    samp_first.domain = "POINT"
    _link(ng, points_socket, samp_first.inputs["Geometry"])
    sf_val_in = _typed_socket(samp_first.inputs, "VECTOR")
    if sf_val_in is not None:
        _link(ng, pos_field.outputs["Position"], sf_val_in)
    _link(ng, first_idx_int.outputs[0], samp_first.inputs["Index"])
    spline_first_pos = _typed_socket(samp_first.outputs, "VECTOR")

    sep_first = _new_node(ng, "ShaderNodeSeparateXYZ", (900, -1100))
    if spline_first_pos is not None:
        _link(ng, spline_first_pos, sep_first.inputs[0])

    def _per_spline_mg_id(slot: int, location):
        lx, ly = location

        # spline_id contribution — the dominant per-spline differentiator
        # within one Curve Helper instance.
        spline_mul = _new_node(ng, "ShaderNodeMath", (lx, ly + 100))
        spline_mul.operation = "MULTIPLY"
        if spline_id_field is not None:
            _link(ng, spline_id_field, spline_mul.inputs[0])
        spline_mul.inputs[1].default_value = 7919.0

        # First-position contribution — disambiguates Curve Helpers
        # pointing at different curves regardless of Seed.
        pos_x_mul = _new_node(ng, "ShaderNodeMath", (lx, ly - 50))
        pos_x_mul.operation = "MULTIPLY"
        _link(ng, sep_first.outputs["X"], pos_x_mul.inputs[0])
        pos_x_mul.inputs[1].default_value = 73.13

        pos_y_mul = _new_node(ng, "ShaderNodeMath", (lx, ly - 150))
        pos_y_mul.operation = "MULTIPLY"
        _link(ng, sep_first.outputs["Y"], pos_y_mul.inputs[0])
        pos_y_mul.inputs[1].default_value = 19349.7

        pos_z_mul = _new_node(ng, "ShaderNodeMath", (lx, ly - 250))
        pos_z_mul.operation = "MULTIPLY"
        _link(ng, sep_first.outputs["Z"], pos_z_mul.inputs[0])
        pos_z_mul.inputs[1].default_value = 8349.79

        add_xy = _new_node(ng, "ShaderNodeMath", (lx + 200, ly - 100))
        add_xy.operation = "ADD"
        _link(ng, pos_x_mul.outputs["Value"], add_xy.inputs[0])
        _link(ng, pos_y_mul.outputs["Value"], add_xy.inputs[1])

        add_xyz = _new_node(ng, "ShaderNodeMath", (lx + 400, ly - 150))
        add_xyz.operation = "ADD"
        _link(ng, add_xy.outputs["Value"], add_xyz.inputs[0])
        _link(ng, pos_z_mul.outputs["Value"], add_xyz.inputs[1])

        add_spline = _new_node(ng, "ShaderNodeMath", (lx + 600, ly))
        add_spline.operation = "ADD"
        _link(ng, add_xyz.outputs["Value"], add_spline.inputs[0])
        _link(ng, spline_mul.outputs["Value"], add_spline.inputs[1])

        add_seed = _new_node(ng, "ShaderNodeMath", (lx + 800, ly))
        add_seed.operation = "ADD"
        _link(ng, add_spline.outputs["Value"], add_seed.inputs[0])
        _link(ng, group_in.outputs["Seed"], add_seed.inputs[1])

        add_slot = _new_node(ng, "ShaderNodeMath", (lx + 1000, ly))
        add_slot.operation = "ADD"
        _link(ng, add_seed.outputs["Value"], add_slot.inputs[0])
        add_slot.inputs[1].default_value = float(slot) * 1300003.0

        # Wrap into [0, 2_000_000_000) so the FloatToInt below stays
        # inside INT32 range, then floor to integer.
        abs_n = _new_node(ng, "ShaderNodeMath", (lx + 1200, ly))
        abs_n.operation = "ABSOLUTE"
        _link(ng, add_slot.outputs["Value"], abs_n.inputs[0])

        mod_n = _new_node(ng, "ShaderNodeMath", (lx + 1400, ly))
        mod_n.operation = "MODULO"
        _link(ng, abs_n.outputs["Value"], mod_n.inputs[0])
        mod_n.inputs[1].default_value = 2_000_000_000.0

        to_int = _new_node(ng, "FunctionNodeFloatToInt", (lx + 1600, ly))
        to_int.rounding_mode = "FLOOR"
        _link(ng, mod_n.outputs["Value"], to_int.inputs[0])
        return to_int.outputs[0]

    # ==================================================================
    # Path A — First as PTP = False. Each spline becomes its own
    # Cartesian Motion Group, all LIN. The reader segments on
    # prc_motion_group transitions, and the per-spline hash above gives
    # a unique INT per spline within this Curve Helper instance.
    # ==================================================================
    mg_id_a = _per_spline_mg_id(slot=0, location=(1300, 600))

    a = points_socket
    a = _store_const(ng, a, "prc_motion",        "INT", 2, (700, 800))
    a = _store_const(ng, a, "prc_group_type",    "INT", 0, (900, 800))
    a = _store_const(ng, a, "prc_tool_id",       "INT", 0, (1100, 800))
    a = _store_field(ng, a, "prc_orient",        "QUATERNION", rot_socket, (1300, 800))
    a = _store_field(ng, a, "prc_speed",         "FLOAT",      speed_socket, (1500, 800))
    if mg_id_a is not None:
        a = _store_field(ng, a, "prc_motion_group", "INT", mg_id_a, (1900, 800))

    a_to_mesh = _new_node(ng, "GeometryNodePointsToVertices", (2300, 800))
    _link(ng, a, a_to_mesh.inputs[0])
    path_a = a_to_mesh.outputs["Mesh"]

    # ==================================================================
    # Path B — First as PTP = True. Split the per-spline points into two
    # disjoint clouds, stamp each with the right per-cloud attributes,
    # join them back, and sort by the captured original index so each
    # spline's PTP point precedes its CP points.
    #
    # PTP cloud  : keep is_first==1 points only. prc_motion_group hashed
    #              with slot=1 so the PTP and CP IDs of the same spline
    #              differ.
    # CP cloud   : keep is_first==0 points only. prc_motion_group hashed
    #              with slot=2.
    # sort_key   : orig_idx for both clouds — preserves the curve's
    #              original sample order so PTP_s0 lands before CP_s0
    #              points, etc.
    # ==================================================================

    mg_id_ptp = _per_spline_mg_id(slot=1, location=(1300, -100))
    mg_id_cp  = _per_spline_mg_id(slot=2, location=(1300, -550))

    # ---- PTP cloud (delete points where is_first == 0) ----
    del_to_ptp = _new_node(ng, "GeometryNodeDeleteGeometry", (500, -200))
    del_to_ptp.domain = "POINT"
    del_to_ptp.mode = "ALL"
    _link(ng, points_socket, del_to_ptp.inputs["Geometry"])
    _link(ng, not_is_first_n.outputs["Value"], del_to_ptp.inputs["Selection"])
    ptp_geo = del_to_ptp.outputs["Geometry"]

    p = ptp_geo
    p = _store_const(ng, p, "prc_motion",        "INT", 1, (1100, -200))
    p = _store_const(ng, p, "prc_group_type",    "INT", 1, (1300, -200))
    p = _store_const(ng, p, "prc_tool_id",       "INT", 0, (1500, -200))
    p = _store_const(ng, p, "prc_speed",         "FLOAT", float("nan"), (1900, -200))
    p = _store_field(ng, p, "prc_orient",        "QUATERNION", rot_socket,    (2100, -200))
    p = _store_field(ng, p, "prc_posture",       "INT",        posture_socket, (2300, -200))
    if mg_id_ptp is not None:
        p = _store_field(ng, p, "prc_motion_group", "INT", mg_id_ptp, (2500, -200))
    if orig_idx_captured is not None:
        # Float sort key — orig_idx_captured is INT, implicit conversion is fine.
        p = _store_field(ng, p, "prc_sort_key",  "FLOAT",      orig_idx_captured, (2700, -200))

    # ---- CP cloud (delete points where is_first == 1) ----
    del_to_cp = _new_node(ng, "GeometryNodeDeleteGeometry", (500, -700))
    del_to_cp.domain = "POINT"
    del_to_cp.mode = "ALL"
    _link(ng, points_socket, del_to_cp.inputs["Geometry"])
    _link(ng, is_first_of_spline, del_to_cp.inputs["Selection"])
    cp_geo = del_to_cp.outputs["Geometry"]

    c = cp_geo
    c = _store_const(ng, c, "prc_motion",        "INT", 2, (1100, -700))
    c = _store_const(ng, c, "prc_group_type",    "INT", 0, (1300, -700))
    c = _store_const(ng, c, "prc_tool_id",       "INT", 0, (1500, -700))
    c = _store_field(ng, c, "prc_orient",        "QUATERNION", rot_socket,   (1700, -700))
    c = _store_field(ng, c, "prc_speed",         "FLOAT",      speed_socket, (1900, -700))
    if mg_id_cp is not None:
        c = _store_field(ng, c, "prc_motion_group", "INT", mg_id_cp, (2300, -700))
    if orig_idx_captured is not None:
        c = _store_field(ng, c, "prc_sort_key",  "FLOAT",      orig_idx_captured, (2500, -700))

    # ---- Join PTP + CP, sort by orig_idx ----
    join_b = _new_node(ng, "GeometryNodeJoinGeometry", (2900, -450))
    _multi_link(ng, [p, c], join_b.inputs[0])
    joined_b = join_b.outputs["Geometry"]

    sort_key_read = _new_node(ng, "GeometryNodeInputNamedAttribute", (2900, -300))
    sort_key_read.data_type = "FLOAT"
    sort_key_read.inputs["Name"].default_value = "prc_sort_key"

    sort_b = _new_node(ng, "GeometryNodeSortElements", (3100, -450))
    sort_b.domain = "POINT"
    _link(ng, joined_b, sort_b.inputs["Geometry"])
    _link(ng, sort_key_read.outputs["Attribute"], sort_b.inputs["Sort Weight"])
    sorted_b = sort_b.outputs["Geometry"]

    b_to_mesh = _new_node(ng, "GeometryNodePointsToVertices", (3300, -450))
    _link(ng, sorted_b, b_to_mesh.inputs[0])
    path_b = b_to_mesh.outputs["Mesh"]

    # ------------------------------------------------------------------
    # Switch between the two paths based on "First as PTP".
    # ------------------------------------------------------------------
    switch = _new_node(ng, "GeometryNodeSwitch", (3300, 100))
    switch.input_type = "GEOMETRY"
    _link(ng, group_in.outputs["First as PTP"], switch.inputs["Switch"])
    _link(ng, path_a, switch.inputs["False"])
    _link(ng, path_b, switch.inputs["True"])

    _link(ng, switch.outputs["Output"], group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Action group — wraps action waypoints (e.g. Insert Code) with the right
# group_type so the reader emits a TaskPayload(action_task=...).
# ---------------------------------------------------------------------------

def _build_action_group(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketGeometry", "Geometry")
    _add_socket(ng, "INPUT", "NodeSocketInt", "Seed")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Seed":
            try:
                item.default_value = 0
            except Exception:  # noqa: BLE001
                pass

    group_in = _new_node(ng, "NodeGroupInput", (-800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1000, 0))

    geo = group_in.outputs["Geometry"]
    x = 0

    type_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    type_store.data_type = "INT"
    type_store.domain = "POINT"
    type_store.inputs["Name"].default_value = "prc_group_type"
    _set_store_value(type_store, "INT", 2)
    _link(ng, geo, type_store.inputs["Geometry"])
    geo = type_store.outputs["Geometry"]
    x += 200

    mg_id = _build_motion_group_id(
        ng, geo, group_in.outputs["Seed"], 2, location=(x - 200, -350),
    )
    mg_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (x, 0))
    mg_store.data_type = "INT"
    mg_store.domain = "POINT"
    mg_store.inputs["Name"].default_value = "prc_motion_group"
    _link(ng, geo, mg_store.inputs["Geometry"])
    sv_in = _typed_socket(mg_store.inputs, "INT")
    if sv_in is not None:
        _link(ng, mg_id, sv_in)
    else:
        _link(ng, mg_id, mg_store.inputs["Value"])
    geo = mg_store.outputs["Geometry"]

    _link(ng, geo, group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Mesh Path Helper (4) — vertex order of a mesh becomes the path order.
# ---------------------------------------------------------------------------

def _build_mesh_path_helper(ng: bpy.types.NodeTree) -> None:
    """Vertex order of the source mesh becomes path order. Orientation is
    either constant (taken from an Orientation Object) or per-vertex (taken
    from the source mesh's vertex normal)."""

    _add_socket(ng, "INPUT", "NodeSocketObject", "Mesh")
    _add_socket(ng, "INPUT", "NodeSocketObject", "Orientation")
    _add_socket(ng, "INPUT", "NodeSocketBool",   "Use Normal")
    _add_socket(ng, "INPUT", "NodeSocketBool",   "Flip Normal")
    _add_socket(ng, "INPUT", "NodeSocketFloat",  "Speed")
    _add_socket(ng, "INPUT", "NodeSocketBool",   "PTP")
    _add_socket(ng, "INPUT", "NodeSocketInt",    "Tool ID")
    _add_socket(ng, "INPUT", "NodeSocketInt",    "Posture")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Speed":
            try: item.default_value = 0.05
            except Exception: pass
        elif item.name in ("PTP", "Use Normal", "Flip Normal"):
            try: item.default_value = False
            except Exception: pass
        elif item.name == "Posture":
            try: item.default_value = 10
            except Exception: pass

    group_in  = _new_node(ng, "NodeGroupInput",  (-2000, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (2000, 0))

    # Source mesh — keep as a mesh; store attributes directly on POINT
    # (vertex) domain so the per-vertex Normal field is available. RELATIVE
    # space puts the vertices in the carrier object's space (= world space
    # since the carrier is at world origin), so the path lands where the
    # user placed the source mesh in the scene rather than at the origin.
    obj_mesh = _new_node(ng, "GeometryNodeObjectInfo", (-1700, 250))
    obj_mesh.transform_space = "RELATIVE"
    _link(ng, group_in.outputs["Mesh"], obj_mesh.inputs["Object"])
    mesh_geo = obj_mesh.outputs["Geometry"]

    # Constant rotation taken from an optional Orientation object.
    obj_orient = _new_node(ng, "GeometryNodeObjectInfo", (-1700, -250))
    obj_orient.transform_space = "RELATIVE"
    _link(ng, group_in.outputs["Orientation"], obj_orient.inputs["Object"])
    rot_from_obj = obj_orient.outputs["Rotation"]

    # Per-vertex rotation: align identity's local +Z to the (optionally
    # flipped) vertex normal. Rotation around the normal is left arbitrary
    # — chain a "PRC Orient to Point" downstream if you need controlled X.
    normal_field = _new_node(ng, "GeometryNodeInputNormal", (-1700, -550))

    neg_normal = _new_node(ng, "ShaderNodeVectorMath", (-1500, -650))
    neg_normal.operation = "SCALE"
    _link(ng, normal_field.outputs["Normal"], neg_normal.inputs[0])
    neg_normal.inputs["Scale"].default_value = -1.0

    sw_flip = _new_node(ng, "GeometryNodeSwitch", (-1300, -550))
    sw_flip.input_type = "VECTOR"
    _link(ng, group_in.outputs["Flip Normal"], sw_flip.inputs["Switch"])
    _link(ng, normal_field.outputs["Normal"], sw_flip.inputs["False"])
    _link(ng, neg_normal.outputs[0], sw_flip.inputs["True"])
    effective_normal = sw_flip.outputs["Output"]

    align = _new_node(ng, "FunctionNodeAlignRotationToVector", (-1050, -550))
    align.axis = "Z"
    align.pivot_axis = "AUTO"
    # Rotation input left at default (identity). Factor=1.0 by default.
    _link(ng, effective_normal, align.inputs["Vector"])
    rot_from_normal = align.outputs[0]

    # Pick which rotation to use per-vertex.
    sw_rot = _new_node(ng, "GeometryNodeSwitch", (-800, -350))
    sw_rot.input_type = "ROTATION"
    _link(ng, group_in.outputs["Use Normal"], sw_rot.inputs["Switch"])
    _link(ng, rot_from_obj, sw_rot.inputs["False"])
    _link(ng, rot_from_normal, sw_rot.inputs["True"])
    rot_socket = sw_rot.outputs["Output"]

    speed_socket   = group_in.outputs["Speed"]
    posture_socket = group_in.outputs["Posture"]
    ptp_socket     = group_in.outputs["PTP"]

    cart_mg_ng = bpy.data.node_groups.get(NG_CP_GROUP)
    ptp_mg_ng  = bpy.data.node_groups.get(NG_PTP_GROUP)

    # ---- LIN path: store attributes directly on the mesh's POINT domain ----
    a = mesh_geo
    a = _store_const(ng, a, "prc_motion", "INT",        2,            (-500,  300))
    a = _store_field(ng, a, "prc_orient", "QUATERNION", rot_socket,   (-300,  300))
    a = _store_field(ng, a, "prc_speed",  "FLOAT",      speed_socket, (-100,  300))

    if cart_mg_ng is not None:
        cart_a = _new_node(ng, "GeometryNodeGroup", (200, 300))
        cart_a.node_tree = cart_mg_ng
        _link(ng, a, cart_a.inputs["Geometry"])
        _link(ng, group_in.outputs["Tool ID"], cart_a.inputs["Tool ID"])
        path_lin = cart_a.outputs["Geometry"]
    else:
        path_lin = a

    # ---- PTP path ----
    b = mesh_geo
    b = _store_const(ng, b, "prc_motion",  "INT",        1,                  (-500, -100))
    b = _store_field(ng, b, "prc_orient",  "QUATERNION", rot_socket,         (-300, -100))
    # PTP speed is NaN — Speed input only applies to LIN waypoints; PTP
    # uses the last / server-configured speed (KUKA expects a percentage,
    # not m/s).
    b = _store_const(ng, b, "prc_speed",   "FLOAT",      float("nan"),       (-100, -100))
    b = _store_field(ng, b, "prc_posture", "INT",        posture_socket,     ( 100, -100))

    if ptp_mg_ng is not None:
        ptp_b = _new_node(ng, "GeometryNodeGroup", (400, -100))
        ptp_b.node_tree = ptp_mg_ng
        _link(ng, b, ptp_b.inputs["Geometry"])
        _link(ng, group_in.outputs["Tool ID"], ptp_b.inputs["Tool ID"])
        path_ptp = ptp_b.outputs["Geometry"]
    else:
        path_ptp = b

    switch = _new_node(ng, "GeometryNodeSwitch", (1500, 0))
    switch.input_type = "GEOMETRY"
    _link(ng, ptp_socket, switch.inputs["Switch"])
    _link(ng, path_lin, switch.inputs["False"])
    _link(ng, path_ptp, switch.inputs["True"])

    _link(ng, switch.outputs["Output"], group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Animation / Grease Pencil helpers — thin wrappers around Object Info that
# read a baked PRC path mesh (built by the prc.bake_* operators). The bake
# stamps prc_motion / prc_orient / prc_speed / prc_motion_group /
# prc_group_type / prc_tool_id, so this helper is just a discoverable entry
# in the Add menu — no extra processing.
# ---------------------------------------------------------------------------

def _build_object_passthrough_helper(ng: bpy.types.NodeTree, source_label: str) -> None:
    _add_socket(ng, "INPUT", "NodeSocketObject", source_label)
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    group_in  = _new_node(ng, "NodeGroupInput",  (-400, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (400, 0))

    obj_info = _new_node(ng, "GeometryNodeObjectInfo", (0, 0))
    # RELATIVE so the user can position/rotate the baked path object in
    # the scene and have the path follow it; ORIGINAL would always place
    # the path at the bake-time world position regardless of the object's
    # transform.
    obj_info.transform_space = "RELATIVE"
    _link(ng, group_in.outputs[source_label], obj_info.inputs["Object"])
    _link(ng, obj_info.outputs["Geometry"], group_out.inputs["Geometry"])


def _build_animation_helper(ng: bpy.types.NodeTree) -> None:
    _build_object_passthrough_helper(ng, "Source")


def _build_grease_pencil_helper(ng: bpy.types.NodeTree) -> None:
    _build_object_passthrough_helper(ng, "Source")


# ---------------------------------------------------------------------------
# Approach / Retract — duplicates the first and last point of every
# Cartesian motion group with a +Z offset, leaving PTP and Action groups
# untouched. The duplicated approach/retract waypoints inherit the source
# point's prc_motion_group, so they stay inside the same motion group; only
# the Position attribute is overridden.
#
# Group boundaries are detected via prc_motion_group transitions on the
# input cloud. The pipeline:
#   1. Capture prc_motion_group and orig_idx on the full input.
#   2. Detect is_first_of_group / is_last_of_group via Sample Index of
#      prev / next prc_motion_group, plus the "absolute end" check.
#   3. Mask each detection with is_cp = (prc_group_type == 0).
#   4. Build approach + retract clouds, offset their Position along
#      world +Z, sort_key = orig_idx ± 0.5.
#   5. Original cloud sort_key = orig_idx.
#   6. Join all three, sort by sort_key.
#
# The sort interleaves approach/original/retract correctly within each
# motion group (sort keys K-0.5, K, K+1, …, K+N-1, K+N-1+0.5 are unique
# per group). Cross-group ties at boundaries (retract of group A vs.
# approach of group B) are harmless — the Python reader buckets points by
# prc_motion_group ID rather than relying on contiguous transitions.
#
# World +Z (rather than tool-Z) is used for the offset so orientation
# changes inside a single motion group don't tilt the approach direction.
# ---------------------------------------------------------------------------

def _build_approach_retract(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketGeometry", "Geometry")
    _add_socket(ng, "INPUT", "NodeSocketFloat",    "Offset Start")
    _add_socket(ng, "INPUT", "NodeSocketFloat",    "Offset End")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name in ("Offset Start", "Offset End"):
            try: item.default_value = 0.05
            except Exception: pass

    group_in  = _new_node(ng, "NodeGroupInput",  (-3000, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (3200, 0))

    geo_in = group_in.outputs["Geometry"]

    # ------------------------------------------------------------------
    # 1. Capture orig_idx on the full input so the surviving points in
    #    each branch retain a stable per-input ordering for the final sort.
    # ------------------------------------------------------------------
    idx_field = _new_node(ng, "GeometryNodeInputIndex", (-2700, -150))

    capture_idx = _new_node(ng, "GeometryNodeCaptureAttribute", (-2500, 0))
    _capture_attribute_set_data_type(capture_idx, "INT", name="Original Index")
    capture_idx.domain = "POINT"
    _link(ng, geo_in, capture_idx.inputs["Geometry"])
    cap_in = _typed_socket(capture_idx.inputs, "INT")
    _link(ng, idx_field.outputs["Index"], cap_in)
    geo_with_idx = capture_idx.outputs["Geometry"]
    orig_idx_field = _typed_socket(capture_idx.outputs, "INT")

    # ------------------------------------------------------------------
    # 2. Read prc_motion_group / prc_group_type and detect first/last
    #    points of each motion group via prev/next sample index.
    # ------------------------------------------------------------------
    mg_attr = _new_node(ng, "GeometryNodeInputNamedAttribute", (-2300, -200))
    mg_attr.data_type = "INT"
    mg_attr.inputs["Name"].default_value = "prc_motion_group"
    mg_field = mg_attr.outputs["Attribute"]

    gt_attr = _new_node(ng, "GeometryNodeInputNamedAttribute", (-2300, -350))
    gt_attr.data_type = "INT"
    gt_attr.inputs["Name"].default_value = "prc_group_type"
    gt_field = gt_attr.outputs["Attribute"]

    # Domain size (for is_at_end)
    dom = _new_node(ng, "GeometryNodeAttributeDomainSize", (-2300, 200))
    dom.component = "MESH"
    _link(ng, geo_with_idx, dom.inputs["Geometry"])
    count_socket = dom.outputs["Point Count"]

    count_minus_1 = _new_node(ng, "ShaderNodeMath", (-2050, 200))
    count_minus_1.operation = "SUBTRACT"
    _link(ng, count_socket, count_minus_1.inputs[0])
    count_minus_1.inputs[1].default_value = 1.0

    # idx-1 / idx+1 for prev / next sampling
    idx_minus_1 = _new_node(ng, "ShaderNodeMath", (-2050, -50))
    idx_minus_1.operation = "SUBTRACT"
    _link(ng, idx_field.outputs["Index"], idx_minus_1.inputs[0])
    idx_minus_1.inputs[1].default_value = 1.0
    idx_minus_1_int = _new_node(ng, "FunctionNodeFloatToInt", (-1850, -50))
    idx_minus_1_int.rounding_mode = "FLOOR"
    _link(ng, idx_minus_1.outputs["Value"], idx_minus_1_int.inputs[0])

    idx_plus_1 = _new_node(ng, "ShaderNodeMath", (-2050, -150))
    idx_plus_1.operation = "ADD"
    _link(ng, idx_field.outputs["Index"], idx_plus_1.inputs[0])
    idx_plus_1.inputs[1].default_value = 1.0
    idx_plus_1_int = _new_node(ng, "FunctionNodeFloatToInt", (-1850, -150))
    idx_plus_1_int.rounding_mode = "FLOOR"
    _link(ng, idx_plus_1.outputs["Value"], idx_plus_1_int.inputs[0])

    # Sample prev mg
    samp_prev = _new_node(ng, "GeometryNodeSampleIndex", (-1600, -50))
    samp_prev.data_type = "INT"
    samp_prev.domain = "POINT"
    _link(ng, geo_with_idx, samp_prev.inputs["Geometry"])
    sp_val_in = _typed_socket(samp_prev.inputs, "INT")
    _link(ng, mg_field, sp_val_in)
    _link(ng, idx_minus_1_int.outputs[0], samp_prev.inputs["Index"])
    prev_mg = _typed_socket(samp_prev.outputs, "INT")

    # Sample next mg
    samp_next = _new_node(ng, "GeometryNodeSampleIndex", (-1600, -150))
    samp_next.data_type = "INT"
    samp_next.domain = "POINT"
    _link(ng, geo_with_idx, samp_next.inputs["Geometry"])
    sn_val_in = _typed_socket(samp_next.inputs, "INT")
    _link(ng, mg_field, sn_val_in)
    _link(ng, idx_plus_1_int.outputs[0], samp_next.inputs["Index"])
    next_mg = _typed_socket(samp_next.outputs, "INT")

    # is_at_zero = (idx < 0.5)
    is_at_zero = _new_node(ng, "ShaderNodeMath", (-1600, 50))
    is_at_zero.operation = "LESS_THAN"
    _link(ng, idx_field.outputs["Index"], is_at_zero.inputs[0])
    is_at_zero.inputs[1].default_value = 0.5

    # is_at_end = |idx - (count-1)| < 0.5
    is_at_end = _new_node(ng, "ShaderNodeMath", (-1600, 200))
    is_at_end.operation = "COMPARE"
    _link(ng, idx_field.outputs["Index"], is_at_end.inputs[0])
    _link(ng, count_minus_1.outputs["Value"], is_at_end.inputs[1])
    is_at_end.inputs[2].default_value = 0.5

    # mg_changed_prev = |mg - prev_mg| > 0.5
    diff_prev = _new_node(ng, "ShaderNodeMath", (-1400, -50))
    diff_prev.operation = "SUBTRACT"
    _link(ng, mg_field, diff_prev.inputs[0])
    if prev_mg is not None:
        _link(ng, prev_mg, diff_prev.inputs[1])
    abs_prev = _new_node(ng, "ShaderNodeMath", (-1200, -50))
    abs_prev.operation = "ABSOLUTE"
    _link(ng, diff_prev.outputs["Value"], abs_prev.inputs[0])
    mg_changed_prev = _new_node(ng, "ShaderNodeMath", (-1000, -50))
    mg_changed_prev.operation = "GREATER_THAN"
    _link(ng, abs_prev.outputs["Value"], mg_changed_prev.inputs[0])
    mg_changed_prev.inputs[1].default_value = 0.5

    # mg_changed_next = |mg - next_mg| > 0.5
    diff_next = _new_node(ng, "ShaderNodeMath", (-1400, -200))
    diff_next.operation = "SUBTRACT"
    _link(ng, mg_field, diff_next.inputs[0])
    if next_mg is not None:
        _link(ng, next_mg, diff_next.inputs[1])
    abs_next = _new_node(ng, "ShaderNodeMath", (-1200, -200))
    abs_next.operation = "ABSOLUTE"
    _link(ng, diff_next.outputs["Value"], abs_next.inputs[0])
    mg_changed_next = _new_node(ng, "ShaderNodeMath", (-1000, -200))
    mg_changed_next.operation = "GREATER_THAN"
    _link(ng, abs_next.outputs["Value"], mg_changed_next.inputs[0])
    mg_changed_next.inputs[1].default_value = 0.5

    # is_first_of_group = is_at_zero OR mg_changed_prev
    is_first = _new_node(ng, "ShaderNodeMath", (-800, 0))
    is_first.operation = "MAXIMUM"
    _link(ng, is_at_zero.outputs["Value"], is_first.inputs[0])
    _link(ng, mg_changed_prev.outputs["Value"], is_first.inputs[1])

    # is_last_of_group = is_at_end OR mg_changed_next
    is_last = _new_node(ng, "ShaderNodeMath", (-800, -200))
    is_last.operation = "MAXIMUM"
    _link(ng, is_at_end.outputs["Value"], is_last.inputs[0])
    _link(ng, mg_changed_next.outputs["Value"], is_last.inputs[1])

    # is_cp = (group_type < 0.5)
    is_cp = _new_node(ng, "ShaderNodeMath", (-800, 200))
    is_cp.operation = "LESS_THAN"
    _link(ng, gt_field, is_cp.inputs[0])
    is_cp.inputs[1].default_value = 0.5

    # is_first_of_cp = is_first AND is_cp  (multiplication for 0/1 fields)
    is_first_of_cp = _new_node(ng, "ShaderNodeMath", (-600, 100))
    is_first_of_cp.operation = "MULTIPLY"
    _link(ng, is_first.outputs["Value"], is_first_of_cp.inputs[0])
    _link(ng, is_cp.outputs["Value"], is_first_of_cp.inputs[1])

    # is_last_of_cp = is_last AND is_cp
    is_last_of_cp = _new_node(ng, "ShaderNodeMath", (-600, -100))
    is_last_of_cp.operation = "MULTIPLY"
    _link(ng, is_last.outputs["Value"], is_last_of_cp.inputs[0])
    _link(ng, is_cp.outputs["Value"], is_last_of_cp.inputs[1])

    # Inverted selections for Delete Geometry (we keep firsts/lasts, so
    # delete everything that ISN'T).
    not_is_first_of_cp = _new_node(ng, "ShaderNodeMath", (-400, 100))
    not_is_first_of_cp.operation = "SUBTRACT"
    not_is_first_of_cp.inputs[0].default_value = 1.0
    _link(ng, is_first_of_cp.outputs["Value"], not_is_first_of_cp.inputs[1])

    not_is_last_of_cp = _new_node(ng, "ShaderNodeMath", (-400, -100))
    not_is_last_of_cp.operation = "SUBTRACT"
    not_is_last_of_cp.inputs[0].default_value = 1.0
    _link(ng, is_last_of_cp.outputs["Value"], not_is_last_of_cp.inputs[1])

    # ------------------------------------------------------------------
    # 3. Approach cloud: keep first-of-CP-group vertices, offset along
    #    world +Z, sort_key = orig_idx - 0.5.
    # ------------------------------------------------------------------
    del_to_first = _new_node(ng, "GeometryNodeDeleteGeometry", (-100, 600))
    del_to_first.domain = "POINT"
    del_to_first.mode = "ALL"
    _link(ng, geo_with_idx, del_to_first.inputs["Geometry"])
    _link(ng, not_is_first_of_cp.outputs["Value"], del_to_first.inputs["Selection"])
    approach_geo = del_to_first.outputs["Geometry"]

    # World-Z offset vector = (0, 0, Offset Start).
    z_a = _new_node(ng, "ShaderNodeCombineXYZ", (-100, 800))
    z_a.inputs["X"].default_value = 0.0
    z_a.inputs["Y"].default_value = 0.0
    _link(ng, group_in.outputs["Offset Start"], z_a.inputs["Z"])

    pos_a = _new_node(ng, "GeometryNodeInputPosition", (-100, 700))

    new_pos_a = _new_node(ng, "ShaderNodeVectorMath", (200, 800))
    new_pos_a.operation = "ADD"
    _link(ng, pos_a.outputs["Position"], new_pos_a.inputs[0])
    _link(ng, z_a.outputs["Vector"], new_pos_a.inputs[1])

    set_pos_a = _new_node(ng, "GeometryNodeSetPosition", (400, 600))
    _link(ng, approach_geo, set_pos_a.inputs["Geometry"])
    _link(ng, new_pos_a.outputs[0], set_pos_a.inputs["Position"])
    approach_geo = set_pos_a.outputs["Geometry"]

    # sort_key = orig_idx - 0.5  (approach lands just before its anchor)
    sort_key_a = _new_node(ng, "ShaderNodeMath", (700, 800))
    sort_key_a.operation = "ADD"
    _link(ng, orig_idx_field, sort_key_a.inputs[0])
    sort_key_a.inputs[1].default_value = -0.5
    sk_store_a = _new_node(ng, "GeometryNodeStoreNamedAttribute", (900, 600))
    sk_store_a.data_type = "FLOAT"
    sk_store_a.domain = "POINT"
    sk_store_a.inputs["Name"].default_value = "prc_sort_key"
    _link(ng, approach_geo, sk_store_a.inputs["Geometry"])
    sk_a_val = _typed_socket(sk_store_a.inputs, "VALUE")
    _link(ng, sort_key_a.outputs["Value"], sk_a_val)
    approach_geo = sk_store_a.outputs["Geometry"]

    # ------------------------------------------------------------------
    # 4. Retract cloud: keep last-of-CP-group vertices.
    # ------------------------------------------------------------------
    del_to_last = _new_node(ng, "GeometryNodeDeleteGeometry", (-100, -600))
    del_to_last.domain = "POINT"
    del_to_last.mode = "ALL"
    _link(ng, geo_with_idx, del_to_last.inputs["Geometry"])
    _link(ng, not_is_last_of_cp.outputs["Value"], del_to_last.inputs["Selection"])
    retract_geo = del_to_last.outputs["Geometry"]

    z_r = _new_node(ng, "ShaderNodeCombineXYZ", (-100, -450))
    z_r.inputs["X"].default_value = 0.0
    z_r.inputs["Y"].default_value = 0.0
    _link(ng, group_in.outputs["Offset End"], z_r.inputs["Z"])

    pos_r = _new_node(ng, "GeometryNodeInputPosition", (-100, -550))

    new_pos_r = _new_node(ng, "ShaderNodeVectorMath", (200, -450))
    new_pos_r.operation = "ADD"
    _link(ng, pos_r.outputs["Position"], new_pos_r.inputs[0])
    _link(ng, z_r.outputs["Vector"], new_pos_r.inputs[1])

    set_pos_r = _new_node(ng, "GeometryNodeSetPosition", (400, -600))
    _link(ng, retract_geo, set_pos_r.inputs["Geometry"])
    _link(ng, new_pos_r.outputs[0], set_pos_r.inputs["Position"])
    retract_geo = set_pos_r.outputs["Geometry"]

    sort_key_r = _new_node(ng, "ShaderNodeMath", (700, -450))
    sort_key_r.operation = "ADD"
    _link(ng, orig_idx_field, sort_key_r.inputs[0])
    sort_key_r.inputs[1].default_value = 0.5
    sk_store_r = _new_node(ng, "GeometryNodeStoreNamedAttribute", (900, -600))
    sk_store_r.data_type = "FLOAT"
    sk_store_r.domain = "POINT"
    sk_store_r.inputs["Name"].default_value = "prc_sort_key"
    _link(ng, retract_geo, sk_store_r.inputs["Geometry"])
    sk_r_val = _typed_socket(sk_store_r.inputs, "VALUE")
    _link(ng, sort_key_r.outputs["Value"], sk_r_val)
    retract_geo = sk_store_r.outputs["Geometry"]

    # ------------------------------------------------------------------
    # 5. Original cloud passes through with sort_key = orig_idx.
    # ------------------------------------------------------------------
    sort_key_o = _new_node(ng, "ShaderNodeMath", (700, 0))
    sort_key_o.operation = "ADD"
    _link(ng, orig_idx_field, sort_key_o.inputs[0])
    sort_key_o.inputs[1].default_value = 0.0
    sk_store_o = _new_node(ng, "GeometryNodeStoreNamedAttribute", (900, 0))
    sk_store_o.data_type = "FLOAT"
    sk_store_o.domain = "POINT"
    sk_store_o.inputs["Name"].default_value = "prc_sort_key"
    _link(ng, geo_with_idx, sk_store_o.inputs["Geometry"])
    sk_o_val = _typed_socket(sk_store_o.inputs, "VALUE")
    _link(ng, sort_key_o.outputs["Value"], sk_o_val)
    original_geo = sk_store_o.outputs["Geometry"]

    # ------------------------------------------------------------------
    # 6. Switch each side off when its offset is ≈ 0 (avoid duplicate
    #    waypoints at the original anchor positions).
    # ------------------------------------------------------------------
    abs_a = _new_node(ng, "ShaderNodeMath", (1200, 800))
    abs_a.operation = "ABSOLUTE"
    _link(ng, group_in.outputs["Offset Start"], abs_a.inputs[0])
    nz_a = _new_node(ng, "ShaderNodeMath", (1400, 800))
    nz_a.operation = "GREATER_THAN"
    _link(ng, abs_a.outputs["Value"], nz_a.inputs[0])
    nz_a.inputs[1].default_value = 1e-9

    abs_r = _new_node(ng, "ShaderNodeMath", (1200, -800))
    abs_r.operation = "ABSOLUTE"
    _link(ng, group_in.outputs["Offset End"], abs_r.inputs[0])
    nz_r = _new_node(ng, "ShaderNodeMath", (1400, -800))
    nz_r.operation = "GREATER_THAN"
    _link(ng, abs_r.outputs["Value"], nz_r.inputs[0])
    nz_r.inputs[1].default_value = 1e-9

    empty_a = _new_node(ng, "GeometryNodePoints", (1400, 1000))
    empty_a.inputs["Count"].default_value = 0
    empty_r = _new_node(ng, "GeometryNodePoints", (1400, -1000))
    empty_r.inputs["Count"].default_value = 0

    sw_a = _new_node(ng, "GeometryNodeSwitch", (1700, 600))
    sw_a.input_type = "GEOMETRY"
    _link(ng, nz_a.outputs["Value"], sw_a.inputs["Switch"])
    _link(ng, empty_a.outputs["Points"], sw_a.inputs["False"])
    _link(ng, approach_geo, sw_a.inputs["True"])

    sw_r = _new_node(ng, "GeometryNodeSwitch", (1700, -600))
    sw_r.input_type = "GEOMETRY"
    _link(ng, nz_r.outputs["Value"], sw_r.inputs["Switch"])
    _link(ng, empty_r.outputs["Points"], sw_r.inputs["False"])
    _link(ng, retract_geo, sw_r.inputs["True"])

    # ------------------------------------------------------------------
    # 7. Join the three clouds and sort by prc_sort_key. Approach (n-0.5)
    #    lands before original (n) which lands before retract (n+0.5);
    #    the integer parts preserve the cross-group ordering.
    # ------------------------------------------------------------------
    join = _new_node(ng, "GeometryNodeJoinGeometry", (2100, 0))
    _multi_link(ng, [
        sw_a.outputs["Output"],
        original_geo,
        sw_r.outputs["Output"],
    ], join.inputs[0])
    joined_geo = join.outputs["Geometry"]

    sort_key_read = _new_node(ng, "GeometryNodeInputNamedAttribute", (2300, 250))
    sort_key_read.data_type = "FLOAT"
    sort_key_read.inputs["Name"].default_value = "prc_sort_key"

    sort_node = _new_node(ng, "GeometryNodeSortElements", (2600, 0))
    sort_node.domain = "POINT"
    _link(ng, joined_geo, sort_node.inputs["Geometry"])
    _link(ng, sort_key_read.outputs["Attribute"], sort_node.inputs["Sort Weight"])
    final_geo = sort_node.outputs["Geometry"]

    _link(ng, final_geo, group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Orient to Point (8) — rotate prc_orient around its local +Z so that local
# +X (or -X) faces a target object's location, projected onto the plane
# perpendicular to +Z. Mirrors PRC.GH's OrientPlane utility.
# ---------------------------------------------------------------------------

def _build_orient_to_point(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketGeometry", "Geometry")
    _add_socket(ng, "INPUT", "NodeSocketObject",   "Target")
    _add_socket(ng, "INPUT", "NodeSocketBool",     "Face Away")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Face Away":
            try: item.default_value = False
            except Exception: pass

    group_in  = _new_node(ng, "NodeGroupInput",  (-2400, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (2400, 0))

    obj_target = _new_node(ng, "GeometryNodeObjectInfo", (-2100, 300))
    obj_target.transform_space = "RELATIVE"
    _link(ng, group_in.outputs["Target"], obj_target.inputs["Object"])

    pos_field = _new_node(ng, "GeometryNodeInputPosition", (-2100, 0))

    orient_field = _new_node(ng, "GeometryNodeInputNamedAttribute", (-2100, -150))
    orient_field.data_type = "QUATERNION"
    orient_field.inputs["Name"].default_value = "prc_orient"

    rot_z = _new_node(ng, "FunctionNodeRotateVector", (-1800, -150))
    rot_z.inputs[0].default_value = (0.0, 0.0, 1.0)
    _link(ng, orient_field.outputs["Attribute"], rot_z.inputs[1])

    rot_x = _new_node(ng, "FunctionNodeRotateVector", (-1800, -300))
    rot_x.inputs[0].default_value = (1.0, 0.0, 0.0)
    _link(ng, orient_field.outputs["Attribute"], rot_x.inputs[1])

    sub_dir = _new_node(ng, "ShaderNodeVectorMath", (-1500, 100))
    sub_dir.operation = "SUBTRACT"
    _link(ng, obj_target.outputs["Location"], sub_dir.inputs[0])
    _link(ng, pos_field.outputs["Position"], sub_dir.inputs[1])

    dot_dz = _new_node(ng, "ShaderNodeVectorMath", (-1250, 0))
    dot_dz.operation = "DOT_PRODUCT"
    _link(ng, sub_dir.outputs[0], dot_dz.inputs[0])
    _link(ng, rot_z.outputs[0], dot_dz.inputs[1])

    scale_z = _new_node(ng, "ShaderNodeVectorMath", (-1000, -100))
    scale_z.operation = "SCALE"
    _link(ng, rot_z.outputs[0], scale_z.inputs[0])
    _link(ng, dot_dz.outputs["Value"], scale_z.inputs["Scale"])

    proj = _new_node(ng, "ShaderNodeVectorMath", (-750, 0))
    proj.operation = "SUBTRACT"
    _link(ng, sub_dir.outputs[0], proj.inputs[0])
    _link(ng, scale_z.outputs[0], proj.inputs[1])

    proj_norm = _new_node(ng, "ShaderNodeVectorMath", (-500, 0))
    proj_norm.operation = "NORMALIZE"
    _link(ng, proj.outputs[0], proj_norm.inputs[0])

    # Optional sign flip for Face Away
    neg = _new_node(ng, "ShaderNodeVectorMath", (-250, 100))
    neg.operation = "SCALE"
    _link(ng, proj_norm.outputs[0], neg.inputs[0])
    neg.inputs["Scale"].default_value = -1.0

    sw_dir = _new_node(ng, "GeometryNodeSwitch", (0, 0))
    sw_dir.input_type = "VECTOR"
    _link(ng, group_in.outputs["Face Away"], sw_dir.inputs["Switch"])
    _link(ng, proj_norm.outputs[0], sw_dir.inputs["False"])
    _link(ng, neg.outputs[0], sw_dir.inputs["True"])

    target_x = sw_dir.outputs["Output"]

    # Signed angle between rot_x and target_x around rot_z
    cos_a = _new_node(ng, "ShaderNodeVectorMath", (250, -100))
    cos_a.operation = "DOT_PRODUCT"
    _link(ng, rot_x.outputs[0], cos_a.inputs[0])
    _link(ng, target_x, cos_a.inputs[1])

    cross_v = _new_node(ng, "ShaderNodeVectorMath", (250, -300))
    cross_v.operation = "CROSS_PRODUCT"
    _link(ng, rot_x.outputs[0], cross_v.inputs[0])
    _link(ng, target_x, cross_v.inputs[1])

    sin_a = _new_node(ng, "ShaderNodeVectorMath", (500, -300))
    sin_a.operation = "DOT_PRODUCT"
    _link(ng, cross_v.outputs[0], sin_a.inputs[0])
    _link(ng, rot_z.outputs[0], sin_a.inputs[1])

    angle = _new_node(ng, "ShaderNodeMath", (750, -200))
    angle.operation = "ARCTAN2"
    _link(ng, sin_a.outputs["Value"], angle.inputs[0])
    _link(ng, cos_a.outputs["Value"], angle.inputs[1])

    delta = _new_node(ng, "FunctionNodeAxisAngleToRotation", (1000, -200))
    _link(ng, rot_z.outputs[0], delta.inputs["Axis"])
    _link(ng, angle.outputs["Value"], delta.inputs["Angle"])

    new_orient = _new_node(ng, "FunctionNodeRotateRotation", (1300, -100))
    _link(ng, orient_field.outputs["Attribute"], new_orient.inputs[0])
    _link(ng, delta.outputs[0], new_orient.inputs[1])

    store_orient = _new_node(ng, "GeometryNodeStoreNamedAttribute", (1700, 0))
    store_orient.data_type = "QUATERNION"
    store_orient.domain = "POINT"
    store_orient.inputs["Name"].default_value = "prc_orient"
    _link(ng, group_in.outputs["Geometry"], store_orient.inputs["Geometry"])
    _link(ng, new_orient.outputs[0], store_orient.inputs["Value"])

    _link(ng, store_orient.outputs["Geometry"], group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Insert Code (9) — Blender 5.2+ only. Emits a single action waypoint that
# the reader translates into TaskPayload(action_task=Action(insert_code...)).
# ---------------------------------------------------------------------------

def _build_insert_code(ng: bpy.types.NodeTree) -> None:
    _add_socket(ng, "INPUT", "NodeSocketString", "Code")
    _add_socket(ng, "INPUT", "NodeSocketBool",   "Is Comment")
    _add_socket(ng, "OUTPUT", "NodeSocketGeometry", "Geometry")

    for item in ng.interface.items_tree:
        if item.name == "Is Comment":
            try: item.default_value = False
            except Exception: pass

    group_in  = _new_node(ng, "NodeGroupInput",  (-800, 0))
    group_out = _new_node(ng, "NodeGroupOutput", (1800, 0))

    points = _new_node(ng, "GeometryNodePoints", (-400, 0))
    points.inputs["Count"].default_value = 1

    geo = points.outputs["Points"]

    geo = _store_const(ng, geo, "prc_motion",        "INT", 3, (-100, 0))
    geo = _store_const(ng, geo, "prc_group_type",    "INT", 2, ( 100, 0))

    code_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (500, 0))
    code_store.data_type = "STRING"
    code_store.domain = "POINT"
    code_store.inputs["Name"].default_value = "prc_inline_code"
    _link(ng, geo, code_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Code"], code_store.inputs["Value"])
    geo = code_store.outputs["Geometry"]

    cmt_store = _new_node(ng, "GeometryNodeStoreNamedAttribute", (800, 0))
    cmt_store.data_type = "BOOLEAN"
    cmt_store.domain = "POINT"
    cmt_store.inputs["Name"].default_value = "prc_is_comment"
    _link(ng, geo, cmt_store.inputs["Geometry"])
    _link(ng, group_in.outputs["Is Comment"], cmt_store.inputs["Value"])
    geo = cmt_store.outputs["Geometry"]

    to_mesh = _new_node(ng, "GeometryNodePointsToVertices", (1200, 0))
    _link(ng, geo, to_mesh.inputs[0])
    _link(ng, to_mesh.outputs["Mesh"], group_out.inputs["Geometry"])


# ---------------------------------------------------------------------------
# Set-store-value helper (the Store Named Attribute node has multiple typed
# 'Value' sockets; we have to pick the right one based on data_type).
# ---------------------------------------------------------------------------

def _to_mesh(ng, geo, x: int):
    """Append a Points-to-Vertices node so the geometry leaving each motion
    command is a real Mesh (the carrier object is a Mesh; bare point clouds
    are dropped at evaluation time and the reader sees zero vertices)."""
    convert = _new_node(ng, "GeometryNodePointsToVertices", (x, 0))
    _link(ng, geo, convert.inputs[0])
    return convert.outputs[0]


def _store_const(ng, in_geo, name: str, data_type: str, value, location):
    """Store a constant-valued named attribute on POINT domain. Returns the
    output Geometry socket so callers can chain stores."""
    n = _new_node(ng, "GeometryNodeStoreNamedAttribute", location)
    n.data_type = data_type
    n.domain = "POINT"
    n.inputs["Name"].default_value = name
    _link(ng, in_geo, n.inputs["Geometry"])
    _set_store_value(n, data_type, value)
    return n.outputs["Geometry"]


def _store_field(ng, in_geo, name: str, data_type: str, value_socket, location):
    """Store a per-point named attribute driven by a value socket (a field)."""
    n = _new_node(ng, "GeometryNodeStoreNamedAttribute", location)
    n.data_type = data_type
    n.domain = "POINT"
    n.inputs["Name"].default_value = name
    _link(ng, in_geo, n.inputs["Geometry"])
    _link(ng, value_socket, n.inputs["Value"])
    return n.outputs["Geometry"]


def _object_plus_offset(ng, object_socket, position_socket, rotation_socket, location):
    """Compose an Object's world transform with a Position/Rotation offset.

    Returns (effective_position_output, effective_rotation_output) sockets.
    When the Object input is unset, Object Info emits (0,0,0) location and
    identity rotation, so the offsets become the full transform — which is
    what the previous (Object-less) PTP/LIN nodes did by default.
    """
    lx, ly = location

    obj_info = _new_node(ng, "GeometryNodeObjectInfo", (lx, ly))
    obj_info.transform_space = "RELATIVE"
    _link(ng, object_socket, obj_info.inputs["Object"])

    add_pos = _new_node(ng, "ShaderNodeVectorMath", (lx + 200, ly + 100))
    add_pos.operation = "ADD"
    _link(ng, obj_info.outputs["Location"], add_pos.inputs[0])
    _link(ng, position_socket, add_pos.inputs[1])

    rot_compose = _new_node(ng, "FunctionNodeRotateRotation", (lx + 200, ly - 150))
    _link(ng, obj_info.outputs["Rotation"], rot_compose.inputs[0])
    _link(ng, rotation_socket, rot_compose.inputs[1])

    return add_pos.outputs[0], rot_compose.outputs[0]


def _set_store_value(store_node, data_type: str, value) -> None:
    # Blender 4.x exposes a single 'Value' input whose socket type changes with
    # data_type. Setting default_value works for the basic types we use.
    try:
        store_node.inputs["Value"].default_value = value
    except Exception:  # noqa: BLE001
        pass


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

BUILDERS = {
    NG_AXIS: _build_axis_move,
    NG_PTP: _build_ptp_move,
    NG_LIN: _build_lin_move,
    NG_PTP_GROUP: lambda ng: _build_motion_group(ng, group_type=1),
    NG_CP_GROUP: lambda ng: _build_motion_group(ng, group_type=0),
    NG_ACTION_GROUP: _build_action_group,
    NG_TASK: _build_task,
    NG_CURVE_HELPER: _build_curve_helper,
    NG_MESH_PATH_HELPER: _build_mesh_path_helper,
    NG_ANIMATION_HELPER: _build_animation_helper,
    NG_GREASE_PENCIL_HELPER: _build_grease_pencil_helper,
    NG_APPROACH_RETRACT: _build_approach_retract,
    NG_ORIENT_TO_POINT: _build_orient_to_point,
    NG_INSERT_CODE: _build_insert_code,
}


def ensure_node_groups() -> tuple[int, int, int]:
    """Create missing node groups, upgrade PRC-owned groups whose version is
    behind the current PRC_VERSION, and leave other groups as is. Existing
    PRC-owned groups are wiped and rebuilt **in place** so that any user
    references to them (e.g. inside the carrier tree) stay valid.
    Returns (created, upgraded, kept)."""
    created = upgraded = kept = 0
    for name in ALL_GROUP_NAMES:
        existing = bpy.data.node_groups.get(name)
        if existing is not None and _is_ours(existing):
            if _is_current_version(existing):
                kept += 1
                continue
            _wipe_internals(existing)
            _tag(existing)
            BUILDERS[name](existing)
            upgraded += 1
            continue
        if existing is not None and not _is_ours(existing):
            ng = bpy.data.node_groups.new(name + "_PRC", "GeometryNodeTree")
        else:
            ng = bpy.data.node_groups.new(name, "GeometryNodeTree")
        _tag(ng)
        BUILDERS[name](ng)
        created += 1
    return created, upgraded, kept


def ensure_carrier_object() -> bpy.types.Object:
    """Create the PRC_Program mesh object with a Geometry Nodes modifier and
    a starter tree if missing. Idempotent."""
    obj = bpy.data.objects.get(CARRIER_OBJECT_NAME)
    if obj is None:
        mesh = bpy.data.meshes.new(CARRIER_OBJECT_NAME + "_Mesh")
        obj = bpy.data.objects.new(CARRIER_OBJECT_NAME, mesh)
        bpy.context.scene.collection.objects.link(obj)
        obj["prc_owner"] = PRC_OWNER_VALUE

    mod = next((m for m in obj.modifiers if m.type == "NODES"), None)
    if mod is None:
        mod = obj.modifiers.new(name="PRC", type="NODES")

    if mod.node_group is None or mod.node_group.get("prc_owner") != PRC_OWNER_VALUE + "_carrier":
        starter = _ensure_starter_tree()
        mod.node_group = starter

    return obj


# ---------------------------------------------------------------------------
# Add menu integration — group all PRC node groups under a "PRC" submenu in
# the Geometry Nodes editor's Shift+A > Add menu.
# ---------------------------------------------------------------------------

# Logical grouping displayed in the submenu, with separators between sections.
def _menu_sections() -> tuple[tuple[str, tuple[str, ...]], ...]:
    helpers = (
        NG_CURVE_HELPER,
        NG_MESH_PATH_HELPER,
        NG_ANIMATION_HELPER,
        NG_GREASE_PENCIL_HELPER,
    )
    modifiers = (NG_APPROACH_RETRACT, NG_ORIENT_TO_POINT)
    actions = (NG_INSERT_CODE,) if _supports_string_attrs() else ()
    groups = (NG_PTP_GROUP, NG_CP_GROUP)
    if actions:
        groups = groups + (NG_ACTION_GROUP,)
    sections = [
        ("Motion Commands", (NG_AXIS, NG_PTP, NG_LIN)),
        ("Motion Groups",   groups),
        ("Helpers",         helpers),
        ("Modifiers",       modifiers),
    ]
    if actions:
        sections.append(("Actions", actions))
    sections.append(("Task", (NG_TASK,)))
    return tuple(sections)


_ADD_MENU_SECTIONS = _menu_sections()


class NODE_OT_add_prc_group(bpy.types.Operator):
    """Insert one of the PRC Geometry Node groups at the cursor position."""

    bl_idname = "node.add_prc_group"
    bl_label = "Add PRC Node Group"
    bl_options = {"REGISTER", "UNDO"}

    group_name: bpy.props.StringProperty()

    @classmethod
    def poll(cls, context):
        space = context.space_data
        return (
            space is not None
            and space.type == "NODE_EDITOR"
            and space.tree_type == "GeometryNodeTree"
            and space.edit_tree is not None
        )

    def invoke(self, context, event):
        ng = bpy.data.node_groups.get(self.group_name)
        if ng is None:
            self.report({"ERROR"},
                        f"'{self.group_name}' not found. Run "
                        "'Generate Geometry Node Groups' first.")
            return {"CANCELLED"}

        tree = context.space_data.edit_tree
        node = tree.nodes.new("GeometryNodeGroup")
        node.node_tree = ng

        # Randomise the per-instance Seed default for motion-group / helper
        # wrappers so two separately-inserted instances stamp distinct
        # prc_motion_group IDs even when the user wires identical geometry
        # into both. Position-based hashing in the wrapper still
        # disambiguates copy-pasted nodes whose Seed defaults match.
        # The Seed socket is then hidden on the instance — it's an
        # internal disambiguator, not a knob users should be tuning.
        if self.group_name in _RANDOM_SEED_GROUP_NAMES:
            seed_socket = node.inputs.get("Seed")
            if seed_socket is not None:
                import random as _random
                seed_socket.default_value = _random.randint(1, 2_000_000_000)
                seed_socket.hide = True

        # Place at the mouse cursor and arm a transform so the user can
        # nudge the node into position before clicking to confirm.
        if hasattr(context.space_data, "cursor_location"):
            node.location = context.space_data.cursor_location
        for n in tree.nodes:
            n.select = False
        node.select = True
        tree.nodes.active = node

        try:
            return bpy.ops.transform.translate("INVOKE_DEFAULT")
        except Exception:  # noqa: BLE001
            return {"FINISHED"}

    def execute(self, context):
        return self.invoke(context, None)


class NODE_MT_prc_groups(bpy.types.Menu):
    """Submenu listing all PRC node groups, grouped by section."""

    bl_idname = "NODE_MT_prc_groups"
    bl_label = "PRC"

    def draw(self, context):
        layout = self.layout
        for section_idx, (section_label, names) in enumerate(_ADD_MENU_SECTIONS):
            if section_idx > 0:
                layout.separator()
            layout.label(text=section_label)
            for name in names:
                if bpy.data.node_groups.get(name) is None:
                    row = layout.row()
                    row.enabled = False
                    row.label(text=f"{name}  (run Generate first)")
                    continue
                op = layout.operator("node.add_prc_group", text=name)
                op.group_name = name


def _draw_prc_in_node_add_menu(self, context):
    """Hook attached to the Node editor Add menu. Only emits the PRC submenu
    when the active editor is a Geometry Nodes tree."""
    space = context.space_data
    if (space is not None
            and space.type == "NODE_EDITOR"
            and space.tree_type == "GeometryNodeTree"):
        self.layout.separator()
        self.layout.menu(NODE_MT_prc_groups.bl_idname, icon="CON_KINEMATIC")


def register() -> None:
    bpy.utils.register_class(NODE_OT_add_prc_group)
    bpy.utils.register_class(NODE_MT_prc_groups)
    bpy.types.NODE_MT_add.append(_draw_prc_in_node_add_menu)


def unregister() -> None:
    try:
        bpy.types.NODE_MT_add.remove(_draw_prc_in_node_add_menu)
    except Exception:  # noqa: BLE001
        pass
    for cls in (NODE_MT_prc_groups, NODE_OT_add_prc_group):
        try:
            bpy.utils.unregister_class(cls)
        except Exception:  # noqa: BLE001
            pass


# ---------------------------------------------------------------------------


def _ensure_starter_tree() -> bpy.types.NodeTree:
    """Build (or upgrade) the carrier tree with a working starter program:

        AXIS Move 1 -+
                     +-> Join Geometry -> PTP Motion Group -> PRC Task -> Output
        AXIS Move 2 -+

    Already-current trees are left alone so the user's wiring is preserved.
    Older starter versions (or freshly-created trees) get the new template.
    """
    name = "PRC_Program_Tree"
    ng = bpy.data.node_groups.get(name)
    if ng is not None and ng.get("prc_owner") == PRC_OWNER_VALUE + "_carrier":
        if int(ng.get(STARTER_VERSION_KEY, 0)) >= STARTER_TREE_VERSION:
            return ng  # current — preserve user wiring
    if ng is None:
        ng = bpy.data.node_groups.new(name, "GeometryNodeTree")
    ng["prc_owner"] = PRC_OWNER_VALUE + "_carrier"
    ng[STARTER_VERSION_KEY] = STARTER_TREE_VERSION

    # Wipe any existing nodes / sockets and rebuild.
    for n in list(ng.nodes):
        ng.nodes.remove(n)
    for item in list(ng.interface.items_tree):
        ng.interface.remove(item)

    ng.interface.new_socket(name="Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
    ng.interface.new_socket(name="Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")

    group_in = _new_node(ng, "NodeGroupInput", (-1400, -400))
    group_out = _new_node(ng, "NodeGroupOutput", (400, 0))

    axis_ng       = bpy.data.node_groups.get(NG_AXIS)
    ptp_group_ng  = bpy.data.node_groups.get(NG_PTP_GROUP)
    task_ng       = bpy.data.node_groups.get(NG_TASK)

    # If any of the per-command node groups are missing (shouldn't happen
    # because ensure_node_groups runs first), fall back to a passthrough.
    if axis_ng is None or ptp_group_ng is None or task_ng is None:
        _link(ng, group_in.outputs["Geometry"], group_out.inputs["Geometry"])
        return ng

    axis1 = _new_node(ng, "GeometryNodeGroup", (-1000, 200))
    axis1.node_tree = axis_ng

    axis2 = _new_node(ng, "GeometryNodeGroup", (-1000, -200))
    axis2.node_tree = axis_ng
    # Stagger A1 on the second waypoint so the program produces a visible
    # sweep rather than two identical poses.
    try:
        axis2.inputs["A1"].default_value = 45.0
    except Exception:  # noqa: BLE001
        pass

    join = _new_node(ng, "GeometryNodeJoinGeometry", (-700, 0))

    ptp_group = _new_node(ng, "GeometryNodeGroup", (-400, 0))
    ptp_group.node_tree = ptp_group_ng
    # Pin a non-zero starter Seed so the prc_motion_group hash isn't
    # driven solely by the AXIS waypoints' (0, 0, 0) origin position.
    # Hide the socket — it's an internal disambiguator, not a user knob.
    seed_in = ptp_group.inputs.get("Seed")
    if seed_in is not None:
        seed_in.default_value = 1
        seed_in.hide = True

    task_node = _new_node(ng, "GeometryNodeGroup", (-100, 0))
    task_node.node_tree = task_ng

    # Two AXIS outputs into Join Geometry's multi-input, then onward to
    # PTP Motion Group → PRC Task → Group Output. Explicit ordering keeps
    # the sweep direction deterministic across Blender versions.
    _multi_link(ng, [
        axis1.outputs["Geometry"],
        axis2.outputs["Geometry"],
    ], join.inputs[0])
    _link(ng, join.outputs["Geometry"], ptp_group.inputs["Geometry"])
    _link(ng, ptp_group.outputs["Geometry"], task_node.inputs["Geometry"])
    _link(ng, task_node.outputs["Geometry"], group_out.inputs["Geometry"])

    return ng
