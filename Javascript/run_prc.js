import {
	updateRobot
} from './visual_prc.js';


var output = document.getElementById('feedback-text');
output.innerHTML = 'Starting client...';

const server = 'https://localhost:5001';

const client = new prc.ParametricRobotControlServicePromiseClient(server, null, null);

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

var setupRobotReply = new prc.SetupRobotReply();
setupRobotReply = await client.setupRobot(setupRobotRequest, {});

output.innerHTML = 'Robot has been set up...';

var stream = client.subscribeRobotFeedback(new prc.SubscribeRobotFeedbackRequest().setId(robotID), {});
stream.on('data', async function(response) {
	await updateRobot(response.GetDataPackage, response.getStatus());
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

/* simulation loop as in other examples
var i = 0;
while (i < 100) {
	i += 4;
	var robotState = new prc.GetSimulatedRobotStateRequest()
		.setAsyncStreamUpdate(false)
		.setId(robotID)
		.setNormalizedState(i / 100.0);

	var robotStateResponse = await client.getSimulatedRobotState(robotState, {});
	output.innerHTML = 'Simulated robot position at ' + i + '%: ' + robotStateResponse.getActualAxisPosition().getAxisValuesList().toString();
	await new Promise(r => setTimeout(r, 400));
}

stream.cancel();*/

output.innerHTML = 'Task has been added...';

export async function updateRobotSimulation(simSlider) {
	var robotState = new prc.GetSimulatedRobotStateRequest()
		.setAsyncStreamUpdate(false)
		.setId(robotID)
		.setNormalizedState(simSlider);

	var robotStateResponse = await client.getSimulatedRobotState(robotState, {});

	if (robotStateResponse != null && robotStateResponse.getRobotTransformationsList() != null && robotStateResponse.getRobotTransformationsList()[0] != null) {

		await updateRobot(robotStateResponse.getRobotTransformationsList()[0].getTransformationList(), robotStateResponse.getActualAxisPosition().getAxisValuesList().toString());
	}
}