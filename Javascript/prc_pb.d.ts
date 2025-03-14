import * as jspb from 'google-protobuf'



export class Action extends jspb.Message {
  getSetVariableAction(): SetVariable | undefined;
  setSetVariableAction(value?: SetVariable): Action;
  hasSetVariableAction(): boolean;
  clearSetVariableAction(): Action;

  getWaitForVariableAction(): WaitForVariable | undefined;
  setWaitForVariableAction(value?: WaitForVariable): Action;
  hasWaitForVariableAction(): boolean;
  clearWaitForVariableAction(): Action;

  getHoldAction(): Hold | undefined;
  setHoldAction(value?: Hold): Action;
  hasHoldAction(): boolean;
  clearHoldAction(): Action;

  getPingAction(): Ping | undefined;
  setPingAction(value?: Ping): Action;
  hasPingAction(): boolean;
  clearPingAction(): Action;

  getInsertCodeAction(): InsertCode | undefined;
  setInsertCodeAction(value?: InsertCode): Action;
  hasInsertCodeAction(): boolean;
  clearInsertCodeAction(): Action;

  getActionNodeCase(): Action.ActionNodeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Action.AsObject;
  static toObject(includeInstance: boolean, msg: Action): Action.AsObject;
  static serializeBinaryToWriter(message: Action, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Action;
  static deserializeBinaryFromReader(message: Action, reader: jspb.BinaryReader): Action;
}

export namespace Action {
  export type AsObject = {
    setVariableAction?: SetVariable.AsObject,
    waitForVariableAction?: WaitForVariable.AsObject,
    holdAction?: Hold.AsObject,
    pingAction?: Ping.AsObject,
    insertCodeAction?: InsertCode.AsObject,
  }

  export enum ActionNodeCase { 
    ACTION_NODE_NOT_SET = 0,
    SET_VARIABLE_ACTION = 1,
    WAIT_FOR_VARIABLE_ACTION = 2,
    HOLD_ACTION = 3,
    PING_ACTION = 4,
    INSERT_CODE_ACTION = 5,
  }
}

export class SetVariable extends jspb.Message {
  getNewState(): Variable | undefined;
  setNewState(value?: Variable): SetVariable;
  hasNewState(): boolean;
  clearNewState(): SetVariable;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVariable.AsObject;
  static toObject(includeInstance: boolean, msg: SetVariable): SetVariable.AsObject;
  static serializeBinaryToWriter(message: SetVariable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVariable;
  static deserializeBinaryFromReader(message: SetVariable, reader: jspb.BinaryReader): SetVariable;
}

export namespace SetVariable {
  export type AsObject = {
    newState?: Variable.AsObject,
  }
}

export class WaitForVariable extends jspb.Message {
  getAwaitState(): Variable | undefined;
  setAwaitState(value?: Variable): WaitForVariable;
  hasAwaitState(): boolean;
  clearAwaitState(): WaitForVariable;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WaitForVariable.AsObject;
  static toObject(includeInstance: boolean, msg: WaitForVariable): WaitForVariable.AsObject;
  static serializeBinaryToWriter(message: WaitForVariable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WaitForVariable;
  static deserializeBinaryFromReader(message: WaitForVariable, reader: jspb.BinaryReader): WaitForVariable;
}

export namespace WaitForVariable {
  export type AsObject = {
    awaitState?: Variable.AsObject,
  }
}

export class Hold extends jspb.Message {
  getHoldMs(): number;
  setHoldMs(value: number): Hold;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Hold.AsObject;
  static toObject(includeInstance: boolean, msg: Hold): Hold.AsObject;
  static serializeBinaryToWriter(message: Hold, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Hold;
  static deserializeBinaryFromReader(message: Hold, reader: jspb.BinaryReader): Hold;
}

export namespace Hold {
  export type AsObject = {
    holdMs: number,
  }
}

export class Ping extends jspb.Message {
  getPayload(): string;
  setPayload(value: string): Ping;

  getTimeMs(): number;
  setTimeMs(value: number): Ping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
    payload: string,
    timeMs: number,
  }
}

export class InsertCode extends jspb.Message {
  getCodeList(): Array<string>;
  setCodeList(value: Array<string>): InsertCode;
  clearCodeList(): InsertCode;
  addCode(value: string, index?: number): InsertCode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertCode.AsObject;
  static toObject(includeInstance: boolean, msg: InsertCode): InsertCode.AsObject;
  static serializeBinaryToWriter(message: InsertCode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertCode;
  static deserializeBinaryFromReader(message: InsertCode, reader: jspb.BinaryReader): InsertCode;
}

export namespace InsertCode {
  export type AsObject = {
    codeList: Array<string>,
  }
}

export class SimulationResult extends jspb.Message {
  getSimulationResultsList(): Array<SimulationResultUnit>;
  setSimulationResultsList(value: Array<SimulationResultUnit>): SimulationResult;
  clearSimulationResultsList(): SimulationResult;
  addSimulationResults(value?: SimulationResultUnit, index?: number): SimulationResultUnit;

  getIsValid(): boolean;
  setIsValid(value: boolean): SimulationResult;

  getTime(): number;
  setTime(value: number): SimulationResult;

  getCode(): string;
  setCode(value: string): SimulationResult;

  getData(): MetaData | undefined;
  setData(value?: MetaData): SimulationResult;
  hasData(): boolean;
  clearData(): SimulationResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimulationResult.AsObject;
  static toObject(includeInstance: boolean, msg: SimulationResult): SimulationResult.AsObject;
  static serializeBinaryToWriter(message: SimulationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimulationResult;
  static deserializeBinaryFromReader(message: SimulationResult, reader: jspb.BinaryReader): SimulationResult;
}

export namespace SimulationResult {
  export type AsObject = {
    simulationResultsList: Array<SimulationResultUnit.AsObject>,
    isValid: boolean,
    time: number,
    code: string,
    data?: MetaData.AsObject,
  }
}

export class SimulationResultUnit extends jspb.Message {
  getAxisValuesList(): Array<number>;
  setAxisValuesList(value: Array<number>): SimulationResultUnit;
  clearAxisValuesList(): SimulationResultUnit;
  addAxisValues(value: number, index?: number): SimulationResultUnit;

  getPosition(): Matrix4x4 | undefined;
  setPosition(value?: Matrix4x4): SimulationResultUnit;
  hasPosition(): boolean;
  clearPosition(): SimulationResultUnit;

  getTime(): number;
  setTime(value: number): SimulationResultUnit;

  getCollisionList(): Array<boolean>;
  setCollisionList(value: Array<boolean>): SimulationResultUnit;
  clearCollisionList(): SimulationResultUnit;
  addCollision(value: boolean, index?: number): SimulationResultUnit;

  getSingularityList(): Array<boolean>;
  setSingularityList(value: Array<boolean>): SimulationResultUnit;
  clearSingularityList(): SimulationResultUnit;
  addSingularity(value: boolean, index?: number): SimulationResultUnit;

  getOutofreachList(): Array<boolean>;
  setOutofreachList(value: Array<boolean>): SimulationResultUnit;
  clearOutofreachList(): SimulationResultUnit;
  addOutofreach(value: boolean, index?: number): SimulationResultUnit;

  getExternalAxisValuesList(): Array<number>;
  setExternalAxisValuesList(value: Array<number>): SimulationResultUnit;
  clearExternalAxisValuesList(): SimulationResultUnit;
  addExternalAxisValues(value: number, index?: number): SimulationResultUnit;

