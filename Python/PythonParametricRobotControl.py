# Parametric Robot Control - Python Sample.

import logging
import os
import time
import threading
import grpc
import prc_pb2
import prc_pb2_grpc


def run():
    print("Getting certificate from same folder as the python code...")
    __location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'PRCServerCertificate.pem'), 'rb') as f:
        credentials = grpc.ssl_channel_credentials(f.read())

    print("Connecting to https://localhost:5001...")

    with grpc.secure_channel("localhost:5001", credentials) as channel:
        stub = prc_pb2_grpc.ParametricRobotControlServiceStub(channel)
        response = stub.SendPing(prc_pb2.Ping(payload="", time_ms=10))
        print("Successfully sent ping")

        robot_id = "PRC_Test"
        print("The unique ID of the current simulation is " + robot_id)

        setup_robot_reply = stub.SetupRobot(
            prc_pb2.SetupRobotRequest(
                client_id=robot_id,
                software_version="0.1",
                robot_setup=prc_pb2.Robot(
                    friendly_id="KUKA KR10",
                    robot_driver_class="KUKA.KSS_KRL_Driver",
                    preset_robot_class="KUKA.KUKA_KR610R11002",
                    initial_base=prc_pb2.Base(
                        base_id="0",
                        base_frame=prc_pb2.CartesianPosition(
                            cs=prc_pb2.CoordinateSystem(
                                origin=prc_pb2.Vector3(
                                    x=0,
                                    y=0,
                                    z=0
                                ),
                                x_axis=prc_pb2.Vector3(
                                    x=1,
                                    y=0,
                                    z=0
                                ),
                                y_axis=prc_pb2.Vector3(
                                    x=0,
                                    y=1,
                                    z=0
                                )
                            )
                        )
                    ),
                    tool_dictionary={
                        "0": prc_pb2.Tool(
                            tool_id="0",
                            tool_type=prc_pb2.FrameType.FIXED,
                            tcp=prc_pb2.CartesianPosition(
                                    cs=prc_pb2.CoordinateSystem(
                                    origin=prc_pb2.Vector3(
                                        x=0,
                                        y=0,
                                        z=0
                                    ),
                                    x_axis=prc_pb2.Vector3(
                                        x=1,
                                        y=0,
                                        z=0
                                    ),
                                    y_axis=prc_pb2.Vector3(
                                        x=0,
                                        y=1,
                                        z=0
                                    )
                                )
                            )
                        )
                    }
                )
            )
        )

        print("Status after connection: " + setup_robot_reply.status)

        feedback_stream = stub.SubscribeRobotFeedback(
            prc_pb2.SubscribeRobotFeedbackRequest(
                id=robot_id,
            )
        )
    
        print("Starting separate thread to manage the feedback stream coming from PRC")
        stop_event = threading.Event()
        feedback_thread = threading.Thread(target=thread_feedback, args=(stop_event, feedback_stream,))
        feedback_thread.start()

        ptp_motion_1 = prc_pb2.MotionCommand(
            axis_motion=prc_pb2.AxisMotion(
                target=prc_pb2.JointTarget(
                    axis_values=[0, 20, -90, 90, 70, -115],
                    speed=[0.1]
                )
            )
        )

        ptp_motion_2 = prc_pb2.MotionCommand(
            axis_motion=prc_pb2.AxisMotion(
                target=prc_pb2.JointTarget(
                    axis_values=[0, -40, 75, -80, -90, -125],
                    speed=[0.15]
                )
            )
        )

        ptp_motion_group = prc_pb2.MotionGroup(
            commands=[ptp_motion_1, ptp_motion_2],
            interpolation="C_PTP",
            motion_group_type=prc_pb2.MotionGroupType.PTP
        )

        task_reply = stub.AddRobotTask(
            prc_pb2.AddRobotTaskRequest(
                id=robot_id,
                robot_task=prc_pb2.Task(
                    name="Task",
                    type=prc_pb2.TaskType.SIMULATE_AND_EXECUTE_TASK,
                    payload=[prc_pb2.TaskPayload(
                        motion_group_task=ptp_motion_group
                    )]
                ),
                robot_settings=prc_pb2.Settings(
                    settings_dictionary=setup_robot_reply.robot_settings.settings_dictionary
                )
            )
        )

        print("Resulting KRL code: " + \
              task_reply.simulation_result_data.code
              )
        time.sleep(4)
        print("Now simulating the robot's movement, similar to the simulation slider. If async_stream_update is true, the feedback stream will be utilized.")
        i=0
        while i < 100:
            i+=4
            robot_state = stub.GetSimulatedRobotState(
                prc_pb2.GetSimulatedRobotStateRequest(
                    async_stream_update=False,
                    id=robot_id,
                    normalized_state=i/100.0
                )
            )
            axis_values = robot_state.actual_axis_position.axis_values
            print("At factor " + str(i/100.0) + " the robot is at A1: " + str(axis_values[0]) + " A2:" + str(axis_values[1]) + " A3:" + str(axis_values[2]) + " A4:" + str(axis_values[3]) + " A5:" + str(axis_values[4]) + " A6:" + str(axis_values[5]) )
            time.sleep(0.4)

        stop_event.set()
        print("Waiting for feedback thread to stop at the next heartbeat.")
        feedback_thread.join()

    print("Shutting down...")

def thread_feedback(stop_event, feedback_stream):
    for feedback in feedback_stream:
        if stop_event.is_set():
            break

        assert isinstance(feedback, prc_pb2.RobotFeedback)
        field = feedback.WhichOneof('data_package')
        if field == "heartbeat_data":
            print("Feedback thread: Received heartbeat data")
        elif field == "robot_state_data":
            print("Feedback thread: Received robot state data")
        elif field == "settings_data":
            print("Feedback thread: Received settings data")
        elif field == "ping_data":
            print("Feedback thread: Received ping data")


if __name__ == "__main__":
    logging.basicConfig()
    run()