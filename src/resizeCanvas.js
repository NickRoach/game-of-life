"use strict";
exports.__esModule = true;
exports.resizeCanvas = void 0;
var resizeCanvas = function (canvas) {
    canvas.height = window.innerHeight - 4;
    canvas.width = window.innerWidth;
};
exports.resizeCanvas = resizeCanvas;
