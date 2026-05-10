"""Scene-attached properties for the PRC Blender add-on."""

import bpy


# ---------------------------------------------------------------------------
# Brand → tool rotation encoding hint
# ---------------------------------------------------------------------------
# UI labels are surfaced in panels.py based on the active driver brand. The
# encoding to a PRC `Tool` proto happens in grpc_client.py.

TOOL_ENCODING_BY_BRAND = {
    "KUKA":    "ZYX",          # XYZABC, A/B/C in degrees
    "NEURA":   "RPY",          # Roll-Pitch-Yaw in degrees
    "UR":      "AXISANGLE",    # rotation vector (rad-axis)
    "ABB":     "QUATERNION",   # Qw, Qx, Qy, Qz
    "IGUS":    "ZYX",
    "":        "ZYX",          # Generic fallback
}


# ---------------------------------------------------------------------------
# Drivers
# ---------------------------------------------------------------------------
# Each driver is (driver_class_string, ui_label, brand_filter)
# brand_filter is the prefix of robot preset_robot_class strings that this
# driver targets (e.g. "KUKA"). "" means "show all robots".

_DRIVERS = [
    ("KUKA.KSS_KRL_Driver", "KUKA KSS (KRL)",          "KUKA"),
    ("KUKA.KSS_MXA_Driver", "KUKA KSS mxAutomation",   "KUKA"),
    ("ABB.ABB_RAPID_Driver", "ABB RAPID",               "ABB"),
    ("UR.UR_Driver",         "Universal Robots",        "UR"),
    ("IGUS.IGUS_Driver",     "IGUS ReBel",              "IGUS"),
    ("NEURA.NEURA_SIM_Driver", "NEURA",                  "NEURA"),
    ("Generic.Generic_Driver", "Generic (any robot)",    ""),
]

DRIVER_ITEMS = [(d, label, "") for d, label, _ in _DRIVERS]
DRIVER_BRAND = {d: brand for d, _, brand in _DRIVERS}


# ---------------------------------------------------------------------------
# Robots — (preset_class_string, ui_label, brand_prefix)
# ---------------------------------------------------------------------------

