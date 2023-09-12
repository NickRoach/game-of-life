// a function must not
// mutate anything that was not passed in
// ideally not mutate anything that is not a DOM element

import { clearBoxes } from "./clearBoxes"
import { randomizeBoxes } from "./randomizeBoxes"
import { drawGrid } from "./drawGrid"
import { clearCanvas } from "./clearCanvas"
import { drawButtons } from "./drawButtons"
import { resizeCanvas } from "./resizeCanvas"
import { makeBoxes } from "./makeBoxes"
import { drawBoxes } from "./drawBoxes"
import { calculateNewBoxes } from "./calculateNewBoxes"
import { redraw } from "./redraw"
import { createSpider } from "./createSpider"

let lastFrame: number = 0
export const backgroundColor: string = "#000000"
export const cellColor: string = "#03A062"
export let showGrid: boolean = true
export const boxSize: number = 8
export const boxConcentration: number = 0.07
export const cadenceStep = 0
export let frameCadence: number = 69
export const buttonBarHeight: number = 69
export const buttonYMargin: number = 15
export const textSize = 17
export const font = "Arial"
export const buttonWidth = 100
export let paused: boolean = true
let clickListenerAdded = false

export type Boxes = [boolean[]]

export type Button = {
	text: string
	pausedText?: string
	color: string
	pausedColor?: string
	callBack: Function
}

export type RenderedButton = {
	xStart: number
	yStart: number
	xEnd: number
	yEnd: number
	callback: Function
}

export type CallbackParams = {
	boxes: Boxes
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	boxConcentration: number
	buttonBarHeight: number
	buttonYMargin: number
	buttons: Button[]
}

const handleStartPause = () => {
	console.log("start/stop")
	paused = !paused
}

const handleDrawSpider = (params: CallbackParams) => {
	createSpider(params.boxes)
	drawBoxes(params.boxes, params.ctx)
}

const handleStep = (params: CallbackParams) => {
	console.log("Step")
	calculateNewBoxes(params.boxes)
	redraw(params)
}

const handleReset = (params: CallbackParams) => {
	clearBoxes(params.boxes)
	paused = true
	redraw(params)
}

const handleRandomize = (params: CallbackParams) => {
	clearBoxes(params.boxes)
	randomizeBoxes(params.boxConcentration, params.boxes)
	redraw(params)
}

const handleFaster = () => {
	frameCadence = frameCadence / 1.2
}

const handleSlower = () => {
	frameCadence = frameCadence * 1.2
}

const handleShowGrid = (params: CallbackParams) => {
	showGrid = !showGrid
	redraw(params)
}

const buttons: Button[] = [
	{
		text: "Pause",
		pausedText: "Go",
		color: "salmon",
		pausedColor: "#03A062",
		callBack: handleStartPause
	},
	{
		text: "Spider",
		color: "blue",
		callBack: handleDrawSpider
	},
	{
		text: "Random",
		color: "#03A062",
		callBack: handleRandomize
	},
	{
		text: "Step",
		color: "#03A062",
		callBack: handleStep
	},
	{
		text: "Reset",
		color: "#03A062",
		callBack: handleReset
	},
	{
		text: "Faster",
		color: "#03A062",
		callBack: handleFaster
	},
	{
		text: "Slower",
		color: "#03A062",
		callBack: handleSlower
	}
]

const handleClick = (
	event: MouseEvent,
	renderedButtons: RenderedButton[],
	boxes: Boxes,
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	buttonBarHeight: number,
	buttonYMargin: number,
	buttons: Button[]
) => {
	const { pageX, pageY } = event

	const callbackParams: CallbackParams = {
		boxes,
		canvas,
		ctx,
		boxConcentration,
		buttonBarHeight,
		buttonYMargin,
		buttons
	}
	const isClickInButton = (button: RenderedButton) => {
		if (
			pageX > button.xStart &&
			pageY > button.yStart &&
			pageX < button.xEnd &&
			pageY < button.yEnd
		) {
			return true
		}
		return false
	}

	for (let button of renderedButtons) {
		if (isClickInButton(button)) {
			button.callback(callbackParams)
			return
		}
	}

	if (pageY > boxes[0].length * boxSize) return
	if (!paused) return
	const boxX = Math.floor(pageX / boxSize)
	const boxY = Math.floor(pageY / boxSize)
	boxes[boxX][boxY] = !boxes[boxX][boxY]
	redraw(callbackParams)
}

const renderLoop = (
	timeStamp: number,
	boxes: Boxes,
	buttons: Button[],
	buttonBarHeight: number,
	buttonYMargin: number,
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) => {
	if (timeStamp - lastFrame > frameCadence) {
		lastFrame = timeStamp
		if (!paused) {
			clearCanvas(canvas, ctx)
			drawGrid(boxes, ctx)
			calculateNewBoxes(boxes)
			drawBoxes(boxes, ctx)
		}
		const renderedButtons = drawButtons(
			buttonBarHeight,
			buttonYMargin,
			buttons,
			canvas,
			ctx
		)
		if (!clickListenerAdded)
			canvas.addEventListener("click", (e) =>
				handleClick(
					e,
					renderedButtons,
					boxes,
					canvas,
					ctx,
					buttonBarHeight,
					buttonYMargin,
					buttons
				)
			)
		clickListenerAdded = true
	}

	window.requestAnimationFrame((timeStamp) =>
		renderLoop(
			timeStamp,
			boxes,
			buttons,
			buttonBarHeight,
			buttonYMargin,
			canvas,
			ctx
		)
	)
}

const initialize = () => {
	const canvas = document.createElement("canvas")
	const body = document.getElementById("body")
	const ctx = canvas.getContext("2d")
	body.style.margin = "0px"
	body.style.backgroundColor = backgroundColor
	resizeCanvas(canvas)
	canvas.id = "canvas"
	body.appendChild(canvas)
	window.onresize = () => resizeCanvas(canvas)
	const boxes = makeBoxes(canvas)
	drawGrid(boxes, ctx)
	window.requestAnimationFrame((timeStamp) =>
		renderLoop(
			timeStamp,
			boxes,
			buttons,
			buttonBarHeight,
			buttonYMargin,
			canvas,
			ctx
		)
	)
}

document.body.onload = initialize
