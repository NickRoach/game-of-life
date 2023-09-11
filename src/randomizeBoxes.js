"use strict";
exports.__esModule = true;
exports.randomizeBoxes = void 0;
var randomizeBoxes = function (boxConcentration, boxes) {
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[0].length; y++) {
            if (Math.random() < boxConcentration) {
                boxes[x][y] = true;
            }
            else {
                boxes[x][y] = false;
            }
        }
    }
};
exports.randomizeBoxes = randomizeBoxes;
