import adsk.core
import os
from ...lib import fusionAddInUtils as futil
from ... import config
import sys
from pathlib import Path

# Add the current directory to the path so that the GRPC module can be imported. Either unpack the ZIP file from the folder to the grpc directory or get the latest version via pip install grpcio
sys.path.append(str((Path(__file__)).parent))
import grpc
from . import prc_pb2
from . import prc_pb2_grpc
from .library import kr10r1100
from . import process_cam
from .library import csystem
from . import process_prc
from . import process_default
from .shared_data import SharedData
from .library import materials
import threading
from threading import Thread

#prc_core_thread is the thread that will run the PRC server
prc_core_thread = None
#Custom event for the feedback thread
prcUpdateEvent = None
prcFeedbackUpdateEvent = None

shared_data = SharedData()

#Fusion IDs
CMD_ID = f'{config.COMPANY_NAME}_{config.ADDIN_NAME}_prcUI'
CMD_NAME = 'Parametric Robot Control UI'
CMD_Description = 'UI for interacting with Parametric Robot Control.'
IS_PROMOTED = True
#Location of the command in the UI
WORKSPACE_ID = 'FusionSolidEnvironment'
CAM_WORKSPACE_ID = 'CAMEnvironment'
PANEL_ID = 'SolidScriptsAddinsPanel'
CAM_PANEL_ID = 'CAMScriptsAddinsPanel'
COMMAND_BESIDE_ID = 'ScriptsManagerCommand'
# Resource location for command icons, here we assume a sub folder in this directory named "resources".
ICON_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'resources', '')

# Local list of event handlers used to maintain a reference so
# they are not released and garbage collected.
local_handlers = []

# Fusion 360 core references
app = adsk.core.Application.get()
shared_data.app = app

ui = app.userInterface

cam = adsk.cam.CAM.cast(app.activeProduct)
des = adsk.fusion.Design.cast(app.activeProduct)
camActive = False
desActive = False
if des != None:
    graphicsGroups = des.rootComponent.customGraphicsGroups
    desActive = True
elif cam != None:
    graphicsGroups = cam.customGraphicsGroups
    camActive = True


# The event handler that responds to the custom event being fired.
class PRCGeometryUpdatedEventHandler(adsk.core.CustomEventHandler):
    def __init__(self):
        while graphicsGroups.count > 0:
            graphicsGroups.item(0).deleteMe()
        shared_data.graphics = graphicsGroups.add()
        kr10r1100.buildKr10R1100(shared_data)
        csystem.buildCoordinateSystem(shared_data)
        shared_data.graphics.isVisible = False
        super().__init__()
    def notify(self, args):
        try:
            shared_data.graphics.isVisible = True
            for i in range(0, len(shared_data.meshBuffer)):
                shared_data.meshBuffer[i].transform = shared_data.robot_xforms[shared_data.nameBuffer[i]]
                if (shared_data.axisAlarm[shared_data.nameBuffer[i]] == True):
                    shared_data.meshBuffer[i].color = materials.redMaterial()
                else:
                    shared_data.meshBuffer[i].color = shared_data.colorBuffer[i]
            for i in range(0, len(shared_data.tcpMeshBuffer)):
                shared_data.tcpMeshBuffer[i].transform = shared_data.robot_tcp
            app.activeViewport.refresh()
        except:
            if ui:
                ui.messageBox('Failed')
            adsk.autoTerminate(False)

# Register the custom event and connect the handler.
prcUpdateEvent = app.registerCustomEvent('prcTransformGeometryEvent')
onThreadEvent = PRCGeometryUpdatedEventHandler()
prcUpdateEvent.add(onThreadEvent)
local_handlers.append(onThreadEvent)

# The event handler that responds to the custom event being fired.
class PRCFeedbackEventHandler(adsk.core.CustomEventHandler):
    def __init__(self):
        super().__init__()
    def notify(self, args):
        try:
            if (shared_data.feedback != None):
                shared_data.feedback_field.formattedText = shared_data.feedback
        except:
            if ui:
                ui.messageBox('Failed')
            adsk.autoTerminate(False)

# Register the custom event and connect the handler.
prcFeedbackEvent = app.registerCustomEvent('prcFeedbackEvent')
onFeedbackEvent = PRCFeedbackEventHandler()
prcFeedbackEvent.add(onFeedbackEvent)
local_handlers.append(prcFeedbackEvent)

# Executed when add-in is run.
def start():
    # Create a command Definition.
    cmd_def = ui.commandDefinitions.addButtonDefinition(CMD_ID, CMD_NAME, CMD_Description, ICON_FOLDER)

    # Define an event handler for the command created event. It will be called when the button is clicked.
    futil.add_handler(cmd_def.commandCreated, command_created)

    # Get the target workspace the button will be created in.
    workspace = ui.workspaces.itemById(WORKSPACE_ID)
    cam_workspace = ui.workspaces.itemById(CAM_WORKSPACE_ID)

    # Get the panel the button will be created in.
    panel = workspace.toolbarPanels.itemById(PANEL_ID)
    cam_panel = cam_workspace.toolbarPanels.itemById(CAM_PANEL_ID)

    # Create the button command control in the UI after the specified existing command.
    control = panel.controls.addCommand(cmd_def, COMMAND_BESIDE_ID, True)
    cam_control = cam_panel.controls.addCommand(cmd_def, "", True)

    # Specify if the command is promoted to the main toolbar. 
    control.isPromoted = True
    cam_control.isPromoted = True


