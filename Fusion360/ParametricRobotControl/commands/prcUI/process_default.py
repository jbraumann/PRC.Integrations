from pathlib import Path
import json
import adsk.core, adsk.fusion, adsk.cam, traceback
from . import prc_pb2
from . import prc_pb2_grpc
from .shared_data import SharedData

def processDefault(shared_data : SharedData):
    ptp_motion_group = prc_pb2.MotionGroup(
        commands=[],
        interpolation="C_PTP",
        motion_group_type=prc_pb2.MotionGroupType.PTP
    )

    ptp_motion_1 = prc_pb2.MotionCommand(
        axis_motion=prc_pb2.AxisMotion(
            target=prc_pb2.JointTarget(
                axis_values=[0, -90, 90, 5, 10, -5],
                speed=[0.1]
            )
        )
    )
    ptp_motion_group.commands.append(ptp_motion_1)

    for i in range(len(shared_data.inputMatrices)):
        (origin, xAxis, yAxis, zAxis) = shared_data.inputMatrices[i].getAsCoordinateSystem()
        ptp_motion = prc_pb2.MotionCommand(
            ptp_motion=prc_pb2.PTPMotion(
                target=prc_pb2.CartesianTarget(
                    position=prc_pb2.CartesianPosition(
                        cs=prc_pb2.CoordinateSystem(
                            origin=prc_pb2.Vector3(
                                x=origin.x * 10,
                                y=origin.y * 10,
                                z=origin.z * 10
                            ),
                            x_axis=prc_pb2.Vector3(
                                x=xAxis.x,
                                y=xAxis.y,
                                z=xAxis.z
                            ),
                            y_axis=prc_pb2.Vector3(
                                x=yAxis.x,
                                y=yAxis.y,
                                z=yAxis.z
                            )
                        )
                    ),
                    posture="010",
                    speed=[0.1]
                )
            )
        )
        ptp_motion_group.commands.append(ptp_motion)

    task_reply = shared_data.stub.AddRobotTask(
                prc_pb2.AddRobotTaskRequest(
                    id=shared_data.robot_id,
                    robot_task=prc_pb2.Task(
                        name="Task",
                        type=prc_pb2.TaskType.SIMULATE_AND_EXECUTE_TASK,
                        payload=[prc_pb2.TaskPayload(
                            motion_group_task=ptp_motion_group
                        )]
                    ),
                    robot_settings=prc_pb2.Settings(
                        settings_dictionary=shared_data.settings_dictionary
                    )
                )
            )
    robot_state = shared_data.stub.GetSimulatedRobotState(
        prc_pb2.GetSimulatedRobotStateRequest(
            stream_update=True,
            id=shared_data.robot_id,
            normalized_state=0
        )
    )