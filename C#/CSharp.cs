using Grpc.Core;
using Grpc.Net.Client.Configuration;
using Grpc.Net.Client;
using Grpc.Net.Compression;
using PRC.GRPC;
using System.Globalization;

namespace PRC.Integration
{
    public class Program
    {
        static async System.Threading.Tasks.Task Main()
        {
            Console.WriteLine("Starting...");

            CultureInfo ci = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentCulture = ci;
            Thread.CurrentThread.CurrentUICulture = ci;

            string ip = "https://127.0.0.1:5001";
            string robotID = "PRC_Test";
            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            AsyncServerStreamingCall<RobotFeedback> dataStreamingCall;

            PRC.GRPC.ParametricRobotControlService.ParametricRobotControlServiceClient client = new PRC.GRPC.ParametricRobotControlService.ParametricRobotControlServiceClient(GrpcChannel.ForAddress(ip));

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

            client = new PRC.GRPC.ParametricRobotControlService.ParametricRobotControlServiceClient(grpcChannel);

            var pingData = await client.SendPingAsync(new Ping
            {
                Payload = "",
                TimeMs = System.DateTimeOffset.Now.ToUnixTimeMilliseconds()
            });

            if (grpcChannel.State != ConnectivityState.Ready)
            {
                Console.WriteLine("Did not connect successfully...");
            }

            var returndata = await client.UpdateVariableAsync(new UpdateVariableRequest { Id = "", Var = new Variable() });


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

            try
            {
                dataStreamingCall = client.SubscribeRobotFeedback(new SubscribeRobotFeedbackRequest { Id = robotID }, null, null, cancellationTokenSource.Token);

                var readTask = System.Threading.Tasks.Task.Run(async () =>
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
                                    Console.WriteLine("Received hearbeat: " + response.HeartbeatData.Beat);
                                    break;
                                case RobotFeedback.DataPackageOneofCase.RobotStateData:
                                    //new robot state event
                                    string actPos = "A1: " + response.RobotStateData.ActualAxisPosition.AxisValues[0] + ", A2: " + response.RobotStateData.ActualAxisPosition.AxisValues[1] + ", A3: " + response.RobotStateData.ActualAxisPosition.AxisValues[2] + ", A4: " + response.RobotStateData.ActualAxisPosition.AxisValues[3] + ", A5: " + response.RobotStateData.ActualAxisPosition.AxisValues[4] + ", A6: " + response.RobotStateData.ActualAxisPosition.AxisValues[5];
                                    Console.WriteLine("Robot is at: " + actPos);
                                    break;
                                case RobotFeedback.DataPackageOneofCase.SettingsData:
                                    //Settings updated event
                                    Console.WriteLine("Received " + response.SettingsData.SettingsDictionary.Count + "settings objects.");
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
                Console.WriteLine("Failed to subscribe to robot updates: " + e.Message, robotID);
            }

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

            Console.WriteLine("KRL Code: " + Environment.NewLine + (toolpath.SimulationResultData.Code ?? toolpath.SimulationResultData.Code) + Environment.NewLine);

            int i = 0;
            while (i < 100)
            {
                await System.Threading.Tasks.Task.Delay(400);
                i += 3;
                if (i <= 100)
                {
                    Console.WriteLine("Getting simulated state at factor " + (float)i / 100);
                    var robotState = await client.GetSimulatedRobotStateAsync(new GetSimulatedRobotStateRequest { Id = robotID, NormalizedState = (float)i / 100, AsyncStreamUpdate = true });
                }
            }



            Console.WriteLine("Raw GRPC simulation done.");
            cancellationTokenSource.Cancel();

            await System.Threading.Tasks.Task.Delay(1000);


        }
    }
}