  getExternalAxisOutofreachList(): Array<boolean>;
  setExternalAxisOutofreachList(value: Array<boolean>): SimulationResultUnit;
  clearExternalAxisOutofreachList(): SimulationResultUnit;
  addExternalAxisOutofreach(value: boolean, index?: number): SimulationResultUnit;

  getInterpolationFactor(): number;
  setInterpolationFactor(value: number): SimulationResultUnit;

  getId(): string;
  setId(value: string): SimulationResultUnit;

  getAlarm(): boolean;
  setAlarm(value: boolean): SimulationResultUnit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimulationResultUnit.AsObject;
  static toObject(includeInstance: boolean, msg: SimulationResultUnit): SimulationResultUnit.AsObject;
  static serializeBinaryToWriter(message: SimulationResultUnit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimulationResultUnit;
  static deserializeBinaryFromReader(message: SimulationResultUnit, reader: jspb.BinaryReader): SimulationResultUnit;
}

export namespace SimulationResultUnit {
  export type AsObject = {
    axisValuesList: Array<number>,
    position?: Matrix4x4.AsObject,
    time: number,
    collisionList: Array<boolean>,
    singularityList: Array<boolean>,
    outofreachList: Array<boolean>,
    externalAxisValuesList: Array<number>,
    externalAxisOutofreachList: Array<boolean>,
    interpolationFactor: number,
    id: string,
    alarm: boolean,
  }
}

export class RobotState extends jspb.Message {
  getAxisPosition(): JointTarget | undefined;
  setAxisPosition(value?: JointTarget): RobotState;
  hasAxisPosition(): boolean;
  clearAxisPosition(): RobotState;

  getRobotTransformationsList(): Array<TransformationArray>;
  setRobotTransformationsList(value: Array<TransformationArray>): RobotState;
  clearRobotTransformationsList(): RobotState;
  addRobotTransformations(value?: TransformationArray, index?: number): TransformationArray;

  getToolpathIndex(): number;
  setToolpathIndex(value: number): RobotState;

  getToolId(): string;
  setToolId(value: string): RobotState;

  getToolFrame(): Matrix4x4 | undefined;
  setToolFrame(value?: Matrix4x4): RobotState;
  hasToolFrame(): boolean;
  clearToolFrame(): RobotState;

  getRootFrame(): Matrix4x4 | undefined;
  setRootFrame(value?: Matrix4x4): RobotState;
  hasRootFrame(): boolean;
  clearRootFrame(): RobotState;

  getFlangeFrame(): Matrix4x4 | undefined;
  setFlangeFrame(value?: Matrix4x4): RobotState;
  hasFlangeFrame(): boolean;
  clearFlangeFrame(): RobotState;

  getAxisAlarmList(): Array<boolean>;
  setAxisAlarmList(value: Array<boolean>): RobotState;
  clearAxisAlarmList(): RobotState;
  addAxisAlarm(value: boolean, index?: number): RobotState;

  getExternalAxisAlarmList(): Array<boolean>;
  setExternalAxisAlarmList(value: Array<boolean>): RobotState;
  clearExternalAxisAlarmList(): RobotState;
  addExternalAxisAlarm(value: boolean, index?: number): RobotState;

  getVariablesMap(): jspb.Map<string, VariableArray>;
  clearVariablesMap(): RobotState;

  getDataMap(): jspb.Map<string, string>;
  clearDataMap(): RobotState;

  getConnectionFeedback(): string;
  setConnectionFeedback(value: string): RobotState;

  getTaskId(): string;
  setTaskId(value: string): RobotState;

  getCommandId(): string;
  setCommandId(value: string): RobotState;

  getRobotId(): string;
  setRobotId(value: string): RobotState;

  getStatus(): RobotStatus;
  setStatus(value: RobotStatus): RobotState;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RobotState.AsObject;
  static toObject(includeInstance: boolean, msg: RobotState): RobotState.AsObject;
  static serializeBinaryToWriter(message: RobotState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RobotState;
  static deserializeBinaryFromReader(message: RobotState, reader: jspb.BinaryReader): RobotState;
}

export namespace RobotState {
  export type AsObject = {
    axisPosition?: JointTarget.AsObject,
    robotTransformationsList: Array<TransformationArray.AsObject>,
    toolpathIndex: number,
    toolId: string,
    toolFrame?: Matrix4x4.AsObject,
    rootFrame?: Matrix4x4.AsObject,
    flangeFrame?: Matrix4x4.AsObject,
    axisAlarmList: Array<boolean>,
    externalAxisAlarmList: Array<boolean>,
    variablesMap: Array<[string, VariableArray.AsObject]>,
    dataMap: Array<[string, string]>,
    connectionFeedback: string,
    taskId: string,
    commandId: string,
    robotId: string,
    status: RobotStatus,
  }
}

export class Task extends jspb.Message {
  getPayloadList(): Array<TaskPayload>;
  setPayloadList(value: Array<TaskPayload>): Task;
  clearPayloadList(): Task;
  addPayload(value?: TaskPayload, index?: number): TaskPayload;

  getType(): TaskType;
  setType(value: TaskType): Task;

  getName(): string;
  setName(value: string): Task;

  getData(): MetaData | undefined;
  setData(value?: MetaData): Task;
  hasData(): boolean;
  clearData(): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    payloadList: Array<TaskPayload.AsObject>,
    type: TaskType,
    name: string,
    data?: MetaData.AsObject,
  }
}

export class TaskPayload extends jspb.Message {
  getFlowTask(): Flow | undefined;
  setFlowTask(value?: Flow): TaskPayload;
  hasFlowTask(): boolean;
  clearFlowTask(): TaskPayload;

  getMotionGroupTask(): MotionGroup | undefined;
  setMotionGroupTask(value?: MotionGroup): TaskPayload;
  hasMotionGroupTask(): boolean;
  clearMotionGroupTask(): TaskPayload;

  getActionTask(): Action | undefined;
  setActionTask(value?: Action): TaskPayload;
  hasActionTask(): boolean;
  clearActionTask(): TaskPayload;

  getPayloadCase(): TaskPayload.PayloadCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskPayload.AsObject;
  static toObject(includeInstance: boolean, msg: TaskPayload): TaskPayload.AsObject;
  static serializeBinaryToWriter(message: TaskPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskPayload;
  static deserializeBinaryFromReader(message: TaskPayload, reader: jspb.BinaryReader): TaskPayload;
}

export namespace TaskPayload {
  export type AsObject = {
    flowTask?: Flow.AsObject,
    motionGroupTask?: MotionGroup.AsObject,
    actionTask?: Action.AsObject,
  }

  export enum PayloadCase { 
    PAYLOAD_NOT_SET = 0,
    FLOW_TASK = 1,
    MOTION_GROUP_TASK = 2,
    ACTION_TASK = 3,
  }
}

export class Flow extends jspb.Message {
  getIfElseFlow(): IfElse | undefined;
  setIfElseFlow(value?: IfElse): Flow;
  hasIfElseFlow(): boolean;
  clearIfElseFlow(): Flow;

  getWhileFlow(): While | undefined;
  setWhileFlow(value?: While): Flow;
  hasWhileFlow(): boolean;
  clearWhileFlow(): Flow;

  getEndFlow(): End | undefined;
  setEndFlow(value?: End): Flow;
  hasEndFlow(): boolean;
  clearEndFlow(): Flow;

  getFlowNodeCase(): Flow.FlowNodeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Flow.AsObject;
  static toObject(includeInstance: boolean, msg: Flow): Flow.AsObject;
  static serializeBinaryToWriter(message: Flow, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Flow;
  static deserializeBinaryFromReader(message: Flow, reader: jspb.BinaryReader): Flow;
}

export namespace Flow {
  export type AsObject = {
    ifElseFlow?: IfElse.AsObject,
    whileFlow?: While.AsObject,
    endFlow?: End.AsObject,
  }

