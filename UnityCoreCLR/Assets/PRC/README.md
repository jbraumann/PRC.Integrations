# PRC · Clear the Table

A small Unity game on top of Parametric Robot Control. Pick one of the robots in the PRC
library, click the table or a box to place pins, and PRC plans a point-to-point (PTP) motion
through them with that robot's real kinematics, reach and speed. Press **Run** and the robot
swings through the pins and knocks the towers over. Clear the table in as few runs as you can.

Everything robot-related comes from the PRC server: the list of robots, their geometry and
collision hulls, the motion (every joint, every millisecond), the cycle time, reach warnings,
and the program for the robot's own controller (KRL, RAPID, URScript, LS, …), which the
**Program** panel shows.

## Run it

1. Start the PRC server (it listens on `https://127.0.0.1:5001`).
2. Build and run a player (File > Build And Run). The project's scripting backend is
   CoreCLR, which gRPC needs; Play Mode in the Unity 6.7 Editor runs on Mono and shows a
   warning instead of connecting (see *CoreCLR only* below).

| Input | Action |
|---|---|
| Left-click on the table, a box or the floor | Place a pin |
| Left-click on a pin | Remove it |
| **Run** / Space | Run the robot through the pins (and back home) |
| **Undo** / Backspace | Remove the last pin |
| **Reset table** / R | Stack the towers again |
| ‹ › / [ ] | Switch robot |
| **Demo** | Place pins through some towers and run |
| Right-drag, mouse wheel | Orbit, zoom |

Blue pins and path are PRC's plan. A red pin is out of the robot's reach; remove it to run.
With a PRC Community license, the robots whose program generator needs a full license are
not offered.

## Code map

`Client/` is the robot: everything PRC, nothing about the game. Copy it into another project
and a robot stands in your scene with a few calls:

```csharp
await robot.ConnectAsync();                                   // PrcRobot on any GameObject
await robot.SetupAsync("my-robot", new Prc.Robot { PresetRobotClass = "KUKA.KUKA_KR6R700", RobotDriverClass = "KUKA.KSS_KRL_Driver" });
var plan = await robot.PlanAsync(task);                       // a Prc.Task: simulation + program
await robot.PlayAsync(plan.Time);                             // straight from PRC's simulation
```

| File | Role |
|---|---|
| `PrcRobot.cs` | The robot component: connects, sets a robot up (and keeps it alive on the server), builds it from `GetRobotData` (one GameObject per link, a kinematic rigidbody with PRC's hulls as colliders), plans tasks, poses the robot and plays motions through the physics engine |
| `PrcChannel.cs` | The gRPC channel, the PRC root CA it trusts, and the CoreCLR check with its warning |
| `PrcPresets.cs` | What each vendor's driver expects: offline driver, posture codes, PTP speed unit, start position, tool numbers |
| `PrcConvert.cs` | PRC (mm, right-handed, Z up) ↔ Unity (m, left-handed, Y up): points, frames, colours, meshes |
| `Generated/` | The PRC.GRPC API: C# generated from `prc.proto` |

`Showcase/` is the game: `ClearTheTable.cs` (flow, pins, planning, runs, score), `Pusher.cs`
(the tool as a PRC tool), `TableLevel.cs` (studio, table, boxes), `PlanView.cs` (pins and
PRC's path), `ShowcaseUI.cs` + `UI/Showcase.uss` (UI Toolkit overlay), `OrbitCamera.cs`.

Things to change first:

- **Tool orientation**: `ClearTheTable.PinFrame` points the tool straight down. Any frame
  works; PRC tells you (red pin) when a robot cannot reach it.
- **Motion type**: use `MotionGroupType.Cp` with `LINMotion` commands for straight moves
  (CP speed is in m/s) and compare the path with PTP.
- **Blending**: with `BlendThroughPins` the motion group carries PRC's interpolation token
  `C_PTP`. The robot keeps its speed through the pins (about half the robot time of stopping
  at each), and the program approximates them in the vendor's own form: C_PTP, zones,
  blend radii, CNT.
- **Tool**: `Pusher.Create` builds a PRC tool with a `PolyMesh` in flange coordinates (Z
  points away from the flange). The same geometry goes to PRC and, through the robot's data,
  into the scene.
- **Posture**: `PrcPresets.FrontElbowUp` picks the arm configuration per vendor. On a UR it
  is `001` (elbow up); an empty posture is the solver's default branch, which on a UR bends
  the elbow down and takes the upper arm through the table.

## How it talks to PRC

`PrcRobot` makes six kinds of calls:

| Call | What for |
|---|---|
| `DescribeLibrary` | Which robots and drivers exist, and the license (the game asks through `PrcRobot.Service`) |
| `SetupRobot` | The robot, its driver (the program generator) and the pusher tool |
| `SubscribeRobotFeedback` | Keeps the robot set up: PRC removes it when this stream closes |
| `GetRobotData` | Link meshes, colours, convex collision hulls, axes, flange frame |
| `AddRobotTask` | Plan home → pins → home: simulation samples, cycle time, alarms, program |
| `GetSimulatedRobotState` | The pose of every link at a moment of the plan (0 = start, 1 = end), asked for every physics step while the robot runs |

PRC holds a robot only while its feedback stream is open. When the showcase quits (or
crashes), the connection closes and the server removes the robot; nothing has to be sent.
During a run, PRC's own 3D view follows the robot, because every pose comes from its
simulation at the moment the robot needs it.

## CoreCLR only

gRPC runs on HTTP/2, and the PRC server speaks nothing else. .NET's `HttpClient` has HTTP/2,
Mono's and IL2CPP's do not, so PRC runs in players on the **CoreCLR** scripting backend. Play
Mode in the Unity 6.7 Editor (Mono), or a player built for Mono or IL2CPP, shows a warning
that says what to do instead (`PrcChannel.IsSupported`, `NotSupportedReason`). Once the Editor
runs on CoreCLR too, Play Mode connects without a change.

- `Plugins/` holds one gRPC set for Editor and players (Grpc.Net.Client, Grpc.Net.Common and
  Grpc.Core.Api 2.84.0 as netstandard2.1 builds, Google.Protobuf 3.36.2); the Editor only
  compiles against it.
- `Plugins/CoreCLR/` adds the two `Microsoft.Extensions` abstractions gRPC needs, which the
  Editor's Mono has and .NET 10 players do not (selected by the `ENABLE_CORECLR` define).

The PRC.GRPC NuGet package (its .NET client, converters and the PRC.Core object model) is
built for net8.0, and the Unity 6.7 Editor compiles scripts against .NET Standard 2.1, which
refuses it (CS1705). The showcase therefore uses the same API generated from `prc.proto`.

The server's TLS certificate is signed by the PRC root CA, which the server installs on its
first start. `PrcChannel` also accepts the chain if it ends in the embedded PRC root.

## Regenerating the protocol code

After a change to `prc.proto`, copy the new file into `Client/Generated` and run, in that
folder, the `protoc` and `grpc_csharp_plugin` of the `Grpc.Tools` NuGet package
(`tools/windows_x64`):

```
protoc --proto_path=. --csharp_out=. --grpc_out=. --grpc_opt=no_server ^
  --plugin=protoc-gen-grpc=grpc_csharp_plugin.exe prc.proto
```

## Command line (players)

`-prcServer <address>`, `-prcRobot <preset class, e.g. UR.UR_10e>`, `-prcDemo` (run the demo
once the robot stands), `-prcProgram` (open the program afterwards), `-prcScreenshot <file>`,
`-prcQuit`.