# Executed when add-in is stopped.
def stop():
    # Get the various UI elements for this command
    workspace = ui.workspaces.itemById(WORKSPACE_ID)
    cam_workspace = ui.workspaces.itemById(CAM_WORKSPACE_ID)
    panel = workspace.toolbarPanels.itemById(PANEL_ID)
    cam_panel = cam_workspace.toolbarPanels.itemById(CAM_PANEL_ID)
    prc_control = panel.controls.itemById(CMD_ID)
    cam_control = cam_panel.controls.itemById(CMD_ID)
    command_definition = ui.commandDefinitions.itemById(CMD_ID)

    # Delete the button command control
    if prc_control:
        prc_control.deleteMe()
        cam_control.deleteMe()

    # Delete the command definition
    if command_definition:
        command_definition.deleteMe()


# This defines the contents of the command dialog and connects to the command related events.
def command_created(args: adsk.core.CommandCreatedEventArgs):
    inputs = args.command.commandInputs

    #PRC Logo
    logo = inputs.addImageCommandInput('image', 'PRC Logo', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'resources', 'prc_logo.png'))
    logo.isFullWidth = True

    #Core PRC functions
    run_prc = inputs.addBoolValueInput('runPRC', '  Run Parametric Robot Control  ', False, '', True)
    run_prc.isFullWidth = True

    open_settings = inputs.addBoolValueInput('openSettings', '  Open Settings  ', False, '', True)
    open_settings.isFullWidth = True

    simulation_slider = inputs.addFloatSliderCommandInput('simulationSlider', 'Simulation Slider', '',0.0, 1.0, False)
    simulation_slider.isFullWidth = True

    #providing feedback
    feedback_group = inputs.addGroupCommandInput('feedbackGroup', 'Feedback')
    feedback_group.isExpanded = True
    feedback_group.isEnabledCheckBoxDisplayed = False
    feedback_group_inputs = feedback_group.children

    prc_feedback = feedback_group_inputs.addTextBoxCommandInput('prcFeedback', 'PRC Feedback', '', 10, True)
    prc_feedback.isFullWidth = True
    shared_data.feedback_field = prc_feedback

    #defining a tool
    tool_group = inputs.addGroupCommandInput('toolGroup', 'Define Robot Tool')
    tool_group.isExpanded = True
    tool_group.isEnabledCheckBoxDisplayed = False
    tool_group_inputs = tool_group.children

    table = tool_group_inputs.addTableCommandInput('toolToble', 'Tool Definition', 1, '1:1')
    table.minimumVisibleRows = 1
    table.maximumVisibleRows = 7
    table.columnSpacing = 1
    table.rowSpacing = 1
    table.tablePresentationStyle = adsk.core.TablePresentationStyles.itemBorderTablePresentationStyle
    table.hasGrid = False

    tool_id_input = inputs.addIntegerSpinnerCommandInput('toolID', 'Tool Number', 0, 18, 1, 0)
    x_input = inputs.addValueInput('xVal', 'X', 'mm', adsk.core.ValueInput.createByReal(0.0))
    y_input = inputs.addValueInput('yVal', 'Y', 'mm', adsk.core.ValueInput.createByReal(0.0))
    z_input = inputs.addValueInput('zVal', 'Z', 'mm', adsk.core.ValueInput.createByReal(0.0))
    a_input = inputs.addValueInput('aVal', 'A', 'deg', adsk.core.ValueInput.createByReal(0.0))
    b_input = inputs.addValueInput('bVal', 'B', 'deg', adsk.core.ValueInput.createByReal(0.0))
    c_input = inputs.addValueInput('cVal', 'C', 'deg', adsk.core.ValueInput.createByReal(0.0))

    tool_id_label = inputs.addStringValueInput('toolIDLabel', 'Tool Number', 'Tool Number')
    tool_id_label.isReadOnly = True
    x_label = inputs.addStringValueInput('xLabel', 'X', 'X')
    x_label.isReadOnly = True
    y_label = inputs.addStringValueInput('yLabel', 'Y', 'Y')
    y_label.isReadOnly = True
    z_label = inputs.addStringValueInput('zLabel', 'Z', 'Z')
    z_label.isReadOnly = True
    a_label = inputs.addStringValueInput('aLabel', 'A', 'A')
    a_label.isReadOnly = True
    b_label = inputs.addStringValueInput('bLabel', 'B', 'B')
    b_label.isReadOnly = True
    c_label = inputs.addStringValueInput('cLabel', 'C', 'C')
    c_label.isReadOnly = True

    table.addCommandInput(tool_id_label, 0, 0)
    table.addCommandInput(x_label, 1, 0)
    table.addCommandInput(y_label, 2, 0)
    table.addCommandInput(z_label, 3, 0)
    table.addCommandInput(a_label, 4, 0)
    table.addCommandInput(b_label, 5, 0)
    table.addCommandInput(c_label, 6, 0)

    table.addCommandInput(tool_id_input, 0, 1)
    table.addCommandInput(x_input, 1, 1)
    table.addCommandInput(y_input, 2, 1)
    table.addCommandInput(z_input, 3, 1)
    table.addCommandInput(a_input, 4, 1)
    table.addCommandInput(b_input, 5, 1)
    table.addCommandInput(c_input, 6, 1)

    #defining a path via CAM
    cam_group = inputs.addGroupCommandInput('camGroup', 'Define path from CAM')
    cam_group.isExpanded = True
    cam_group.isEnabledCheckBoxDisplayed = False
    cam_group_inputs = cam_group.children

    add_cam_task = cam_group_inputs.addBoolValueInput('addCAMTask', 'Add CAM Task', False, '', True)
    add_cam_task.isFullWidth = True

    #defining a path via coordinate systems
    plane_group = inputs.addGroupCommandInput('group', 'Define path via planes')
    plane_group.isExpanded = True
    plane_group.isEnabledCheckBoxDisplayed = False
    plane_group_inputs = plane_group.children

    plane_input = plane_group_inputs.addSelectionInput('planeSelect', 'Select Planes', '')
    plane_input.addSelectionFilter(adsk.core.SelectionCommandInput.ConstructionPlanes)
    plane_input.setSelectionLimits(0, 0)

    add_task = plane_group_inputs.addBoolValueInput('addTask', '  Add Task  ', False, '', True)
    add_task.isFullWidth = True

    futil.add_handler(args.command.inputChanged, command_input_changed, local_handlers=local_handlers)
    futil.add_handler(args.command.destroy, command_destroy, local_handlers=local_handlers)


