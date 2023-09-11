"use strict";
exports.__esModule = true;
exports.redraw = void 0;
var _1 = require(".");
var clearCanvas_1 = require("./clearCanvas");
var drawBoxes_1 = require("./drawBoxes");
var drawButtons_1 = require("./drawButtons");
var drawGrid_1 = require("./drawGrid");
var redraw = function (params) {
    (0, clearCanvas_1.clearCanvas)(params.canvas, params.ctx);
    if (_1.showGrid)
        (0, drawGrid_1.drawGrid)(params.boxes, params.ctx);
    (0, drawBoxes_1.drawBoxes)(params.boxes, params.ctx);
    (0, drawButtons_1.drawButtons)(params.buttonBarHeight, params.buttonXMargin, params.buttonYMargin, params.buttons, params.canvas, params.ctx);
};
exports.redraw = redraw;
