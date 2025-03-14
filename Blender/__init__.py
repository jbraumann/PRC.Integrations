bl_info = {
    "name": "Run Parametric Robot Control",
    "blender": (2, 80, 0),
    "category": "Object",
}

import sys
from pathlib import Path

# Add the current directory to the path so that the GRPC module can be imported. Either unpack the ZIP file from the folder to the grpc directory or get the latest version via pip install grpcio
sys.path.append(str((Path(__file__)).parent))

import bpy
import mathutils
import os
import time
import threading
from threading import Thread
import grpc
from . import prc_pb2
from . import prc_pb2_grpc
import webbrowser

#xforms are the transformation matrices of the robot's joints
xforms = [None] * 7

#prc_core_thread is the thread that will run the PRC server
prc_core_thread = None

#viewport_area is the area where the feedback text will be displayed
viewport_area = None

#stub is the GRPC object that will be used to communicate with the PRC server
stub = None

#robot_id is the unique ID of the robot
robot_id = "PRC_Test"

#settings_dictionary stores the settings of the robot
settings_dictionary = None

#stop_event will stop the feedback and background threads
stop_event = threading.Event()

class PRC_OT_core(bpy.types.Operator):
    """Run Parametric Robot Control"""
    bl_idname = "prc.core"
    bl_label = "Run PRC"
    bl_options = {'REGISTER', 'UNDO'}


    def execute(self, context):
        #global variables are referenced
        global xforms
        global prc_core_thread
        global viewport_area
        global stub
        global settings_dictionary
        
        #setting up the feedback area
        viewport_area = next(area for area in bpy.context.screen.areas if area.type == 'VIEW_3D')

        #check if the robot geometry is loaded
        if not 'Axis_0' in bpy.data.objects:
            viewport_area.header_text_set("Failed to find robot geometry. Make sure the right *.blend file is loaded")
            return {'FINISHED'}

        #the timer ensures that the modal function is called every 0.1 seconds
        wm = context.window_manager
        self._timer = wm.event_timer_add(0.1, window=context.window)
        wm.modal_handler_add(self)

        #the core communication is defined below and used as a thread to avoid blocking Blender. It mostly follows the Python example in the PRC documentation.
        def prc_core():
            global xforms
            global stub
            global settings_dictionary

            __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
            with open(os.path.join(__location__, 'PRCServerCertificate.pem'), 'rb') as f:
                credentials = grpc.ssl_channel_credentials(f.read())

            viewport_area.header_text_set("Connecting to https://127.0.0.1:5001...")

            with grpc.secure_channel("127.0.0.1:5001", credentials) as channel:
                stub = prc_pb2_grpc.ParametricRobotControlServiceStub(channel)
                response = stub.SendPing(prc_pb2.Ping(payload="", time_ms=10))
                viewport_area.header_text_set('Successfully sent ping')

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

                settings_dictionary=setup_robot_reply.robot_settings.settings_dictionary

                feedback_stream = stub.SubscribeRobotFeedback(
                    prc_pb2.SubscribeRobotFeedbackRequest(
                        id=robot_id,
                    )
                )
            
                #the feedback coming from PRC is handled in a separate thread
                feedback_thread = threading.Thread(target=thread_feedback, args=(stop_event, feedback_stream,))
                feedback_thread.start()

                #some default commands are generated to move the robot
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

                time.sleep(0.5)
                viewport_area.header_text_set("Now simulating the robot's movement, similar to the simulation slider. If async_stream_update is true, the feedback stream will be utilized.")

                #the core thread waits until the feedback thread is finished
                feedback_thread.join()

            viewport_area.header_text_set(None) 

        prc_core_thread = Thread(target = prc_core)
        prc_core_thread.start()
        return {'RUNNING_MODAL'}
    
    def update_sim(self, context):
        #update_sim is called by the simulation slider.
        robot_state = stub.GetSimulatedRobotState(
            prc_pb2.GetSimulatedRobotStateRequest(
                stream_update=True,
                id=robot_id,
                normalized_state=context.scene.custom_props.simulation_slider
            )
        )

    def modal(self, context, event):
        #modal is called whenever "something" happens in Blender. It is used to update the robot's position in the scene.
        if stop_event.is_set():
            prc_core_thread.join()
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

class CustomPropertyGroup(bpy.types.PropertyGroup):
    simulation_slider: bpy.props.FloatProperty(name='Simulation Slider', soft_min=0, soft_max=1, step=0.01, default=0.5, update=PRC_OT_core.update_sim)