# This event handler is called when the user changes anything in the command dialog
# allowing you to modify values of other inputs based on that change.
def command_input_changed(args: adsk.core.InputChangedEventArgs):
    global prc_core_thread
    
    changed_input = args.input

    if (changed_input.id == 'simulationSlider'):
        float_slider: adsk.core.FloatSliderCommandInput = changed_input
        robot_state = shared_data.stub.GetSimulatedRobotState(
            prc_pb2.GetSimulatedRobotStateRequest(
                stream_update=True,
                id=shared_data.robot_id,
                normalized_state=float_slider.valueOne
            )
        )

    elif (changed_input.id == 'runPRC'):
        if (prc_core_thread is not None):
            shared_data.stop_event.set()
            prc_core_thread.join()
        prc_core_thread = Thread(target = process_prc.prc_core, args=(shared_data,))
        prc_core_thread.start()

    elif (changed_input.id == 'openSettings'):
        if ui.palettes.itemById('prcSettings') is not None:
            ui.palettes.itemById('prcSettings').isVisible = True
        else:
            palette = ui.palettes.add('prcSettings', 'PRC Settings', 'https://127.0.0.1:5001', False, True, True, 800, 480, True)
            palette.setPosition(800, 400)
            palette.isVisible = True

    elif (changed_input.id == 'addCAMTask'):
        shared_data.UpdateFeedback("Processing CAM data...")
        process_cam.processCAM(shared_data)

    elif (changed_input.id == 'addTask'):
        shared_data.UpdateFeedback("Processing default data...")
        process_default.processDefault(shared_data)

    elif (changed_input.id == 'planeSelect'):
        shared_data.inputMatrices.clear()
        for i in range(changed_input.selectionCount):
            shared_data.inputMatrices.append(changed_input.selection(i).entity.transform)

    elif (changed_input.id == 'toolID'):
        tool_id :adsk.core.IntegerSpinnerCommandInput = changed_input
        shared_data.tool_vals[6] = tool_id.value * 10
    elif (changed_input.id == 'xVal'):
        xVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[0] = xVal.value * 10
    elif (changed_input.id == 'yVal'):
        yVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[1] = yVal.value * 10
    elif (changed_input.id == 'zVal'):
        zVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[2] = zVal.value
    elif (changed_input.id == 'aVal'):
        aVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[3] = aVal.value * 180 / 3.141592653589793
    elif (changed_input.id == 'bVal'):
        bVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[4] = bVal.value * 180 / 3.141592653589793
    elif (changed_input.id == 'cVal'):
        cVal :adsk.core.ValueInput = changed_input
        shared_data.tool_vals[5] = cVal.value * 180 / 3.141592653589793

    return changed_input

# This event handler is called when the command terminates.
def command_destroy(args: adsk.core.CommandEventArgs):
    # General logging for debug.
    futil.log(f'{CMD_NAME} Command Destroy Event')
    while graphicsGroups.count > 0:
        graphicsGroups.item(0).deleteMe()
    shared_data.stop_event.set()
    prc_core_thread.join()
    global local_handlers
    local_handlers = []