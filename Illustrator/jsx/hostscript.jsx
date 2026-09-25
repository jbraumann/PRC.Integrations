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
/*global $, Folder*/
//@include 'json.jsx'

// Full debug mode
$.level = 2;

$._ext = (function () {
    'use strict';

    var ext = {};

    ext.sayHello = function () {
        alert("hello world");
    };


    ext.getToolpath = function () {
        if (app.selection.length > 0) {
            var selectedItems = app.selection;
            var result = [];

            for (var i = 0; i < selectedItems.length; i++) {
                var item = selectedItems[i];
                if (item.typename === "PathItem") {
                    // Collect anchor points
                    var anchorPoints = [];
                    for (var k = 0; k < item.pathPoints.length; k++) {
                        var point = item.pathPoints[k].anchor;
                        anchorPoints.push([point[0], point[1]]);
                    }
                    result.push(anchorPoints);
                }
            }
            return JSON.lave(result);
        } else {
            alert("Please select some curves.");
        }
    };

    ext.getUnits = function () {
        return app.activeDocument.rulerUnits.toString();
    };

    //Evaluate a file and catch the exception.
    ext.evalFile = function (path) {
        try {
            $.evalFile(path);
        } catch (e) {
            alert("Exception:" + e);
        }
    };

    // Evaluate all the files in the given folder 
    ext.evalFiles = function (jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            var i;
            for (i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
        }
    };

    return ext;

}());
