/**
 *
Parametric Robot Control (PRC) gRPC-Web client in JavaScript

Connects to a running PRC server, sets up a KUKA robot, sends it a small task,
and simulates it in the Babylon.js viewport of visual_prc.js - the same
lifecycle every other PRC integration follows:
  1. setupRobot              defines the robot model, driver, tool and base.
  2. subscribeRobotFeedback  opens the persistent feedback stream.
  3. addRobotTask            sends motion commands, returns the simulation and code.
  4. getSimulatedRobotState  queries the robot state anywhere along the toolpath,
                             here driven by the simulation slider.

The prc library is the webpack bundle of export.js, see the readme.
 *
 */

import {
	updateRobot
} from './visual_prc.js';


var output = document.getElementById('feedback-text');
output.innerHTML = 'Starting client...';

const server = 'https://127.0.0.1:5001';

const client = new prc.ParametricRobotControlServicePromiseClient(server, null, null);

// A ping confirms that the server is reachable before setting up the robot.
var pingRequest = new prc.Ping()
	.setPayload('Hello');

try {
	var response = await client.sendPing(pingRequest, {});
} catch (e) {
	output.innerHTML = 'Could not reach ' + server + '. Is the server running? Error: ' + e;
	throw e;
}

output.innerHTML = 'Pinged client.';

const robotID = 'PRC JS Client';

// Step 1: Set up a preset KUKA robot with its driver and a default base "0" at
// the world origin. The classes for other robots and drivers are listed in the
// PRC server's interface.
var setupRobotRequest = new prc.SetupRobotRequest()
	.setClientId(robotID)
	.setSoftwareVersion('0.1')
	.setRobotSetup(new prc.Robot()
		.setFriendlyId('KUKA KR10')
		.setRobotDriverClass('KUKA.KSS_KRL_Driver')
		.setPresetRobotClass('KUKA.KUKA_KR610R11002')
		.setInitialBase(new prc.Base()
			.setBaseFrame(new prc.CartesianPosition()
				.setCs(new prc.CoordinateSystem()
					.setOrigin(new prc.Vector3()
						.setX(0)
						.setY(0)
						.setZ(0)
					)
					.setXAxis(new prc.Vector3()
						.setX(1)
						.setY(0)
						.setZ(0)
					)
					.setYAxis(new prc.Vector3()
						.setX(0)
						.setY(1)
						.setZ(0)
					)
				)
			)
		)
	);

// The tool dictionary is a map field, so the default tool "0" is set on the
// request rather than through a builder.
setupRobotRequest.getRobotSetup().getToolDictionaryMap()
	.set('0', new prc.Tool()
		.setToolId('0')
		.setToolType(prc.FrameType.FIXED)
		.setTcp(new prc.CartesianPosition()
			.setCs(new prc.CoordinateSystem()
				.setOrigin(new prc.Vector3()
					.setX(0)
					.setY(0)
					.setZ(0))
				.setXAxis(new prc.Vector3()
					.setX(1)
					.setY(0)
					.setZ(0))
				.setYAxis(new prc.Vector3()
					.setX(0)
					.setY(1)
					.setZ(0))
			)
		)
	);

var setupRobotReply = await client.setupRobot(setupRobotRequest, {});

output.innerHTML = 'Robot has been set up...';

// Step 2: Subscribe to the feedback stream. The server continuously sends
// heartbeats, robot states and settings updates through it. Robot states
// carry the transformation of each joint and move the Babylon.js robot.
var stream = client.subscribeRobotFeedback(new prc.SubscribeRobotFeedbackRequest().setId(robotID), {});
stream.on('data', async function(response) {
	if (response.getDataPackageCase() == prc.RobotFeedback.DataPackageCase.ROBOT_STATE_DATA) {
		var robotState = response.getRobotStateData();
		if (robotState.getRobotTransformationsList().length > 0) {
			await updateRobot(robotState.getRobotTransformationsList()[0].getTransformationList(), response.getStatus());
			return;
		}
	}
	await updateRobot(null, response.getStatus());
	console.log(response.getStatus());
});
stream.on('status', function(status) {
	console.log(status.code);
	console.log(status.details);
	console.log(status.metadata);
});
stream.on('end', async function(end) {
	await updateRobot(null, "Stream has been closed...");
});


output.innerHTML = 'Stream has been established...';

// Step 3: Build a task from two PTP motions defined in joint space and send it
// to the robot. The speed is a single value for all axes. The robot settings
// returned by setupRobot are passed back with the task.
var ptpMotion1 = new prc.MotionCommand()
	.setAxisMotion(new prc.AxisMotion()
		.setTarget(new prc.JointTarget()
			.setAxisValuesList([0, 20, -90, 90, 70, -115])
			.setSpeedList([0.1])
		));

var ptpMotion2 = new prc.MotionCommand()
	.setAxisMotion(new prc.AxisMotion()
		.setTarget(new prc.JointTarget()
			.setAxisValuesList([0, -40, 75, -80, -90, -125])
			.setSpeedList([0.1])
		));

var ptpMotionGroup = new prc.MotionGroup()
	.setCommandsList([ptpMotion1, ptpMotion2])
	.setInterpolation('C_PTP')
	.setMotionGroupType(prc.MotionGroupType.PTP);

var addTask = new prc.AddRobotTaskRequest()
	.setId(robotID)
	.setRobotTask(new prc.Task()
		.setName('Task')
		.setType(prc.TaskType.SIMULATE_AND_EXECUTE_TASK)
		.setPayloadList([new prc.TaskPayload()
			.setMotionGroupTask(ptpMotionGroup)
		])
	)
	.setRobotSettings(setupRobotReply.getRobotSettings());

var addTaskReply = await client.addRobotTask(addTask, {});

output.innerHTML = 'Task has been added...';

// Step 4: Scrub through the simulated toolpath from start (0.0) to end (1.0),
// called by the simulation slider in visual_prc.js. With setStreamUpdate(true)
// the state would arrive via the feedback stream instead of the direct reply.
export async function updateRobotSimulation(simSlider) {
	var robotState = new prc.GetSimulatedRobotStateRequest()
		.setStreamUpdate(false)
		.setId(robotID)
		.setNormalizedState(simSlider);

	var robotStateResponse = await client.getSimulatedRobotState(robotState, {});

	if (robotStateResponse != null && robotStateResponse.getRobotTransformationsList() != null && robotStateResponse.getRobotTransformationsList()[0] != null) {

		await updateRobot(robotStateResponse.getRobotTransformationsList()[0].getTransformationList(), robotStateResponse.getAxisPosition().getAxisValuesList().toString());
	}
}
