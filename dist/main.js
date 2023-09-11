/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/calculateNewBoxes.js":
/*!***********************************!*\
  !*** ./dist/calculateNewBoxes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.calculateNewBoxes = void 0;\r\nvar getNeighbors_1 = __webpack_require__(/*! ./getNeighbors */ \"./dist/getNeighbors.js\");\r\nvar calculateNewBoxes = function (boxes) {\r\n    var newBoxes = [[]];\r\n    // fill newBoxes with false\r\n    for (var i = 0; i < boxes.length; i++) {\r\n        newBoxes.push([]);\r\n        for (var j = 0; j < boxes[i].length; j++)\r\n            newBoxes[i].push(false);\r\n    }\r\n    for (var x = 0; x < boxes.length; x++) {\r\n        for (var y = 0; y < boxes[x].length; y++) {\r\n            var n = (0, getNeighbors_1.getNeighbors)(boxes, x, y);\r\n            if (n < 2 || n > 3)\r\n                newBoxes[x][y] = false;\r\n            if ((boxes[x][y] === true && n === 2) || n === 3)\r\n                newBoxes[x][y] = true;\r\n            if (boxes[x][y] === false && n === 3)\r\n                newBoxes[x][y] = true;\r\n        }\r\n    }\r\n    for (var x = 0; x < boxes.length; x++) {\r\n        for (var y = 0; y < boxes[0].length; y++) {\r\n            boxes[x][y] = newBoxes[x][y];\r\n        }\r\n    }\r\n};\r\nexports.calculateNewBoxes = calculateNewBoxes;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/calculateNewBoxes.js?");

/***/ }),

/***/ "./dist/clearBoxes.js":
/*!****************************!*\
  !*** ./dist/clearBoxes.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.clearBoxes = void 0;\r\nvar clearBoxes = function (boxes) {\r\n    for (var x = 0; x < boxes.length; x++) {\r\n        for (var y = 0; y < boxes[0].length; y++) {\r\n            boxes[x][y] = false;\r\n        }\r\n    }\r\n};\r\nexports.clearBoxes = clearBoxes;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/clearBoxes.js?");

/***/ }),

/***/ "./dist/clearCanvas.js":
/*!*****************************!*\
  !*** ./dist/clearCanvas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.clearCanvas = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar clearCanvas = function (canvas, ctx) {\r\n    ctx.fillStyle = _1.backgroundColor;\r\n    ctx.beginPath();\r\n    ctx.rect(0, 0, canvas.width, canvas.height);\r\n    ctx.fill();\r\n    ctx.closePath();\r\n};\r\nexports.clearCanvas = clearCanvas;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/clearCanvas.js?");

/***/ }),

/***/ "./dist/drawBoxes.js":
/*!***************************!*\
  !*** ./dist/drawBoxes.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.drawBoxes = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar drawBoxes = function (boxes, ctx) {\r\n    console.log(\"drawBoxes\");\r\n    ctx.fillStyle = _1.cellColor;\r\n    for (var x = 0; x < boxes.length; x++) {\r\n        for (var y = 0; y < boxes[x].length; y++) {\r\n            if (boxes[x][y] === true) {\r\n                ctx.beginPath();\r\n                ctx.fillRect(x * _1.boxSize, y * _1.boxSize, _1.boxSize, _1.boxSize);\r\n                ctx.closePath();\r\n            }\r\n        }\r\n    }\r\n};\r\nexports.drawBoxes = drawBoxes;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/drawBoxes.js?");

/***/ }),

