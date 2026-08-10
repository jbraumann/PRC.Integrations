# Parametric Robot Control - Python Sample.
#
# Connects to a running PRC server, sets up a KUKA robot, sends it a small
# task, and scrubs through the resulting simulation - the same lifecycle every
# other PRC integration follows:
#   1. SetupRobot              defines the robot model, driver, tool and base.
#   2. SubscribeRobotFeedback  opens the persistent feedback stream.
#   3. AddRobotTask            sends motion commands, returns the simulation and code.
#   4. GetSimulatedRobotState  queries the robot state anywhere along the toolpath.
#
# Requires grpcio (pip install grpcio) and a PRC server at https://127.0.0.1:5001.

import logging
import os
import time
import threading
import grpc
import prc_pb2
import prc_pb2_grpc


def run():
    # The PRC server only accepts TLS connections, so the sample loads the
    # server's certificate from the folder of this script. Use
    # PRCServerCertificate_macOS.pem when the server runs on macOS.
    print("Getting certificate from same folder as the python code...")
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'PRCServerCertificate.pem'), 'rb') as f:
        credentials = grpc.ssl_channel_credentials(f.read())

    # Simulation results can get large, so the size limits are lifted and
    # compression is enabled.
    options = [
        ('grpc.max_send_message_length', -1),
        ('grpc.max_receive_message_length', -1),
    ]
    print("Connecting to https://127.0.0.1:5001...")

    with grpc.secure_channel("127.0.0.1:5001", credentials, options, grpc.Compression.Gzip) as channel:
        stub = prc_pb2_grpc.ParametricRobotControlServiceStub(channel)

        # A ping confirms that the server is reachable before setting up the robot.
        response = stub.SendPing(prc_pb2.Ping(payload="", time_ms=10))
        print("Successfully sent ping")

        robot_id = "PRC_Test"
        print("The unique ID of the current simulation is " + robot_id)

        # Step 1: Set up a preset KUKA robot with its driver, plus a default
        # tool "0" and base "0" at the world origin. The classes for other
        # robots and drivers are listed in the PRC server's interface.
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
                                origin=prc_pb2.Vector3(x=0, y=0, z=0),
                                x_axis=prc_pb2.Vector3(x=1, y=0, z=0),
                                y_axis=prc_pb2.Vector3(x=0, y=1, z=0)
                            )
                        )
                    ),
                    tool_dictionary={
                        "0": prc_pb2.Tool(
                            tool_id="0",
                            tool_type=prc_pb2.FrameType.FIXED,
                            tcp=prc_pb2.CartesianPosition(
                                cs=prc_pb2.CoordinateSystem(
                                    origin=prc_pb2.Vector3(x=0, y=0, z=0),
                                    x_axis=prc_pb2.Vector3(x=1, y=0, z=0),
                                    y_axis=prc_pb2.Vector3(x=0, y=1, z=0)
                                )
                            )
                        )
                    }
                )
            )
        )

        print("Status after connection: " + setup_robot_reply.status)

        # Step 2: Subscribe to the feedback stream. The server continuously
        # sends heartbeats, robot states and settings updates through it.
        feedback_stream = stub.SubscribeRobotFeedback(
            prc_pb2.SubscribeRobotFeedbackRequest(
                id=robot_id,
            )
        )

        print("Starting separate thread to manage the feedback stream coming from PRC")
        stop_event = threading.Event()
        feedback_thread = threading.Thread(target=thread_feedback, args=(stop_event, feedback_stream,))
        feedback_thread.start()

        # Step 3: Build a task from two PTP motions defined in joint space and
        # send it to the robot. The speed is a single value for all axes.
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

        # The robot settings returned by SetupRobot are passed back with the
        # task. They can be modified here, e.g. to change driver options.
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

        # Step 4: Scrub through the simulated toolpath from start (0.0) to end
        # (1.0), similar to the simulation slider in the PRC interface. If
        # stream_update is true, the result arrives via the feedback stream
        # instead of the direct reply.
        print("Now simulating the robot's movement, similar to the simulation slider. If stream_update is true, the feedback stream will be utilized.")
        i = 0
        while i < 100:
            i += 4
            robot_state = stub.GetSimulatedRobotState(
                prc_pb2.GetSimulatedRobotStateRequest(
                    stream_update=False,
                    id=robot_id,
                    normalized_state=i/100.0
                )
            )
            axis_values = robot_state.axis_position.axis_values
            print("At factor " + str(i/100.0) + " the robot is at A1: " + str(axis_values[0]) + " A2:" + str(axis_values[1]) + " A3:" + str(axis_values[2]) + " A4:" + str(axis_values[3]) + " A5:" + str(axis_values[4]) + " A6:" + str(axis_values[5]) )
            time.sleep(0.4)

        stop_event.set()
        print("Waiting for feedback thread to stop at the next heartbeat.")
        feedback_thread.join()

    print("Shutting down...")


def thread_feedback(stop_event, feedback_stream):
    # The feedback thread runs in the background and waits for data from PRC.
    # The loop only advances when a message arrives, so after stop_event is
    # set it still takes until the next heartbeat to actually stop.
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
