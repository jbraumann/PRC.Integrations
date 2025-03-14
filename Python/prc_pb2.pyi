from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ExternalAxisType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    LINEAR_RAIL: _ClassVar[ExternalAxisType]
    LINEAR_DOUBLE: _ClassVar[ExternalAxisType]
    LINEAR_TRIPLE: _ClassVar[ExternalAxisType]
    ROTARY_SINGLE: _ClassVar[ExternalAxisType]
    ROTARY_DOUBLE: _ClassVar[ExternalAxisType]
    AGV: _ClassVar[ExternalAxisType]

class CartesianReference(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    ABSOLUTE: _ClassVar[CartesianReference]
    RELATIVE: _ClassVar[CartesianReference]
    PARENT: _ClassVar[CartesianReference]

class FrameType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    FIXED: _ClassVar[FrameType]
    EXTERNAL: _ClassVar[FrameType]

class EulerFormat(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    ZYX: _ClassVar[EulerFormat]
    AXISANGLE: _ClassVar[EulerFormat]
    RPY: _ClassVar[EulerFormat]

class AxisName(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    A1: _ClassVar[AxisName]
    A2: _ClassVar[AxisName]
    A3: _ClassVar[AxisName]
    A4: _ClassVar[AxisName]
    A5: _ClassVar[AxisName]
    A6: _ClassVar[AxisName]
    A7: _ClassVar[AxisName]
    E1: _ClassVar[AxisName]
    E2: _ClassVar[AxisName]
    E3: _ClassVar[AxisName]
    E4: _ClassVar[AxisName]

class TaskType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    SIMULATE_TASK: _ClassVar[TaskType]
    EXECUTE_TASK: _ClassVar[TaskType]
    EXECUTE_ON_SIMULATION_SUCCESS_TASK: _ClassVar[TaskType]
    SIMULATE_AND_EXECUTE_TASK: _ClassVar[TaskType]
    CONTAINER: _ClassVar[TaskType]

class RobotStatus(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    IDLE: _ClassVar[RobotStatus]
    ACTIVE: _ClassVar[RobotStatus]
    ERROR: _ClassVar[RobotStatus]

class MotionGroupType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    CP: _ClassVar[MotionGroupType]
    PTP: _ClassVar[MotionGroupType]
    SPLINE: _ClassVar[MotionGroupType]
LINEAR_RAIL: ExternalAxisType
LINEAR_DOUBLE: ExternalAxisType
LINEAR_TRIPLE: ExternalAxisType
ROTARY_SINGLE: ExternalAxisType
ROTARY_DOUBLE: ExternalAxisType
AGV: ExternalAxisType
ABSOLUTE: CartesianReference
RELATIVE: CartesianReference
PARENT: CartesianReference
FIXED: FrameType
EXTERNAL: FrameType
ZYX: EulerFormat
AXISANGLE: EulerFormat
RPY: EulerFormat
A1: AxisName
A2: AxisName
A3: AxisName
A4: AxisName
A5: AxisName
A6: AxisName
A7: AxisName
E1: AxisName
E2: AxisName
E3: AxisName
E4: AxisName
SIMULATE_TASK: TaskType
EXECUTE_TASK: TaskType
EXECUTE_ON_SIMULATION_SUCCESS_TASK: TaskType
SIMULATE_AND_EXECUTE_TASK: TaskType
CONTAINER: TaskType
IDLE: RobotStatus
ACTIVE: RobotStatus
ERROR: RobotStatus
CP: MotionGroupType
PTP: MotionGroupType
SPLINE: MotionGroupType

class Action(_message.Message):
    __slots__ = ("set_variable_action", "wait_for_variable_action", "hold_action", "ping_action", "insert_code_action")
    SET_VARIABLE_ACTION_FIELD_NUMBER: _ClassVar[int]
    WAIT_FOR_VARIABLE_ACTION_FIELD_NUMBER: _ClassVar[int]
    HOLD_ACTION_FIELD_NUMBER: _ClassVar[int]
    PING_ACTION_FIELD_NUMBER: _ClassVar[int]
    INSERT_CODE_ACTION_FIELD_NUMBER: _ClassVar[int]
    set_variable_action: SetVariable
    wait_for_variable_action: WaitForVariable
    hold_action: Hold
    ping_action: Ping
    insert_code_action: InsertCode
    def __init__(self, set_variable_action: _Optional[_Union[SetVariable, _Mapping]] = ..., wait_for_variable_action: _Optional[_Union[WaitForVariable, _Mapping]] = ..., hold_action: _Optional[_Union[Hold, _Mapping]] = ..., ping_action: _Optional[_Union[Ping, _Mapping]] = ..., insert_code_action: _Optional[_Union[InsertCode, _Mapping]] = ...) -> None: ...

class SetVariable(_message.Message):
    __slots__ = ("new_state",)
    NEW_STATE_FIELD_NUMBER: _ClassVar[int]
    new_state: Variable
    def __init__(self, new_state: _Optional[_Union[Variable, _Mapping]] = ...) -> None: ...

class WaitForVariable(_message.Message):
    __slots__ = ("await_state",)
    AWAIT_STATE_FIELD_NUMBER: _ClassVar[int]
    await_state: Variable
    def __init__(self, await_state: _Optional[_Union[Variable, _Mapping]] = ...) -> None: ...

class Hold(_message.Message):
    __slots__ = ("hold_ms",)
    HOLD_MS_FIELD_NUMBER: _ClassVar[int]
    hold_ms: float
    def __init__(self, hold_ms: _Optional[float] = ...) -> None: ...

class Ping(_message.Message):
    __slots__ = ("payload", "time_ms")
    PAYLOAD_FIELD_NUMBER: _ClassVar[int]
    TIME_MS_FIELD_NUMBER: _ClassVar[int]
    payload: str
    time_ms: int
    def __init__(self, payload: _Optional[str] = ..., time_ms: _Optional[int] = ...) -> None: ...

class InsertCode(_message.Message):
    __slots__ = ("code",)
    CODE_FIELD_NUMBER: _ClassVar[int]
    code: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, code: _Optional[_Iterable[str]] = ...) -> None: ...

class SimulationResult(_message.Message):
    __slots__ = ("simulation_results", "is_valid", "time", "code", "data")
    SIMULATION_RESULTS_FIELD_NUMBER: _ClassVar[int]
    IS_VALID_FIELD_NUMBER: _ClassVar[int]
    TIME_FIELD_NUMBER: _ClassVar[int]
    CODE_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    simulation_results: _containers.RepeatedCompositeFieldContainer[SimulationResultUnit]
    is_valid: bool
    time: float
    code: str
    data: MetaData
    def __init__(self, simulation_results: _Optional[_Iterable[_Union[SimulationResultUnit, _Mapping]]] = ..., is_valid: bool = ..., time: _Optional[float] = ..., code: _Optional[str] = ..., data: _Optional[_Union[MetaData, _Mapping]] = ...) -> None: ...

class SimulationResultUnit(_message.Message):
    __slots__ = ("axis_values", "position", "time", "collision", "singularity", "outofreach", "external_axis_values", "external_axis_outofreach", "interpolation_factor", "id", "alarm")
    AXIS_VALUES_FIELD_NUMBER: _ClassVar[int]
    POSITION_FIELD_NUMBER: _ClassVar[int]
    TIME_FIELD_NUMBER: _ClassVar[int]
    COLLISION_FIELD_NUMBER: _ClassVar[int]
    SINGULARITY_FIELD_NUMBER: _ClassVar[int]
    OUTOFREACH_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXIS_VALUES_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXIS_OUTOFREACH_FIELD_NUMBER: _ClassVar[int]
    INTERPOLATION_FACTOR_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    ALARM_FIELD_NUMBER: _ClassVar[int]
    axis_values: _containers.RepeatedScalarFieldContainer[float]
    position: Matrix4x4
    time: float
    collision: _containers.RepeatedScalarFieldContainer[bool]
    singularity: _containers.RepeatedScalarFieldContainer[bool]
    outofreach: _containers.RepeatedScalarFieldContainer[bool]
    external_axis_values: _containers.RepeatedScalarFieldContainer[float]
    external_axis_outofreach: _containers.RepeatedScalarFieldContainer[bool]
    interpolation_factor: float
    id: str
    alarm: bool
    def __init__(self, axis_values: _Optional[_Iterable[float]] = ..., position: _Optional[_Union[Matrix4x4, _Mapping]] = ..., time: _Optional[float] = ..., collision: _Optional[_Iterable[bool]] = ..., singularity: _Optional[_Iterable[bool]] = ..., outofreach: _Optional[_Iterable[bool]] = ..., external_axis_values: _Optional[_Iterable[float]] = ..., external_axis_outofreach: _Optional[_Iterable[bool]] = ..., interpolation_factor: _Optional[float] = ..., id: _Optional[str] = ..., alarm: bool = ...) -> None: ...

class RobotState(_message.Message):
    __slots__ = ("axis_position", "robot_transformations", "toolpath_index", "tool_id", "tool_frame", "root_frame", "flange_frame", "axis_alarm", "external_axis_alarm", "variables", "data", "connection_feedback", "task_id", "command_id", "robot_id", "status")
    class VariablesEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: VariableArray
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[VariableArray, _Mapping]] = ...) -> None: ...
    class DataEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    AXIS_POSITION_FIELD_NUMBER: _ClassVar[int]
    ROBOT_TRANSFORMATIONS_FIELD_NUMBER: _ClassVar[int]
    TOOLPATH_INDEX_FIELD_NUMBER: _ClassVar[int]
    TOOL_ID_FIELD_NUMBER: _ClassVar[int]
    TOOL_FRAME_FIELD_NUMBER: _ClassVar[int]
    ROOT_FRAME_FIELD_NUMBER: _ClassVar[int]
    FLANGE_FRAME_FIELD_NUMBER: _ClassVar[int]
    AXIS_ALARM_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXIS_ALARM_FIELD_NUMBER: _ClassVar[int]
    VARIABLES_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_FEEDBACK_FIELD_NUMBER: _ClassVar[int]
    TASK_ID_FIELD_NUMBER: _ClassVar[int]
    COMMAND_ID_FIELD_NUMBER: _ClassVar[int]
    ROBOT_ID_FIELD_NUMBER: _ClassVar[int]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    axis_position: JointTarget
    robot_transformations: _containers.RepeatedCompositeFieldContainer[TransformationArray]
    toolpath_index: float
    tool_id: str
    tool_frame: Matrix4x4
    root_frame: Matrix4x4
    flange_frame: Matrix4x4
    axis_alarm: _containers.RepeatedScalarFieldContainer[bool]
    external_axis_alarm: _containers.RepeatedScalarFieldContainer[bool]
    variables: _containers.MessageMap[str, VariableArray]
    data: _containers.ScalarMap[str, str]
    connection_feedback: str
    task_id: str
    command_id: str
    robot_id: str
    status: RobotStatus
    def __init__(self, axis_position: _Optional[_Union[JointTarget, _Mapping]] = ..., robot_transformations: _Optional[_Iterable[_Union[TransformationArray, _Mapping]]] = ..., toolpath_index: _Optional[float] = ..., tool_id: _Optional[str] = ..., tool_frame: _Optional[_Union[Matrix4x4, _Mapping]] = ..., root_frame: _Optional[_Union[Matrix4x4, _Mapping]] = ..., flange_frame: _Optional[_Union[Matrix4x4, _Mapping]] = ..., axis_alarm: _Optional[_Iterable[bool]] = ..., external_axis_alarm: _Optional[_Iterable[bool]] = ..., variables: _Optional[_Mapping[str, VariableArray]] = ..., data: _Optional[_Mapping[str, str]] = ..., connection_feedback: _Optional[str] = ..., task_id: _Optional[str] = ..., command_id: _Optional[str] = ..., robot_id: _Optional[str] = ..., status: _Optional[_Union[RobotStatus, str]] = ...) -> None: ...

class Task(_message.Message):
    __slots__ = ("payload", "type", "name", "data")
    PAYLOAD_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    payload: _containers.RepeatedCompositeFieldContainer[TaskPayload]
    type: TaskType
    name: str
    data: MetaData
    def __init__(self, payload: _Optional[_Iterable[_Union[TaskPayload, _Mapping]]] = ..., type: _Optional[_Union[TaskType, str]] = ..., name: _Optional[str] = ..., data: _Optional[_Union[MetaData, _Mapping]] = ...) -> None: ...

class TaskPayload(_message.Message):
    __slots__ = ("flow_task", "motion_group_task", "action_task")
    FLOW_TASK_FIELD_NUMBER: _ClassVar[int]
    MOTION_GROUP_TASK_FIELD_NUMBER: _ClassVar[int]
    ACTION_TASK_FIELD_NUMBER: _ClassVar[int]
    flow_task: Flow
    motion_group_task: MotionGroup
    action_task: Action
    def __init__(self, flow_task: _Optional[_Union[Flow, _Mapping]] = ..., motion_group_task: _Optional[_Union[MotionGroup, _Mapping]] = ..., action_task: _Optional[_Union[Action, _Mapping]] = ...) -> None: ...

class Flow(_message.Message):
    __slots__ = ("if_else_flow", "while_flow", "end_flow")
    IF_ELSE_FLOW_FIELD_NUMBER: _ClassVar[int]
    WHILE_FLOW_FIELD_NUMBER: _ClassVar[int]
    END_FLOW_FIELD_NUMBER: _ClassVar[int]
    if_else_flow: IfElse
    while_flow: While
    end_flow: End
    def __init__(self, if_else_flow: _Optional[_Union[IfElse, _Mapping]] = ..., while_flow: _Optional[_Union[While, _Mapping]] = ..., end_flow: _Optional[_Union[End, _Mapping]] = ...) -> None: ...

class IfElse(_message.Message):
    __slots__ = ("condition", "if_true", "if_false")
    CONDITION_FIELD_NUMBER: _ClassVar[int]
    IF_TRUE_FIELD_NUMBER: _ClassVar[int]
    IF_FALSE_FIELD_NUMBER: _ClassVar[int]
    condition: Variable
    if_true: Task
    if_false: Task
    def __init__(self, condition: _Optional[_Union[Variable, _Mapping]] = ..., if_true: _Optional[_Union[Task, _Mapping]] = ..., if_false: _Optional[_Union[Task, _Mapping]] = ...) -> None: ...

class While(_message.Message):
    __slots__ = ("condition", "body")
    CONDITION_FIELD_NUMBER: _ClassVar[int]
    BODY_FIELD_NUMBER: _ClassVar[int]
    condition: Variable
    body: Task
    def __init__(self, condition: _Optional[_Union[Variable, _Mapping]] = ..., body: _Optional[_Union[Task, _Mapping]] = ...) -> None: ...

class End(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class MotionCommand(_message.Message):
    __slots__ = ("axis_motion", "circular_motion", "ptp_motion", "lin_motion")
    AXIS_MOTION_FIELD_NUMBER: _ClassVar[int]
    CIRCULAR_MOTION_FIELD_NUMBER: _ClassVar[int]
    PTP_MOTION_FIELD_NUMBER: _ClassVar[int]
    LIN_MOTION_FIELD_NUMBER: _ClassVar[int]
    axis_motion: AxisMotion
    circular_motion: CircularMotion
    ptp_motion: PTPMotion
    lin_motion: LINMotion
    def __init__(self, axis_motion: _Optional[_Union[AxisMotion, _Mapping]] = ..., circular_motion: _Optional[_Union[CircularMotion, _Mapping]] = ..., ptp_motion: _Optional[_Union[PTPMotion, _Mapping]] = ..., lin_motion: _Optional[_Union[LINMotion, _Mapping]] = ...) -> None: ...

class MotionGroup(_message.Message):
    __slots__ = ("motion_group_type", "commands", "interpolation", "tool_id", "robot_base", "data")
    MOTION_GROUP_TYPE_FIELD_NUMBER: _ClassVar[int]
    COMMANDS_FIELD_NUMBER: _ClassVar[int]
    INTERPOLATION_FIELD_NUMBER: _ClassVar[int]
    TOOL_ID_FIELD_NUMBER: _ClassVar[int]
    ROBOT_BASE_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    motion_group_type: MotionGroupType
    commands: _containers.RepeatedCompositeFieldContainer[MotionCommand]
    interpolation: str
    tool_id: str
    robot_base: Base
    data: MetaData
    def __init__(self, motion_group_type: _Optional[_Union[MotionGroupType, str]] = ..., commands: _Optional[_Iterable[_Union[MotionCommand, _Mapping]]] = ..., interpolation: _Optional[str] = ..., tool_id: _Optional[str] = ..., robot_base: _Optional[_Union[Base, _Mapping]] = ..., data: _Optional[_Union[MetaData, _Mapping]] = ...) -> None: ...

class AxisMotion(_message.Message):
    __slots__ = ("data", "target")
    DATA_FIELD_NUMBER: _ClassVar[int]
    TARGET_FIELD_NUMBER: _ClassVar[int]
    data: MetaData
    target: JointTarget
    def __init__(self, data: _Optional[_Union[MetaData, _Mapping]] = ..., target: _Optional[_Union[JointTarget, _Mapping]] = ...) -> None: ...

class CircularMotion(_message.Message):
    __slots__ = ("data", "targets")
    DATA_FIELD_NUMBER: _ClassVar[int]
    TARGETS_FIELD_NUMBER: _ClassVar[int]
    data: MetaData
    targets: _containers.RepeatedCompositeFieldContainer[CartesianTarget]
    def __init__(self, data: _Optional[_Union[MetaData, _Mapping]] = ..., targets: _Optional[_Iterable[_Union[CartesianTarget, _Mapping]]] = ...) -> None: ...

class LINMotion(_message.Message):
    __slots__ = ("data", "target")
    DATA_FIELD_NUMBER: _ClassVar[int]
    TARGET_FIELD_NUMBER: _ClassVar[int]
    data: MetaData
    target: CartesianTarget
    def __init__(self, data: _Optional[_Union[MetaData, _Mapping]] = ..., target: _Optional[_Union[CartesianTarget, _Mapping]] = ...) -> None: ...

class PTPMotion(_message.Message):
    __slots__ = ("data", "target")
    DATA_FIELD_NUMBER: _ClassVar[int]
    TARGET_FIELD_NUMBER: _ClassVar[int]
    data: MetaData
    target: CartesianTarget
    def __init__(self, data: _Optional[_Union[MetaData, _Mapping]] = ..., target: _Optional[_Union[CartesianTarget, _Mapping]] = ...) -> None: ...

class Matrix4x4(_message.Message):
    __slots__ = ("m11", "m12", "m13", "m14", "m21", "m22", "m23", "m24", "m31", "m32", "m33", "m34", "m41", "m42", "m43", "m44")
    M11_FIELD_NUMBER: _ClassVar[int]
    M12_FIELD_NUMBER: _ClassVar[int]
    M13_FIELD_NUMBER: _ClassVar[int]
    M14_FIELD_NUMBER: _ClassVar[int]
    M21_FIELD_NUMBER: _ClassVar[int]
    M22_FIELD_NUMBER: _ClassVar[int]
    M23_FIELD_NUMBER: _ClassVar[int]
    M24_FIELD_NUMBER: _ClassVar[int]
    M31_FIELD_NUMBER: _ClassVar[int]
    M32_FIELD_NUMBER: _ClassVar[int]
    M33_FIELD_NUMBER: _ClassVar[int]
    M34_FIELD_NUMBER: _ClassVar[int]
    M41_FIELD_NUMBER: _ClassVar[int]
    M42_FIELD_NUMBER: _ClassVar[int]
    M43_FIELD_NUMBER: _ClassVar[int]
    M44_FIELD_NUMBER: _ClassVar[int]
    m11: float
    m12: float
    m13: float
    m14: float
    m21: float
    m22: float
    m23: float
    m24: float
    m31: float
    m32: float
    m33: float
    m34: float
    m41: float
    m42: float
    m43: float
    m44: float
    def __init__(self, m11: _Optional[float] = ..., m12: _Optional[float] = ..., m13: _Optional[float] = ..., m14: _Optional[float] = ..., m21: _Optional[float] = ..., m22: _Optional[float] = ..., m23: _Optional[float] = ..., m24: _Optional[float] = ..., m31: _Optional[float] = ..., m32: _Optional[float] = ..., m33: _Optional[float] = ..., m34: _Optional[float] = ..., m41: _Optional[float] = ..., m42: _Optional[float] = ..., m43: _Optional[float] = ..., m44: _Optional[float] = ...) -> None: ...

class CartesianPosition(_message.Message):
    __slots__ = ("matrix", "euler", "cs", "reference", "parent", "id")
    MATRIX_FIELD_NUMBER: _ClassVar[int]
    EULER_FIELD_NUMBER: _ClassVar[int]
    CS_FIELD_NUMBER: _ClassVar[int]
    REFERENCE_FIELD_NUMBER: _ClassVar[int]
    PARENT_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    matrix: Matrix4x4
    euler: Euler
    cs: CoordinateSystem
    reference: CartesianReference
    parent: Matrix4x4
    id: str
    def __init__(self, matrix: _Optional[_Union[Matrix4x4, _Mapping]] = ..., euler: _Optional[_Union[Euler, _Mapping]] = ..., cs: _Optional[_Union[CoordinateSystem, _Mapping]] = ..., reference: _Optional[_Union[CartesianReference, str]] = ..., parent: _Optional[_Union[Matrix4x4, _Mapping]] = ..., id: _Optional[str] = ...) -> None: ...

class CartesianTarget(_message.Message):
    __slots__ = ("position", "posture", "speed", "acceleration", "external_axis_values", "redundancy")
    POSITION_FIELD_NUMBER: _ClassVar[int]
    POSTURE_FIELD_NUMBER: _ClassVar[int]
    SPEED_FIELD_NUMBER: _ClassVar[int]
    ACCELERATION_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXIS_VALUES_FIELD_NUMBER: _ClassVar[int]
    REDUNDANCY_FIELD_NUMBER: _ClassVar[int]
    position: CartesianPosition
    posture: str
    speed: _containers.RepeatedScalarFieldContainer[float]
    acceleration: _containers.RepeatedScalarFieldContainer[float]
    external_axis_values: _containers.RepeatedScalarFieldContainer[float]
    redundancy: float
    def __init__(self, position: _Optional[_Union[CartesianPosition, _Mapping]] = ..., posture: _Optional[str] = ..., speed: _Optional[_Iterable[float]] = ..., acceleration: _Optional[_Iterable[float]] = ..., external_axis_values: _Optional[_Iterable[float]] = ..., redundancy: _Optional[float] = ...) -> None: ...

class JointTarget(_message.Message):
    __slots__ = ("axis_values", "speed", "acceleration", "external_axis_values")
    AXIS_VALUES_FIELD_NUMBER: _ClassVar[int]
    SPEED_FIELD_NUMBER: _ClassVar[int]
    ACCELERATION_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXIS_VALUES_FIELD_NUMBER: _ClassVar[int]
    axis_values: _containers.RepeatedScalarFieldContainer[float]
    speed: _containers.RepeatedScalarFieldContainer[float]
    acceleration: _containers.RepeatedScalarFieldContainer[float]
    external_axis_values: _containers.RepeatedScalarFieldContainer[float]
    def __init__(self, axis_values: _Optional[_Iterable[float]] = ..., speed: _Optional[_Iterable[float]] = ..., acceleration: _Optional[_Iterable[float]] = ..., external_axis_values: _Optional[_Iterable[float]] = ...) -> None: ...

class Vector3(_message.Message):
    __slots__ = ("x", "y", "z")
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    Z_FIELD_NUMBER: _ClassVar[int]
    x: float
    y: float
    z: float
    def __init__(self, x: _Optional[float] = ..., y: _Optional[float] = ..., z: _Optional[float] = ...) -> None: ...

class Int4(_message.Message):
    __slots__ = ("x", "y", "z", "w")
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    Z_FIELD_NUMBER: _ClassVar[int]
    W_FIELD_NUMBER: _ClassVar[int]
    x: int
    y: int
    z: int
    w: int
    def __init__(self, x: _Optional[int] = ..., y: _Optional[int] = ..., z: _Optional[int] = ..., w: _Optional[int] = ...) -> None: ...

class Euler(_message.Message):
    __slots__ = ("x", "y", "z", "a", "b", "c", "format")
    X_FIELD_NUMBER: _ClassVar[int]
    Y_FIELD_NUMBER: _ClassVar[int]
    Z_FIELD_NUMBER: _ClassVar[int]
    A_FIELD_NUMBER: _ClassVar[int]
    B_FIELD_NUMBER: _ClassVar[int]
    C_FIELD_NUMBER: _ClassVar[int]
    FORMAT_FIELD_NUMBER: _ClassVar[int]
    x: float
    y: float
    z: float
    a: float
    b: float
    c: float
    format: EulerFormat
    def __init__(self, x: _Optional[float] = ..., y: _Optional[float] = ..., z: _Optional[float] = ..., a: _Optional[float] = ..., b: _Optional[float] = ..., c: _Optional[float] = ..., format: _Optional[_Union[EulerFormat, str]] = ...) -> None: ...

class CoordinateSystem(_message.Message):
    __slots__ = ("origin", "x_axis", "y_axis")
    ORIGIN_FIELD_NUMBER: _ClassVar[int]
    X_AXIS_FIELD_NUMBER: _ClassVar[int]
    Y_AXIS_FIELD_NUMBER: _ClassVar[int]
    origin: Vector3
    x_axis: Vector3
    y_axis: Vector3
    def __init__(self, origin: _Optional[_Union[Vector3, _Mapping]] = ..., x_axis: _Optional[_Union[Vector3, _Mapping]] = ..., y_axis: _Optional[_Union[Vector3, _Mapping]] = ...) -> None: ...

class Variable(_message.Message):
    __slots__ = ("boolean", "single", "integer", "text", "name")
    BOOLEAN_FIELD_NUMBER: _ClassVar[int]
    SINGLE_FIELD_NUMBER: _ClassVar[int]
    INTEGER_FIELD_NUMBER: _ClassVar[int]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    boolean: bool
    single: float
    integer: int
    text: str
    name: str
    def __init__(self, boolean: bool = ..., single: _Optional[float] = ..., integer: _Optional[int] = ..., text: _Optional[str] = ..., name: _Optional[str] = ...) -> None: ...

class Heartbeat(_message.Message):
    __slots__ = ("beat",)
    BEAT_FIELD_NUMBER: _ClassVar[int]
    beat: int
    def __init__(self, beat: _Optional[int] = ...) -> None: ...

class Settings(_message.Message):
    __slots__ = ("settings_dictionary",)
    class SettingsDictionaryEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    SETTINGS_DICTIONARY_FIELD_NUMBER: _ClassVar[int]
    settings_dictionary: _containers.ScalarMap[str, str]
    def __init__(self, settings_dictionary: _Optional[_Mapping[str, str]] = ...) -> None: ...

class Mesh(_message.Message):
    __slots__ = ("faces", "vertices", "normals", "mesh_color")
    FACES_FIELD_NUMBER: _ClassVar[int]
    VERTICES_FIELD_NUMBER: _ClassVar[int]
    NORMALS_FIELD_NUMBER: _ClassVar[int]
    MESH_COLOR_FIELD_NUMBER: _ClassVar[int]
    faces: _containers.RepeatedCompositeFieldContainer[Int4]
    vertices: _containers.RepeatedCompositeFieldContainer[Vector3]
    normals: _containers.RepeatedCompositeFieldContainer[Vector3]
    mesh_color: Int4
    def __init__(self, faces: _Optional[_Iterable[_Union[Int4, _Mapping]]] = ..., vertices: _Optional[_Iterable[_Union[Vector3, _Mapping]]] = ..., normals: _Optional[_Iterable[_Union[Vector3, _Mapping]]] = ..., mesh_color: _Optional[_Union[Int4, _Mapping]] = ...) -> None: ...

class PolyMesh(_message.Message):
    __slots__ = ("meshes", "collision_convex_hull", "transform", "name")
    MESHES_FIELD_NUMBER: _ClassVar[int]
    COLLISION_CONVEX_HULL_FIELD_NUMBER: _ClassVar[int]
    TRANSFORM_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    meshes: _containers.RepeatedCompositeFieldContainer[Mesh]
    collision_convex_hull: _containers.RepeatedCompositeFieldContainer[Mesh]
    transform: Matrix4x4
    name: str
    def __init__(self, meshes: _Optional[_Iterable[_Union[Mesh, _Mapping]]] = ..., collision_convex_hull: _Optional[_Iterable[_Union[Mesh, _Mapping]]] = ..., transform: _Optional[_Union[Matrix4x4, _Mapping]] = ..., name: _Optional[str] = ...) -> None: ...

class TransformationArray(_message.Message):
    __slots__ = ("transformation",)
    TRANSFORMATION_FIELD_NUMBER: _ClassVar[int]
    transformation: _containers.RepeatedCompositeFieldContainer[Matrix4x4]
    def __init__(self, transformation: _Optional[_Iterable[_Union[Matrix4x4, _Mapping]]] = ...) -> None: ...

class VariableArray(_message.Message):
    __slots__ = ("variables",)
    VARIABLES_FIELD_NUMBER: _ClassVar[int]
    variables: _containers.RepeatedCompositeFieldContainer[Variable]
    def __init__(self, variables: _Optional[_Iterable[_Union[Variable, _Mapping]]] = ...) -> None: ...

class MetaData(_message.Message):
    __slots__ = ("id", "data")
    class DataEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    ID_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    id: str
    data: _containers.ScalarMap[str, str]
    def __init__(self, id: _Optional[str] = ..., data: _Optional[_Mapping[str, str]] = ...) -> None: ...

class SubscribeRobotFeedbackRequest(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: str
    def __init__(self, id: _Optional[str] = ...) -> None: ...

class RobotFeedback(_message.Message):
    __slots__ = ("status", "heartbeat_data", "robot_state_data", "settings_data", "ping_data")
    STATUS_FIELD_NUMBER: _ClassVar[int]
    HEARTBEAT_DATA_FIELD_NUMBER: _ClassVar[int]
    ROBOT_STATE_DATA_FIELD_NUMBER: _ClassVar[int]
    SETTINGS_DATA_FIELD_NUMBER: _ClassVar[int]
    PING_DATA_FIELD_NUMBER: _ClassVar[int]
    status: str
    heartbeat_data: Heartbeat
    robot_state_data: RobotState
    settings_data: Settings
    ping_data: Ping
    def __init__(self, status: _Optional[str] = ..., heartbeat_data: _Optional[_Union[Heartbeat, _Mapping]] = ..., robot_state_data: _Optional[_Union[RobotState, _Mapping]] = ..., settings_data: _Optional[_Union[Settings, _Mapping]] = ..., ping_data: _Optional[_Union[Ping, _Mapping]] = ...) -> None: ...

class GetSimulatedRobotStateRequest(_message.Message):
    __slots__ = ("id", "normalized_state", "stream_update")
    ID_FIELD_NUMBER: _ClassVar[int]
    NORMALIZED_STATE_FIELD_NUMBER: _ClassVar[int]
    STREAM_UPDATE_FIELD_NUMBER: _ClassVar[int]
    id: str
    normalized_state: float
    stream_update: bool
    def __init__(self, id: _Optional[str] = ..., normalized_state: _Optional[float] = ..., stream_update: bool = ...) -> None: ...

class AddRobotTaskRequest(_message.Message):
    __slots__ = ("id", "robot_task", "robot_settings")
    ID_FIELD_NUMBER: _ClassVar[int]
    ROBOT_TASK_FIELD_NUMBER: _ClassVar[int]
    ROBOT_SETTINGS_FIELD_NUMBER: _ClassVar[int]
    id: str
    robot_task: Task
    robot_settings: Settings
    def __init__(self, id: _Optional[str] = ..., robot_task: _Optional[_Union[Task, _Mapping]] = ..., robot_settings: _Optional[_Union[Settings, _Mapping]] = ...) -> None: ...

class AddRobotTaskReply(_message.Message):
    __slots__ = ("status", "simulation_result_data")
    STATUS_FIELD_NUMBER: _ClassVar[int]
    SIMULATION_RESULT_DATA_FIELD_NUMBER: _ClassVar[int]
    status: str
    simulation_result_data: SimulationResult
    def __init__(self, status: _Optional[str] = ..., simulation_result_data: _Optional[_Union[SimulationResult, _Mapping]] = ...) -> None: ...

class UpdateVariableRequest(_message.Message):
    __slots__ = ("id", "var")
    ID_FIELD_NUMBER: _ClassVar[int]
    VAR_FIELD_NUMBER: _ClassVar[int]
    id: str
    var: Variable
    def __init__(self, id: _Optional[str] = ..., var: _Optional[_Union[Variable, _Mapping]] = ...) -> None: ...

class UpdateVariableReply(_message.Message):
    __slots__ = ("id", "variables")
    ID_FIELD_NUMBER: _ClassVar[int]
    VARIABLES_FIELD_NUMBER: _ClassVar[int]
    id: _containers.RepeatedScalarFieldContainer[str]
    variables: _containers.RepeatedCompositeFieldContainer[VariableArray]
    def __init__(self, id: _Optional[_Iterable[str]] = ..., variables: _Optional[_Iterable[_Union[VariableArray, _Mapping]]] = ...) -> None: ...

class SetupRobotRequest(_message.Message):
    __slots__ = ("client_id", "software_version", "robot_setup")
    CLIENT_ID_FIELD_NUMBER: _ClassVar[int]
    SOFTWARE_VERSION_FIELD_NUMBER: _ClassVar[int]
    ROBOT_SETUP_FIELD_NUMBER: _ClassVar[int]
    client_id: str
    software_version: str
    robot_setup: Robot
    def __init__(self, client_id: _Optional[str] = ..., software_version: _Optional[str] = ..., robot_setup: _Optional[_Union[Robot, _Mapping]] = ...) -> None: ...

class SetupRobotReply(_message.Message):
    __slots__ = ("status", "id", "license_state", "robot_settings")
    STATUS_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    LICENSE_STATE_FIELD_NUMBER: _ClassVar[int]
    ROBOT_SETTINGS_FIELD_NUMBER: _ClassVar[int]
    status: str
    id: str
    license_state: str
    robot_settings: Settings
    def __init__(self, status: _Optional[str] = ..., id: _Optional[str] = ..., license_state: _Optional[str] = ..., robot_settings: _Optional[_Union[Settings, _Mapping]] = ...) -> None: ...

class Robot(_message.Message):
    __slots__ = ("preset_robot_class", "custom_robot", "robot_driver_class", "friendly_id", "tool_dictionary", "initial_base", "collision_geometry", "external_axes", "data")
    class ToolDictionaryEntry(_message.Message):
        __slots__ = ("key", "value")
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: Tool
        def __init__(self, key: _Optional[str] = ..., value: _Optional[_Union[Tool, _Mapping]] = ...) -> None: ...
    PRESET_ROBOT_CLASS_FIELD_NUMBER: _ClassVar[int]
    CUSTOM_ROBOT_FIELD_NUMBER: _ClassVar[int]
    ROBOT_DRIVER_CLASS_FIELD_NUMBER: _ClassVar[int]
    FRIENDLY_ID_FIELD_NUMBER: _ClassVar[int]
    TOOL_DICTIONARY_FIELD_NUMBER: _ClassVar[int]
    INITIAL_BASE_FIELD_NUMBER: _ClassVar[int]
    COLLISION_GEOMETRY_FIELD_NUMBER: _ClassVar[int]
    EXTERNAL_AXES_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    preset_robot_class: str
    custom_robot: CustomRobot
    robot_driver_class: str
    friendly_id: str
    tool_dictionary: _containers.MessageMap[str, Tool]
    initial_base: Base
    collision_geometry: _containers.RepeatedCompositeFieldContainer[PolyMesh]
    external_axes: _containers.RepeatedCompositeFieldContainer[ExternalAxis]
    data: MetaData
    def __init__(self, preset_robot_class: _Optional[str] = ..., custom_robot: _Optional[_Union[CustomRobot, _Mapping]] = ..., robot_driver_class: _Optional[str] = ..., friendly_id: _Optional[str] = ..., tool_dictionary: _Optional[_Mapping[str, Tool]] = ..., initial_base: _Optional[_Union[Base, _Mapping]] = ..., collision_geometry: _Optional[_Iterable[_Union[PolyMesh, _Mapping]]] = ..., external_axes: _Optional[_Iterable[_Union[ExternalAxis, _Mapping]]] = ..., data: _Optional[_Union[MetaData, _Mapping]] = ...) -> None: ...

class Tool(_message.Message):
    __slots__ = ("tool_type", "tcp", "tool_id", "tool_state", "tool_geometry")
    TOOL_TYPE_FIELD_NUMBER: _ClassVar[int]
    TCP_FIELD_NUMBER: _ClassVar[int]
    TOOL_ID_FIELD_NUMBER: _ClassVar[int]
    TOOL_STATE_FIELD_NUMBER: _ClassVar[int]
    TOOL_GEOMETRY_FIELD_NUMBER: _ClassVar[int]
    tool_type: FrameType
    tcp: CartesianPosition
    tool_id: str
    tool_state: int
    tool_geometry: PolyMesh
    def __init__(self, tool_type: _Optional[_Union[FrameType, str]] = ..., tcp: _Optional[_Union[CartesianPosition, _Mapping]] = ..., tool_id: _Optional[str] = ..., tool_state: _Optional[int] = ..., tool_geometry: _Optional[_Union[PolyMesh, _Mapping]] = ...) -> None: ...

class Base(_message.Message):
    __slots__ = ("base_type", "base_frame", "base_id")
    BASE_TYPE_FIELD_NUMBER: _ClassVar[int]
    BASE_FRAME_FIELD_NUMBER: _ClassVar[int]
    BASE_ID_FIELD_NUMBER: _ClassVar[int]
    base_type: FrameType
    base_frame: CartesianPosition
    base_id: str
    def __init__(self, base_type: _Optional[_Union[FrameType, str]] = ..., base_frame: _Optional[_Union[CartesianPosition, _Mapping]] = ..., base_id: _Optional[str] = ...) -> None: ...

class CustomRobot(_message.Message):
    __slots__ = ("axis_center", "axis_direction", "axis_speed", "axis_range_min", "axis_range_max", "name", "short_name", "geometry", "root_cs", "flange_cs")
    AXIS_CENTER_FIELD_NUMBER: _ClassVar[int]
    AXIS_DIRECTION_FIELD_NUMBER: _ClassVar[int]
    AXIS_SPEED_FIELD_NUMBER: _ClassVar[int]
    AXIS_RANGE_MIN_FIELD_NUMBER: _ClassVar[int]
    AXIS_RANGE_MAX_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    SHORT_NAME_FIELD_NUMBER: _ClassVar[int]
    GEOMETRY_FIELD_NUMBER: _ClassVar[int]
    ROOT_CS_FIELD_NUMBER: _ClassVar[int]
    FLANGE_CS_FIELD_NUMBER: _ClassVar[int]
    axis_center: _containers.RepeatedCompositeFieldContainer[Vector3]
    axis_direction: _containers.RepeatedCompositeFieldContainer[Vector3]
    axis_speed: _containers.RepeatedScalarFieldContainer[float]
    axis_range_min: _containers.RepeatedScalarFieldContainer[float]
    axis_range_max: _containers.RepeatedScalarFieldContainer[float]
    name: str
    short_name: str
    geometry: _containers.RepeatedCompositeFieldContainer[PolyMesh]
    root_cs: Matrix4x4
    flange_cs: Matrix4x4
    def __init__(self, axis_center: _Optional[_Iterable[_Union[Vector3, _Mapping]]] = ..., axis_direction: _Optional[_Iterable[_Union[Vector3, _Mapping]]] = ..., axis_speed: _Optional[_Iterable[float]] = ..., axis_range_min: _Optional[_Iterable[float]] = ..., axis_range_max: _Optional[_Iterable[float]] = ..., name: _Optional[str] = ..., short_name: _Optional[str] = ..., geometry: _Optional[_Iterable[_Union[PolyMesh, _Mapping]]] = ..., root_cs: _Optional[_Union[Matrix4x4, _Mapping]] = ..., flange_cs: _Optional[_Union[Matrix4x4, _Mapping]] = ...) -> None: ...

class ExternalAxis(_message.Message):
    __slots__ = ("external_axis_type", "name", "short_name", "range_min", "range_max", "speed", "orientation", "position", "geometry", "data")
    EXTERNAL_AXIS_TYPE_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    SHORT_NAME_FIELD_NUMBER: _ClassVar[int]
    RANGE_MIN_FIELD_NUMBER: _ClassVar[int]
    RANGE_MAX_FIELD_NUMBER: _ClassVar[int]
    SPEED_FIELD_NUMBER: _ClassVar[int]
    ORIENTATION_FIELD_NUMBER: _ClassVar[int]
    POSITION_FIELD_NUMBER: _ClassVar[int]
    GEOMETRY_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    external_axis_type: ExternalAxisType
    name: str
    short_name: str
    range_min: _containers.RepeatedScalarFieldContainer[float]
    range_max: _containers.RepeatedScalarFieldContainer[float]
    speed: _containers.RepeatedScalarFieldContainer[float]
    orientation: _containers.RepeatedCompositeFieldContainer[Matrix4x4]
    position: CartesianPosition
    geometry: _containers.RepeatedCompositeFieldContainer[PolyMesh]
    data: MetaData
    def __init__(self, external_axis_type: _Optional[_Union[ExternalAxisType, str]] = ..., name: _Optional[str] = ..., short_name: _Optional[str] = ..., range_min: _Optional[_Iterable[float]] = ..., range_max: _Optional[_Iterable[float]] = ..., speed: _Optional[_Iterable[float]] = ..., orientation: _Optional[_Iterable[_Union[Matrix4x4, _Mapping]]] = ..., position: _Optional[_Union[CartesianPosition, _Mapping]] = ..., geometry: _Optional[_Iterable[_Union[PolyMesh, _Mapping]]] = ..., data: _Optional[_Union[MetaData, _Mapping]] = ...) -> None: ...
