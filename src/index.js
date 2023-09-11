"use strict";
// a function must not
// mutate anything that was not passed in
// ideally not mutate anything that is not a DOM element
exports.__esModule = true;
exports.paused = exports.buttonYMargin = exports.buttonXMargin = exports.buttonBarHeight = exports.frameCadence = exports.cadenceStep = exports.boxConcentration = exports.boxSize = exports.showGrid = exports.cellColor = exports.backgroundColor = void 0;
var clearBoxes_1 = require("./clearBoxes");
var randomizeBoxes_1 = require("./randomizeBoxes");
var drawGrid_1 = require("./drawGrid");
var clearCanvas_1 = require("./clearCanvas");
var drawButtons_1 = require("./drawButtons");
var resizeCanvas_1 = require("./resizeCanvas");
var makeBoxes_1 = require("./makeBoxes");
var drawBoxes_1 = require("./drawBoxes");
var calculateNewBoxes_1 = require("./calculateNewBoxes");
var redraw_1 = require("./redraw");
var lastFrame = 0;
exports.backgroundColor = "#000000";
exports.cellColor = "#03A062";
exports.showGrid = true;
exports.boxSize = 8;
exports.boxConcentration = 0.07;
exports.cadenceStep = 0;
exports.frameCadence = 69;
exports.buttonBarHeight = 69;
exports.buttonXMargin = 90;
exports.buttonYMargin = 15;
exports.paused = true;
var clickListenerAdded = false;
var handleStartPause = function () {
    console.log("start/stop");
    exports.paused = !exports.paused;
};
var handleStep = function (params) {
    console.log("Step");
    (0, calculateNewBoxes_1.calculateNewBoxes)(params.boxes);
    (0, redraw_1.redraw)(params);
};
var handleReset = function (params) {
    (0, clearBoxes_1.clearBoxes)(params.boxes);
    exports.paused = true;
    (0, redraw_1.redraw)(params);
};
var handleRandomize = function (params) {
    (0, clearBoxes_1.clearBoxes)(params.boxes);
    (0, randomizeBoxes_1.randomizeBoxes)(params.boxConcentration, params.boxes);
    (0, redraw_1.redraw)(params);
};
var handleFaster = function () {
    console.log("Faster");
    exports.frameCadence = exports.frameCadence / 1.2;
};
var handleSlower = function () {
    console.log("Slower");
    exports.frameCadence = exports.frameCadence * 1.2;
};
var handleShowGrid = function (params) {
    exports.showGrid = !exports.showGrid;
    (0, redraw_1.redraw)(params);
};
var buttons = [
    {
        text: "Pause",
        pausedText: "Start",
        color: "salmon",
        pausedColor: "#03A062",
        callBack: handleStartPause
    },
    {
        text: "Step",
        color: "#03A062",
        callBack: handleStep
    },
    {
        text: "Reset",
        color: "#03A062",
        callBack: handleReset
    },
    {
        text: "Randomize",
        color: "#03A062",
        callBack: handleRandomize
    },
    {
        text: "Faster",
        color: "#03A062",
        callBack: handleFaster
    },
    {
        text: "Slower",
        color: "#03A062",
        callBack: handleSlower
    },
    {
        text: "Grid",
        color: "#03A062",
        callBack: handleShowGrid
    }
];
var handleClick = function (event, renderedButtons, boxes, canvas, ctx, buttonBarHeight, buttonXMargin, buttonYMargin, buttons) {
    var pageX = event.pageX, pageY = event.pageY;
    var callbackParams = {
        boxes: boxes,
        canvas: canvas,
        ctx: ctx,
        boxConcentration: exports.boxConcentration,
        buttonBarHeight: buttonBarHeight,
        buttonXMargin: buttonXMargin,
        buttonYMargin: buttonYMargin,
        buttons: buttons
    };
    var isClickInButton = function (button) {
        if (pageX > button.xStart &&
            pageY > button.yStart &&
            pageX < button.xEnd &&
            pageY < button.yEnd) {
            return true;
        }
        return false;
    };
    for (var _i = 0, renderedButtons_1 = renderedButtons; _i < renderedButtons_1.length; _i++) {
        var button = renderedButtons_1[_i];
        if (isClickInButton(button)) {
            button.callback(callbackParams);
            return;
        }
    }
    if (pageY > boxes[0].length * exports.boxSize)
        return;
    var boxX = Math.floor(pageX / exports.boxSize);
    var boxY = Math.floor(pageY / exports.boxSize);
    boxes[boxX][boxY] = !boxes[boxX][boxY];
    (0, clearCanvas_1.clearCanvas)(canvas, ctx);
    if (exports.showGrid)
        (0, drawGrid_1.drawGrid)(boxes, ctx);
    (0, drawBoxes_1.drawBoxes)(boxes, ctx);
    (0, drawButtons_1.drawButtons)(buttonBarHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx);
};
var renderLoop = function (timeStamp, boxes, buttons, buttonBarHeight, buttonXMargin, buttonYMargin, canvas, ctx) {
    if (timeStamp - lastFrame > exports.frameCadence) {
        lastFrame = timeStamp;
        if (!exports.paused) {
            (0, clearCanvas_1.clearCanvas)(canvas, ctx);
            if (exports.showGrid)
                (0, drawGrid_1.drawGrid)(boxes, ctx);
            (0, calculateNewBoxes_1.calculateNewBoxes)(boxes);
            (0, drawBoxes_1.drawBoxes)(boxes, ctx);
        }
        var renderedButtons_2 = (0, drawButtons_1.drawButtons)(buttonBarHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx);
        if (!clickListenerAdded)
            canvas.addEventListener("click", function (e) {
                return handleClick(e, renderedButtons_2, boxes, canvas, ctx, buttonBarHeight, buttonXMargin, buttonYMargin, buttons);
            });
        clickListenerAdded = true;
    }
    window.requestAnimationFrame(function (timeStamp) {
        return renderLoop(timeStamp, boxes, buttons, buttonBarHeight, buttonXMargin, buttonYMargin, canvas, ctx);
    });
};
var initialize = function () {
    var canvas = document.createElement("canvas");
    var body = document.getElementById("body");
    var ctx = canvas.getContext("2d");
    body.style.margin = "0px";
    body.style.backgroundColor = exports.backgroundColor;
    (0, resizeCanvas_1.resizeCanvas)(canvas);
    canvas.id = "canvas";
    body.appendChild(canvas);
    window.onresize = function () { return (0, resizeCanvas_1.resizeCanvas)(canvas); };
    var boxes = (0, makeBoxes_1.makeBoxes)(canvas);
    if (exports.showGrid)
        (0, drawGrid_1.drawGrid)(boxes, ctx);
    window.requestAnimationFrame(function (timeStamp) {
        return renderLoop(timeStamp, boxes, buttons, exports.buttonBarHeight, exports.buttonXMargin, exports.buttonYMargin, canvas, ctx);
    });
};
document.body.onload = initialize;
