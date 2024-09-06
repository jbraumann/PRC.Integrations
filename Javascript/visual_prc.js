import {
	updateRobotSimulation
} from './run_prc.js';

var canvas = null;
var engine = null;
var scene = null;
var feedbackText = null;

const createScene = async function() {
	canvas = document.getElementById("renderCanvas"); // Get the canvas element
	engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

	scene = new BABYLON.Scene(engine);
	scene.useRightHandedSystem = true;

	await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "agilus2.gltf", scene);

	for (let mesh of scene.meshes) {
		mesh.rotation.x = Math.PI / 2;
		mesh.bakeCurrentTransformIntoVertices();
		mesh.enableEdgesRendering();
		mesh.edgesWidth = 0.2;
		mesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);
	}

	var material = scene.getMaterialByName("Color #333333ff");
	material.roughness = 0.05;

	material = scene.getMaterialByName("Color #666666ff");
	material.roughness = 0.05;

	material = scene.getMaterialByName("Color #ccccccff");
	material.roughness = 0.05;

	material = scene.getMaterialByName("Color #ff7f00ff");
	material.roughness = 0.05;

	let root = new BABYLON.TransformNode("root");
	root.rotation.x = Math.PI / 2;

	scene.createDefaultCameraOrLight(true, true, true);

	scene.activeCamera.lowerRadiusLimit = 2;
	scene.activeCamera.upperRadiusLimit = 20;
	scene.activeCamera.useAutoRotationBehavior = false;
	scene.activeCamera.alpha = 1.4;
	scene.activeCamera.beta = 1.2;
	scene.activeCamera.radius = 4;

	scene.activeCamera.parent = root;

	var env512 = BABYLON.CubeTexture.CreateFromPrefilteredData("/assets/studio_512.env", scene);
	env512.name = "env512";
	env512.gammaSpace = false;
	scene.environmentTexture = env512;

	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

	var panel = new BABYLON.GUI.StackPanel();
	panel.isVertical = true;
	advancedTexture.addControl(panel);

	feedbackText = new BABYLON.GUI.TextBlock();
	feedbackText.text = "Move the slider to show the robot.";
	feedbackText.color = "white";
	feedbackText.fontSize = 24;
	feedbackText.height = "20px";
	panel.addControl(feedbackText);

	var slider = new BABYLON.GUI.Slider();
	slider.minimum = 0.0;
	slider.maximum = 1.0;
	slider.value = 0.5;
	slider.height = "20px";
	slider.width = "150px";
	slider.color = "#003399";
	slider.background = "grey";
	slider.left = "120px";
	slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	slider.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	slider.onValueChangedObservable.add(async function(value) {
		await updateRobotSimulation(value);
	});
	panel.addControl(slider);

	return scene;
};

scene = await createScene(); //Call the createScene function
scene.debugLayer.show();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
	engine.resize();
});


export async function updateRobot(xForms, feedback) {
	if (feedback != null) {
		feedbackText.text = feedback;
	}

	if (xForms != null) {
		for (let mesh of scene.meshes) {
			var axisIndex = parseInt(mesh.name.charAt(2));
			if (isNaN(axisIndex)) {
				continue
			} else {
				var matrix1 = BABYLON.Matrix.Zero();
				matrix1.setRowFromFloats(0, xForms[axisIndex].getM11(), xForms[axisIndex].getM12(), xForms[axisIndex].getM13(), xForms[axisIndex].getM14());
				matrix1.setRowFromFloats(1, xForms[axisIndex].getM21(), xForms[axisIndex].getM22(), xForms[axisIndex].getM23(), xForms[axisIndex].getM24());
				matrix1.setRowFromFloats(2, xForms[axisIndex].getM31(), xForms[axisIndex].getM32(), xForms[axisIndex].getM33(), xForms[axisIndex].getM34());
				matrix1.setRowFromFloats(3, xForms[axisIndex].getM41(), xForms[axisIndex].getM42(), xForms[axisIndex].getM43(), xForms[axisIndex].getM44());
				let matrix = mesh.getWorldMatrix();
				matrix.copyFrom(matrix1);
			}
		}
	}
}