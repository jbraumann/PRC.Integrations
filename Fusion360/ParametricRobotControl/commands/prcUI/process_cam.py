from pathlib import Path
import json
import adsk.core, adsk.fusion, adsk.cam, traceback
from . import prc_pb2
from . import prc_pb2_grpc
from .shared_data import SharedData

def processCAM(shared_data : SharedData):

    app = adsk.core.Application.get()
    ui = app.userInterface
    doc = app.activeDocument
    products = doc.products
    product = products.itemByProductType('CAMProductType')
    cam = adsk.cam.CAM.cast(product)

    # Specify the program name.
    programName = 'prcTMP'

    # Specify a destination folder.
    outputFolder = str((Path(__file__)).parent)

    # Specify a post configuration to use.
    postConfig = cam.genericPostFolder + '/' + 'json advanced.cps'

    # Specify the NC file output units.
    units = adsk.cam.PostOutputUnitOptions.MillimetersOutput

    # Create the postInput object.
    postInput = adsk.cam.PostProcessInput.create(programName, postConfig, outputFolder, units)

    # Open the resulting NC file in the editor for viewing
    postInput.isOpenInEditor = False

    # Post all toolpaths in the document
    cam.postProcessAll(postInput)

    #Build path to file
    path = Path(outputFolder) / (programName + '.json')
    toolpath_json = path.read_text()
    toolpath = json.loads(toolpath_json)

    firstTarget = toolpath["setups"][0]["operations"][0]["targets"][0]

    start_axis_motion = prc_pb2.MotionCommand(
        axis_motion=prc_pb2.AxisMotion(
            target=prc_pb2.JointTarget(
                axis_values=[0, -90, 90, 10, 5, -5],
                speed=[0.1]
            )
        )
    )

    start_ptp_motion = prc_pb2.MotionCommand(
        ptp_motion=prc_pb2.PTPMotion(
            target=prc_pb2.CartesianTarget(
                position=prc_pb2.CartesianPosition(
                    cs=prc_pb2.CoordinateSystem(
                        origin=prc_pb2.Vector3(
                            x=firstTarget["x"],
                            y=firstTarget["y"],
                            z=firstTarget["z"] 
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
                ),
                posture="010",
                speed=[0.1]
            )
        )
    )

    motion_groups = []

    start_ptp_motion_group = prc_pb2.MotionGroup(
        commands=[start_axis_motion, start_ptp_motion],
        interpolation="C_PTP",
        motion_group_type=prc_pb2.MotionGroupType.PTP
    )

    motion_groups.append(start_ptp_motion_group)

    manufacturing_lin_motion_group= prc_pb2.MotionGroup(
        commands=[],
        interpolation="C_LIN",
        motion_group_type=prc_pb2.MotionGroupType.CP
    )

    for operation in toolpath["setups"][0]["operations"]:
        for target in operation["targets"]:
            linear_motion = prc_pb2.MotionCommand(
                lin_motion=prc_pb2.LINMotion(
                    target=prc_pb2.CartesianTarget(
                        position=prc_pb2.CartesianPosition(
                            cs=prc_pb2.CoordinateSystem(
                                origin=prc_pb2.Vector3(
                                    x=target["x"],
                                    y=target["y"],
                                    z=target["z"] 
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
                        ),
                        speed=[0.1]
                    )
                )
            )
            manufacturing_lin_motion_group.commands.append(linear_motion)
    motion_groups.append(manufacturing_lin_motion_group)

    task_request = prc_pb2.AddRobotTaskRequest(
        id=shared_data.robot_id,
        robot_task=prc_pb2.Task(
            name="Task",
            type=prc_pb2.TaskType.SIMULATE_AND_EXECUTE_TASK,
            payload=[]
        ),
        robot_settings=prc_pb2.Settings(
            settings_dictionary=shared_data.settings_dictionary
        )
    )
    for motion_group in motion_groups:
        task_request.robot_task.payload.append(prc_pb2.TaskPayload(
            motion_group_task=motion_group
        ))
    task_reply = shared_data.stub.AddRobotTask(task_request)
    robot_state = shared_data.stub.GetSimulatedRobotState(
        prc_pb2.GetSimulatedRobotStateRequest(
            stream_update=True,
            id=shared_data.robot_id,
            normalized_state=0
        )
    )

    robot_state = shared_data.stub.GetSimulatedRobotState(
        prc_pb2.GetSimulatedRobotStateRequest(
            stream_update=True,
            id=shared_data.robot_id,
            normalized_state=0
        )
    )
    shared_data.UpdateFeedback("Finished processing CAM data.")