_ROBOTS = [
    # ABB
    ("ABB.ABB_IRB6620",          "ABB IRB 6620",                "ABB"),
    ("ABB.ABB_IRB6700_150_320",  "ABB IRB 6700-150/3.20",       "ABB"),

    # IGUS
    ("IGUS.IGUS_ReBel",          "IGUS ReBel",                  "IGUS"),

    # KUKA
    ("KUKA.KUKA_KR1000",          "KUKA KR 1000",                "KUKA"),
    ("KUKA.KUKA_KR10R11003",      "KUKA KR 10 R1100-3",          "KUKA"),
    ("KUKA.KUKA_KR10R1420",       "KUKA KR 10 R1420",            "KUKA"),
    ("KUKA.KUKA_KR10R14402",      "KUKA KR 10 R1440-2",          "KUKA"),
    ("KUKA.KUKA_KR120KR150R31002","KUKA KR 120/150 R3100-2",     "KUKA"),
    ("KUKA.KUKA_KR120KR210R27002","KUKA KR 120/210 R2700-2",     "KUKA"),
    ("KUKA.KUKA_KR120R1800",      "KUKA KR 120 R1800",           "KUKA"),
    ("KUKA.KUKA_KR120R3900K",     "KUKA KR 120 R3900-K",         "KUKA"),
    ("KUKA.KUKA_KR120R3900K2",    "KUKA KR 120 R3900-K2",        "KUKA"),
    ("KUKA.KUKA_KR125200",        "KUKA KR 125/200",             "KUKA"),
    ("KUKA.KUKA_KR12KR20R1810",   "KUKA KR 12/20 R1810",         "KUKA"),
    ("KUKA.KUKA_KR150240L110180", "KUKA KR 150-240 L110-180",    "KUKA"),
    ("KUKA.KUKA_KR180KR240R29002","KUKA KR 180/240 R2900-2",     "KUKA"),
    ("KUKA.KUKA_KR180R3500K2",    "KUKA KR 180 R3500-K2",        "KUKA"),
    ("KUKA.KUKA_KR200comp",       "KUKA KR 200 comp",            "KUKA"),
    ("KUKA.KUKA_KR20R3100",       "KUKA KR 20 R3100",            "KUKA"),
    ("KUKA.KUKA_KR210KR240R2700", "KUKA KR 210/240 R2700",       "KUKA"),
    ("KUKA.KUKA_KR210R31002",     "KUKA KR 210 R3100-2",         "KUKA"),
    ("KUKA.KUKA_KR210R3300K",     "KUKA KR 210 R3300-K",         "KUKA"),
    ("KUKA.KUKA_KR22R1610",       "KUKA KR 22 R1610",            "KUKA"),
    ("KUKA.KUKA_KR250KR300R27002","KUKA KR 250/300 R2700-2",     "KUKA"),
    ("KUKA.KUKA_KR3060",          "KUKA KR 30/60",               "KUKA"),
    ("KUKA.KUKA_KR3070R2100",     "KUKA KR 30/70 R2100",         "KUKA"),
    ("KUKA.KUKA_KR30L16",         "KUKA KR 30 L16",              "KUKA"),
    ("KUKA.KUKA_KR3605002",       "KUKA KR 360 500-2",           "KUKA"),
    ("KUKA.KUKA_KR3R540",         "KUKA KR 3 R540 (AGILUS)",     "KUKA"),
    ("KUKA.KUKA_KR480R3330",      "KUKA KR 480 R3330",           "KUKA"),
    ("KUKA.KUKA_KR4R600",         "KUKA KR 4 R600 (AGILUS)",     "KUKA"),
    ("KUKA.KUKA_KR50R2500",       "KUKA KR 50 R2500",            "KUKA"),
    ("KUKA.KUKA_KR50R25002",      "KUKA KR 50 R2500-2",          "KUKA"),
    ("KUKA.KUKA_KR50R2500CRW",    "KUKA KR 50 R2500 CRW",        "KUKA"),
    ("KUKA.KUKA_KR5arcHW",        "KUKA KR 5 arc HW",            "KUKA"),
    ("KUKA.KUKA_KR600R2830",      "KUKA KR 600 R2830",           "KUKA"),
    ("KUKA.KUKA_KR610R1100",      "KUKA KR 6/10 R1100",          "KUKA"),
    ("KUKA.KUKA_KR610R11002",     "KUKA KR 6/10 R1100-2",        "KUKA"),
    ("KUKA.KUKA_KR610R900",       "KUKA KR 6/10 R900",           "KUKA"),
    ("KUKA.KUKA_KR610R9002",      "KUKA KR 6/10 R900-2",         "KUKA"),
    ("KUKA.KUKA_KR61620",         "KUKA KR 6/16 -2",             "KUKA"),
    ("KUKA.KUKA_KR616Arc",        "KUKA KR 6/16 Arc",            "KUKA"),
    ("KUKA.KUKA_KR6R1820",        "KUKA KR 6 R1820",             "KUKA"),
    ("KUKA.KUKA_KR6R18402",       "KUKA KR 6 R1840-2",           "KUKA"),
    ("KUKA.KUKA_KR6R700",         "KUKA KR 6 R700",              "KUKA"),
    ("KUKA.KUKA_KR6R7002",        "KUKA KR 6 R700-2",            "KUKA"),
    ("KUKA.KUKA_KR70R21002",      "KUKA KR 70 R2100-2",          "KUKA"),
    ("KUKA.KUKA_KR816R20102",     "KUKA KR 8/16 R2010-2",        "KUKA"),
    ("KUKA.KUKA_KR8R14402ArcHW",  "KUKA KR 8 R1440-2 Arc HW",    "KUKA"),
    ("KUKA.KUKA_KR8R1620",        "KUKA KR 8 R1620",             "KUKA"),
    ("KUKA.KUKA_KR90KR120R2900",  "KUKA KR 90/120 R2900",        "KUKA"),
    ("KUKA.KUKA_KR90KR150R3700K", "KUKA KR 90/150 R3700-K",      "KUKA"),
    ("KUKA.KUKA_KR90KR270R2500",  "KUKA KR 90/270 R2500",        "KUKA"),
    ("KUKA.KUKA_KR90KR270R2700",  "KUKA KR 90/270 R2700",        "KUKA"),
    ("KUKA.KUKA_KR90KR270R3100",  "KUKA KR 90/270 R3100",        "KUKA"),
    ("KUKA.KUKA_LBR12R1260",      "KUKA LBR iiwa 12 R1260",      "KUKA"),
    ("KUKA.KUKA_LBR3R760",        "KUKA LBR iiwa 3 R760",        "KUKA"),
    ("KUKA.KUKA_OALego",          "KUKA OALego",                 "KUKA"),

    # NEURA
    ("NEURA.NEURA_MAIRA_M",       "NEURA MAiRA M",               "NEURA"),

    # Universal Robots
    ("UR.UR_10e",                 "Universal Robots UR10e",      "UR"),
    ("UR.UR_20",                  "Universal Robots UR20",       "UR"),
]


