// Parametric Robot Control - C# Sample (PRC.GRPC.Client wrapper).
//
// Shows the same sequence as CSharp.cs, but through the PRC.GRPC.Client
// wrapper and the PRC.Core/PRC.Library classes instead of raw gRPC messages:
// the wrapper manages the channel, the feedback stream and the robot settings,
// and raises events when new data arrives.
//
//   1. Connect / SetupRobot  defines the robot model, driver, tool and base.
//   2. AddTask               sends motion commands, returns the simulation and code.
//   3. UpdateRobot           queries the robot state anywhere along the toolpath.
//
// Requires the PRC.GRPC, PRC.Core and PRC.Library projects (or their compiled
// assemblies). The PRC server's certificate must be trusted by the system -
// the server installs it on its first start.

using Task = System.Threading.Tasks.Task;
using System.Globalization;
using PRC.GRPC.Client;

namespace PRC.Integration
{
    public class Program
    {
        static async Task Main()
        {

            Console.WriteLine("Starting...");

            // Numbers sent to robot controllers must be formatted independently
            // of the machine's regional settings.
            CultureInfo ci = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentCulture = ci;
            Thread.CurrentThread.CurrentUICulture = ci;

            string ip = "https://127.0.0.1:5001";
            Client client = new Client();

            // The robot is a preset class from the PRC library, here a KUKA KR610.
            PRC.Library.Robots.KUKA.KUKA_KR610R11002 robot = new PRC.Library.Robots.KUKA.KUKA_KR610R11002();

            Console.WriteLine("Connecting to " + ip);
            var connectFeedback = await client.Connect(ip);

            if (connectFeedback.Status == PRC.Core.Classes.Status.Success)
            {
                // The wrapper raises events whenever a robot state or new
                // settings arrive through the feedback stream.
                client.RobotStateUpdatedEventHandler += new EventHandler<Client.RobotStateUpdatedEventArgs>(RobotStateUpdated);
                client.RobotSettingsUpdatedEventHandler += new EventHandler<Client.RobotSettingsUpdatedEventArgs>(RobotSettingsUpdated);

                Console.WriteLine("Adding tool 0 to the tool dictionary.");

                PRC.Core.Classes.Tool tool = new PRC.Core.Classes.Tool();
                robot.ToolDictionary = new Dictionary<string, PRC.Core.Classes.Tool>
                {
                    ["0"] = tool
                };

                Console.WriteLine("Creating a default base 0.");
                robot.InitialBase = new PRC.Core.Classes.Base();

                Console.WriteLine("Setting up robot with a unique ID.");
                var setupFeedback = await client.SetupRobot("Unique robot ID", robot, "KUKA.KSS_KRL_Driver");

                Console.WriteLine("The feedback contains the current settings. These are " + "{" + string.Join(",", setupFeedback.Settings.Select(kv => kv.Key + "=" + kv.Value).ToArray()) + "}");

                // The task combines two PTP motions defined in joint space into
                // a motion group. The speed is a single value for all axes.
                PRC.Core.Commands.Task robotTask = new PRC.Core.Commands.Task();
                robotTask.TaskType = PRC.Core.Primitives.Enums.TaskType.SimulateAndExecuteTask;
                robotTask.Name = "InitTest";

                PRC.Core.Commands.Motion.Groups.PTPMotionGroup ptpMotionGroup = new PRC.Core.Commands.Motion.Groups.PTPMotionGroup();
                ptpMotionGroup.Base = new PRC.Core.Classes.Base();
                ptpMotionGroup.ToolID = "0";
                ptpMotionGroup.Interpolation = "C_PTP";
                ptpMotionGroup.PTPMotions = new PRC.Core.Interfaces.IMotion[2];

                ptpMotionGroup.PTPMotions[0] = (new PRC.Core.Commands.Motion.Axis()
                {
                    Target = new PRC.Core.Primitives.JointTarget()
                    {
                        AxisValues = new float[] { -45, -90, 90, 0, 0, 0 },
                        Speed = new float[] { 0.15f }
                    }
                });

                ptpMotionGroup.PTPMotions[1] = (new PRC.Core.Commands.Motion.Axis()
                {
                    Target = new PRC.Core.Primitives.JointTarget()
                    {
                        AxisValues = new float[] { 45, -90, 90, 0, 0, 0 },
                        Speed = new float[] { 0.15f }
                    }
                });

                robotTask.Commands.Add(ptpMotionGroup);

                // The settings returned by SetupRobot are passed back with the
                // task. They can be modified here, e.g. to change driver options.
                var simFeedback = await client.AddTask(robotTask, setupFeedback.Settings);

                // Result.Files lists every generated file with its name, the
                // primary program first (a KRL module on iiQKA.OS 2 is a
                // .src + .dat pair). Result.Code always repeats the primary
                // file's content; an older server leaves the list empty, then
                // the client names the file itself.
                if (simFeedback.Result.Files.Count > 0)
                {
                    foreach (var programFile in simFeedback.Result.Files)
                    {
                        Console.WriteLine("Generated file " + programFile.Name + ":" + Environment.NewLine + programFile.Content + Environment.NewLine);
                    }
                }
                else
                {
                    Console.WriteLine("KRL Code: " + Environment.NewLine + simFeedback.Result.Code + Environment.NewLine);
                }

                Console.WriteLine("Process will take approximately " + simFeedback.Result.Time + " seconds.");

                // Scrub through the simulated toolpath from start (0.0) to end
                // (1.0), similar to the simulation slider in the PRC interface.
                // The second argument streams the states through the feedback
                // stream, so they arrive in RobotStateUpdated below.
                await Task.Delay(400);
                int i = 0;
                while (i < 100)
                {
                    await Task.Delay(500);
                    i += 3;
                    if (i <= 100)
                    {
                        await client.UpdateRobot((float)i / 100, true);
                    }
                }

                Console.WriteLine("Wrapper robot simulation done.");
            }

            client.RobotStateUpdatedEventHandler -= new EventHandler<Client.RobotStateUpdatedEventArgs>(RobotStateUpdated);
            client.RobotSettingsUpdatedEventHandler -= new EventHandler<Client.RobotSettingsUpdatedEventArgs>(RobotSettingsUpdated);

        }

        internal static void RobotStateUpdated(object? sender, Client.RobotStateUpdatedEventArgs e)
        {
            //new robot state event
            if (e.RobotState != null)
            {
                string actualAxisPosition = "";
                for (int i = 0; i < e.RobotState.AxisPosition.AxisValues.Length; i++)
                {
                    actualAxisPosition += "A" + (i + 1).ToString() + ": " + e.RobotState.AxisPosition.AxisValues[i].ToString() + " ";
                }
                Console.WriteLine("At simulation state " + e.RobotState.NormalizedToolpathFactor + " the actual axis position is: " + actualAxisPosition);
            }
        }

        internal static void RobotSettingsUpdated(object? sender, Client.RobotSettingsUpdatedEventArgs e)
        {
            //Settings updated event
            Console.WriteLine("Robot settings updated. New settings are: " + e.RobotSettings.ToString());
        }
    }
}
