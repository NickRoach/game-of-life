"use strict";
exports.__esModule = true;
exports.calculateNewBoxes = void 0;
var getNeighbors_1 = require("./getNeighbors");
var calculateNewBoxes = function (boxes) {
    var newBoxes = [[]];
    // fill newBoxes with false
    for (var i = 0; i < boxes.length; i++) {
        newBoxes.push([]);
        for (var j = 0; j < boxes[i].length; j++)
            newBoxes[i].push(false);
    }
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[x].length; y++) {
            var n = (0, getNeighbors_1.getNeighbors)(boxes, x, y);
            if (n < 2 || n > 3)
                newBoxes[x][y] = false;
            if ((boxes[x][y] === true && n === 2) || n === 3)
                newBoxes[x][y] = true;
            if (boxes[x][y] === false && n === 3)
                newBoxes[x][y] = true;
        }
    }
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[0].length; y++) {
            boxes[x][y] = newBoxes[x][y];
        }
    }
};
exports.calculateNewBoxes = calculateNewBoxes;
