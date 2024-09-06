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

            CultureInfo ci = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentCulture = ci;
            Thread.CurrentThread.CurrentUICulture = ci;

            string ip = "https://localhost:5001";
            Client client = new Client();
            PRC.Library.Robots.KUKA.KUKA_KR610R11002 robot = new PRC.Library.Robots.KUKA.KUKA_KR610R11002();


            Console.WriteLine("Connecting to " + ip);
            var connectFeedback = await client.Connect(ip);

            if (connectFeedback.Status == PRC.Core.Classes.Status.Success)
            {
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

                var simFeedback = await client.AddTask(robotTask, setupFeedback.Settings);

                Console.WriteLine("KRL Code: " + Environment.NewLine + (simFeedback.Result.Code ?? simFeedback.Result.Code) + Environment.NewLine);


                Console.WriteLine("Process will take approximately " + simFeedback.Result.Time + " seconds.");

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

        internal static void RobotStateUpdated(object sender, Client.RobotStateUpdatedEventArgs e)
        {
            if (e.RobotState != null)
            {
                string actualAxisPosition = "";
                for (int i = 0; i < e.RobotState.ActualAxisPosition.AxisValues.Length; i++)
                {
                    actualAxisPosition += "A" + (i + 1).ToString() + ": " + e.RobotState.ActualAxisPosition.AxisValues[i].ToString() + " ";
                }
                Console.WriteLine("At simulation state " + e.RobotState.NormalizedToolpathFactor + " the actual axis position is: " + actualAxisPosition);
            }
        }

        internal static void RobotSettingsUpdated(object? sender, Client.RobotSettingsUpdatedEventArgs e)
        {
            Console.WriteLine("Robot settings updated. New settings are: " + e.RobotSettings.ToString());
        }
    }
}