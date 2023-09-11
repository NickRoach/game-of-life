"use strict";
exports.__esModule = true;
exports.drawGrid = void 0;
var _1 = require(".");
var drawGrid = function (boxes, ctx) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#999999";
    // draw vertical lines
    for (var i = 0; i <= boxes.length; i++) {
        ctx.beginPath();
        ctx.moveTo(i * _1.boxSize, 0);
        ctx.lineTo(i * _1.boxSize, boxes[0].length * _1.boxSize);
        ctx.stroke();
        ctx.closePath();
    }
    // draw horizontal lines
    for (var i = 0; i <= boxes[0].length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * _1.boxSize);
        ctx.lineTo(boxes.length * _1.boxSize, i * _1.boxSize);
        ctx.stroke();
        ctx.closePath();
    }
};
exports.drawGrid = drawGrid;
