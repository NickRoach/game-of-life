"use strict";
exports.__esModule = true;
exports.drawButtons = void 0;
var _1 = require(".");
var drawButtons = function (buttonHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx) {
    buttonHeight = _1.buttonBarHeight - buttonYMargin * 2;
    var renderedButtons = [];
    var buttonTop = canvas.height - buttonYMargin - buttonHeight;
    var buttonWidth = (canvas.width - buttonXMargin * (buttons.length + 1)) / buttons.length;
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var xStart = buttonXMargin * (i + 1) + buttonWidth * i;
        ctx.beginPath();
        ctx.rect(xStart, buttonTop, buttonWidth, buttonHeight);
        ctx.fillStyle = _1.paused
            ? button.pausedColor || button.color
            : button.color;
        ctx.fill();
        ctx.closePath();
        renderedButtons.push({
            xStart: xStart,
            yStart: buttonTop,
            xEnd: xStart + buttonWidth,
            yEnd: buttonTop + buttonHeight,
            callback: button.callBack
        });
        var textSize = 30;
        ctx.font = "".concat(textSize, "px Courier");
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(_1.paused ? button.pausedText || button.text : button.text, xStart + buttonWidth / 2, buttonTop + buttonHeight / 2 + textSize / 4);
    }
    return renderedButtons;
};
exports.drawButtons = drawButtons;