  export enum FlowNodeCase { 
    FLOW_NODE_NOT_SET = 0,
    IF_ELSE_FLOW = 2,
    WHILE_FLOW = 3,
    END_FLOW = 4,
  }
}

export class IfElse extends jspb.Message {
  getCondition(): Variable | undefined;
  setCondition(value?: Variable): IfElse;
  hasCondition(): boolean;
  clearCondition(): IfElse;

  getIfTrue(): Task | undefined;
  setIfTrue(value?: Task): IfElse;
  hasIfTrue(): boolean;
  clearIfTrue(): IfElse;

  getIfFalse(): Task | undefined;
  setIfFalse(value?: Task): IfElse;
  hasIfFalse(): boolean;
  clearIfFalse(): IfElse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IfElse.AsObject;
  static toObject(includeInstance: boolean, msg: IfElse): IfElse.AsObject;
  static serializeBinaryToWriter(message: IfElse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IfElse;
  static deserializeBinaryFromReader(message: IfElse, reader: jspb.BinaryReader): IfElse;
}

export namespace IfElse {
  export type AsObject = {
    condition?: Variable.AsObject,
    ifTrue?: Task.AsObject,
    ifFalse?: Task.AsObject,
  }
}

export class While extends jspb.Message {
  getCondition(): Variable | undefined;
  setCondition(value?: Variable): While;
  hasCondition(): boolean;
  clearCondition(): While;

  getBody(): Task | undefined;
  setBody(value?: Task): While;
  hasBody(): boolean;
  clearBody(): While;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): While.AsObject;
  static toObject(includeInstance: boolean, msg: While): While.AsObject;
  static serializeBinaryToWriter(message: While, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): While;
  static deserializeBinaryFromReader(message: While, reader: jspb.BinaryReader): While;
}

export namespace While {
  export type AsObject = {
    condition?: Variable.AsObject,
    body?: Task.AsObject,
  }
}

export class End extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): End.AsObject;
  static toObject(includeInstance: boolean, msg: End): End.AsObject;
  static serializeBinaryToWriter(message: End, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): End;
  static deserializeBinaryFromReader(message: End, reader: jspb.BinaryReader): End;
}

export namespace End {
  export type AsObject = {
  }
}

export class MotionCommand extends jspb.Message {
  getAxisMotion(): AxisMotion | undefined;
  setAxisMotion(value?: AxisMotion): MotionCommand;
  hasAxisMotion(): boolean;
  clearAxisMotion(): MotionCommand;

  getCircularMotion(): CircularMotion | undefined;
  setCircularMotion(value?: CircularMotion): MotionCommand;
  hasCircularMotion(): boolean;
  clearCircularMotion(): MotionCommand;

  getPtpMotion(): PTPMotion | undefined;
  setPtpMotion(value?: PTPMotion): MotionCommand;
  hasPtpMotion(): boolean;
  clearPtpMotion(): MotionCommand;

  getLinMotion(): LINMotion | undefined;
  setLinMotion(value?: LINMotion): MotionCommand;
  hasLinMotion(): boolean;
  clearLinMotion(): MotionCommand;

  getCommandCase(): MotionCommand.CommandCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MotionCommand.AsObject;
  static toObject(includeInstance: boolean, msg: MotionCommand): MotionCommand.AsObject;
  static serializeBinaryToWriter(message: MotionCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MotionCommand;
  static deserializeBinaryFromReader(message: MotionCommand, reader: jspb.BinaryReader): MotionCommand;
}

export namespace MotionCommand {
  export type AsObject = {
    axisMotion?: AxisMotion.AsObject,
    circularMotion?: CircularMotion.AsObject,
    ptpMotion?: PTPMotion.AsObject,
    linMotion?: LINMotion.AsObject,
  }

  export enum CommandCase { 
    COMMAND_NOT_SET = 0,
    AXIS_MOTION = 1,
    CIRCULAR_MOTION = 2,
    PTP_MOTION = 3,
    LIN_MOTION = 4,
  }
}

export class MotionGroup extends jspb.Message {
  getMotionGroupType(): MotionGroupType;
  setMotionGroupType(value: MotionGroupType): MotionGroup;

  getCommandsList(): Array<MotionCommand>;
  setCommandsList(value: Array<MotionCommand>): MotionGroup;
  clearCommandsList(): MotionGroup;
  addCommands(value?: MotionCommand, index?: number): MotionCommand;

  getInterpolation(): string;
  setInterpolation(value: string): MotionGroup;

  getToolId(): string;
  setToolId(value: string): MotionGroup;

  getRobotBase(): Base | undefined;
  setRobotBase(value?: Base): MotionGroup;
  hasRobotBase(): boolean;
  clearRobotBase(): MotionGroup;

  getData(): MetaData | undefined;
  setData(value?: MetaData): MotionGroup;
  hasData(): boolean;
  clearData(): MotionGroup;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MotionGroup.AsObject;
  static toObject(includeInstance: boolean, msg: MotionGroup): MotionGroup.AsObject;
  static serializeBinaryToWriter(message: MotionGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MotionGroup;
  static deserializeBinaryFromReader(message: MotionGroup, reader: jspb.BinaryReader): MotionGroup;
}

export namespace MotionGroup {
  export type AsObject = {
    motionGroupType: MotionGroupType,
    commandsList: Array<MotionCommand.AsObject>,
    interpolation: string,
    toolId: string,
    robotBase?: Base.AsObject,
    data?: MetaData.AsObject,
  }
}

export class AxisMotion extends jspb.Message {
  getData(): MetaData | undefined;
  setData(value?: MetaData): AxisMotion;
  hasData(): boolean;
  clearData(): AxisMotion;

  getTarget(): JointTarget | undefined;
  setTarget(value?: JointTarget): AxisMotion;
  hasTarget(): boolean;
  clearTarget(): AxisMotion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AxisMotion.AsObject;
  static toObject(includeInstance: boolean, msg: AxisMotion): AxisMotion.AsObject;
  static serializeBinaryToWriter(message: AxisMotion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AxisMotion;
  static deserializeBinaryFromReader(message: AxisMotion, reader: jspb.BinaryReader): AxisMotion;
}

export namespace AxisMotion {
  export type AsObject = {
    data?: MetaData.AsObject,
    target?: JointTarget.AsObject,
  }
}

export class CircularMotion extends jspb.Message {
  getData(): MetaData | undefined;
  setData(value?: MetaData): CircularMotion;
  hasData(): boolean;
  clearData(): CircularMotion;

  getTargetsList(): Array<CartesianTarget>;
  setTargetsList(value: Array<CartesianTarget>): CircularMotion;
  clearTargetsList(): CircularMotion;
  addTargets(value?: CartesianTarget, index?: number): CartesianTarget;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CircularMotion.AsObject;
  static toObject(includeInstance: boolean, msg: CircularMotion): CircularMotion.AsObject;
  static serializeBinaryToWriter(message: CircularMotion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CircularMotion;
  static deserializeBinaryFromReader(message: CircularMotion, reader: jspb.BinaryReader): CircularMotion;
}

export namespace CircularMotion {
  export type AsObject = {
    data?: MetaData.AsObject,
    targetsList: Array<CartesianTarget.AsObject>,
  }
}

export class LINMotion extends jspb.Message {
  getData(): MetaData | undefined;
  setData(value?: MetaData): LINMotion;
  hasData(): boolean;
  clearData(): LINMotion;

