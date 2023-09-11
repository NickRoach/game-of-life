"use strict";
exports.__esModule = true;
exports.clearCanvas = void 0;
var _1 = require(".");
var clearCanvas = function (canvas, ctx) {
    ctx.fillStyle = _1.backgroundColor;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
};
exports.clearCanvas = clearCanvas;