/***/ "./dist/drawButtons.js":
/*!*****************************!*\
  !*** ./dist/drawButtons.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.drawButtons = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar drawButtons = function (buttonHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx) {\r\n    buttonHeight = _1.buttonBarHeight - buttonYMargin * 2;\r\n    var renderedButtons = [];\r\n    var buttonTop = canvas.height - buttonYMargin - buttonHeight;\r\n    var buttonWidth = (canvas.width - buttonXMargin * (buttons.length + 1)) / buttons.length;\r\n    for (var i = 0; i < buttons.length; i++) {\r\n        var button = buttons[i];\r\n        var xStart = buttonXMargin * (i + 1) + buttonWidth * i;\r\n        ctx.beginPath();\r\n        ctx.rect(xStart, buttonTop, buttonWidth, buttonHeight);\r\n        ctx.fillStyle = _1.paused\r\n            ? button.pausedColor || button.color\r\n            : button.color;\r\n        ctx.fill();\r\n        ctx.closePath();\r\n        renderedButtons.push({\r\n            xStart: xStart,\r\n            yStart: buttonTop,\r\n            xEnd: xStart + buttonWidth,\r\n            yEnd: buttonTop + buttonHeight,\r\n            callback: button.callBack\r\n        });\r\n        var textSize = 30;\r\n        ctx.font = \"\".concat(textSize, \"px Courier\");\r\n        ctx.textAlign = \"center\";\r\n        ctx.fillStyle = \"white\";\r\n        ctx.fillText(_1.paused ? button.pausedText || button.text : button.text, xStart + buttonWidth / 2, buttonTop + buttonHeight / 2 + textSize / 4);\r\n    }\r\n    return renderedButtons;\r\n};\r\nexports.drawButtons = drawButtons;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/drawButtons.js?");

/***/ }),

/***/ "./dist/drawGrid.js":
/*!**************************!*\
  !*** ./dist/drawGrid.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.drawGrid = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar drawGrid = function (boxes, ctx) {\r\n    ctx.lineWidth = 0.5;\r\n    ctx.strokeStyle = \"#999999\";\r\n    // draw vertical lines\r\n    for (var i = 0; i <= boxes.length; i++) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(i * _1.boxSize, 0);\r\n        ctx.lineTo(i * _1.boxSize, boxes[0].length * _1.boxSize);\r\n        ctx.stroke();\r\n        ctx.closePath();\r\n    }\r\n    // draw horizontal lines\r\n    for (var i = 0; i <= boxes[0].length; i++) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(0, i * _1.boxSize);\r\n        ctx.lineTo(boxes.length * _1.boxSize, i * _1.boxSize);\r\n        ctx.stroke();\r\n        ctx.closePath();\r\n    }\r\n};\r\nexports.drawGrid = drawGrid;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/drawGrid.js?");

/***/ }),