  getTarget(): CartesianTarget | undefined;
  setTarget(value?: CartesianTarget): LINMotion;
  hasTarget(): boolean;
  clearTarget(): LINMotion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LINMotion.AsObject;
  static toObject(includeInstance: boolean, msg: LINMotion): LINMotion.AsObject;
  static serializeBinaryToWriter(message: LINMotion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LINMotion;
  static deserializeBinaryFromReader(message: LINMotion, reader: jspb.BinaryReader): LINMotion;
}

export namespace LINMotion {
  export type AsObject = {
    data?: MetaData.AsObject,
    target?: CartesianTarget.AsObject,
  }
}

export class PTPMotion extends jspb.Message {
  getData(): MetaData | undefined;
  setData(value?: MetaData): PTPMotion;
  hasData(): boolean;
  clearData(): PTPMotion;

  getTarget(): CartesianTarget | undefined;
  setTarget(value?: CartesianTarget): PTPMotion;
  hasTarget(): boolean;
  clearTarget(): PTPMotion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PTPMotion.AsObject;
  static toObject(includeInstance: boolean, msg: PTPMotion): PTPMotion.AsObject;
  static serializeBinaryToWriter(message: PTPMotion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PTPMotion;
  static deserializeBinaryFromReader(message: PTPMotion, reader: jspb.BinaryReader): PTPMotion;
}

export namespace PTPMotion {
  export type AsObject = {
    data?: MetaData.AsObject,
    target?: CartesianTarget.AsObject,
  }
}

export class Matrix4x4 extends jspb.Message {
  getM11(): number;
  setM11(value: number): Matrix4x4;

  getM12(): number;
  setM12(value: number): Matrix4x4;

  getM13(): number;
  setM13(value: number): Matrix4x4;

  getM14(): number;
  setM14(value: number): Matrix4x4;

  getM21(): number;
  setM21(value: number): Matrix4x4;

  getM22(): number;
  setM22(value: number): Matrix4x4;

  getM23(): number;
  setM23(value: number): Matrix4x4;

  getM24(): number;
  setM24(value: number): Matrix4x4;

  getM31(): number;
  setM31(value: number): Matrix4x4;

  getM32(): number;
  setM32(value: number): Matrix4x4;

  getM33(): number;
  setM33(value: number): Matrix4x4;

  getM34(): number;
  setM34(value: number): Matrix4x4;

  getM41(): number;
  setM41(value: number): Matrix4x4;

  getM42(): number;
  setM42(value: number): Matrix4x4;

  getM43(): number;
  setM43(value: number): Matrix4x4;

  getM44(): number;
  setM44(value: number): Matrix4x4;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Matrix4x4.AsObject;
  static toObject(includeInstance: boolean, msg: Matrix4x4): Matrix4x4.AsObject;
  static serializeBinaryToWriter(message: Matrix4x4, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Matrix4x4;
  static deserializeBinaryFromReader(message: Matrix4x4, reader: jspb.BinaryReader): Matrix4x4;
}

export namespace Matrix4x4 {
  export type AsObject = {
    m11: number,
    m12: number,
    m13: number,
    m14: number,
    m21: number,
    m22: number,
    m23: number,
    m24: number,
    m31: number,
    m32: number,
    m33: number,
    m34: number,
    m41: number,
    m42: number,
    m43: number,
    m44: number,
  }
}

export class CartesianPosition extends jspb.Message {
  getMatrix(): Matrix4x4 | undefined;
  setMatrix(value?: Matrix4x4): CartesianPosition;
  hasMatrix(): boolean;
  clearMatrix(): CartesianPosition;

  getEuler(): Euler | undefined;
  setEuler(value?: Euler): CartesianPosition;
  hasEuler(): boolean;
  clearEuler(): CartesianPosition;

  getCs(): CoordinateSystem | undefined;
  setCs(value?: CoordinateSystem): CartesianPosition;
  hasCs(): boolean;
  clearCs(): CartesianPosition;

  getReference(): CartesianReference;
  setReference(value: CartesianReference): CartesianPosition;

  getParent(): Matrix4x4 | undefined;
  setParent(value?: Matrix4x4): CartesianPosition;
  hasParent(): boolean;
  clearParent(): CartesianPosition;

  getId(): string;
  setId(value: string): CartesianPosition;

  getFrameCase(): CartesianPosition.FrameCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CartesianPosition.AsObject;
  static toObject(includeInstance: boolean, msg: CartesianPosition): CartesianPosition.AsObject;
  static serializeBinaryToWriter(message: CartesianPosition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CartesianPosition;
  static deserializeBinaryFromReader(message: CartesianPosition, reader: jspb.BinaryReader): CartesianPosition;
}

export namespace CartesianPosition {
  export type AsObject = {
    matrix?: Matrix4x4.AsObject,
    euler?: Euler.AsObject,
    cs?: CoordinateSystem.AsObject,
    reference: CartesianReference,
    parent?: Matrix4x4.AsObject,
    id: string,
  }

  export enum FrameCase { 
    FRAME_NOT_SET = 0,
    MATRIX = 1,
    EULER = 2,
    CS = 3,
  }
}

export class CartesianTarget extends jspb.Message {
  getPosition(): CartesianPosition | undefined;
  setPosition(value?: CartesianPosition): CartesianTarget;
  hasPosition(): boolean;
  clearPosition(): CartesianTarget;

  getPosture(): string;
  setPosture(value: string): CartesianTarget;

  getSpeedList(): Array<number>;
  setSpeedList(value: Array<number>): CartesianTarget;
  clearSpeedList(): CartesianTarget;
  addSpeed(value: number, index?: number): CartesianTarget;

  getAccelerationList(): Array<number>;
  setAccelerationList(value: Array<number>): CartesianTarget;
  clearAccelerationList(): CartesianTarget;
  addAcceleration(value: number, index?: number): CartesianTarget;

  getExternalAxisValuesList(): Array<number>;
  setExternalAxisValuesList(value: Array<number>): CartesianTarget;
  clearExternalAxisValuesList(): CartesianTarget;
  addExternalAxisValues(value: number, index?: number): CartesianTarget;

  getRedundancy(): number;
  setRedundancy(value: number): CartesianTarget;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CartesianTarget.AsObject;
  static toObject(includeInstance: boolean, msg: CartesianTarget): CartesianTarget.AsObject;
  static serializeBinaryToWriter(message: CartesianTarget, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CartesianTarget;
  static deserializeBinaryFromReader(message: CartesianTarget, reader: jspb.BinaryReader): CartesianTarget;
}

export namespace CartesianTarget {
  export type AsObject = {
    position?: CartesianPosition.AsObject,
    posture: string,
    speedList: Array<number>,
    accelerationList: Array<number>,
    externalAxisValuesList: Array<number>,
    redundancy: number,
  }
}

export class JointTarget extends jspb.Message {
  getAxisValuesList(): Array<number>;
  setAxisValuesList(value: Array<number>): JointTarget;
  clearAxisValuesList(): JointTarget;
  addAxisValues(value: number, index?: number): JointTarget;

  getSpeedList(): Array<number>;
  setSpeedList(value: Array<number>): JointTarget;
  clearSpeedList(): JointTarget;
  addSpeed(value: number, index?: number): JointTarget;

  getAccelerationList(): Array<number>;
  setAccelerationList(value: Array<number>): JointTarget;
  clearAccelerationList(): JointTarget;
  addAcceleration(value: number, index?: number): JointTarget;

