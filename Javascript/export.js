/**
 *
Parametric Robot Control (PRC) gRPC client in JavaScript
 *
 */

const {
    Action,
    AddRobotTaskReply,
    AddRobotTaskRequest,
    AxisMotion,
    AxisName,
    Base,
    CartesianPosition,
    CartesianReference,
    CartesianTarget,
    CircularMotion,
    CoordinateSystem,
    CustomRobot,
    End,
    Euler,
    ExternalAxis,
    ExternalAxisType,
    Flow,
    IfElse,
    Task,
    TaskPayload,
    While,
    FrameType,
    GetSimulatedRobotStateRequest,
    Heartbeat,
    Hold,
    InsertCode,
    Int4,
    JointTarget,
    LINMotion,
    Matrix4x4,
    Mesh,
    MetaData,
    MotionCommand,
    MotionGroup,
    Ping,
    PolyMesh,
    PTPMotion,
    Robot,
    RobotFeedback,
    RobotState,
    Settings,
    SetupRobotReply,
    SetupRobotRequest,
    SetVariable,
    SimulationResult,
    SimulationResultUnit,
    SubscribeRobotFeedbackRequest,
    TaskType,
    Tool,
    TransformationArray,
    UpdateVariableReply,
    UpdateVariableRequest,
    Variable,
    VariableArray,
    Vector3,
    WaitForVariable,
    MotionGroupType
}= require('./prc_pb.js');

const {ParametricRobotControlServiceClient, ParametricRobotControlServicePromiseClient} = require('./prc_grpc_web_pb.js');

exports = module.exports = {ParametricRobotControlServicePromiseClient,
    ParametricRobotControlServiceClient,
    Action,
    AddRobotTaskReply,
    AddRobotTaskRequest,
    AxisMotion,
    AxisName,
    Base,
    CartesianPosition,
    CartesianReference,
    CartesianTarget,
    CircularMotion,
    CoordinateSystem,
    CustomRobot,
    End,
    Euler,
    ExternalAxis,
    ExternalAxisType,
    Flow,
    IfElse,
    Task,
    TaskPayload,
    While,
    FrameType,
    GetSimulatedRobotStateRequest,
    Heartbeat,
    Hold,
    InsertCode,
    Int4,
    JointTarget,
    LINMotion,
    Matrix4x4,
    Mesh,
    MetaData,
    MotionCommand,
    MotionGroup,
    Ping,
    PolyMesh,
    PTPMotion,
    Robot,
    RobotFeedback,
    RobotState,
    Settings,
    SetupRobotReply,
    SetupRobotRequest,
    SetVariable,
    SimulationResult,
    SimulationResultUnit,
    SubscribeRobotFeedbackRequest,
    TaskType,
    Tool,
    TransformationArray,
    UpdateVariableReply,
    UpdateVariableRequest,
    Variable,
    VariableArray,
    Vector3,
    WaitForVariable,
    MotionGroupType,
    };