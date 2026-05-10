# Parametric Robot Control — Blender Add-on User Guide

## Prerequisites

### Version requirements

- **Blender 5.0.0 or later.** Earlier versions (4.3 and below) are not supported — the add-on uses Blender 4.4+ Geometry Nodes APIs (typed sockets, `capture_items` collection on Capture Attribute, slotted Action data, etc.) and won't load on older builds. The minimum is enforced by `blender_manifest.toml`.
- **Blender 5.2.0+** is required for the **Insert Code** action node, which depends on string-typed Geometry Nodes attributes that landed in 5.2. On 5.0 / 5.1 every other feature works; the Insert Code entry simply doesn't appear in the Add menu.
- **Platforms**: Windows x64, Linux x64, macOS arm64, macOS x64. The bundled gRPC / protobuf wheels target CPython 3.13 (the interpreter shipped with Blender 5.x).

### Other requirements

- **PRC server** running on `https://127.0.0.1:5001`.
- The `prc_blender` add-on installed and enabled (`Edit → Preferences → Add-ons`).

After enabling the add-on, the **Parametric Robot Control** panel appears in the 3D Viewport's N-panel sidebar.

---

## 1. Connect to the Robot

In the **Robot Setup** box (gear icon):

1. Set **Client ID** (any stable string, default `PRC_Blender`).
2. Pick a **Driver** (e.g. `KUKA KSS (KRL)`). The Robot dropdown auto-filters to that brand.
3. Pick a **Robot** from the filtered list.
4. *(Optional)* In the **Tool** box, set the TCP — Position (mm) and Rotation. The rotation fields adapt to the driver convention (ZYX degrees for KUKA, RPY for NEURA, axis-angle for UR, quaternion for ABB). The Tool ID determines which dictionary slot the TCP lives at.
5. Click **Setup Robot**.

The first run downloads the robot mesh from the server and creates `A0..A6` link objects, the `TCP` axis-arrow marker, the `Tool` Empty (parented to TCP — drop your own tool geometry under this Empty and it will follow the TCP), and the `PRC_Program` carrier object.

After setup, identity / driver / robot / tool fields lock until you **Disconnect**. To change the robot model: Disconnect, edit, Setup Robot again.

---

## 2. Run the Default AXIS Motion

The first time you connect, also click:

- **Generate Geometry Node Groups** — creates all PRC node groups (motion commands, helpers, modifiers, task) and stamps the starter tree on the `PRC_Program` carrier.

The starter tree is:

```
AXIS Move 1 ──┐
              ├── Join Geometry ── PTP Motion Group ── PRC Task ── Output
AXIS Move 2 ──┘
```

`AXIS Move 2` is pre-set to `A1 = 45°` so the simulation produces a visible sweep.

Now in the panel:

1. Click **Load Task from Geometry Nodes**. The status line confirms the task duration. A toolpath tube appears in the viewport (white = OK, red = alarm).
2. Drag the **Simulation** slider — the robot animates along the toolpath.

To preview a different sweep, edit the `A1` / `A2` / etc. inputs on the AXIS Move nodes and hit Load Task again. (Or enable Auto-simulate, see Section 9.)

---

## 3. Building Custom Programs — the Add Menu

Inside the `PRC_Program` Geometry Nodes tree, press **Shift + A** and find the **PRC** submenu (kinematic icon). Sections:

| Section | What's in it |
|---|---|
| **Motion Commands** | `PRC AXIS Move`, `PRC PTP Move`, `PRC LIN Move` |
| **Motion Groups** | `PRC PTP Motion Group`, `PRC Cartesian Motion Group`, `PRC Action Group` (5.2+) |
| **Helpers** | `PRC Curve Helper`, `PRC Mesh Path Helper`, `PRC Animation Helper`, `PRC Grease Pencil Helper` |
| **Modifiers** | `PRC Approach Retract`, `PRC Orient to Point` |
| **Actions** *(5.2+ only)* | `PRC Insert Code` |
| **Task** | `PRC Task` |

**The pipeline shape** is always the same:

```
[motion commands or helpers] → Join Geometry → [optional modifiers] → PRC Task → Output
```

---

## 4. Motion Commands

### AXIS Move (joint-space)
Inputs: `A1..A6` (degrees), `Speed` (KUKA percentage). Each instance produces one joint-target waypoint.