  getExternalAxisValuesList(): Array<number>;
  setExternalAxisValuesList(value: Array<number>): JointTarget;
  clearExternalAxisValuesList(): JointTarget;
  addExternalAxisValues(value: number, index?: number): JointTarget;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JointTarget.AsObject;
  static toObject(includeInstance: boolean, msg: JointTarget): JointTarget.AsObject;
  static serializeBinaryToWriter(message: JointTarget, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JointTarget;
  static deserializeBinaryFromReader(message: JointTarget, reader: jspb.BinaryReader): JointTarget;
}

export namespace JointTarget {
  export type AsObject = {
    axisValuesList: Array<number>,
    speedList: Array<number>,
    accelerationList: Array<number>,
    externalAxisValuesList: Array<number>,
  }
}

export class Vector3 extends jspb.Message {
  getX(): number;
  setX(value: number): Vector3;

  getY(): number;
  setY(value: number): Vector3;

  getZ(): number;
  setZ(value: number): Vector3;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vector3.AsObject;
  static toObject(includeInstance: boolean, msg: Vector3): Vector3.AsObject;
  static serializeBinaryToWriter(message: Vector3, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vector3;
  static deserializeBinaryFromReader(message: Vector3, reader: jspb.BinaryReader): Vector3;
}

export namespace Vector3 {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
  }
}

export class Int4 extends jspb.Message {
  getX(): number;
  setX(value: number): Int4;

  getY(): number;
  setY(value: number): Int4;

  getZ(): number;
  setZ(value: number): Int4;

  getW(): number;
  setW(value: number): Int4;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int4.AsObject;
  static toObject(includeInstance: boolean, msg: Int4): Int4.AsObject;
  static serializeBinaryToWriter(message: Int4, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int4;
  static deserializeBinaryFromReader(message: Int4, reader: jspb.BinaryReader): Int4;
}

export namespace Int4 {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
    w: number,
  }
}

export class Euler extends jspb.Message {
  getX(): number;
  setX(value: number): Euler;

  getY(): number;
  setY(value: number): Euler;

  getZ(): number;
  setZ(value: number): Euler;

  getA(): number;
  setA(value: number): Euler;

  getB(): number;
  setB(value: number): Euler;

  getC(): number;
  setC(value: number): Euler;

  getFormat(): EulerFormat;
  setFormat(value: EulerFormat): Euler;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Euler.AsObject;
  static toObject(includeInstance: boolean, msg: Euler): Euler.AsObject;
  static serializeBinaryToWriter(message: Euler, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Euler;
  static deserializeBinaryFromReader(message: Euler, reader: jspb.BinaryReader): Euler;
}

export namespace Euler {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
    a: number,
    b: number,
    c: number,
    format: EulerFormat,
  }
}

export class CoordinateSystem extends jspb.Message {
  getOrigin(): Vector3 | undefined;
  setOrigin(value?: Vector3): CoordinateSystem;
  hasOrigin(): boolean;
  clearOrigin(): CoordinateSystem;

  getXAxis(): Vector3 | undefined;
  setXAxis(value?: Vector3): CoordinateSystem;
  hasXAxis(): boolean;
  clearXAxis(): CoordinateSystem;

  getYAxis(): Vector3 | undefined;
  setYAxis(value?: Vector3): CoordinateSystem;
  hasYAxis(): boolean;
  clearYAxis(): CoordinateSystem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoordinateSystem.AsObject;
  static toObject(includeInstance: boolean, msg: CoordinateSystem): CoordinateSystem.AsObject;
  static serializeBinaryToWriter(message: CoordinateSystem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoordinateSystem;
  static deserializeBinaryFromReader(message: CoordinateSystem, reader: jspb.BinaryReader): CoordinateSystem;
}

export namespace CoordinateSystem {
  export type AsObject = {
    origin?: Vector3.AsObject,
    xAxis?: Vector3.AsObject,
    yAxis?: Vector3.AsObject,
  }
}

export class Variable extends jspb.Message {
  getBoolean(): boolean;
  setBoolean(value: boolean): Variable;

  getSingle(): number;
  setSingle(value: number): Variable;

  getInteger(): number;
  setInteger(value: number): Variable;

  getText(): string;
  setText(value: string): Variable;

  getName(): string;
  setName(value: string): Variable;

  getVariableValueCase(): Variable.VariableValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Variable.AsObject;
  static toObject(includeInstance: boolean, msg: Variable): Variable.AsObject;
  static serializeBinaryToWriter(message: Variable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Variable;
  static deserializeBinaryFromReader(message: Variable, reader: jspb.BinaryReader): Variable;
}

export namespace Variable {
  export type AsObject = {
    pb_boolean: boolean,
    single: number,
    integer: number,
    text: string,
    name: string,
  }

  export enum VariableValueCase { 
    VARIABLE_VALUE_NOT_SET = 0,
    BOOLEAN = 1,
    SINGLE = 2,
    INTEGER = 3,
    TEXT = 4,
  }
}

export class Heartbeat extends jspb.Message {
  getBeat(): number;
  setBeat(value: number): Heartbeat;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Heartbeat.AsObject;
  static toObject(includeInstance: boolean, msg: Heartbeat): Heartbeat.AsObject;
  static serializeBinaryToWriter(message: Heartbeat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Heartbeat;
  static deserializeBinaryFromReader(message: Heartbeat, reader: jspb.BinaryReader): Heartbeat;
}

export namespace Heartbeat {
  export type AsObject = {
    beat: number,
  }
}

export class Settings extends jspb.Message {
  getSettingsDictionaryMap(): jspb.Map<string, string>;
  clearSettingsDictionaryMap(): Settings;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Settings.AsObject;
  static toObject(includeInstance: boolean, msg: Settings): Settings.AsObject;
  static serializeBinaryToWriter(message: Settings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Settings;
  static deserializeBinaryFromReader(message: Settings, reader: jspb.BinaryReader): Settings;
}

export namespace Settings {
  export type AsObject = {
    settingsDictionaryMap: Array<[string, string]>,
  }
}

export class Mesh extends jspb.Message {
  getFacesList(): Array<Int4>;
  setFacesList(value: Array<Int4>): Mesh;
  clearFacesList(): Mesh;
  addFaces(value?: Int4, index?: number): Int4;

  getVerticesList(): Array<Vector3>;
  setVerticesList(value: Array<Vector3>): Mesh;
  clearVerticesList(): Mesh;
  addVertices(value?: Vector3, index?: number): Vector3;

  getNormalsList(): Array<Vector3>;
  setNormalsList(value: Array<Vector3>): Mesh;
  clearNormalsList(): Mesh;
  addNormals(value?: Vector3, index?: number): Vector3;

  getMeshColor(): Int4 | undefined;
  setMeshColor(value?: Int4): Mesh;
  hasMeshColor(): boolean;
  clearMeshColor(): Mesh;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Mesh.AsObject;
  static toObject(includeInstance: boolean, msg: Mesh): Mesh.AsObject;
  static serializeBinaryToWriter(message: Mesh, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Mesh;
  static deserializeBinaryFromReader(message: Mesh, reader: jspb.BinaryReader): Mesh;
}

export namespace Mesh {
  export type AsObject = {
    facesList: Array<Int4.AsObject>,
    verticesList: Array<Vector3.AsObject>,
    normalsList: Array<Vector3.AsObject>,
    meshColor?: Int4.AsObject,
  }
}

export class PolyMesh extends jspb.Message {
  getMeshesList(): Array<Mesh>;
  setMeshesList(value: Array<Mesh>): PolyMesh;
  clearMeshesList(): PolyMesh;
  addMeshes(value?: Mesh, index?: number): Mesh;

