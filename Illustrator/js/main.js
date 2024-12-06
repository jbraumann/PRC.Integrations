/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2014 Adobe Inc.
* All Rights Reserved.
*
* NOTICE: Adobe permits you to use, modify, and distribute this file in
* accordance with the terms of the Adobe license agreement accompanying
* it. If you have received this file from a source other than Adobe,
* then your use, modification, or distribution of it requires the prior
* written permission of Adobe. 
**************************************************************************/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/
//@include '/librs/prc.js'

(function () {
    'use strict';

    var csInterface = new CSInterface();
    var toolpath;
    const robotID = 'PRC JS Client';
    var scale_multiplier = 1.0;
    var client;
    var settings;


    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('$._ext.evalFile("' + scriptPath + '")');
    }

    // Loads / executes all jsx files in the given folder
    function loadJSXFiles(pFolderPath) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + pFolderPath;
        csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
    }

    async function connect() {
        // csInterface.evalScript('$._ext.processCurves(' + iterations + ', ' + angleThreshold + ')', function (result) {});
        var base_id_field = select('[data-item-name="base_id"]');
        var base_id = base_id_field.textContent;

        var base_x_field = select('[data-item-name="base_x"]');
        var base_x = parseFloat(base_x_field.textContent);

        var base_y_field = select('[data-item-name="base_y"]');
        var base_y = parseFloat(base_y_field.textContent);

        var base_z_field = select('[data-item-name="base_z"]');
        var base_z = parseFloat(base_z_field.textContent);

        var base_a_field = select('[data-item-name="base_a"]');
        var base_a = parseFloat(base_a_field.textContent);

        var base_b_field = select('[data-item-name="base_b"]');
        var base_b = parseFloat(base_b_field.textContent);

        var base_c_field = select('[data-item-name="base_c"]');
        var base_c = parseFloat(base_c_field.textContent);

        var tool_id_field = select('[data-item-name="tool_id"]');
        var tool_id = tool_id_field.textContent;

        var tool_x_field = select('[data-item-name="tool_x"]');
        var tool_x = parseFloat(tool_x_field.textContent);

        var tool_y_field = select('[data-item-name="tool_y"]');
        var tool_y = parseFloat(tool_y_field.textContent);

        var tool_z_field = select('[data-item-name="tool_z"]');
        var tool_z = parseFloat(tool_z_field.textContent);

        var tool_a_field = select('[data-item-name="tool_a"]');
        var tool_a = parseFloat(tool_a_field.textContent);

        var tool_b_field = select('[data-item-name="tool_b"]');
        var tool_b = parseFloat(tool_b_field.textContent);

        var tool_c_field = select('[data-item-name="tool_c"]');
        var tool_c = parseFloat(tool_c_field.textContent);


        var actualUnits = "";

        csInterface.evalScript('$._ext.getToolpath()', function (result) {
            toolpath = JSON.parse(result);
        });


        csInterface.evalScript('$._ext.getUnits()', function (result) {
            actualUnits = result;
            if (result == "RulerUnits.Millimeters") {
                scale_multiplier = 1.0;
            }
            else if (result == "RulerUnits.Centimeters") {
                scale_multiplier = 10;
            }
            else if (result == "RulerUnits.Picas") {
                scale_multiplier = 4.23333;
            }
            else if (result == "RulerUnits.Points") {
                scale_multiplier = 0.352778;
            }
            else if (result == "RulerUnits.Pixels") {
                scale_multiplier = 1.0;
            }
        });




        const server = 'https://127.0.0.1:5001';

        client = new prc.ParametricRobotControlServicePromiseClient(server, null, null);

        var pingRequest = new prc.Ping()
            .setPayload('Hello');

        try {
            var response = await client.sendPing(pingRequest, {});
        } catch (e) {
            alert('Error: ' + e.message);
        }



        var setupRobotRequest = new prc.SetupRobotRequest()
            .setClientId(robotID)
            .setSoftwareVersion('0.1')
            .setRobotSetup(new prc.Robot()
                .setFriendlyId('KUKA KR10')
                .setRobotDriverClass('KUKA.KSS_KRL_Driver')
                .setPresetRobotClass('KUKA.KUKA_KR610R11002')
                .setInitialBase(new prc.Base()
                    .setBaseFrame(new prc.CartesianPosition()
                        .setEuler(new prc.Euler()
                            .setX(base_x)
                            .setY(base_y)
                            .setZ(base_z)
                            .setA(base_a)
                            .setB(base_b)
                            .setC(base_c)
                        )
                    )
                    .setBaseId(base_id)
                )
            );

        setupRobotRequest.getRobotSetup().getToolDictionaryMap()
            .set('0', new prc.Tool()
                .setToolId(tool_id)
                .setToolType(prc.FrameType.FIXED)
                .setTcp(new prc.CartesianPosition()
                    .setEuler(new prc.Euler()
                        .setX(tool_x)
                        .setY(tool_y)
                        .setZ(tool_z)
                        .setA(tool_a)
                        .setB(tool_b)
                        .setC(tool_c)
                    )
                )
            );

        var setupRobotReply = new prc.SetupRobotReply();
        setupRobotReply = await client.setupRobot(setupRobotRequest, {});
        settings = setupRobotReply.getRobotSettings();

        alert('Robot is connected.', 'Parametric Robot Control');
    }

    async function updateToolpath() {
        var z_height_field = select('[data-item-name="z_height"]');
        var z_height = parseFloat(z_height_field.textContent);

        var speed_field = select('[data-item-name="speed"]');
        var speed = parseFloat(speed_field.textContent);

        var tool_id_field = select('[data-item-name="tool_id"]');
        var tool_id = tool_id_field.textContent;

        csInterface.evalScript('$._ext.getToolpath()', function (result) {
            if (result != null) {
                toolpath = JSON.parse(result);
            }
        });


        var ptpMotion1 = new prc.MotionCommand()
            .setAxisMotion(new prc.AxisMotion()
                .setTarget(new prc.JointTarget()
                    .setAxisValuesList([0, -85, 95, -5, 5, -10])
                    .setSpeedList([0.1])
                ));

        var ptpMotion2 = new prc.MotionCommand()
            .setPtpMotion(new prc.PTPMotion()
                .setTarget(new prc.CartesianTarget()
                    .setPosition(new prc.CartesianPosition()
                        .setCs(new prc.CoordinateSystem()
                            .setOrigin(new prc.Vector3()
                                .setX(toolpath[0][0][0] * scale_multiplier)
                                .setY(toolpath[0][0][1] * scale_multiplier)
                                .setZ(z_height)
                            )
                            .setXAxis(new prc.Vector3()
                                .setX(0)
                                .setY(0)
                                .setZ(1)
                            )
                            .setYAxis(new prc.Vector3()
                                .setX(0)
                                .setY(-1)
                                .setZ(0)
                            )
                        )
                    )
                    .setSpeedList([0.1])
                    .setPosture('010')
                ));

        var ptpMotionGroup = new prc.MotionGroup()
            .setCommandsList([ptpMotion1, ptpMotion2])
            .setInterpolation('C_PTP')
            .setToolId(tool_id)
            .setMotionGroupType(prc.MotionGroupType.PTP);

        var linMotionGroup = new prc.MotionGroup()
            .setInterpolation('C_DIS')
            .setToolId(tool_id)
            .setMotionGroupType(prc.MotionGroupType.LIN);

        for (var i = 0; i < toolpath.length; i++) {
            for (var j = 0; j < toolpath[i].length; j++) {
                if (j == 0) {
                    var linMotion = new prc.MotionCommand()
                        .setLinMotion(new prc.LINMotion()
                            .setTarget(new prc.CartesianTarget()
                                .setPosition(new prc.CartesianPosition()
                                    .setCs(new prc.CoordinateSystem()
                                        .setOrigin(new prc.Vector3()
                                            .setX(toolpath[i][j][0] * scale_multiplier)
                                            .setY(toolpath[i][j][1] * scale_multiplier)
                                            .setZ(z_height)
                                        )
                                        .setXAxis(new prc.Vector3()
                                            .setX(0)
                                            .setY(0)
                                            .setZ(1)
                                        )
                                        .setYAxis(new prc.Vector3()
                                            .setX(0)
                                            .setY(-1)
                                            .setZ(0)
                                        )
                                    )
                                )
                                .setSpeedList([speed])
                                .setPosture('010')
                            )
                        );
                    linMotionGroup.getCommandsList().push(linMotion);
                }
                var linMotion = new prc.MotionCommand()
                    .setLinMotion(new prc.LINMotion()
                        .setTarget(new prc.CartesianTarget()
                            .setPosition(new prc.CartesianPosition()
                                .setCs(new prc.CoordinateSystem()
                                    .setOrigin(new prc.Vector3()
                                        .setX(toolpath[i][j][0] * scale_multiplier)
                                        .setY(toolpath[i][j][1] * scale_multiplier)
                                        .setZ(0)
                                    )
                                    .setXAxis(new prc.Vector3()
                                        .setX(0)
                                        .setY(0)
                                        .setZ(1)
                                    )
                                    .setYAxis(new prc.Vector3()
                                        .setX(0)
                                        .setY(-1)
                                        .setZ(0)
                                    )
                                )
                            )
                            .setSpeedList([speed])
                            .setPosture('010')
                        )
                    );
                if (j == toolpath[i].length - 1) {
                    var linMotion = new prc.MotionCommand()
                        .setLinMotion(new prc.LINMotion()
                            .setTarget(new prc.CartesianTarget()
                                .setPosition(new prc.CartesianPosition()
                                    .setCs(new prc.CoordinateSystem()
                                        .setOrigin(new prc.Vector3()
                                            .setX(toolpath[i][j][0] * scale_multiplier)
                                            .setY(toolpath[i][j][1] * scale_multiplier)
                                            .setZ(z_height)
                                        )
                                        .setXAxis(new prc.Vector3()
                                            .setX(0)
                                            .setY(0)
                                            .setZ(1)
                                        )
                                        .setYAxis(new prc.Vector3()
                                            .setX(0)
                                            .setY(-1)
                                            .setZ(0)
                                        )
                                    )
                                )
                                .setSpeedList([speed])
                                .setPosture('010')
                            )
                        );
                    linMotionGroup.getCommandsList().push(linMotion);
                }

                linMotionGroup.getCommandsList().push(linMotion);
            }
        }

        var addTask = new prc.AddRobotTaskRequest()
            .setId(robotID)
            .setRobotTask(new prc.Task()
                .setName('Task')
                .setType(prc.TaskType.SIMULATE_AND_EXECUTE_TASK)
                .setPayloadList([new prc.TaskPayload()
                    .setMotionGroupTask(ptpMotionGroup)
                    , new prc.TaskPayload()
                        .setMotionGroupTask(linMotionGroup)])
            )
            .setRobotSettings(settings);

        var addTaskReply = await client.addRobotTask(addTask, {});
        if (addTaskReply.getSimulationResultData().getIsValid()) {
            alert('Task is valid.','Parametric Robot Control');
        }
        else
        {
            alert('Caution: Task is invalid.', 'Parametric Robot Control', true);
        }
    }

    function init() {

        themeManager.init();

        var btn_connect = select('[data-item-name="btn_connect"]');
        btn_connect.onclick = connect;

        var btn_update = select('[data-item-name="btn_update"]');
        btn_update.onclick = updateToolpath;
    }

    init();

}());

