from . import prc_pb2
from . import prc_pb2_grpc
from .shared_data import SharedData
import adsk.core
import threading
from threading import Thread
import time
import grpc
import os

def prc_core(shared_data : SharedData):

    if (shared_data.stub is not None):
        shared_data.UpdateFeedback("Already connected to PRC server. Trying to disconnect first...")
        shared_data.stop_event.set()
        time.sleep(4)
        shared_data.stop_event = threading.Event()
        shared_data.stub = None

    shared_data.UpdateFeedback("Connecting to 127.0.0.1:5001")
    __location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'PRCServerCertificate.pem'), 'rb') as f:
        credentials = grpc.ssl_channel_credentials(f.read())
    options=[
        ('grpc.max_send_message_length', -1),
        ('grpc.max_receive_message_length', -1),
    ]
    with grpc.secure_channel("127.0.0.1:5001", credentials, options, grpc._compression.Gzip) as channel:
        shared_data.stub = prc_pb2_grpc.ParametricRobotControlServiceStub(channel)
        response = shared_data.stub.SendPing(prc_pb2.Ping(payload="", time_ms=10))
        shared_data.UpdateFeedback("Connected.")
        setup_robot_reply = shared_data.stub.SetupRobot(
            prc_pb2.SetupRobotRequest(
                client_id=shared_data.robot_id,
                software_version="0.1",
                robot_setup=prc_pb2.Robot(
                    friendly_id="KUKA KR10",
                    robot_driver_class="KUKA.KSS_KRL_Driver",
                    preset_robot_class="KUKA.KUKA_KR610R11002",
                    tool_dictionary={
                        str(shared_data.tool_vals[6]): prc_pb2.Tool(
                            tool_id=str(shared_data.tool_vals[6]),
                            tool_type=prc_pb2.FrameType.FIXED,
                            tcp=prc_pb2.CartesianPosition(
                                euler=prc_pb2.Euler(
                                    x=shared_data.tool_vals[0],
                                    y=shared_data.tool_vals[1],
                                    z=shared_data.tool_vals[2],
                                    a=shared_data.tool_vals[3],
                                    b=shared_data.tool_vals[4],
                                    c=shared_data.tool_vals[5]
                                )
                            )
                        )
                    }
                )
            )
        )

        shared_data.settings_dictionary=setup_robot_reply.robot_settings.settings_dictionary

        feedback_stream = shared_data.stub.SubscribeRobotFeedback(
            prc_pb2.SubscribeRobotFeedbackRequest(
                id=shared_data.robot_id,
            )
        )
    
        #the feedback coming from PRC is handled in a separate thread
        feedback_thread = threading.Thread(target=thread_feedback, args=(feedback_stream, shared_data))
        feedback_thread.start()

        #some default commands are generated to move the robot
        ptp_motion_1 = prc_pb2.MotionCommand(
            axis_motion=prc_pb2.AxisMotion(
                target=prc_pb2.JointTarget(
                    axis_values=[25, 20, -90, 90, 70, -115],
                    speed=[0.1]
                )
            )
        )

        ptp_motion_2 = prc_pb2.MotionCommand(
            axis_motion=prc_pb2.AxisMotion(
                target=prc_pb2.JointTarget(
                    axis_values=[-25, -40, 75, -80, -90, -125],
                    speed=[0.15]
                )
            )
        )

        ptp_motion_group = prc_pb2.MotionGroup(
            commands=[ptp_motion_1, ptp_motion_2],
            interpolation="C_PTP",
            motion_group_type=prc_pb2.MotionGroupType.PTP
        )

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
                    settings_dictionary=setup_robot_reply.robot_settings.settings_dictionary
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

        shared_data.UpdateFeedback("Default movement displayed.")

        #the core thread waits until the feedback thread is finished
        feedback_thread.join()
        channel.close()


def thread_feedback(feedback_stream, shared_data):
    #the feedback_thread runs in the background and waits for data from PRC.
    for feedback in feedback_stream:
        if shared_data.stop_event.is_set():
            break
        assert isinstance(feedback, prc_pb2.RobotFeedback)
        field = feedback.WhichOneof('data_package')
        if field == "heartbeat_data":
            print("Feedback thread: Received heartbeat data")
        elif field == "robot_state_data":
            shared_data.UpdateFeedback("Received robot state data")
            robot_state = feedback.robot_state_data
            if robot_state.robot_transformations:
                for j, xform in enumerate(robot_state.robot_transformations[0].transformation):
                    transform = adsk.core.Matrix3D.create()
                    transform.setWithArray([
                        xform.m11, xform.m21, xform.m31, xform.m41 / 10,
                        xform.m12, xform.m22, xform.m32, xform.m42 / 10,
                        xform.m13, xform.m23, xform.m33, xform.m43 / 10,
                        xform.m14, xform.m24, xform.m34, xform.m44
                    ])
                    shared_data.robot_xforms[j] = transform
                shared_data.robot_tcp = adsk.core.Matrix3D.create()
                shared_data.robot_tcp.setWithArray([robot_state.tool_frame.m11, robot_state.tool_frame.m21, robot_state.tool_frame.m31, robot_state.tool_frame.m41 / 10,
                                        robot_state.tool_frame.m12, robot_state.tool_frame.m22, robot_state.tool_frame.m32, robot_state.tool_frame.m42 / 10,
                                        robot_state.tool_frame.m13, robot_state.tool_frame.m23, robot_state.tool_frame.m33, robot_state.tool_frame.m43 / 10,
                                        robot_state.tool_frame.m14, robot_state.tool_frame.m24, robot_state.tool_frame.m34, robot_state.tool_frame.m44])
                shared_data.axisAlarm = [False, robot_state.axis_alarm[0], robot_state.axis_alarm[1], robot_state.axis_alarm[2], robot_state.axis_alarm[3], robot_state.axis_alarm[4], robot_state.axis_alarm[5]]
                shared_data.app.fireCustomEvent('prcTransformGeometryEvent', '') 
            print("Feedback thread: Received robot state data")
        elif field == "settings_data":
            print("Feedback thread: Received settings data")
        elif field == "ping_data":
            print("Feedback thread: Received ping data")