  getCollisionConvexHullList(): Array<Mesh>;
  setCollisionConvexHullList(value: Array<Mesh>): PolyMesh;
  clearCollisionConvexHullList(): PolyMesh;
  addCollisionConvexHull(value?: Mesh, index?: number): Mesh;

  getTransform(): Matrix4x4 | undefined;
  setTransform(value?: Matrix4x4): PolyMesh;
  hasTransform(): boolean;
  clearTransform(): PolyMesh;

  getName(): string;
  setName(value: string): PolyMesh;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PolyMesh.AsObject;
  static toObject(includeInstance: boolean, msg: PolyMesh): PolyMesh.AsObject;
  static serializeBinaryToWriter(message: PolyMesh, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PolyMesh;
  static deserializeBinaryFromReader(message: PolyMesh, reader: jspb.BinaryReader): PolyMesh;
}

export namespace PolyMesh {
  export type AsObject = {
    meshesList: Array<Mesh.AsObject>,
    collisionConvexHullList: Array<Mesh.AsObject>,
    transform?: Matrix4x4.AsObject,
    name: string,
  }
}

export class TransformationArray extends jspb.Message {
  getTransformationList(): Array<Matrix4x4>;
  setTransformationList(value: Array<Matrix4x4>): TransformationArray;
  clearTransformationList(): TransformationArray;
  addTransformation(value?: Matrix4x4, index?: number): Matrix4x4;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransformationArray.AsObject;
  static toObject(includeInstance: boolean, msg: TransformationArray): TransformationArray.AsObject;
  static serializeBinaryToWriter(message: TransformationArray, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransformationArray;
  static deserializeBinaryFromReader(message: TransformationArray, reader: jspb.BinaryReader): TransformationArray;
}

export namespace TransformationArray {
  export type AsObject = {
    transformationList: Array<Matrix4x4.AsObject>,
  }
}

export class VariableArray extends jspb.Message {
  getVariablesList(): Array<Variable>;
  setVariablesList(value: Array<Variable>): VariableArray;
  clearVariablesList(): VariableArray;
  addVariables(value?: Variable, index?: number): Variable;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VariableArray.AsObject;
  static toObject(includeInstance: boolean, msg: VariableArray): VariableArray.AsObject;
  static serializeBinaryToWriter(message: VariableArray, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VariableArray;
  static deserializeBinaryFromReader(message: VariableArray, reader: jspb.BinaryReader): VariableArray;
}

export namespace VariableArray {
  export type AsObject = {
    variablesList: Array<Variable.AsObject>,
  }
}

export class MetaData extends jspb.Message {
  getId(): string;
  setId(value: string): MetaData;

  getDataMap(): jspb.Map<string, string>;
  clearDataMap(): MetaData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaData.AsObject;
  static toObject(includeInstance: boolean, msg: MetaData): MetaData.AsObject;
  static serializeBinaryToWriter(message: MetaData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaData;
  static deserializeBinaryFromReader(message: MetaData, reader: jspb.BinaryReader): MetaData;
}

export namespace MetaData {
  export type AsObject = {
    id: string,
    dataMap: Array<[string, string]>,
  }
}

export class SubscribeRobotFeedbackRequest extends jspb.Message {
  getId(): string;
  setId(value: string): SubscribeRobotFeedbackRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeRobotFeedbackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeRobotFeedbackRequest): SubscribeRobotFeedbackRequest.AsObject;
  static serializeBinaryToWriter(message: SubscribeRobotFeedbackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeRobotFeedbackRequest;
  static deserializeBinaryFromReader(message: SubscribeRobotFeedbackRequest, reader: jspb.BinaryReader): SubscribeRobotFeedbackRequest;
}

export namespace SubscribeRobotFeedbackRequest {
  export type AsObject = {
    id: string,
  }
}

export class RobotFeedback extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): RobotFeedback;

  getHeartbeatData(): Heartbeat | undefined;
  setHeartbeatData(value?: Heartbeat): RobotFeedback;
  hasHeartbeatData(): boolean;
  clearHeartbeatData(): RobotFeedback;

  getRobotStateData(): RobotState | undefined;
  setRobotStateData(value?: RobotState): RobotFeedback;
  hasRobotStateData(): boolean;
  clearRobotStateData(): RobotFeedback;

  getSettingsData(): Settings | undefined;
  setSettingsData(value?: Settings): RobotFeedback;
  hasSettingsData(): boolean;
  clearSettingsData(): RobotFeedback;

  getPingData(): Ping | undefined;
  setPingData(value?: Ping): RobotFeedback;
  hasPingData(): boolean;
  clearPingData(): RobotFeedback;

  getDataPackageCase(): RobotFeedback.DataPackageCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RobotFeedback.AsObject;
  static toObject(includeInstance: boolean, msg: RobotFeedback): RobotFeedback.AsObject;
  static serializeBinaryToWriter(message: RobotFeedback, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RobotFeedback;
  static deserializeBinaryFromReader(message: RobotFeedback, reader: jspb.BinaryReader): RobotFeedback;
}

export namespace RobotFeedback {
  export type AsObject = {
    status: string,
    heartbeatData?: Heartbeat.AsObject,
    robotStateData?: RobotState.AsObject,
    settingsData?: Settings.AsObject,
    pingData?: Ping.AsObject,
  }

  export enum DataPackageCase { 
    DATA_PACKAGE_NOT_SET = 0,
    HEARTBEAT_DATA = 2,
    ROBOT_STATE_DATA = 3,
    SETTINGS_DATA = 4,
    PING_DATA = 5,
  }
}

export class GetSimulatedRobotStateRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetSimulatedRobotStateRequest;

  getNormalizedState(): number;
  setNormalizedState(value: number): GetSimulatedRobotStateRequest;

  getStreamUpdate(): boolean;
  setStreamUpdate(value: boolean): GetSimulatedRobotStateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSimulatedRobotStateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSimulatedRobotStateRequest): GetSimulatedRobotStateRequest.AsObject;
  static serializeBinaryToWriter(message: GetSimulatedRobotStateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSimulatedRobotStateRequest;
  static deserializeBinaryFromReader(message: GetSimulatedRobotStateRequest, reader: jspb.BinaryReader): GetSimulatedRobotStateRequest;
}

export namespace GetSimulatedRobotStateRequest {
  export type AsObject = {
    id: string,
    normalizedState: number,
    streamUpdate: boolean,
  }
}

export class AddRobotTaskRequest extends jspb.Message {
  getId(): string;
  setId(value: string): AddRobotTaskRequest;

  getRobotTask(): Task | undefined;
  setRobotTask(value?: Task): AddRobotTaskRequest;
  hasRobotTask(): boolean;
  clearRobotTask(): AddRobotTaskRequest;

  getRobotSettings(): Settings | undefined;
  setRobotSettings(value?: Settings): AddRobotTaskRequest;
  hasRobotSettings(): boolean;
  clearRobotSettings(): AddRobotTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddRobotTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddRobotTaskRequest): AddRobotTaskRequest.AsObject;
  static serializeBinaryToWriter(message: AddRobotTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddRobotTaskRequest;
  static deserializeBinaryFromReader(message: AddRobotTaskRequest, reader: jspb.BinaryReader): AddRobotTaskRequest;
}

export namespace AddRobotTaskRequest {
  export type AsObject = {
    id: string,
    robotTask?: Task.AsObject,
    robotSettings?: Settings.AsObject,
  }
}

export class AddRobotTaskReply extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): AddRobotTaskReply;