### PTP Move
Inputs: `Object` (optional Empty whose world transform drives the waypoint), `Position`, `Rotation` (added on top of Object's transform), `Speed`, `Posture`.

### LIN Move
Inputs: `Object`, `Position`, `Rotation`, `Speed` (m/s).

**Pattern**: drop several motion commands → Join Geometry → wrap in a Motion Group → PRC Task.

```
LIN_1  ──┐
LIN_2  ──┤── Join Geometry ── PRC Cartesian Motion Group ── PRC Task ── Output
LIN_3  ──┘
```

Mix motion types by placing each batch into its own motion group, then joining the groups with plain **Join Geometry** before Task. Each `Cartesian Motion Group` / `PTP Motion Group` instance becomes a separate motion group in the program.

```
PTP MG  ──┐
LIN MG  ──┤── Join Geometry ── PRC Task ── Output
LIN MG  ──┘
```

Plain **Join Geometry** is all you need to combine multiple Motion Groups, Action Groups, or Curve Helpers — each instance is automatically tagged so the reader keeps them as separate groups in the program.

> **Don't mix motion types inside a single Motion Group.** A `PRC PTP Motion Group` may only contain `AXIS` and `PTP` commands; a `PRC Cartesian Motion Group` may only contain `LIN` commands. The reader rejects mismatched wiring with a clear error message.

---

## 5. Helpers (point a curve / mesh / object at the helper, get a complete motion group)

### Curve Helper
Inputs: `Curve` (Object), `Divisions` (Int, *per spline*), `Orientation` (optional Object), `Speed` (m/s), `First as PTP` (Bool), `Posture` (Int).

Each **spline** in the source curve becomes its own motion group. A 3-spline curve with `Divisions=10` produces 3 motion groups of 10 waypoints each.

- **First as PTP = False** → N Cartesian motion groups, all LIN. One group per spline.
- **First as PTP = True** → For each spline, **two** motion groups: a PTP Motion Group containing only the first sample, then a Cartesian Motion Group with the remaining samples as LIN. A 3-spline curve emits 6 motion groups (3 PTP + 3 CP) in spline order.

### Mesh Path Helper
Inputs: `Mesh` (Object), `Orientation` (Object), `Use Normal` (Bool), `Flip Normal` (Bool), `Speed`, `PTP` (Bool), `Tool ID`, `Posture`.

Vertex order = path order. Use this for edge loops, polylines, or any mesh whose vertex ordering matters.

- **Use Normal = False** → orientation taken from the Orientation object's rotation.
- **Use Normal = True** → orientation derived from each vertex's normal (works on faces). Local +Z aligns to the normal; rotation around the normal is arbitrary — chain `PRC Orient to Point` after this if you need controlled X.
- **PTP = True** wraps in a PTP Motion Group, else Cartesian Motion Group.
- **Tool ID** picks which entry of the robot's tool dictionary the resulting motion group runs with. Leave at `0` to use the default tool you configured in the panel; set to a non-zero number to reference an additional tool you've registered on the server.
- **Posture** only applies when **PTP = True** — it's the joint-configuration code (zero-padded to 3 digits at submit time, e.g. `010`) used by the PTP waypoints.

### Animation Helper / Grease Pencil Helper
Both are thin wrappers for discoverability. Point `Source` at the baked path mesh you create via the panel's Animation Source / Grease Pencil Source sub-panels (see Section 8).

---

## 6. Modifiers

### Approach Retract
Inputs: `Geometry` (one or more motion groups), `Offset Start` (m), `Offset End` (m).

Duplicates the first and last waypoint of **each Cartesian motion group** in the input, offset along **world +Z**. The new waypoints inherit the source point's `prc_motion_group`, so they stay inside the same group — they just bracket it. PTP motion groups and Action groups in the same input pass through untouched. A 3-CP-group input gets 3 approach + 3 retract points; PTP groups in the same stream contribute zero extra waypoints.

Mixed input is therefore safe: drop a Curve Helper output (with `First as PTP` enabled) or a Join Geometry of mixed PTP + CP groups straight in, and only the CP segments grow approach/retract flanks.

Set either offset to 0 to disable that side. World +Z is used (rather than the per-vertex tool-Z) so orientation changes inside a single motion group don't tilt the approach direction.

```
LIN moves → Join → CP Motion Group ─┐
LIN moves → Join → CP Motion Group ─┼── Join Geometry ── Approach Retract ── PRC Task
LIN moves → Join → CP Motion Group ─┘
```

### Orient to Point
Inputs: `Geometry`, `Target` (Object), `Face Away` (Bool).

For every waypoint, rotates the orientation around its local +Z so local +X points **at** (or away from) the Target object. Useful for:
- Spray nozzles aimed at a workpiece centre.
- Welding torches whose front edge tracks the seam direction.
- Camera-on-flange setups pointing at a focal subject.

Place after motion groups; the helper preserves all other attributes.

---

## 7. Actions (Blender 5.2+)

### Insert Code
Inputs: `Code` (String), `Is Comment` (Bool).

Drop a single inline robot-program line (KRL, RAPID, etc.) into the program flow.

```
... motion groups ...  ─┐
                        ├── Join ── PRC Task ── Output
PRC Insert Code     ───┤
```

For multiple consecutive inline-code instances, just join them.

---

## 8. Auxiliary Sources (collapsible panels under the main panel)

The three sub-panels at the bottom of the main panel (collapsed by default) generate path meshes that you point your Helper nodes at, or play back without PRC.

### Animation Source (ANIM icon)
Bakes any animated Object's motion over a frame range into a path mesh.

1. Pick an animated **Object** (typically an Empty with keyframes).
2. Set **Frame Start / End / Step**.
3. Choose **Mode**: *All LIN*, *All PTP*, or *First PTP, rest LIN*.
4. Set **Speed** (m/s for LIN), **Tool ID**, and **Posture** (PTP only).
5. Click **Bake Animation** — produces `PRC_AnimPath_<name>`.

In the GN tree: drop a **PRC Animation Helper**, point `Source` at `PRC_AnimPath_<name>`, join into Task.

### Grease Pencil Source (pencil icon)
Bakes a Grease Pencil drawing into a path mesh with tangent-derived orientations.

1. Pick a **Grease Pencil** object.
2. Set **Layer Index** / **Frame Index**.
3. Optionally set **Sample Distance** (resample by arc length, 0 = use raw stroke points).
4. Choose **Orient**: *Tangent + World Up* or *Tangent + Up Object* (point the Up Object slot at any object — its +Z becomes the up reference).
5. Choose **Mode**, set **Speed**, **Tool ID**, **Posture**.
6. Click **Bake Grease Pencil** — produces `PRC_GPPath_<name>`.

Drop a **PRC Grease Pencil Helper** in the GN tree, point at the baked mesh.

### Robot Animation (kinematic icon)
Bakes the *simulated* robot motion into a self-contained Blender animation that plays back without PRC running.

Prerequisite: connected, with a task loaded (status line shows duration).

1. Set **Target Name** (default `PRC_RobotAnim`). If a collection of this exact name already exists, its contents are replaced; otherwise nothing in the file is touched.
2. Read the live label: `Duration: …s · FPS: … · Frames: …`. Override **FPS Override** if you want a different sampling rate (0 = use scene FPS).
3. Set **Frame Start** (default 1).
4. Toggle **Set Scene Range** to expand the scene's playback range over the bake.
5. Click **Bake Robot Animation**.

The resulting collection is shareable, renderable, and exportable without PRC installed.

### Studio Environment (scene icon)
Builds a symmetric, 360°-friendly product-shot studio around the robot — a cyclorama backdrop (flat floor → curved corner → vertical wall), an overhead key light, and a configurable ring of rim/fill lights. Sized off the robot's bounding box.

Prerequisite: Setup Robot has run (so the **PRC Robot** collection exists).

1. Set **Floor Radius** (multiplier on the robot's horizontal extent) and **Wall Height** (multiplier on the robot's height).
2. Set **Key Power** (overhead light, watts), **Rim Count** (lights in the ring), and **Rim Power** (per-light watts).
3. Click **Build Studio Environment** — produces a `PRC_Studio` collection containing the backdrop and a nested `PRC_Studio_Lights` sub-collection. Re-running rebuilds cleanly.

---

## 9. Live Workflow

### Auto-simulate on Edit
In the **Task & Simulation** box, toggle **Auto-simulate on Edit**. While on, any change to `PRC_Program`'s geometry (a node socket, an upstream Empty's transform, etc.) re-submits the task to PRC after a brief debounce. Disable for big programs where the resubmit cost is noticeable; the manual **Load Task** button still works as a force-reload-now.

