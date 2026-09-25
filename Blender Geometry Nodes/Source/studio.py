"""Build a symmetric, 360°-friendly product-shot studio around the robot.

Creates a revolved cyclorama mesh (flat floor → quarter-arc → vertical wall),
a neutral backdrop material with a gentle floor→top gradient, an overhead
key area light, and a configurable ring of rim/fill lights aimed at the
robot. Sizes itself off the robot collection's bounding box.

Re-running cleanly rebuilds the studio (idempotent).
"""

from __future__ import annotations

import math

import bpy
import bmesh
from mathutils import Vector


STUDIO_COLL_NAME = "PRC_Studio"
STUDIO_LIGHTS_COLL_NAME = "PRC_Studio_Lights"
ROBOT_COLL_CANDIDATES = ("PRC Robot", "PRC_Robot", "PRC.Robot")

# Fixed knobs (non-user-facing).
WALL_HEIGHT_MULT = 5.0
CURVE_RADIUS_MULT = 2.0
KEY_HEIGHT_MULT = 4.0
KEY_SIZE_MULT = 4.0
RIM_HEIGHT_MULT = 2.0
RIM_SIZE_MULT = 1.5
RIM_DISTANCE_MULT = 4.0

BACKDROP_BASE_COLOR = (0.85, 0.85, 0.86, 1.0)
BACKDROP_FLOOR_TINT = (0.93, 0.93, 0.94, 1.0)
BACKDROP_FLOOR_ROUGHNESS = 0.15
BACKDROP_WALL_ROUGHNESS = 0.55

WORLD_STRENGTH = 0.13
WORLD_COLOR = (0.55, 0.55, 0.60)

RING_SEGS, CURVE_SEGS, FLOOR_SEGS, WALL_SEGS = 96, 16, 6, 6


def _get_robot_collection():
    for n in ROBOT_COLL_CANDIDATES:
        c = bpy.data.collections.get(n)
        if c is not None:
            return c
    return None


def _robot_bounds(coll):
    mins = Vector((float("inf"),) * 3)
    maxs = Vector((-float("inf"),) * 3)
    for obj in coll.all_objects:
        if obj.type != "MESH":
            continue
        for c in obj.bound_box:
            wp = obj.matrix_world @ Vector(c)
            for i in range(3):
                mins[i] = min(mins[i], wp[i])
                maxs[i] = max(maxs[i], wp[i])
    if mins.x == float("inf"):
        # Robot collection has no mesh objects yet — fall back to a
        # 1 m cube around the origin so the studio still builds.
        mins = Vector((-0.5, -0.5, 0.0))
        maxs = Vector(( 0.5,  0.5, 1.0))
    return mins, maxs


def _get_or_create_collection(name, parent=None):
    coll = bpy.data.collections.get(name)
    if coll is None:
        coll = bpy.data.collections.new(name)
    target = parent or bpy.context.scene.collection
    if coll.name not in {c.name for c in target.children}:
        target.children.link(coll)
    return coll


def _link_to_collection(obj, coll):
    for c in list(obj.users_collection):
        try:
            c.objects.unlink(obj)
        except RuntimeError:
            pass
    coll.objects.link(obj)


def _clear_studio():
    coll = bpy.data.collections.get(STUDIO_COLL_NAME)
    if coll is None:
        return
    for obj in list(coll.all_objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for child in list(coll.children):
        bpy.data.collections.remove(child)
    bpy.data.collections.remove(coll)


def _build_cyc_mesh(name, floor_radius, wall_height, curve_radius):
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)

    flat_r = max(floor_radius - curve_radius, 1e-3)
    profile = []
    for i in range(FLOOR_SEGS + 1):
        profile.append((flat_r * (i / FLOOR_SEGS), 0.0))
    for i in range(1, CURVE_SEGS + 1):
        a = (math.pi / 2) * (i / CURVE_SEGS)
        profile.append((flat_r + curve_radius * math.sin(a),
                        curve_radius * (1 - math.cos(a))))
    for i in range(1, WALL_SEGS + 1):
        z = curve_radius + (wall_height - curve_radius) * (i / WALL_SEGS)
        profile.append((floor_radius, z))

    bm = bmesh.new()
    rings = []
    for r, z in profile:
        if r < 1e-5:
            rings.append(("c", bm.verts.new((0.0, 0.0, z))))
        else:
            row = []
            for j in range(RING_SEGS):
                a = 2 * math.pi * j / RING_SEGS
                row.append(bm.verts.new((r * math.cos(a), r * math.sin(a), z)))
            rings.append(("r", row))

    for i in range(len(rings) - 1):
        k1, v1 = rings[i]
        k2, v2 = rings[i + 1]
        for j in range(RING_SEGS):
            j2 = (j + 1) % RING_SEGS
            try:
                if k1 == "c" and k2 == "r":
                    bm.faces.new([v1, v2[j2], v2[j]])
                elif k1 == "r" and k2 == "c":
                    bm.faces.new([v1[j], v1[j2], v2])
                else:
                    bm.faces.new([v1[j], v1[j2], v2[j2], v2[j]])
            except ValueError:
                pass

    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    for poly in mesh.polygons:
        poly.use_smooth = True
    if hasattr(mesh, "use_auto_smooth"):
        mesh.use_auto_smooth = True
    return obj