  getSimulationResultData(): SimulationResult | undefined;
  setSimulationResultData(value?: SimulationResult): AddRobotTaskReply;
  hasSimulationResultData(): boolean;
  clearSimulationResultData(): AddRobotTaskReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddRobotTaskReply.AsObject;
  static toObject(includeInstance: boolean, msg: AddRobotTaskReply): AddRobotTaskReply.AsObject;
  static serializeBinaryToWriter(message: AddRobotTaskReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddRobotTaskReply;
  static deserializeBinaryFromReader(message: AddRobotTaskReply, reader: jspb.BinaryReader): AddRobotTaskReply;
}

export namespace AddRobotTaskReply {
  export type AsObject = {
    status: string,
    simulationResultData?: SimulationResult.AsObject,
  }
}

export class UpdateVariableRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateVariableRequest;

  getVar(): Variable | undefined;
  setVar(value?: Variable): UpdateVariableRequest;
  hasVar(): boolean;
  clearVar(): UpdateVariableRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateVariableRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateVariableRequest): UpdateVariableRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateVariableRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateVariableRequest;
  static deserializeBinaryFromReader(message: UpdateVariableRequest, reader: jspb.BinaryReader): UpdateVariableRequest;
}

export namespace UpdateVariableRequest {
  export type AsObject = {
    id: string,
    pb_var?: Variable.AsObject,
  }
}

export class UpdateVariableReply extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): UpdateVariableReply;
  clearIdList(): UpdateVariableReply;
  addId(value: string, index?: number): UpdateVariableReply;

  getVariablesList(): Array<VariableArray>;
  setVariablesList(value: Array<VariableArray>): UpdateVariableReply;
  clearVariablesList(): UpdateVariableReply;
  addVariables(value?: VariableArray, index?: number): VariableArray;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateVariableReply.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateVariableReply): UpdateVariableReply.AsObject;
  static serializeBinaryToWriter(message: UpdateVariableReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateVariableReply;
  static deserializeBinaryFromReader(message: UpdateVariableReply, reader: jspb.BinaryReader): UpdateVariableReply;
}

export namespace UpdateVariableReply {
  export type AsObject = {
    idList: Array<string>,
    variablesList: Array<VariableArray.AsObject>,
  }
}

export class SetupRobotRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): SetupRobotRequest;

  getSoftwareVersion(): string;
  setSoftwareVersion(value: string): SetupRobotRequest;

  getRobotSetup(): Robot | undefined;
  setRobotSetup(value?: Robot): SetupRobotRequest;
  hasRobotSetup(): boolean;
  clearRobotSetup(): SetupRobotRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupRobotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetupRobotRequest): SetupRobotRequest.AsObject;
  static serializeBinaryToWriter(message: SetupRobotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupRobotRequest;
  static deserializeBinaryFromReader(message: SetupRobotRequest, reader: jspb.BinaryReader): SetupRobotRequest;
}

export namespace SetupRobotRequest {
  export type AsObject = {
    clientId: string,
    softwareVersion: string,
    robotSetup?: Robot.AsObject,
  }
}

export class SetupRobotReply extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): SetupRobotReply;

  getId(): string;
  setId(value: string): SetupRobotReply;

  getLicenseState(): string;
  setLicenseState(value: string): SetupRobotReply;

  getRobotSettings(): Settings | undefined;
  setRobotSettings(value?: Settings): SetupRobotReply;
  hasRobotSettings(): boolean;
  clearRobotSettings(): SetupRobotReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupRobotReply.AsObject;
  static toObject(includeInstance: boolean, msg: SetupRobotReply): SetupRobotReply.AsObject;
  static serializeBinaryToWriter(message: SetupRobotReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupRobotReply;
  static deserializeBinaryFromReader(message: SetupRobotReply, reader: jspb.BinaryReader): SetupRobotReply;
}

export namespace SetupRobotReply {
  export type AsObject = {
    status: string,
    id: string,
    licenseState: string,
    robotSettings?: Settings.AsObject,
  }
}

export class Robot extends jspb.Message {
  getPresetRobotClass(): string;
  setPresetRobotClass(value: string): Robot;

  getCustomRobot(): CustomRobot | undefined;
  setCustomRobot(value?: CustomRobot): Robot;
  hasCustomRobot(): boolean;
  clearCustomRobot(): Robot;

  getRobotDriverClass(): string;
  setRobotDriverClass(value: string): Robot;

  getFriendlyId(): string;
  setFriendlyId(value: string): Robot;

  getToolDictionaryMap(): jspb.Map<string, Tool>;
  clearToolDictionaryMap(): Robot;

  getInitialBase(): Base | undefined;
  setInitialBase(value?: Base): Robot;
  hasInitialBase(): boolean;
  clearInitialBase(): Robot;

  getCollisionGeometryList(): Array<PolyMesh>;
  setCollisionGeometryList(value: Array<PolyMesh>): Robot;
  clearCollisionGeometryList(): Robot;
  addCollisionGeometry(value?: PolyMesh, index?: number): PolyMesh;

  getExternalAxesList(): Array<ExternalAxis>;
  setExternalAxesList(value: Array<ExternalAxis>): Robot;
  clearExternalAxesList(): Robot;
  addExternalAxes(value?: ExternalAxis, index?: number): ExternalAxis;

  getData(): MetaData | undefined;
  setData(value?: MetaData): Robot;
  hasData(): boolean;
  clearData(): Robot;

  getRobotDataCase(): Robot.RobotDataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Robot.AsObject;
  static toObject(includeInstance: boolean, msg: Robot): Robot.AsObject;
  static serializeBinaryToWriter(message: Robot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Robot;
  static deserializeBinaryFromReader(message: Robot, reader: jspb.BinaryReader): Robot;
}

export namespace Robot {
  export type AsObject = {
    presetRobotClass: string,
    customRobot?: CustomRobot.AsObject,
    robotDriverClass: string,
    friendlyId: string,
    toolDictionaryMap: Array<[string, Tool.AsObject]>,
    initialBase?: Base.AsObject,
    collisionGeometryList: Array<PolyMesh.AsObject>,
    externalAxesList: Array<ExternalAxis.AsObject>,
    data?: MetaData.AsObject,
  }

  export enum RobotDataCase { 
    ROBOT_DATA_NOT_SET = 0,
    PRESET_ROBOT_CLASS = 1,
    CUSTOM_ROBOT = 2,
  }
}

export class Tool extends jspb.Message {
  getToolType(): FrameType;
  setToolType(value: FrameType): Tool;

  getTcp(): CartesianPosition | undefined;
  setTcp(value?: CartesianPosition): Tool;
  hasTcp(): boolean;
  clearTcp(): Tool;

  getToolId(): string;
  setToolId(value: string): Tool;

  getToolState(): number;
  setToolState(value: number): Tool;

  getToolGeometry(): PolyMesh | undefined;
  setToolGeometry(value?: PolyMesh): Tool;
  hasToolGeometry(): boolean;
  clearToolGeometry(): Tool;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tool.AsObject;
  static toObject(includeInstance: boolean, msg: Tool): Tool.AsObject;
  static serializeBinaryToWriter(message: Tool, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tool;
  static deserializeBinaryFromReader(message: Tool, reader: jspb.BinaryReader): Tool;
}

export namespace Tool {
  export type AsObject = {
    toolType: FrameType,
    tcp?: CartesianPosition.AsObject,
    toolId: string,
    toolState: number,
    toolGeometry?: PolyMesh.AsObject,
  }
}

export class Base extends jspb.Message {
  getBaseType(): FrameType;
  setBaseType(value: FrameType): Base;