/***/ "./dist/getNeighbors.js":
/*!******************************!*\
  !*** ./dist/getNeighbors.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.getNeighbors = void 0;\r\nvar getNeighbors = function (boxes, x, y) {\r\n    var getU = function (y) {\r\n        if (y === 0)\r\n            return boxes[0].length - 1;\r\n        return y - 1;\r\n    };\r\n    var getD = function (y) {\r\n        if (y === boxes[0].length - 1)\r\n            return 0;\r\n        return y + 1;\r\n    };\r\n    var getL = function (x) {\r\n        if (x === 0)\r\n            return boxes.length - 1;\r\n        return x - 1;\r\n    };\r\n    var getR = function (x) {\r\n        if (x === boxes.length - 1)\r\n            return 0;\r\n        return x + 1;\r\n    };\r\n    var counter = 0;\r\n    // left up\r\n    if (boxes[getL(x)][getU(y)])\r\n        counter++;\r\n    // left middle\r\n    if (boxes[getL(x)][y])\r\n        counter++;\r\n    // left down\r\n    if (boxes[getL(x)][getD(y)])\r\n        counter++;\r\n    // middle up\r\n    if (boxes[x][getU(y)])\r\n        counter++;\r\n    // middle down\r\n    if (boxes[x][getD(y)])\r\n        counter++;\r\n    // right up\r\n    if (boxes[getR(x)][getU(y)])\r\n        counter++;\r\n    // right middle\r\n    if (boxes[getR(x)][y])\r\n        counter++;\r\n    // right bottom\r\n    if (boxes[getR(x)][getD(y)])\r\n        counter++;\r\n    return counter;\r\n};\r\nexports.getNeighbors = getNeighbors;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/getNeighbors.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\n// a function must not\r\n// mutate anything that was not passed in\r\n// ideally not mutate anything that is not a DOM element\r\nexports.__esModule = true;\r\nexports.paused = exports.buttonYMargin = exports.buttonXMargin = exports.buttonBarHeight = exports.frameCadence = exports.cadenceStep = exports.boxConcentration = exports.boxSize = exports.showGrid = exports.cellColor = exports.backgroundColor = void 0;\r\nvar clearBoxes_1 = __webpack_require__(/*! ./clearBoxes */ \"./dist/clearBoxes.js\");\r\nvar randomizeBoxes_1 = __webpack_require__(/*! ./randomizeBoxes */ \"./dist/randomizeBoxes.js\");\r\nvar drawGrid_1 = __webpack_require__(/*! ./drawGrid */ \"./dist/drawGrid.js\");\r\nvar clearCanvas_1 = __webpack_require__(/*! ./clearCanvas */ \"./dist/clearCanvas.js\");\r\nvar drawButtons_1 = __webpack_require__(/*! ./drawButtons */ \"./dist/drawButtons.js\");\r\nvar resizeCanvas_1 = __webpack_require__(/*! ./resizeCanvas */ \"./dist/resizeCanvas.js\");\r\nvar makeBoxes_1 = __webpack_require__(/*! ./makeBoxes */ \"./dist/makeBoxes.js\");\r\nvar drawBoxes_1 = __webpack_require__(/*! ./drawBoxes */ \"./dist/drawBoxes.js\");\r\nvar calculateNewBoxes_1 = __webpack_require__(/*! ./calculateNewBoxes */ \"./dist/calculateNewBoxes.js\");\r\nvar redraw_1 = __webpack_require__(/*! ./redraw */ \"./dist/redraw.js\");\r\nvar lastFrame = 0;\r\nexports.backgroundColor = \"#000000\";\r\nexports.cellColor = \"#03A062\";\r\nexports.showGrid = true;\r\nexports.boxSize = 8;\r\nexports.boxConcentration = 0.07;\r\nexports.cadenceStep = 0;\r\nexports.frameCadence = 69;\r\nexports.buttonBarHeight = 69;\r\nexports.buttonXMargin = 90;\r\nexports.buttonYMargin = 15;\r\nexports.paused = true;\r\nvar clickListenerAdded = false;\r\nvar handleStartPause = function () {\r\n    console.log(\"start/stop\");\r\n    exports.paused = !exports.paused;\r\n};\r\nvar handleStep = function (params) {\r\n    console.log(\"Step\");\r\n    (0, calculateNewBoxes_1.calculateNewBoxes)(params.boxes);\r\n    (0, redraw_1.redraw)(params);\r\n};\r\nvar handleReset = function (params) {\r\n    (0, clearBoxes_1.clearBoxes)(params.boxes);\r\n    exports.paused = true;\r\n    (0, redraw_1.redraw)(params);\r\n};\r\nvar handleRandomize = function (params) {\r\n    (0, clearBoxes_1.clearBoxes)(params.boxes);\r\n    (0, randomizeBoxes_1.randomizeBoxes)(params.boxConcentration, params.boxes);\r\n    (0, redraw_1.redraw)(params);\r\n};\r\nvar handleFaster = function () {\r\n    console.log(\"Faster\");\r\n    exports.frameCadence = exports.frameCadence / 1.2;\r\n};\r\nvar handleSlower = function () {\r\n    console.log(\"Slower\");\r\n    exports.frameCadence = exports.frameCadence * 1.2;\r\n};\r\nvar handleShowGrid = function (params) {\r\n    exports.showGrid = !exports.showGrid;\r\n    (0, redraw_1.redraw)(params);\r\n};\r\nvar buttons = [\r\n    {\r\n        text: \"Pause\",\r\n        pausedText: \"Start\",\r\n        color: \"salmon\",\r\n        pausedColor: \"#03A062\",\r\n        callBack: handleStartPause\r\n    },\r\n    {\r\n        text: \"Step\",\r\n        color: \"#03A062\",\r\n        callBack: handleStep\r\n    },\r\n    {\r\n        text: \"Reset\",\r\n        color: \"#03A062\",\r\n        callBack: handleReset\r\n    },\r\n    {\r\n        text: \"Randomize\",\r\n        color: \"#03A062\",\r\n        callBack: handleRandomize\r\n    },\r\n    {\r\n        text: \"Faster\",\r\n        color: \"#03A062\",\r\n        callBack: handleFaster\r\n    },\r\n    {\r\n        text: \"Slower\",\r\n        color: \"#03A062\",\r\n        callBack: handleSlower\r\n    },\r\n    {\r\n        text: \"Grid\",\r\n        color: \"#03A062\",\r\n        callBack: handleShowGrid\r\n    }\r\n];\r\nvar handleClick = function (event, renderedButtons, boxes, canvas, ctx, buttonBarHeight, buttonXMargin, buttonYMargin, buttons) {\r\n    var pageX = event.pageX, pageY = event.pageY;\r\n    var callbackParams = {\r\n        boxes: boxes,\r\n        canvas: canvas,\r\n        ctx: ctx,\r\n        boxConcentration: exports.boxConcentration,\r\n        buttonBarHeight: buttonBarHeight,\r\n        buttonXMargin: buttonXMargin,\r\n        buttonYMargin: buttonYMargin,\r\n        buttons: buttons\r\n    };\r\n    var isClickInButton = function (button) {\r\n        if (pageX > button.xStart &&\r\n            pageY > button.yStart &&\r\n            pageX < button.xEnd &&\r\n            pageY < button.yEnd) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    for (var _i = 0, renderedButtons_1 = renderedButtons; _i < renderedButtons_1.length; _i++) {\r\n        var button = renderedButtons_1[_i];\r\n        if (isClickInButton(button)) {\r\n            button.callback(callbackParams);\r\n            return;\r\n        }\r\n    }\r\n    if (pageY > boxes[0].length * exports.boxSize)\r\n        return;\r\n    var boxX = Math.floor(pageX / exports.boxSize);\r\n    var boxY = Math.floor(pageY / exports.boxSize);\r\n    boxes[boxX][boxY] = !boxes[boxX][boxY];\r\n    (0, clearCanvas_1.clearCanvas)(canvas, ctx);\r\n    if (exports.showGrid)\r\n        (0, drawGrid_1.drawGrid)(boxes, ctx);\r\n    (0, drawBoxes_1.drawBoxes)(boxes, ctx);\r\n    (0, drawButtons_1.drawButtons)(buttonBarHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx);\r\n};\r\nvar renderLoop = function (timeStamp, boxes, buttons, buttonBarHeight, buttonXMargin, buttonYMargin, canvas, ctx) {\r\n    if (timeStamp - lastFrame > exports.frameCadence) {\r\n        lastFrame = timeStamp;\r\n        if (!exports.paused) {\r\n            (0, clearCanvas_1.clearCanvas)(canvas, ctx);\r\n            if (exports.showGrid)\r\n                (0, drawGrid_1.drawGrid)(boxes, ctx);\r\n            (0, calculateNewBoxes_1.calculateNewBoxes)(boxes);\r\n            (0, drawBoxes_1.drawBoxes)(boxes, ctx);\r\n        }\r\n        var renderedButtons_2 = (0, drawButtons_1.drawButtons)(buttonBarHeight, buttonXMargin, buttonYMargin, buttons, canvas, ctx);\r\n        if (!clickListenerAdded)\r\n            canvas.addEventListener(\"click\", function (e) {\r\n                return handleClick(e, renderedButtons_2, boxes, canvas, ctx, buttonBarHeight, buttonXMargin, buttonYMargin, buttons);\r\n            });\r\n        clickListenerAdded = true;\r\n    }\r\n    window.requestAnimationFrame(function (timeStamp) {\r\n        return renderLoop(timeStamp, boxes, buttons, buttonBarHeight, buttonXMargin, buttonYMargin, canvas, ctx);\r\n    });\r\n};\r\nvar initialize = function () {\r\n    var canvas = document.createElement(\"canvas\");\r\n    var body = document.getElementById(\"body\");\r\n    var ctx = canvas.getContext(\"2d\");\r\n    body.style.margin = \"0px\";\r\n    body.style.backgroundColor = exports.backgroundColor;\r\n    (0, resizeCanvas_1.resizeCanvas)(canvas);\r\n    canvas.id = \"canvas\";\r\n    body.appendChild(canvas);\r\n    window.onresize = function () { return (0, resizeCanvas_1.resizeCanvas)(canvas); };\r\n    var boxes = (0, makeBoxes_1.makeBoxes)(canvas);\r\n    if (exports.showGrid)\r\n        (0, drawGrid_1.drawGrid)(boxes, ctx);\r\n    window.requestAnimationFrame(function (timeStamp) {\r\n        return renderLoop(timeStamp, boxes, buttons, exports.buttonBarHeight, exports.buttonXMargin, exports.buttonYMargin, canvas, ctx);\r\n    });\r\n};\r\ndocument.body.onload = initialize;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/index.js?");

