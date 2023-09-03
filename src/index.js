var lineLength = window.innerWidth;
var start;
var canvas, ctx;
var lastFrame = 0;
var row = 0;
var backgroundColor = "#222222";
var direction = "down";
var resizeCanvas = function () {
    canvas.height = window.innerHeight - 4;
    canvas.width = window.innerWidth;
};
var clear = function () {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
};
var renderThings = function (timeStamp) {
    if (start === undefined) {
        start = timeStamp;
    }
    if (timeStamp - lastFrame > 1) {
        lastFrame = timeStamp;
        if (row >= canvas.height)
            direction = "up";
        else if (row <= 0)
            direction = "down";
        if (direction === "up")
            row -= 1;
        if (direction === "down")
            row += 1;
    }
    clear();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - lineLength / 2, row);
    ctx.lineTo(canvas.width / 2 + lineLength / 2, row);
    ctx.strokeStyle = "turquoise";
    ctx.stroke();
    window.requestAnimationFrame(renderThings);
};
var initialize = function () {
    canvas = document.createElement("canvas");
    var body = document.getElementById("body");
    body.style.margin = "0px";
    body.style.backgroundColor = backgroundColor;
    resizeCanvas();
    canvas.id = "canvas";
    body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    window.requestAnimationFrame(renderThings);
};
document.body.onload = initialize;
window.onresize = resizeCanvas;