def _robot_items_callback(self, context):
    """Dynamic enum populator: filters robots by the currently-selected
    driver's brand. Empty brand ('Generic') shows all robots."""
    selected_driver = getattr(self, "robot_driver", "")
    brand = DRIVER_BRAND.get(selected_driver, "")
    if brand == "":
        filtered = _ROBOTS
    else:
        filtered = [r for r in _ROBOTS if r[2] == brand]
    if not filtered:
        filtered = _ROBOTS
    return [(preset, label, "") for preset, label, _ in filtered]


def _on_robot_driver_update(self, context):
    """When the driver changes, ensure the current robot still matches the
    new filter; otherwise pick the first available item."""
    selected_driver = self.robot_driver
    brand = DRIVER_BRAND.get(selected_driver, "")
    if brand == "":
        return
    if not any(r[0] == self.robot_type and r[2] == brand for r in _ROBOTS):
        # Snap to the first robot of the new brand.
        for preset, _label, b in _ROBOTS:
            if b == brand:
                try:
                    self.robot_type = preset
                except Exception:  # noqa: BLE001
                    pass
                break


def _on_simulation_slider_update(self, context):
    from . import grpc_client
    grpc_client.update_simulation(self.simulation_slider)


# ---------------------------------------------------------------------------
# Task type — kept for backward compatibility with .blend files that saved
# this property (no longer surfaced in the panel; the reader hardcodes
# SIMULATE_AND_EXECUTE_TASK).
# ---------------------------------------------------------------------------

TASK_TYPE_ITEMS = [
    ("SIMULATE_TASK",                       "Simulate",                        ""),
    ("EXECUTE_TASK",                        "Execute",                         ""),
    ("EXECUTE_ON_SIMULATION_SUCCESS_TASK",  "Execute on Simulation Success",   ""),
    ("SIMULATE_AND_EXECUTE_TASK",           "Simulate and Execute",            ""),
]


class PRCToolProps(bpy.types.PropertyGroup):
    """User-configurable Tool TCP. Sent in Robot.tool_dictionary on
    SetupRobot. Values are stored in millimetres / degrees regardless of
    the driver, and converted at encode time."""

    tool_id: bpy.props.IntProperty(
        name="Tool ID",
        description="Tool number in the dictionary. KUKA defaults to 6.",
        default=6, min=0, max=999,
    )
    tool_x: bpy.props.FloatProperty(name="X", description="TCP X offset (mm)", default=0.0)
    tool_y: bpy.props.FloatProperty(name="Y", description="TCP Y offset (mm)", default=0.0)
    tool_z: bpy.props.FloatProperty(name="Z", description="TCP Z offset (mm)", default=0.0)

    # KUKA ZYX / NEURA RPY / IGUS / Generic — degrees.
    tool_a: bpy.props.FloatProperty(name="A", description="Rotation A (deg)", default=0.0)
    tool_b: bpy.props.FloatProperty(name="B", description="Rotation B (deg)", default=0.0)
    tool_c: bpy.props.FloatProperty(name="C", description="Rotation C (deg)", default=0.0)

    # ABB — unit quaternion. Default identity (1, 0, 0, 0).
    tool_qw: bpy.props.FloatProperty(name="Qw", default=1.0)
    tool_qx: bpy.props.FloatProperty(name="Qx", default=0.0)
    tool_qy: bpy.props.FloatProperty(name="Qy", default=0.0)
    tool_qz: bpy.props.FloatProperty(name="Qz", default=0.0)