### Status indicators
Above Task & Simulation:
- **Toolpath valid** (green check): last task simulated cleanly.
- **Toolpath has alarms** (red banner): part of the path triggered an alarm.
- **No toolpath loaded** (dim dot): nothing submitted yet.

### Disconnect
Stops the feedback stream, resets connection state, unlocks Robot Setup / Tool fields. Existing `A0..A6`, `TCP`, `Tool`, and `PRC_Toolpath_*` objects survive — Setup Robot reuses them.

---

## 10. Putting It All Together — A Realistic Recipe

**Goal**: spray-paint along three offset polylines on a curved surface, with safe approach/retract on each pass, and a baked animation for client review.

1. Setup Robot, configure your tool TCP, Setup Robot.
2. Generate Geometry Node Groups.
3. In the scene: a Curve object with three splines tracing the paint passes, plus an Empty whose +Z is the desired tool axis.
4. Open the `PRC_Program` GN tree and wire:

```
Curve (3 splines) ──► PRC Curve Helper ──► PRC Approach Retract ──► PRC Task ──► Output
                       │                       │
       Orientation Empty                  Offset Start = 0.05
       Divisions    = 30                  Offset End   = 0.05
       Speed        = 0.05
       First as PTP = ☑
       Posture      = 10
```

5. Click **Load Task**. Drag the simulation slider to verify each pass.
6. Toggle **Auto-simulate on Edit**; tweak Divisions / Speed interactively until the path looks right.
7. Open the **Robot Animation** sub-panel, set `Target Name = paint_pass_v1`, click **Bake Robot Animation**.
8. Save the .blend. The `paint_pass_v1` collection is now a self-contained baked animation — render it, share it, export to glTF/Alembic, all without needing PRC running.

That's the full workflow.

## 11. Notice of AI use
This document has been generated with the use of AI.