  getBaseFrame(): CartesianPosition | undefined;
  setBaseFrame(value?: CartesianPosition): Base;
  hasBaseFrame(): boolean;
  clearBaseFrame(): Base;

  getBaseId(): string;
  setBaseId(value: string): Base;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Base.AsObject;
  static toObject(includeInstance: boolean, msg: Base): Base.AsObject;
  static serializeBinaryToWriter(message: Base, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Base;
  static deserializeBinaryFromReader(message: Base, reader: jspb.BinaryReader): Base;
}

export namespace Base {
  export type AsObject = {
    baseType: FrameType,
    baseFrame?: CartesianPosition.AsObject,
    baseId: string,
  }
}

export class CustomRobot extends jspb.Message {
  getAxisCenterList(): Array<Vector3>;
  setAxisCenterList(value: Array<Vector3>): CustomRobot;
  clearAxisCenterList(): CustomRobot;
  addAxisCenter(value?: Vector3, index?: number): Vector3;

  getAxisDirectionList(): Array<Vector3>;
  setAxisDirectionList(value: Array<Vector3>): CustomRobot;
  clearAxisDirectionList(): CustomRobot;
  addAxisDirection(value?: Vector3, index?: number): Vector3;

  getAxisSpeedList(): Array<number>;
  setAxisSpeedList(value: Array<number>): CustomRobot;
  clearAxisSpeedList(): CustomRobot;
  addAxisSpeed(value: number, index?: number): CustomRobot;

  getAxisRangeMinList(): Array<number>;
  setAxisRangeMinList(value: Array<number>): CustomRobot;
  clearAxisRangeMinList(): CustomRobot;
  addAxisRangeMin(value: number, index?: number): CustomRobot;

  getAxisRangeMaxList(): Array<number>;
  setAxisRangeMaxList(value: Array<number>): CustomRobot;
  clearAxisRangeMaxList(): CustomRobot;
  addAxisRangeMax(value: number, index?: number): CustomRobot;

  getName(): string;
  setName(value: string): CustomRobot;

  getShortName(): string;
  setShortName(value: string): CustomRobot;

  getGeometryList(): Array<PolyMesh>;
  setGeometryList(value: Array<PolyMesh>): CustomRobot;
  clearGeometryList(): CustomRobot;
  addGeometry(value?: PolyMesh, index?: number): PolyMesh;

  getRootCs(): Matrix4x4 | undefined;
  setRootCs(value?: Matrix4x4): CustomRobot;
  hasRootCs(): boolean;
  clearRootCs(): CustomRobot;

  getFlangeCs(): Matrix4x4 | undefined;
  setFlangeCs(value?: Matrix4x4): CustomRobot;
  hasFlangeCs(): boolean;
  clearFlangeCs(): CustomRobot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomRobot.AsObject;
  static toObject(includeInstance: boolean, msg: CustomRobot): CustomRobot.AsObject;
  static serializeBinaryToWriter(message: CustomRobot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomRobot;
  static deserializeBinaryFromReader(message: CustomRobot, reader: jspb.BinaryReader): CustomRobot;
}

export namespace CustomRobot {
  export type AsObject = {
    axisCenterList: Array<Vector3.AsObject>,
    axisDirectionList: Array<Vector3.AsObject>,
    axisSpeedList: Array<number>,
    axisRangeMinList: Array<number>,
    axisRangeMaxList: Array<number>,
    name: string,
    shortName: string,
    geometryList: Array<PolyMesh.AsObject>,
    rootCs?: Matrix4x4.AsObject,
    flangeCs?: Matrix4x4.AsObject,
  }
}

export class ExternalAxis extends jspb.Message {
  getExternalAxisType(): ExternalAxisType;
  setExternalAxisType(value: ExternalAxisType): ExternalAxis;

  getName(): string;
  setName(value: string): ExternalAxis;

  getShortName(): string;
  setShortName(value: string): ExternalAxis;

  getRangeMinList(): Array<number>;
  setRangeMinList(value: Array<number>): ExternalAxis;
  clearRangeMinList(): ExternalAxis;
  addRangeMin(value: number, index?: number): ExternalAxis;

  getRangeMaxList(): Array<number>;
  setRangeMaxList(value: Array<number>): ExternalAxis;
  clearRangeMaxList(): ExternalAxis;
  addRangeMax(value: number, index?: number): ExternalAxis;

  getSpeedList(): Array<number>;
  setSpeedList(value: Array<number>): ExternalAxis;
  clearSpeedList(): ExternalAxis;
  addSpeed(value: number, index?: number): ExternalAxis;

  getOrientationList(): Array<Matrix4x4>;
  setOrientationList(value: Array<Matrix4x4>): ExternalAxis;
  clearOrientationList(): ExternalAxis;
  addOrientation(value?: Matrix4x4, index?: number): Matrix4x4;

  getPosition(): CartesianPosition | undefined;
  setPosition(value?: CartesianPosition): ExternalAxis;
  hasPosition(): boolean;
  clearPosition(): ExternalAxis;

  getGeometryList(): Array<PolyMesh>;
  setGeometryList(value: Array<PolyMesh>): ExternalAxis;
  clearGeometryList(): ExternalAxis;
  addGeometry(value?: PolyMesh, index?: number): PolyMesh;

  getData(): MetaData | undefined;
  setData(value?: MetaData): ExternalAxis;
  hasData(): boolean;
  clearData(): ExternalAxis;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExternalAxis.AsObject;
  static toObject(includeInstance: boolean, msg: ExternalAxis): ExternalAxis.AsObject;
  static serializeBinaryToWriter(message: ExternalAxis, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExternalAxis;
  static deserializeBinaryFromReader(message: ExternalAxis, reader: jspb.BinaryReader): ExternalAxis;
}

export namespace ExternalAxis {
  export type AsObject = {
    externalAxisType: ExternalAxisType,
    name: string,
    shortName: string,
    rangeMinList: Array<number>,
    rangeMaxList: Array<number>,
    speedList: Array<number>,
    orientationList: Array<Matrix4x4.AsObject>,
    position?: CartesianPosition.AsObject,
    geometryList: Array<PolyMesh.AsObject>,
    data?: MetaData.AsObject,
  }
}

export enum ExternalAxisType { 
  LINEAR_RAIL = 0,
  LINEAR_DOUBLE = 1,
  LINEAR_TRIPLE = 2,
  ROTARY_SINGLE = 3,
  ROTARY_DOUBLE = 4,
  AGV = 5,
}
export enum CartesianReference { 
  ABSOLUTE = 0,
  RELATIVE = 1,
  PARENT = 2,
}
export enum FrameType { 
  FIXED = 0,
  EXTERNAL = 1,
}
export enum EulerFormat { 
  ZYX = 0,
  AXISANGLE = 1,
  RPY = 2,
}
export enum AxisName { 
  A1 = 0,
  A2 = 1,
  A3 = 2,
  A4 = 3,
  A5 = 4,
  A6 = 5,
  A7 = 6,
  E1 = 7,
  E2 = 8,
  E3 = 9,
  E4 = 10,
}
export enum TaskType { 
  SIMULATE_TASK = 0,
  EXECUTE_TASK = 1,
  EXECUTE_ON_SIMULATION_SUCCESS_TASK = 2,
  SIMULATE_AND_EXECUTE_TASK = 3,
  CONTAINER = 4,
}
export enum RobotStatus { 
  IDLE = 0,
  ACTIVE = 1,
  ERROR = 2,
}
export enum MotionGroupType { 
  CP = 0,
  PTP = 1,
  SPLINE = 2,
}