/***/ }),

/***/ "./dist/makeBoxes.js":
/*!***************************!*\
  !*** ./dist/makeBoxes.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.makeBoxes = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar makeBoxes = function (canvas) {\r\n    var boxes = [[]];\r\n    var xBoxes = Math.floor(canvas.width / _1.boxSize) - 1;\r\n    var yBoxes = Math.floor((canvas.height - _1.buttonBarHeight) / _1.boxSize) - 1;\r\n    for (var x = 0; x <= xBoxes; x++) {\r\n        boxes[x] = [];\r\n        for (var y = 0; y <= yBoxes; y++) {\r\n            boxes[x][y] = false;\r\n        }\r\n    }\r\n    return boxes;\r\n};\r\nexports.makeBoxes = makeBoxes;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/makeBoxes.js?");

/***/ }),

/***/ "./dist/randomizeBoxes.js":
/*!********************************!*\
  !*** ./dist/randomizeBoxes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.randomizeBoxes = void 0;\r\nvar randomizeBoxes = function (boxConcentration, boxes) {\r\n    for (var x = 0; x < boxes.length; x++) {\r\n        for (var y = 0; y < boxes[0].length; y++) {\r\n            if (Math.random() < boxConcentration) {\r\n                boxes[x][y] = true;\r\n            }\r\n            else {\r\n                boxes[x][y] = false;\r\n            }\r\n        }\r\n    }\r\n};\r\nexports.randomizeBoxes = randomizeBoxes;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/randomizeBoxes.js?");

/***/ }),

