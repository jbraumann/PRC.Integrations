"""3D Viewport N-panel UI for the PRC Blender add-on."""

from __future__ import annotations

import bpy

from . import grpc_client as _client
from . import properties as _props


def _driver_brand(scene) -> str:
    """Return the brand prefix (e.g. 'KUKA') for the currently-selected driver."""
    return _props.DRIVER_BRAND.get(scene.prc.robot_driver, "")


class PRC_PT_main_panel(bpy.types.Panel):
    bl_label = "Parametric Robot Control"
    bl_idname = "PRC_PT_main_panel"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Parametric Robot Control"

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        props = scene.prc
        tool = scene.prc_tool

        # ---------------- Section 1: Robot Setup ----------------
        box = layout.box()
        box.label(text="Robot Setup", icon="SETTINGS")

        # Lock identity / driver / robot once connected — changing any of
        # these mid-session would invalidate the server's robot setup.
        setup_col = box.column()
        setup_col.enabled = not _client.is_setup_done()
        setup_col.prop(props, "client_id")
        setup_col.prop(props, "robot_driver", text="Driver")
        setup_col.prop(props, "robot_type", text="Robot")

        row = box.row(align=True)
        if not _client.is_setup_done():
            row.operator("prc.setup_robot", icon="PLAY")
        else:
            row.operator("prc.disconnect", icon="X")

        box.operator("prc.generate_node_groups", icon="NODETREE")
        box.operator("prc.open_settings", icon="URL")

        # ---------------- Section 1b: Tool TCP ----------------
        tool_box = layout.box()
        tool_box.label(text="Tool", icon="MODIFIER")

        # Lock when connected — TCP changes require a re-setup.
        tool_col = tool_box.column()
        tool_col.enabled = not _client.is_setup_done()

        tool_col.prop(tool, "tool_id")

        tool_col.label(text="Position (mm)")
        row = tool_col.row(align=True)
        row.prop(tool, "tool_x", text="X")
        row.prop(tool, "tool_y", text="Y")
        row.prop(tool, "tool_z", text="Z")

        brand = _driver_brand(scene)
        encoding = _props.TOOL_ENCODING_BY_BRAND.get(brand, "ZYX")

        if encoding == "QUATERNION":
            tool_col.label(text="Rotation (quaternion)")
            row = tool_col.row(align=True)
            row.prop(tool, "tool_qw", text="W")
            row.prop(tool, "tool_qx", text="X")
            row.prop(tool, "tool_qy", text="Y")
            row.prop(tool, "tool_qz", text="Z")
        elif encoding == "RPY":
            tool_col.label(text="Rotation (RPY, deg)")
            row = tool_col.row(align=True)
            row.prop(tool, "tool_a", text="Roll")
            row.prop(tool, "tool_b", text="Pitch")
            row.prop(tool, "tool_c", text="Yaw")
        elif encoding == "AXISANGLE":
            tool_col.label(text="Rotation (axis-angle, rad·axis)")
            row = tool_col.row(align=True)
            row.prop(tool, "tool_a", text="Rx")
            row.prop(tool, "tool_b", text="Ry")
            row.prop(tool, "tool_c", text="Rz")
        else:  # ZYX (KUKA, IGUS, Generic)
            tool_col.label(text="Rotation (ZYX, deg)")
            row = tool_col.row(align=True)
            row.prop(tool, "tool_a", text="A")
            row.prop(tool, "tool_b", text="B")
            row.prop(tool, "tool_c", text="C")

        if _client.is_setup_done():
            hint = tool_box.column()
            hint.scale_y = 0.8
            hint.label(text="Tool locked — Disconnect to edit.", icon="LOCKED")

        # ---------------- Section: Toolpath status ----------------
        # Red banner when the latest task produced any alarm segments,
        # neutral when the toolpath is valid, dim when no task has been
        # loaded yet. The toolpath / alarm colours are fixed defaults.
        has_alarm = bpy.data.objects.get(_client.TOOLPATH_ALARM_OBJECT_NAME) is not None
        has_ok    = bpy.data.objects.get(_client.TOOLPATH_OK_OBJECT_NAME) is not None
        status_box = layout.box()
        status_row = status_box.row()
        if has_alarm:
            status_row.alert = True
            status_row.label(text="Toolpath has alarms", icon="ERROR")
        elif has_ok:
            status_row.label(text="Toolpath valid", icon="CHECKMARK")
        else:
            status_row.enabled = False
            status_row.label(text="No toolpath loaded", icon="DOT")

        # ---------------- Section 2: Task & Simulation ----------------
        box = layout.box()
        box.label(text="Task & Simulation", icon="TIME")


        sub = box.column()
        sub.enabled = _client.is_setup_done() and props.task_loaded
        sub.prop(props, "simulation_slider", text="Simulation")

        auto_row = box.row()
        auto_row.enabled = _client.is_setup_done()
        auto_row.prop(props, "auto_load_enabled")

        row = box.row()
        row.enabled = _client.is_setup_done()
        row.operator("prc.load_task", icon="IMPORT")

        # ---------------- Status ----------------
        box = layout.box()
        box.label(text="Status", icon="INFO")
        col = box.column()
        col.scale_y = 0.8
        col.label(text=props.status_message or "Idle.")


