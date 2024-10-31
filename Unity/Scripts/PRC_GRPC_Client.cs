using Grpc.Core;
using Grpc.Net.Client.Configuration;
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
MIIDbDCCAlSgAwIBAgIQepbGKh13s5ROLPfzImJVeTANBgkqhkiG9w0BAQsFADAm
MSQwIgYDVQQDDBtQYXJhbWV0cmljIFJvYm90IENvbnRyb2wgQ0EwIBcNMjQwOTI2
MjA0MzQ0WhgPMjA1NDA5MjYyMDUzNDNaMCYxJDAiBgNVBAMMG1BhcmFtZXRyaWMg
Um9ib3QgQ29udHJvbCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
ANE6wUXygZ5DlTiq5fcjp2QrGMaBYLdmLTcmrgtENWKgDH1OLKzYj1duigKtQk/k
LkTSqTs+sC82SlxrqLt0VVUIpUN5JIMRg8JBMBxxlmEgmz/1us5r9ESeq7JqMESo
cAF2x7mckrApColJuKPc0z+NO7Mlw0r967m2spi0QhUv630SlDjCRrHrXiCwqiNr
gcnydydOq4AJTjVQCFMM6SUl5iyhhOZVLxPWu+kMo567GgOx8jhVlPuya6Ui407t
omc2FoZZuBIU+CGZyJ2WCD5rGgV/XFKQsR1HOW+3yj+7wvKsk+kk6GgD1t3caJ7Q
DIfa9C3D6mpgX/9ES6+Bk+ECAwEAAaOBkzCBkDAOBgNVHQ8BAf8EBAMCAYYwHQYD
VR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMC8GA1UdEQEB/wQlMCOCCWxvY2Fs
aG9zdIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAATAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBT+waeFNf4KPCd1gvZGzq7qwWQKrzANBgkqhkiG9w0BAQsFAAOCAQEA
u7BGN7eilyb2QjknMkyQoIEZDw5H7+PlpIr18/nlXCJqpVk4N6Zo5lv1Yrv1Lu30
+ZJFRgmj9DGpx0yzmBxcqbwNcYcVn7baWlqzHUWM7fDIPNTbBbiyNE4m3LQ8n6Ig
BpGXIXDByZuMbulKgVSwpC/o+GWy8y9KiKE7/Erz1sTktHaKye/nvqRbtioewCdD
XZzkskHs6XKKtXLnucxZYBUcNGEISSTaE6iEMjzs1ZKXDT+fjrUj9/L08s0Ixy12
VBs9dIKfQF6N63gTmtHUYf5BvxGq7DccUulkzSc49InjPJSUTCs96VTu5O/ALkdC
yu8bjTT/AtFEbHMv7oIOQg==
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
                    AxisValues = { 0, 20, -90, 90, 70, -115 },
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
                    AxisValues = { 0, -40, 75, -80, -90, -125 },
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
        return await client.GetSimulatedRobotStateAsync(new GetSimulatedRobotStateRequest { Id = robotID, NormalizedState = simslider, StreamUpdate = true });
    }
}

