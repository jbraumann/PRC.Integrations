import * as grpcWeb from 'grpc-web';

import * as prc_pb from './prc_pb'; // proto import: "prc.proto"


export class ParametricRobotControlServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  setupRobot(
    request: prc_pb.SetupRobotRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.SetupRobotReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.SetupRobotReply>;

  addRobotTask(
    request: prc_pb.AddRobotTaskRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.AddRobotTaskReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.AddRobotTaskReply>;

  subscribeRobotFeedback(
    request: prc_pb.SubscribeRobotFeedbackRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<prc_pb.RobotFeedback>;

  getSimulatedRobotState(
    request: prc_pb.GetSimulatedRobotStateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.RobotState) => void
  ): grpcWeb.ClientReadableStream<prc_pb.RobotState>;

  updateVariable(
    request: prc_pb.UpdateVariableRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.UpdateVariableReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.UpdateVariableReply>;

  getRobotData(
    request: prc_pb.GetRobotDataRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.GetRobotDataReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.GetRobotDataReply>;

  sendPing(
    request: prc_pb.Ping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.Ping) => void
  ): grpcWeb.ClientReadableStream<prc_pb.Ping>;

  setupEnvironment(
    request: prc_pb.SetupEnvironmentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.SetupEnvironmentReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.SetupEnvironmentReply>;

  getEnvironmentResult(
    request: prc_pb.GetEnvironmentResultRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.EnvironmentResult) => void
  ): grpcWeb.ClientReadableStream<prc_pb.EnvironmentResult>;

  getEnvironmentState(
    request: prc_pb.GetEnvironmentStateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.EnvironmentState) => void
  ): grpcWeb.ClientReadableStream<prc_pb.EnvironmentState>;

  removeEnvironment(
    request: prc_pb.RemoveEnvironmentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.RemoveEnvironmentReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.RemoveEnvironmentReply>;

  controlEnvironment(
    request: prc_pb.ControlEnvironmentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.ControlEnvironmentReply) => void
  ): grpcWeb.ClientReadableStream<prc_pb.ControlEnvironmentReply>;

}

export class ParametricRobotControlServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  setupRobot(
    request: prc_pb.SetupRobotRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.SetupRobotReply>;

  addRobotTask(
    request: prc_pb.AddRobotTaskRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.AddRobotTaskReply>;

  subscribeRobotFeedback(
    request: prc_pb.SubscribeRobotFeedbackRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<prc_pb.RobotFeedback>;

  getSimulatedRobotState(
    request: prc_pb.GetSimulatedRobotStateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.RobotState>;

  updateVariable(
    request: prc_pb.UpdateVariableRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.UpdateVariableReply>;

  getRobotData(
    request: prc_pb.GetRobotDataRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.GetRobotDataReply>;

  sendPing(
    request: prc_pb.Ping,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.Ping>;

  setupEnvironment(
    request: prc_pb.SetupEnvironmentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.SetupEnvironmentReply>;

  getEnvironmentResult(
    request: prc_pb.GetEnvironmentResultRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.EnvironmentResult>;

  getEnvironmentState(
    request: prc_pb.GetEnvironmentStateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.EnvironmentState>;

  removeEnvironment(
    request: prc_pb.RemoveEnvironmentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.RemoveEnvironmentReply>;

  controlEnvironment(
    request: prc_pb.ControlEnvironmentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.ControlEnvironmentReply>;

}