class PRC_PT_animation_source(bpy.types.Panel):
    """Collapsed by default — auxiliary path source. Bakes an object's
    keyframed animation into a PRC path mesh."""

    bl_label = "Animation Source"
    bl_idname = "PRC_PT_animation_source"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Parametric Robot Control"
    bl_parent_id = "PRC_PT_main_panel"
    bl_options = {"DEFAULT_CLOSED"}

    def draw_header(self, context):
        self.layout.label(text="", icon="ANIM")

    def draw(self, context):
        layout = self.layout
        anim = context.scene.prc_anim_bake
        col = layout.column(align=True)
        col.prop(anim, "source")
        row = col.row(align=True)
        row.prop(anim, "frame_start")
        row.prop(anim, "frame_end")
        row.prop(anim, "step")
        col.prop(anim, "motion_type", text="Mode")
        row = col.row(align=True)
        row.prop(anim, "speed")
        row.prop(anim, "tool_id")
        if anim.motion_type in {"PTP", "FIRST_PTP"}:
            col.prop(anim, "posture")
        layout.operator("prc.bake_animation_path", icon="REC")


class PRC_PT_grease_pencil_source(bpy.types.Panel):
    """Collapsed by default — auxiliary path source. Converts a Grease
    Pencil drawing into a PRC path mesh."""

    bl_label = "Grease Pencil Source"
    bl_idname = "PRC_PT_grease_pencil_source"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Parametric Robot Control"
    bl_parent_id = "PRC_PT_main_panel"
    bl_options = {"DEFAULT_CLOSED"}

    def draw_header(self, context):
        self.layout.label(text="", icon="GREASEPENCIL")

    def draw(self, context):
        layout = self.layout
        gp = context.scene.prc_gp_bake
        col = layout.column(align=True)
        col.prop(gp, "source")
        row = col.row(align=True)
        row.prop(gp, "layer_index")
        row.prop(gp, "frame_index")
        col.prop(gp, "sample_distance")
        col.prop(gp, "orient_mode", text="Orient")
        if gp.orient_mode == "EMPTY_UP":
            col.prop(gp, "up_object")
        col.prop(gp, "motion_type", text="Mode")
        row = col.row(align=True)
        row.prop(gp, "speed")
        row.prop(gp, "tool_id")
        if gp.motion_type in {"PTP", "FIRST_PTP"}:
            col.prop(gp, "posture")
        layout.operator("prc.bake_grease_pencil_path", icon="REC")


class PRC_PT_robot_animation_bake(bpy.types.Panel):
    """Collapsed by default — auxiliary. Bakes the simulated robot motion
    into a self-contained Blender animation under a chosen collection."""

    bl_label = "Robot Animation"
    bl_idname = "PRC_PT_robot_animation_bake"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Parametric Robot Control"
    bl_parent_id = "PRC_PT_main_panel"
    bl_options = {"DEFAULT_CLOSED"}

    def draw_header(self, context):
        self.layout.label(text="", icon="CON_KINEMATIC")

    def draw(self, context):
        from . import operators as _ops

        layout = self.layout
        scene = context.scene
        props = scene.prc_robot_anim_bake

        col = layout.column(align=True)
        col.prop(props, "target_name")

        duration, fps, frames = _ops.robot_anim_estimate(scene)
        info = col.column()
        info.scale_y = 0.85
        if duration <= 0.0:
            info.enabled = False
            info.label(text="No task loaded — press 'Load Task' first.", icon="INFO")
        else:
            info.label(text=f"Duration: {duration:.2f}s   FPS: {fps:.0f}   Frames: {frames}")

        col.prop(props, "frame_start")
        col.prop(props, "fps_override")
        col.prop(props, "set_scene_range")

        row = layout.row()
        row.enabled = _client.is_setup_done() and duration > 0.0
        row.operator("prc.bake_robot_animation", icon="REC")


class PRC_PT_studio_setup(bpy.types.Panel):
    """Collapsed by default — auxiliary. Builds a 360°-friendly product-shot
    studio (cyclorama + lights) around the robot collection."""

    bl_label = "Studio Environment"
    bl_idname = "PRC_PT_studio_setup"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Parametric Robot Control"
    bl_parent_id = "PRC_PT_main_panel"
    bl_options = {"DEFAULT_CLOSED"}

    def draw_header(self, context):
        self.layout.label(text="", icon="SCENE_DATA")

    def draw(self, context):
        layout = self.layout
        props = context.scene.prc_studio

        col = layout.column(align=True)
        col.prop(props, "floor_radius_mult")
        col.prop(props, "wall_height_mult")
        col.prop(props, "key_power")
        col.prop(props, "rim_count")
        col.prop(props, "rim_power")

        row = layout.row()
        row.enabled = _client.is_setup_done()
        row.operator("prc.build_studio", icon="SCENE_DATA")


classes = (
    PRC_PT_main_panel,
    PRC_PT_animation_source,
    PRC_PT_grease_pencil_source,
    PRC_PT_robot_animation_bake,
    PRC_PT_studio_setup,
)


def register():
    for cls in classes:
        bpy.utils.register_class(cls)


def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
