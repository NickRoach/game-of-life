"use strict";
exports.__esModule = true;
exports.makeBoxes = void 0;
var _1 = require(".");
var makeBoxes = function (canvas) {
    var boxes = [[]];
    var xBoxes = Math.floor(canvas.width / _1.boxSize) - 1;
    var yBoxes = Math.floor((canvas.height - _1.buttonBarHeight) / _1.boxSize) - 1;
    for (var x = 0; x <= xBoxes; x++) {
        boxes[x] = [];
        for (var y = 0; y <= yBoxes; y++) {
            boxes[x][y] = false;
        }
    }
    return boxes;
};
exports.makeBoxes = makeBoxes;
