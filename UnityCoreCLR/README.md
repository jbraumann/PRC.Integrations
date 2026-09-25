# PRC · Clear the Table (Unity, CoreCLR)

A small Unity game on top of Parametric Robot Control. Pick one of the robots in the PRC
library, click the table or a box to place pins, and PRC plans a point-to-point (PTP) motion
through them with that robot's real kinematics, reach and speed. Press **Run** and the robot
swings through the pins and knocks the towers over. The robot, its geometry and collision
hulls, every pose of its motion, the cycle time and the program for its own controller all
come from the PRC server.

This folder is a complete Unity project (Unity 6.7, Universal Render Pipeline, Input System)
whose players run on Unity's **CoreCLR** scripting backend: .NET's HTTP/2 client is what gRPC
needs.

## Run it

1. Start the PRC server (it listens on `https://127.0.0.1:5001`).
2. In Unity Hub, add this folder as a project and open it with Unity 6.7 (6000.7.0b1 or later).
   Unity downloads the packages and imports the project on the first start.
3. File > Build And Run. The scene `Assets/PRC/Showcase/Clear the Table.unity` is in the build
   list, and the scripting backend is already set to CoreCLR.

Play Mode in the Unity 6.7 Editor runs on Mono, which has no HTTP/2 client: the showcase then
shows a notice instead of connecting. Build a player to play.

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

## What is where

| Folder | Content |
|---|---|
| `Assets/PRC/Client` | The robot, ready to copy into your own project: `PrcRobot` (connect, set up, build from PRC's geometry, plan, play), `PrcChannel`, `PrcPresets`, `PrcConvert`, and the PRC.GRPC API generated from `prc.proto` |
| `Assets/PRC/Showcase` | The game: pins, runs, score, tool, table, UI and the scene |
| `Assets/PRC/Plugins` | gRPC for .NET (Grpc.Net.Client, Grpc.Net.Common, Grpc.Core.Api as netstandard2.1 builds) and Google.Protobuf; `CoreCLR/` adds two Microsoft.Extensions abstractions the players need |
| `Assets/Settings` | The Universal Render Pipeline assets |
| `ProjectSettings`, `Packages` | Unity's project settings (CoreCLR backend, URP, Input System) and packages |

`Assets/PRC/README.md` explains the code: how the robot talks to PRC, the robot's lifetime on
the server, blending through the pins, and how to regenerate the protocol code after a change
to `prc.proto`.

To use the robot in your own project, copy `Assets/PRC/Client` and `Assets/PRC/Plugins`, set
the scripting backend to CoreCLR, and put a `PrcRobot` on a GameObject:

```csharp
await robot.ConnectAsync();
await robot.SetupAsync("my-robot", new Prc.Robot { PresetRobotClass = "KUKA.KUKA_KR6R700", RobotDriverClass = "KUKA.KSS_KRL_Driver" });
var plan = await robot.PlanAsync(task);   // a Prc.Task: simulation and program
await robot.PlayAsync(plan.Time);         // straight from PRC's simulation
```

## Why the protocol code is generated

Unity 6.7 compiles scripts against .NET Standard 2.1, also for CoreCLR players, so the
net8.0 PRC.GRPC package cannot be referenced yet. The showcase uses the same API, generated
from `prc.proto` into the `PRC.GRPC` namespace. Once Unity compiles against .NET 10 (its
.NET API compatibility level), the PRC.GRPC package and its client can replace
`Assets/PRC/Client/Generated`.