def _build_backdrop_material(wall_height, curve_radius):
    name = "PRC_Studio_Backdrop"
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()

    out = nt.nodes.new("ShaderNodeOutputMaterial");  out.location = (900, 0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled"); bsdf.location = (650, 0)

    geom = nt.nodes.new("ShaderNodeNewGeometry");    geom.location = (-720, 0)
    sep = nt.nodes.new("ShaderNodeSeparateXYZ");     sep.location = (-500, 0)
    nt.links.new(geom.outputs["Position"], sep.inputs[0])

    div = nt.nodes.new("ShaderNodeMath");            div.location = (-280, 200)
    div.operation = "DIVIDE"
    div.inputs[1].default_value = max(wall_height, 0.1)
    nt.links.new(sep.outputs["Z"], div.inputs[0])

    ramp = nt.nodes.new("ShaderNodeValToRGB");       ramp.location = (-50, 200)
    el = ramp.color_ramp.elements
    el[0].position = 0.0;  el[0].color = (0.0, 0.0, 0.0, 1.0)
    el[1].position = 0.55; el[1].color = (1.0, 1.0, 1.0, 1.0)
    nt.links.new(div.outputs[0], ramp.inputs["Fac"])

    mix = nt.nodes.new("ShaderNodeMixRGB");          mix.location = (200, 200)
    mix.blend_type = "MIX"
    mix.inputs["Color1"].default_value = BACKDROP_FLOOR_TINT
    mix.inputs["Color2"].default_value = BACKDROP_BASE_COLOR
    nt.links.new(ramp.outputs["Color"], mix.inputs["Fac"])
    nt.links.new(mix.outputs["Color"], bsdf.inputs["Base Color"])

    mr = nt.nodes.new("ShaderNodeMapRange");         mr.location = (-280, -150)
    mr.inputs["From Min"].default_value = 0.0
    mr.inputs["From Max"].default_value = max(curve_radius, 0.1)
    mr.inputs["To Min"].default_value = BACKDROP_FLOOR_ROUGHNESS
    mr.inputs["To Max"].default_value = BACKDROP_WALL_ROUGHNESS
    mr.clamp = True
    nt.links.new(sep.outputs["Z"], mr.inputs["Value"])
    nt.links.new(mr.outputs["Result"], bsdf.inputs["Roughness"])

    spec_key = ("Specular IOR Level" if "Specular IOR Level" in bsdf.inputs
                else "Specular" if "Specular" in bsdf.inputs else None)
    if spec_key:
        bsdf.inputs[spec_key].default_value = 0.5

    nt.links.new(bsdf.outputs[0], out.inputs[0])
    return mat


def _make_area(name, location, size, power, shape="DISK", color=(1, 1, 1)):
    data = bpy.data.lights.new(name + "_Data", type="AREA")
    data.shape, data.size, data.energy, data.color = shape, size, power, color
    obj = bpy.data.objects.new(name, data)
    obj.location = location
    bpy.context.scene.collection.objects.link(obj)
    return obj


def _aim_at(obj, target):
    direction = (Vector(target) - obj.location).normalized()
    rot = Vector((0, 0, -1)).rotation_difference(direction)
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = rot


def _setup_world():
    scene = bpy.context.scene
    world = scene.world or bpy.data.worlds.new("PRC_Studio_World")
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld"); out.location = (300, 0)
    bg = nt.nodes.new("ShaderNodeBackground");   bg.location = (50, 0)
    bg.inputs["Color"].default_value = (*WORLD_COLOR, 1.0)
    bg.inputs["Strength"].default_value = WORLD_STRENGTH
    nt.links.new(bg.outputs[0], out.inputs[0])


def build_studio(
    floor_radius_mult: float,
    wall_height_mult: float,
    key_power: float,
    rim_count: int,
    rim_power: float,
) -> None:
    """Build (or rebuild) the studio around the detected robot collection.

    Raises RuntimeError if no robot collection is found."""
    robot_coll = _get_robot_collection()
    if robot_coll is None:
        raise RuntimeError(
            "No robot collection found (looked for "
            f"{', '.join(ROBOT_COLL_CANDIDATES)}). Run 'Setup Robot' first."
        )

    mins, maxs = _robot_bounds(robot_coll)
    horiz = max(abs(mins.x), abs(maxs.x), abs(mins.y), abs(maxs.y), 0.5)
    height = max(maxs.z - mins.z, 1.0)
    base_z = mins.z

    floor_radius = horiz * floor_radius_mult
    wall_height = max(height * wall_height_mult, height + 4.0)
    curve_radius = min(horiz * CURVE_RADIUS_MULT,
                       floor_radius * 0.6,
                       wall_height * 0.6)

    _clear_studio()
    studio = _get_or_create_collection(STUDIO_COLL_NAME)
    lights_coll = _get_or_create_collection(STUDIO_LIGHTS_COLL_NAME, parent=studio)

    backdrop = _build_cyc_mesh("PRC_Backdrop", floor_radius, wall_height, curve_radius)
    backdrop.location.z = base_z
    backdrop.data.materials.append(_build_backdrop_material(wall_height, curve_radius))
    _link_to_collection(backdrop, studio)

    key_h = max(height * KEY_HEIGHT_MULT, 4.0)
    key_s = max(horiz * KEY_SIZE_MULT, 3.0)
    key = _make_area("PRC_Key", (0, 0, base_z + key_h), key_s, key_power)
    _link_to_collection(key, lights_coll)

    rim_h = base_z + height * RIM_HEIGHT_MULT
    rim_s = max(horiz * RIM_SIZE_MULT, 1.0)
    rim_d = max(horiz * RIM_DISTANCE_MULT, 3.0)
    target = (0.0, 0.0, base_z + height * 0.5)
    for i in range(max(0, int(rim_count))):
        a = 2 * math.pi * i / max(1, rim_count)
        rim = _make_area(
            f"PRC_Rim_{i + 1}",
            (rim_d * math.cos(a), rim_d * math.sin(a), rim_h),
            rim_s, rim_power,
        )
        _aim_at(rim, target)
        _link_to_collection(rim, lights_coll)

    _setup_world()
    bpy.context.scene.render.film_transparent = False
