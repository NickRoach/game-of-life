/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var lineLength = window.innerWidth;\r\nvar start;\r\nvar canvas, ctx;\r\nvar lastFrame = 0;\r\nvar row = 0;\r\nvar backgroundColor = \"#222222\";\r\nvar direction = \"down\";\r\nvar resizeCanvas = function () {\r\n    canvas.height = window.innerHeight - 4;\r\n    canvas.width = window.innerWidth;\r\n};\r\nvar clear = function () {\r\n    ctx.beginPath();\r\n    ctx.rect(0, 0, canvas.width, canvas.height);\r\n    ctx.fillStyle = backgroundColor;\r\n    ctx.fill();\r\n};\r\nvar renderThings = function (timeStamp) {\r\n    if (start === undefined) {\r\n        start = timeStamp;\r\n    }\r\n    if (timeStamp - lastFrame > 1) {\r\n        lastFrame = timeStamp;\r\n        if (row >= canvas.height)\r\n            direction = \"up\";\r\n        else if (row <= 0)\r\n            direction = \"down\";\r\n        if (direction === \"up\")\r\n            row -= 1;\r\n        if (direction === \"down\")\r\n            row += 1;\r\n    }\r\n    clear();\r\n    ctx.beginPath();\r\n    ctx.moveTo(canvas.width / 2 - lineLength / 2, row);\r\n    ctx.lineTo(canvas.width / 2 + lineLength / 2, row);\r\n    ctx.strokeStyle = \"turquoise\";\r\n    ctx.stroke();\r\n    window.requestAnimationFrame(renderThings);\r\n};\r\nvar initialize = function () {\r\n    canvas = document.createElement(\"canvas\");\r\n    var body = document.getElementById(\"body\");\r\n    body.style.margin = \"0px\";\r\n    body.style.backgroundColor = backgroundColor;\r\n    resizeCanvas();\r\n    canvas.id = \"canvas\";\r\n    body.appendChild(canvas);\r\n    ctx = canvas.getContext(\"2d\");\r\n    window.requestAnimationFrame(renderThings);\r\n};\r\ndocument.body.onload = initialize;\r\nwindow.onresize = resizeCanvas;\r\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;