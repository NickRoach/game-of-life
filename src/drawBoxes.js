"use strict";
exports.__esModule = true;
exports.drawBoxes = void 0;
var _1 = require(".");
var drawBoxes = function (boxes, ctx) {
    console.log("drawBoxes");
    ctx.fillStyle = _1.cellColor;
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[x].length; y++) {
            if (boxes[x][y] === true) {
                ctx.beginPath();
                ctx.fillRect(x * _1.boxSize, y * _1.boxSize, _1.boxSize, _1.boxSize);
                ctx.closePath();
            }
        }
    }
};
exports.drawBoxes = drawBoxes;
