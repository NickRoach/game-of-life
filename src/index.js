var lineLength = window.innerWidth / 3;
var start;
var canvas;
var ctx;
var lastFrame = 0;
var row = 0;
var backgroundColor = "#000000";
var cellColor = "turquoise";
var direction = "down";
var showGrid = false;
var boxSize = 3;
var boxes = [[], []];
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
var renderGrid = function () {
    if (!showGrid)
        return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999999";
    // draw vertical lines
    for (var i = 0; i <= canvas.width; i += boxSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    // draw horizontal lines
    for (var i = 0; i < canvas.height; i += boxSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
};
var getNeighbors = function (boxes, x, y) {
    var counter = 0;
    // left top
    if (x > 0 && y > 0 && boxes[x - 1][y - 1])
        counter++;
    // left middle
    if (x > 0 && y < boxes[x].length - 1 && boxes[x - 1][y])
        counter++;
    // left bottom
    if (x > 0 && boxes[x - 1][y + 1])
        counter++;
    // middle top
    if (y > 0 && boxes[x][y - 1])
        counter++;
    // middle bottom
    if (y < boxes[x].length - 1 && boxes[x][y + 1])
        counter++;
    // right top
    if (y > 0 && x < boxes.length - 1 && boxes[x + 1][y - 1])
        counter++;
    // right middle
    if (x < boxes.length - 1 && boxes[x + 1][y])
        counter++;
    // right bottom
    if (x < boxes.length - 1 && y < boxes[x].length - 1 && boxes[x + 1][y + 1])
        counter++;
    return counter;
};
var setBoxes = function () {
    var xBoxes = Math.floor(canvas.width / boxSize);
    var yBoxes = Math.floor(canvas.height / boxSize);
    for (var x = 0; x <= xBoxes; x++) {
        boxes[x] = [];
        for (var y = 0; y <= yBoxes; y++) {
            boxes[x][y] = false;
            if (Math.random() > 0.9)
                boxes[x][y] = true;
        }
    }
    // // boxes[Math.floor(xBoxes / 2) - 1][Math.floor(yBoxes / 2) - 1] = true
    // // boxes[Math.floor(xBoxes / 2) - 1][Math.floor(yBoxes / 2)] = true
    // boxes[Math.floor(xBoxes / 2) - 1][Math.floor(yBoxes / 2) + 1] = true
    // boxes[Math.floor(xBoxes / 2)][Math.floor(yBoxes / 2) - 1] = true
    // // boxes[Math.floor(xBoxes / 2)][Math.floor(yBoxes / 2)] = true
    // boxes[Math.floor(xBoxes / 2)][Math.floor(yBoxes / 2) + 1] = true
    // // boxes[Math.floor(xBoxes / 2) + 1][Math.floor(yBoxes / 2) - 1] = true
    // boxes[Math.floor(xBoxes / 2) + 1][Math.floor(yBoxes / 2)] = true
    // boxes[Math.floor(xBoxes / 2) + 1][Math.floor(yBoxes / 2) + 1] = true
};
var calculateNewBoxes = function () {
    var newBoxes = [];
    // fill newBoxes with false
    for (var i = 0; i < boxes.length; i++) {
        newBoxes.push([]);
        for (var j = 0; j < boxes[i].length; j++)
            newBoxes[i].push(false);
    }
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[x].length; y++) {
            var n = getNeighbors(boxes, x, y);
            if (n < 2 || n > 3)
                newBoxes[x][y] = false;
            if ((boxes[x][y] === true && n === 2) || n === 3)
                newBoxes[x][y] = true;
            if (boxes[x][y] === false && n === 3)
                newBoxes[x][y] = true;
        }
    }
    boxes = newBoxes.map(function (x) { return x; });
};
var drawBoxes = function () {
    ctx.fillStyle = cellColor;
    for (var x = 0; x < boxes.length; x++) {
        for (var y = 0; y < boxes[x].length; y++) {
            if (boxes[x][y] === true) {
                ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }
    }
};
var renderThings = function (timeStamp) {
    if (start === undefined) {
        start = timeStamp;
    }
    if (timeStamp - lastFrame > 50) {
        lastFrame = timeStamp;
        clear();
        renderGrid();
        calculateNewBoxes();
        drawBoxes();
    }
    window.requestAnimationFrame(renderThings);
};
var handleClick = function (event) {
    setBoxes();
    // console.log(event)
    // calculateNewBoxes()
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
    canvas.addEventListener("click", handleClick);
    setBoxes();
    window.requestAnimationFrame(renderThings);
};
document.body.onload = initialize;
window.onresize = resizeCanvas;
