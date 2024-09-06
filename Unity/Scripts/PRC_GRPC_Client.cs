using Grpc.Core;
using Grpc.Net.Client.Configuration;
using Grpc.Net.Client.Web;
using Grpc.Net.Client;
using Grpc.Net.Compression;
using PRC.GRPC;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Threading;
using UnityEngine;
using Cysharp.Net.Http;

public class PRC_GRPC_Client
{
    PRC.GRPC.ParametricRobotControlService.ParametricRobotControlServiceClient client;
    string robotID = "PRC_Test";
    public Settings settings;
    public RobotState state;
    public async System.Threading.Tasks.Task SetupPRC()
    {
        CultureInfo ci = new CultureInfo("en-US");
        Thread.CurrentThread.CurrentCulture = ci;
        Thread.CurrentThread.CurrentUICulture = ci;

        string ip = "https://localhost:5001";

        CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        AsyncServerStreamingCall<RobotFeedback> dataStreamingCall;

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

        var rootCerts = @"
-----BEGIN CERTIFICATE-----
MIIDUDCCAjigAwIBAgIQIz8nMNTtjbtKd0dNa7BFUzANBgkqhkiG9w0BAQsFADAj
MSEwHwYDVQQDDBhQYXJhbWV0cmljIFJvYm90IENvbnRyb2wwIBcNMjQwNDEyMDcz
MzAzWhgPMjA1NDA0MTIwNzQzMDNaMCMxITAfBgNVBAMMGFBhcmFtZXRyaWMgUm9i
b3QgQ29udHJvbDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK/5LT9+
TS/gXoIPvFEW4qqofHXIY+gw579u7uyq56rwf+/8nW0S17SLTDM6l28Jao1VEM1u
xPJNLOyaGp1/XTlnMbIJWSP1ZX9ozc4fe2CMk3MClLTJ96FXB8wqXIefQeYAD3ca
vr3rKEF7zO1gNRwELG4tN1bcnVBU2l2U0IGTDu9M6un0dMy+bWFtX6koI++4fUeo
qG+l0JjMh8IQIQ5WH8N4rIdfFs+UtaEbkPJNuov40wLZKjad0LWrChMHv4KwIibx
hLbMkmvjcneplIQle7Oz+eWdJkQ6RJCgYWCtCW463oSihln7vX0nwyi2BDeQCuLg
b/4hhxQyMzEPbEECAwEAAaN+MHwwDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMCBggrBgEFBQcDATAsBgNVHREEJTAjgglsb2NhbGhvc3SHBH8AAAGH
EAAAAAAAAAAAAAAAAAAAAAEwHQYDVR0OBBYEFIWIKWiXu0OuC6XZWnwrYydCIWzz
MA0GCSqGSIb3DQEBCwUAA4IBAQA2M0DSIVyN9LV5UFh6etFL8hlsg89DRFwZLk9Z
/qat3cAm00IdAQjPn4BMD0AQMbD+UEf2y43RdiTKAH2jPL5NkP1qxIxozlxpDRv+
PfA9OYbpSH/VglIlfSBVUgvSJhMvUBYUFoBKTnKUwniLFuGN/ZpVHwXpdwINOle4
ESKraY/uHgSX3Rhd/HcxB1k8hXq/4wzlYJIri3E1N4ecEEDlcX7UpVjZ94iUo30f
MEQpy7l5SVXcD/g13anhAX8elWQfAqMakm0pIhvFkbF578KPppEp7vMv35uBzFrc
tBfpA+QsmOHqQjxoQiQ7WfUsWbFETgz9KT8Qok7rqsbYaDGt
-----END CERTIFICATE-----
";

        var handler = new YetAnotherHttpHandler()
        {
            RootCertificates = rootCerts,
        };

        var grpcChannel = GrpcChannel.ForAddress(ip, new GrpcChannelOptions
        {
            ServiceConfig = new ServiceConfig { MethodConfigs = { defaultMethodConfig } },
            MaxReceiveMessageSize = null,
            MaxSendMessageSize = null,
            HttpHandler = handler,
            CompressionProviders = new List<ICompressionProvider>() { new Grpc.Net.Compression.GzipCompressionProvider(System.IO.Compression.CompressionLevel.Fastest), }
        });

        client = new PRC.GRPC.ParametricRobotControlService.ParametricRobotControlServiceClient(grpcChannel);

        var pingData = client.SendPing(new PRC.GRPC.Ping
        {
            Payload = "",
            TimeMs = System.DateTimeOffset.Now.ToUnixTimeMilliseconds()
        });

        var setupData = client.SetupRobot(new SetupRobotRequest
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
                            Origin = new PRC.GRPC.Vector3 { X = 0, Y = 0, Z = 0 },
                            XAxis = new PRC.GRPC.Vector3 { X = 1, Y = 0, Z = 0 },
                            YAxis = new PRC.GRPC.Vector3 { X = 0, Y = 1, Z = 0 },
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
                                        Origin = new PRC.GRPC.Vector3 { X = 0, Y = 0, Z = 0 },
                                        XAxis = new PRC.GRPC.Vector3 { X = 1, Y = 0, Z = 0 },
                                        YAxis = new PRC.GRPC.Vector3 { X = 0, Y = 1, Z = 0 },
                                    }
                                },
                                ToolId = "0",
                                ToolType = FrameType.Fixed
                            }
                        }
                    }
            }
        });

        settings = setupData.RobotSettings;

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
                                state = response.RobotStateData;
                                string actPos = "A1: " + response.RobotStateData.ActualAxisPosition.AxisValues[0] + ", A2: " + response.RobotStateData.ActualAxisPosition.AxisValues[1] + ", A3: " + response.RobotStateData.ActualAxisPosition.AxisValues[2] + ", A4: " + response.RobotStateData.ActualAxisPosition.AxisValues[3] + ", A5: " + response.RobotStateData.ActualAxisPosition.AxisValues[4] + ", A6: " + response.RobotStateData.ActualAxisPosition.AxisValues[5];
                                Console.WriteLine("Robot is at: " + actPos);
                                break;
                            case RobotFeedback.DataPackageOneofCase.SettingsData:
                                //Settings updated event
                                settings = response.SettingsData;
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
    }

    public async System.Threading.Tasks.Task<string> AddCommands()
    {

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
            RobotTask = new PRC.GRPC.Task()
            {
                Name = "InitTest",
                Payload = { new TaskPayload { MotionGroupTask = ptpMotionGroup } },
                Type = TaskType.SimulateAndExecuteTask
            },
            RobotSettings = new Settings()
            {
                SettingsDictionary = { settings.SettingsDictionary }
            }
        };

        var toolpath = await client.AddRobotTaskAsync(req);

        Console.WriteLine("KRL Code: " + Environment.NewLine + (toolpath.SimulationResultData.Code ?? toolpath.SimulationResultData.Code) + Environment.NewLine);


        return toolpath.SimulationResultData.Code ?? toolpath.SimulationResultData.Code;
    }

    public async System.Threading.Tasks.Task<RobotState> UpdateSimulation(float simslider)
    {
        return await client.GetSimulatedRobotStateAsync(new GetSimulatedRobotStateRequest { Id = robotID, NormalizedState = simslider, AsyncStreamUpdate = true });
    }
}

