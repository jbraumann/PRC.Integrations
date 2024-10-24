bl_info = {
    "name": "Run Parametric Robot Control",
    "blender": (2, 80, 0),
    "category": "Object",
}

import bpy
import mathutils
import logging
import os
import time
import threading
from threading import Thread
import grpc
from . import prc_pb2
from . import prc_pb2_grpc


xforms = [None] * 7
background_thread = None
viewport_area = None

class RunPRC(bpy.types.Operator):
    """Run Parametric Robot Control"""
    bl_idname = "object.modal_operator"
    bl_label = "Run PRC"
    bl_options = {'REGISTER', 'UNDO'}


    def execute(self, context):
        global xforms
        global background_thread
        global viewport_area
        
        viewport_area = next(area for area in bpy.context.screen.areas if area.type == 'VIEW_3D')

        wm = context.window_manager
        self._timer = wm.event_timer_add(0.1, window=context.window)
        wm.modal_handler_add(self)

        def prc_thread():
            global xforms
            __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
            with open(os.path.join(__location__, 'PRCServerCertificate.pem'), 'rb') as f:
                credentials = grpc.ssl_channel_credentials(f.read())

            viewport_area.header_text_set("Connecting to https://localhost:5001...")

            with grpc.secure_channel("localhost:5001", credentials) as channel:
                stub = prc_pb2_grpc.ParametricRobotControlServiceStub(channel)
                response = stub.SendPing(prc_pb2.Ping(payload="", time_ms=10))
                viewport_area.header_text_set('Successfully sent ping')

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
                viewport_area.header_text_set("Resulting KRL code: " + \
                    task_reply.simulation_result_data.code)
                    

                print
                time.sleep(1)
                viewport_area.header_text_set("Now simulating the robot's movement, similar to the simulation slider. If async_stream_update is true, the feedback stream will be utilized.")
                i=0
                while i < 1000:
                    i+=4
                    robot_state = stub.GetSimulatedRobotState(
                        prc_pb2.GetSimulatedRobotStateRequest(
                            async_stream_update=False,
                            id=robot_id,
                            normalized_state=i/1000.0
                        )
                    )
                    xforms = [None] * 7
                    if robot_state.robot_transformations:
                        for j, xform in enumerate(robot_state.robot_transformations[0].transformation):
                            xforms[j] = mathutils.Matrix([
                                [xform.m11, xform.m12, xform.m13, xform.m14],
                                [xform.m21, xform.m22, xform.m23, xform.m24],
                                [xform.m31, xform.m32, xform.m33, xform.m34],
                                [xform.m41/1000, xform.m42/1000, xform.m43/1000, xform.m44]
                            ])
                            xforms[j].transpose()
                        axis_values = robot_state.actual_axis_position.axis_values
                        viewport_area.header_text_set("At factor " + str(i/1000.0) + " the robot is at A1: " + str(axis_values[0]) + " A2:" + str(axis_values[1]) + " A3:" + str(axis_values[2]) + " A4:" + str(axis_values[3]) + " A5:" + str(axis_values[4]) + " A6:" + str(axis_values[5]) )
                        time.sleep(0.04)

                stop_event.set()
                viewport_area.header_text_set("Waiting for feedback thread to stop at the next heartbeat.")
                feedback_thread.join()

            viewport_area.header_text_set(None) 

        background_thread = Thread(target = prc_thread)
        background_thread.start()
        return {'RUNNING_MODAL'}
    
    def modal(self, context, event):
        if event.type =="ESC":
            background_thread.join()
            return self.cancel(context)

        if event.type == 'TIMER':
            if xforms[0] != None:
                for i, matrix in enumerate(xforms):
                    obj_name = f"Axis_{i}"
                    if obj_name in bpy.data.objects:
                        bpy.data.objects[obj_name].matrix_world = matrix
                    else:
                        print(f"{obj_name} not found in the scene.")
        
        return {'PASS_THROUGH'}

    def invoke(self, context, event):
        self.execute(context)
        context.window_manager.modal_handler_add(self)
        return {'RUNNING_MODAL'}

    def cancel(self, context):
        wm = context.window_manager
        wm.event_timer_remove(self._timer)

def menu_func(self, context):
    self.layout.operator(RunPRC.bl_idname)


def register():
    bpy.utils.register_class(RunPRC)
    bpy.types.VIEW3D_HT_header.append(menu_func)

def unregister():
    bpy.utils.unregister_class(RunPRC)
    bpy.types.VIEW3D_HT_header.remove(menu_func)

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
    register()