let lineLength = window.innerWidth
let start: number
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D
let lastFrame = 0
let row = 0
const backgroundColor = "#222222"
let direction = "down"

const resizeCanvas = () => {
	canvas.height = window.innerHeight - 4
	canvas.width = window.innerWidth
}

const clear = () => {
	ctx.beginPath()
	ctx.rect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = backgroundColor
	ctx.fill()
}

const renderThings = (timeStamp: number) => {
	if (start === undefined) {
		start = timeStamp
	}

	if (timeStamp - lastFrame > 1) {
		lastFrame = timeStamp
		if (row >= canvas.height) direction = "up"
		else if (row <= 0) direction = "down"
		if (direction === "up") row -= 1
		if (direction === "down") row += 1
	}

	clear()

	ctx.beginPath()
	ctx.moveTo(canvas.width / 2 - lineLength / 2, row)
	ctx.lineTo(canvas.width / 2 + lineLength / 2, row)
	ctx.strokeStyle = "turquoise"
	ctx.stroke()
	window.requestAnimationFrame(renderThings)
}

const initialize = () => {
	canvas = document.createElement("canvas")
	const body = document.getElementById("body")
	body.style.margin = "0px"
	body.style.backgroundColor = backgroundColor
	resizeCanvas()
	canvas.id = "canvas"
	body.appendChild(canvas)
	ctx = canvas.getContext("2d")
	window.requestAnimationFrame(renderThings)
}

document.body.onload = initialize
window.onresize = resizeCanvas