/***/ "./dist/redraw.js":
/*!************************!*\
  !*** ./dist/redraw.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nexports.redraw = void 0;\r\nvar _1 = __webpack_require__(/*! . */ \"./dist/index.js\");\r\nvar clearCanvas_1 = __webpack_require__(/*! ./clearCanvas */ \"./dist/clearCanvas.js\");\r\nvar drawBoxes_1 = __webpack_require__(/*! ./drawBoxes */ \"./dist/drawBoxes.js\");\r\nvar drawButtons_1 = __webpack_require__(/*! ./drawButtons */ \"./dist/drawButtons.js\");\r\nvar drawGrid_1 = __webpack_require__(/*! ./drawGrid */ \"./dist/drawGrid.js\");\r\nvar redraw = function (params) {\r\n    (0, clearCanvas_1.clearCanvas)(params.canvas, params.ctx);\r\n    if (_1.showGrid)\r\n        (0, drawGrid_1.drawGrid)(params.boxes, params.ctx);\r\n    (0, drawBoxes_1.drawBoxes)(params.boxes, params.ctx);\r\n    (0, drawButtons_1.drawButtons)(params.buttonBarHeight, params.buttonXMargin, params.buttonYMargin, params.buttons, params.canvas, params.ctx);\r\n};\r\nexports.redraw = redraw;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/redraw.js?");

/***/ }),

/***/ "./dist/resizeCanvas.js":
/*!******************************!*\
  !*** ./dist/resizeCanvas.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.resizeCanvas = void 0;\r\nvar resizeCanvas = function (canvas) {\r\n    canvas.height = window.innerHeight - 4;\r\n    canvas.width = window.innerWidth;\r\n};\r\nexports.resizeCanvas = resizeCanvas;\r\n\n\n//# sourceURL=webpack://webpack-demo/./dist/resizeCanvas.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;