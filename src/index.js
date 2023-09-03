"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_1 = __importDefault(require("lodash"));
function component() {
    var element = document.createElement("div");
    // Lodash, now imported by this script
    element.innerHTML = lodash_1["default"].join(["Hello", "webpack"], " ");
    return element;
}
document.body.appendChild(component());