class PRCSceneProps(bpy.types.PropertyGroup):
    client_id: bpy.props.StringProperty(
        name="Client ID",
        description="Client-chosen unique identifier for this robot setup.",
        default="PRC_Blender",
    )
    robot_driver: bpy.props.EnumProperty(
        name="Driver",
        description="Robot driver class. Filters the Robot dropdown to the matching brand.",
        items=DRIVER_ITEMS,
        default="KUKA.KSS_KRL_Driver",
        update=_on_robot_driver_update,
    )
    robot_type: bpy.props.EnumProperty(
        name="Robot",
        description="Preset robot from the PRC library.",
        items=_robot_items_callback,
    )
    task_name: bpy.props.StringProperty(
        name="Task Name",
        description="Name written to the generated robot program.",
        default="Task",
    )
    task_type: bpy.props.EnumProperty(
        name="Task Type",
        description="(Unused in v1; kept for .blend backward compatibility.)",
        items=TASK_TYPE_ITEMS,
        default="SIMULATE_AND_EXECUTE_TASK",
    )
    simulation_slider: bpy.props.FloatProperty(
        name="Simulation Slider",
        description="Normalised toolpath position 0..1.",
        min=0.0, max=1.0, step=1, precision=3,
        default=0.0,
        update=_on_simulation_slider_update,
    )
    setup_done: bpy.props.BoolProperty(default=False)
    task_loaded: bpy.props.BoolProperty(default=False)
    status_message: bpy.props.StringProperty(default="Idle.")
    settings_json: bpy.props.StringProperty(default="")
    auto_load_enabled: bpy.props.BoolProperty(
        name="Auto-simulate on Edit",
        description=(
            "Automatically submit the task to PRC whenever PRC_Program's "
            "geometry changes. The first edit after a pause fires "
            "immediately; rapid follow-up edits coalesce into one trailing "
            "submission so the server isn't spammed during drags."
        ),
        default=False,
    )


# ---------------------------------------------------------------------------
# Bake source properties
# ---------------------------------------------------------------------------

MOTION_TYPE_ITEMS = [
    ("LIN",        "All LIN",                   "All sampled poses become LIN motions in a Cartesian Motion Group."),
    ("PTP",        "All PTP",                   "All sampled poses become PTP motions in a PTP Motion Group."),
    ("FIRST_PTP",  "First PTP, rest LIN",       "First sample is a PTP move (safe approach), the rest are LIN in a Cartesian Motion Group."),
]


class PRCAnimBakeProps(bpy.types.PropertyGroup):
    """Bake an Object's keyframed animation into a PRC path mesh."""

    source: bpy.props.PointerProperty(
        name="Object",
        description="Object whose world transform is sampled at each frame.",
        type=bpy.types.Object,
    )
    frame_start: bpy.props.IntProperty(name="Frame Start", default=1)
    frame_end:   bpy.props.IntProperty(name="Frame End",   default=100)
    step: bpy.props.IntProperty(
        name="Frame Step",
        description="Sample every Nth frame.",
        default=1, min=1,
    )
    motion_type: bpy.props.EnumProperty(
        name="Motion Type",
        items=MOTION_TYPE_ITEMS,
        default="LIN",
    )
    speed: bpy.props.FloatProperty(
        name="Speed",
        description="Per-waypoint speed (m/s for LIN, controller-specific for PTP).",
        default=0.05, min=0.0,
    )
    tool_id: bpy.props.IntProperty(name="Tool ID", default=0, min=0, max=999)
    posture: bpy.props.IntProperty(
        name="Posture",
        description="Posture for PTP waypoints (zero-padded to 3 digits at read time).",
        default=10, min=0, max=999,
    )


GP_ORIENT_MODE_ITEMS = [
    ("WORLD_UP",    "Tangent + World Up",   "Local +X = stroke tangent, local +Z derived from world Z."),
    ("EMPTY_UP",    "Tangent + Up Object",  "Local +X = stroke tangent, local +Z = up direction from a chosen object's +Z axis."),
]


class PRCGPBakeProps(bpy.types.PropertyGroup):
    """Bake a Grease Pencil drawing into a PRC path mesh."""

    source: bpy.props.PointerProperty(
        name="Grease Pencil",
        description="Grease Pencil object whose strokes drive the path.",
        type=bpy.types.Object,
    )
    layer_index: bpy.props.IntProperty(
        name="Layer Index",
        description="Layer to read from (0 = first layer).",
        default=0, min=0,
    )
    frame_index: bpy.props.IntProperty(
        name="Frame Index",
        description="Drawing keyframe to read (0 = first keyframe on the layer).",
        default=0, min=0,
    )
    sample_distance: bpy.props.FloatProperty(
        name="Sample Distance",
        description="Resample stroke along its length at this spacing (0 = use raw stroke points).",
        default=0.0, min=0.0,
    )
    orient_mode: bpy.props.EnumProperty(
        name="Orientation",
        items=GP_ORIENT_MODE_ITEMS,
        default="WORLD_UP",
    )
    up_object: bpy.props.PointerProperty(
        name="Up Object",
        description="Object whose +Z axis is used as the up reference (Tangent + Up Object only).",
        type=bpy.types.Object,
    )
    motion_type: bpy.props.EnumProperty(
        name="Motion Type",
        items=MOTION_TYPE_ITEMS,
        default="LIN",
    )
    speed: bpy.props.FloatProperty(
        name="Speed",
        description="Per-waypoint speed (m/s for LIN).",
        default=0.05, min=0.0,
    )
    tool_id: bpy.props.IntProperty(name="Tool ID", default=0, min=0, max=999)
    posture: bpy.props.IntProperty(
        name="Posture",
        description="Posture for PTP waypoints (zero-padded to 3 digits at read time).",
        default=10, min=0, max=999,
    )


