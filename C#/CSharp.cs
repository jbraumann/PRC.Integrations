// Parametric Robot Control - C# Sample (raw gRPC).
//
// Talks to a running PRC server directly through the generated gRPC client,
// without referencing any further PRC libraries. CsharpLibrary.cs shows the
// same sequence using the PRC.GRPC.Client wrapper instead.
//
// Connects to the server, sets up a KUKA robot, sends it a small task, and
// scrubs through the resulting simulation - the same lifecycle every other
// PRC integration follows:
//   1. SetupRobot              defines the robot model, driver, tool and base.
//   2. SubscribeRobotFeedback  opens the persistent feedback stream.
//   3. AddRobotTask            sends motion commands, returns the simulation and code.
//   4. GetSimulatedRobotState  queries the robot state anywhere along the toolpath.
//
// Requires the PRC.GRPC project (or its compiled protos) and the
// Grpc.Net.Client NuGet package. The PRC server's certificate must be trusted
// by the system - the server installs it on its first start.

using Grpc.Core;
using Grpc.Net.Client.Configuration;
using Grpc.Net.Client;
using Grpc.Net.Compression;
using PRC.GRPC;
using System.Globalization;
using Task = System.Threading.Tasks.Task;

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
            string robotID = "PRC_Test";
            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            AsyncServerStreamingCall<RobotFeedback> dataStreamingCall;

            // The channel retries dropped connections, lifts the default message
            // size limits - simulation results can get large - and enables compression.
            var defaultMethodConfig = new MethodConfig
            {
                Names = { MethodName.Default },
                RetryPolicy = new RetryPolicy
                {
                    MaxAttempts = 5,
                    InitialBackoff = TimeSpan.FromSeconds(1),
                    MaxBackoff = TimeSpan.FromSeconds(3),
                    BackoffMultiplier = 1.5,
                    RetryableStatusCodes = { StatusCode.Unavailable }
                }
            };

            var grpcChannel = GrpcChannel.ForAddress(ip, new GrpcChannelOptions
            {
                ServiceConfig = new ServiceConfig { MethodConfigs = { defaultMethodConfig } },
                MaxReceiveMessageSize = null,
                MaxSendMessageSize = null,
                CompressionProviders = new List<ICompressionProvider>() { new Grpc.Net.Compression.GzipCompressionProvider(System.IO.Compression.CompressionLevel.Fastest) }
            });

            var client = new ParametricRobotControlService.ParametricRobotControlServiceClient(grpcChannel);

            // A ping confirms that the server is reachable before setting up the robot.
            var pingData = await client.SendPingAsync(new Ping
            {
                Payload = "",
                TimeMs = System.DateTimeOffset.Now.ToUnixTimeMilliseconds()
            });

            if (grpcChannel.State != ConnectivityState.Ready)
            {
                Console.WriteLine("Did not connect successfully...");
            }

            // UpdateVariable without a variable name simply queries the current
            // variables of all connected robots.
            var returndata = await client.UpdateVariableAsync(new UpdateVariableRequest { Id = "", Var = new Variable() });

            // Step 1: Set up a preset KUKA robot with its driver, plus a default
            // tool "0" and base "0" at the world origin. The classes for other
            // robots and drivers are listed in the PRC server's interface.
            var setupData = await client.SetupRobotAsync(new SetupRobotRequest
            {
                ClientId = robotID,
                SoftwareVersion = "0.1",
                RobotSetup = new Robot()
                {
                    FriendlyId = "KUKA KR10",
                    InitialBase = new Base()
                    {
                        BaseFrame = new CartesianPosition()
                        {
                            Cs = new CoordinateSystem()
                            {
                                Origin = new Vector3 { X = 0, Y = 0, Z = 0 },
                                XAxis = new Vector3 { X = 1, Y = 0, Z = 0 },
                                YAxis = new Vector3 { X = 0, Y = 1, Z = 0 },
                            }
                        },
                        BaseId = "0"
                    },
                    RobotDriverClass = "KUKA.KSS_KRL_Driver",
                    PresetRobotClass = "KUKA.KUKA_KR610R11002",
                    ToolDictionary =
                    {
                        { "0", new Tool()
                            {
                                Tcp = new CartesianPosition()
                                {
                                    Cs = new CoordinateSystem()
                                    {
                                        Origin = new Vector3 { X = 0, Y = 0, Z = 0 },
                                        XAxis = new Vector3 { X = 1, Y = 0, Z = 0 },
                                        YAxis = new Vector3 { X = 0, Y = 1, Z = 0 },
                                    }
                                },
                                ToolId = "0",
                                ToolType = FrameType.Fixed
                            }
                        }
                    }
                }
            });

            // Step 2: Subscribe to the feedback stream. The server continuously
            // sends heartbeats, robot states and settings updates through it,
            // handled in a background task until the token is cancelled.
            try
            {
                dataStreamingCall = client.SubscribeRobotFeedback(new SubscribeRobotFeedbackRequest { Id = robotID }, null, null, cancellationTokenSource.Token);

                var readTask = Task.Run(async () =>
                {
                    await foreach (var response in dataStreamingCall.ResponseStream.ReadAllAsync(cancellationTokenSource.Token))
                    {
                        if (response != null)
                        {
                            switch (response.DataPackageCase)
                            {
                                case RobotFeedback.DataPackageOneofCase.None:
                                    break;
                                case RobotFeedback.DataPackageOneofCase.HeartbeatData:
                                    //received heartbeat event
                                    Console.WriteLine("Received heartbeat: " + response.HeartbeatData.Beat);
                                    break;
                                case RobotFeedback.DataPackageOneofCase.RobotStateData:
                                    //new robot state event
                                    string actPos = "A1: " + response.RobotStateData.AxisPosition.AxisValues[0] + ", A2: " + response.RobotStateData.AxisPosition.AxisValues[1] + ", A3: " + response.RobotStateData.AxisPosition.AxisValues[2] + ", A4: " + response.RobotStateData.AxisPosition.AxisValues[3] + ", A5: " + response.RobotStateData.AxisPosition.AxisValues[4] + ", A6: " + response.RobotStateData.AxisPosition.AxisValues[5];
                                    Console.WriteLine("Robot is at: " + actPos);
                                    break;
                                case RobotFeedback.DataPackageOneofCase.SettingsData:
                                    //Settings updated event
                                    Console.WriteLine("Received " + response.SettingsData.SettingsDictionary.Count + " settings objects.");
                                    break;
                                case RobotFeedback.DataPackageOneofCase.PingData:
                                    //Ping event
                                    Console.WriteLine("Was pinged: " + response.PingData.Payload);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }, cancellationTokenSource.Token);
            }
            catch (Exception e)
            {
                Console.WriteLine("Failed to subscribe to robot updates: " + e.Message);
            }

            // Step 3: Build a task from two PTP motions defined in joint space
            // and send it to the robot. The speed is a single value for all axes.
            var ptpMotion1 = new MotionCommand()
            {
                AxisMotion = new AxisMotion()
                {
                    Target = new JointTarget()
                    {
                        AxisValues = { -45, -90, 90, 0, 0, 0 },
                        Speed = { 0.15f }
                    }
                }
            };

            var ptpMotion2 = new MotionCommand()
            {
                AxisMotion = new AxisMotion()
                {
                    Target = new JointTarget()
                    {
                        AxisValues = { 45, -90, 90, 0, 0, 0 },
                        Speed = { 0.15f }
                    }
                }
            };

            var ptpMotionGroup = new MotionGroup()
            {
                Commands = { ptpMotion1, ptpMotion2 },
                Interpolation = "C_PTP",
                MotionGroupType = MotionGroupType.Ptp,
            };

            // The robot settings returned by SetupRobot are passed back with the
            // task. They can be modified here, e.g. to change driver options.
            var req = new AddRobotTaskRequest
            {
                Id = robotID,
                RobotTask = new GRPC.Task()
                {
                    Name = "InitTest",
                    Payload = { new TaskPayload { MotionGroupTask = ptpMotionGroup } },
                    Type = TaskType.SimulateAndExecuteTask
                },
                RobotSettings = new Settings()
                {
                    SettingsDictionary = { setupData.RobotSettings.SettingsDictionary }
                }
            };

            var toolpath = await client.AddRobotTaskAsync(req);

            Console.WriteLine("KRL Code: " + Environment.NewLine + toolpath.SimulationResultData.Code + Environment.NewLine);

            // Step 4: Scrub through the simulated toolpath from start (0.0) to
            // end (1.0), similar to the simulation slider in the PRC interface.
            // With StreamUpdate = true the resulting states arrive through the
            // feedback stream above instead of the direct reply.
            int i = 0;
            while (i < 100)
            {
                await Task.Delay(400);
                i += 4;
                Console.WriteLine("Getting simulated state at factor " + (float)i / 100);
                await client.GetSimulatedRobotStateAsync(new GetSimulatedRobotStateRequest { Id = robotID, NormalizedState = (float)i / 100, StreamUpdate = true });
            }

            Console.WriteLine("Raw GRPC simulation done.");

            // Cancelling the token ends the feedback task, then the stream is
            // given a moment to close down.
            cancellationTokenSource.Cancel();
            await Task.Delay(1000);
        }
    }
}