class PRC_OT_add_task_button(bpy.types.Operator):
    bl_label = "Add Task from 'Toolpath'"
    bl_idname = "prc.add_task_button"

    def execute(self, context):
        motion_list = []
        for obj in bpy.data.objects['Toolpath'].children:
            matrix = obj.matrix_world.copy()
            matrix.transpose()
            prc_matrix = prc_pb2.Matrix4x4()
            prc_matrix.m11 = matrix[0][0]
            prc_matrix.m12 = matrix[0][1]
            prc_matrix.m13 = matrix[0][2]
            prc_matrix.m14 = matrix[0][3]
            prc_matrix.m21 = matrix[1][0]
            prc_matrix.m22 = matrix[1][1]
            prc_matrix.m23 = matrix[1][2]
            prc_matrix.m24 = matrix[1][3]
            prc_matrix.m31 = matrix[2][0]
            prc_matrix.m32 = matrix[2][1]
            prc_matrix.m33 = matrix[2][2]
            prc_matrix.m34 = matrix[2][3]
            prc_matrix.m41 = matrix[3][0]*1000
            prc_matrix.m42 = matrix[3][1]*1000
            prc_matrix.m43 = matrix[3][2]*1000
            prc_matrix.m44 = matrix[3][3]
            ptp_motion_1 = prc_pb2.MotionCommand(
            ptp_motion=prc_pb2.PTPMotion(
                target=prc_pb2.CartesianTarget(
                    position=prc_pb2.CartesianPosition(
                        matrix=prc_matrix),
                    posture="110",
                    speed=[0.1]
                    )
                )
            )
            
            motion_list.append(ptp_motion_1)

        ptp_motion_group = prc_pb2.MotionGroup(
            commands=motion_list,
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
                    settings_dictionary=settings_dictionary
                )
            )
        )

        robot_state = stub.GetSimulatedRobotState(
                prc_pb2.GetSimulatedRobotStateRequest(
                    stream_update=True,
                    id=robot_id,
                    normalized_state=0.0
                )
        )
        return {'FINISHED'}
    
class PRC_OT_cancel_button(bpy.types.Operator):
    bl_label = "Cancel"
    bl_idname = "prc.cancel_button"

    def execute(self, context):
        stop_event.set()
        return {'FINISHED'}

class PRC_OT_settings_button(bpy.types.Operator):
    bl_label = "Settings"
    bl_idname = "prc.settings"

    def execute(self, context):
        webbrowser.open_new("https://127.0.0.1:5001")
        return {'FINISHED'}

class PRC_PT_main_panel(bpy.types.Panel):
    bl_label = "Parametric Robot Control"
    bl_idname = "prc.main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Parametric Robot Control"
 
    def draw(self, context):
        layout = self.layout
        layout.operator(PRC_OT_core.bl_idname)
        layout.operator(PRC_OT_add_task_button.bl_idname)
        layout.operator(PRC_OT_settings_button.bl_idname)
        layout.prop(context.scene.custom_props, 'simulation_slider')

def register():
    bpy.utils.register_class(CustomPropertyGroup)
    bpy.types.Scene.custom_props = bpy.props.PointerProperty(type=CustomPropertyGroup)
    bpy.utils.register_class(PRC_OT_add_task_button)
    bpy.utils.register_class(PRC_OT_core)
    bpy.utils.register_class(PRC_OT_settings_button)
    bpy.utils.register_class(PRC_PT_main_panel)


def unregister():
    del bpy.types.Scene.custom_props 
    bpy.utils.unregister_class(CustomPropertyGroup)
    bpy.utils.unregister_class(PRC_OT_add_task_button)
    bpy.utils.unregister_class(PRC_OT_core)
    bpy.utils.unregister_class(PRC_OT_settings_button)
    bpy.utils.unregister_class(PRC_PT_main_panel)


def thread_feedback(stop_event, feedback_stream):
    global xforms
    #the feedback_thread runs in the background and waits for data from PRC.
    for feedback in feedback_stream:
        if stop_event.is_set():
            break

        assert isinstance(feedback, prc_pb2.RobotFeedback)
        field = feedback.WhichOneof('data_package')
        if field == "heartbeat_data":
            print("Feedback thread: Received heartbeat data")
        elif field == "robot_state_data":
            robot_state = feedback.robot_state_data
            if robot_state.robot_transformations:
                xforms = [None] * 7
                for j, xform in enumerate(robot_state.robot_transformations[0].transformation):
                    xforms[j] = mathutils.Matrix([
                        [xform.m11, xform.m12, xform.m13, xform.m14],
                        [xform.m21, xform.m22, xform.m23, xform.m24],
                        [xform.m31, xform.m32, xform.m33, xform.m34],
                        [xform.m41/1000, xform.m42/1000, xform.m43/1000, xform.m44]
                    ])
                    xforms[j].transpose()
            print("Feedback thread: Received robot state data")
        elif field == "settings_data":
            print("Feedback thread: Received settings data")
        elif field == "ping_data":
            print("Feedback thread: Received ping data")

if __name__ == "__main__":
    register()