class PRCRobotAnimBakeProps(bpy.types.PropertyGroup):
    """Bake the simulated robot motion into a self-contained Blender
    animation (one keyframe per frame on copies of the A* link objects)."""

    target_name: bpy.props.StringProperty(
        name="Target Name",
        description=(
            "Collection name and prefix for the baked link objects "
            "(e.g. 'PRC_RobotAnim' creates a collection of that name and "
            "objects 'PRC_RobotAnim_A0'..'PRC_RobotAnim_A6'). "
            "If a collection with this exact name already exists in the "
            "file, its contents are replaced; otherwise nothing is deleted."
        ),
        default="PRC_RobotAnim",
    )
    frame_start: bpy.props.IntProperty(
        name="Frame Start",
        description="First frame number for the baked animation.",
        default=1, min=0,
    )
    fps_override: bpy.props.FloatProperty(
        name="FPS Override",
        description="Sampling rate. 0 = use scene render FPS (defaults to 25 if unset).",
        default=0.0, min=0.0, max=240.0,
    )
    set_scene_range: bpy.props.BoolProperty(
        name="Set Scene Range",
        description="Update Scene Frame Start/End to span the baked animation.",
        default=True,
    )


class PRCStudioProps(bpy.types.PropertyGroup):
    """Inputs for the Studio Environment builder. Multipliers are relative
    to the robot's bounding-box extents; powers are watt-equivalents on the
    area lights."""

    floor_radius_mult: bpy.props.FloatProperty(
        name="Floor Radius",
        description="Cyclorama floor radius, as a multiple of the robot's horizontal extent.",
        default=6.0, min=1.0, max=30.0,
    )
    wall_height_mult: bpy.props.FloatProperty(
        name="Wall Height",
        description="Backdrop wall height, as a multiple of the robot's height.",
        default=5.0, min=1.0, max=20.0,
    )
    key_power: bpy.props.FloatProperty(
        name="Key Power",
        description="Overhead key light power (W).",
        default=450.0, min=0.0, max=10000.0,
    )
    rim_count: bpy.props.IntProperty(
        name="Rim Count",
        description="Number of rim/fill lights arranged in a ring around the robot.",
        default=3, min=0, max=12,
    )
    rim_power: bpy.props.FloatProperty(
        name="Rim Power",
        description="Per-light power for each rim/fill light (W).",
        default=105.0, min=0.0, max=10000.0,
    )


classes = (
    PRCToolProps, PRCSceneProps,
    PRCAnimBakeProps, PRCGPBakeProps, PRCRobotAnimBakeProps,
    PRCStudioProps,
)


def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.prc = bpy.props.PointerProperty(type=PRCSceneProps)
    bpy.types.Scene.prc_tool = bpy.props.PointerProperty(type=PRCToolProps)
    bpy.types.Scene.prc_anim_bake = bpy.props.PointerProperty(type=PRCAnimBakeProps)
    bpy.types.Scene.prc_gp_bake = bpy.props.PointerProperty(type=PRCGPBakeProps)
    bpy.types.Scene.prc_robot_anim_bake = bpy.props.PointerProperty(type=PRCRobotAnimBakeProps)
    bpy.types.Scene.prc_studio = bpy.props.PointerProperty(type=PRCStudioProps)


def unregister():
    for attr in ("prc_studio", "prc_robot_anim_bake", "prc_gp_bake", "prc_anim_bake", "prc_tool", "prc"):
        if hasattr(bpy.types.Scene, attr):
            delattr(bpy.types.Scene, attr)
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
