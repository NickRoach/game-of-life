"use strict";
exports.__esModule = true;
exports.clearBoxes = void 0;
var clearBoxes = function (boxes) {
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[0].length; y++) {
            boxes[x][y] = false;
        }
    }
};
exports.clearBoxes = clearBoxes;
