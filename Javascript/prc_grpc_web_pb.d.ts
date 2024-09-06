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

  sendPing(
    request: prc_pb.Ping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: prc_pb.Ping) => void
  ): grpcWeb.ClientReadableStream<prc_pb.Ping>;

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

  sendPing(
    request: prc_pb.Ping,
    metadata?: grpcWeb.Metadata
  ): Promise<prc_pb.Ping>;

}

