let start: number
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let lastFrame = 0
let row = 0
const backgroundColor = "#000000"
const cellColor = "#03A062"
let direction = "down"
const showGrid = true
const boxSize = 10
const frameCadence = 100
let paused = true
let boxes: boolean[][] = [[], []]
const buttonBarHeight = 69
let buttonWidth: number
let buttonHeight: number
let startPause: {
	xStart: number
	yStart: number
}

// start/pause
// reset
// faster
// slower
// step forward

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

const renderGrid = () => {
	if (!showGrid) return
	ctx.lineWidth = 1
	ctx.strokeStyle = "#999999"
	// draw vertical lines
	for (let i = 0; i <= canvas.width; i += boxSize) {
		ctx.beginPath()
		ctx.moveTo(i, 0)
		ctx.lineTo(
			i,
			Math.floor((canvas.height - buttonBarHeight - boxSize) / boxSize) *
				boxSize
		)
		ctx.stroke()
	}

	// draw horizontal lines
	for (let i = 0; i < canvas.height - buttonBarHeight; i += boxSize) {
		ctx.beginPath()
		ctx.moveTo(0, i)
		ctx.lineTo(canvas.width, i)
		ctx.stroke()
	}
}

const getNeighbors = (boxes, x, y) => {
	let counter = 0

	// left top
	if (x > 0 && y > 0 && boxes[x - 1][y - 1]) counter++

	// left middle
	if (x > 0 && y < boxes[x].length - 1 && boxes[x - 1][y]) counter++

	// left bottom
	if (x > 0 && boxes[x - 1][y + 1]) counter++

	// middle top
	if (y > 0 && boxes[x][y - 1]) counter++

	// middle bottom
	if (y < boxes[x].length - 1 && boxes[x][y + 1]) counter++

	// right top
	if (y > 0 && x < boxes.length - 1 && boxes[x + 1][y - 1]) counter++

	// right middle
	if (x < boxes.length - 1 && boxes[x + 1][y]) counter++

	// right bottom
	if (x < boxes.length - 1 && y < boxes[x].length - 1 && boxes[x + 1][y + 1])
		counter++

	return counter
}

const setBoxes = () => {
	const xBoxes = Math.floor(canvas.width / boxSize)
	const yBoxes = Math.floor((canvas.height - buttonBarHeight) / boxSize)
	for (let x = 0; x <= xBoxes; x++) {
		boxes[x] = []
		for (let y = 0; y <= yBoxes; y++) {
			boxes[x][y] = false
		}
	}

	// for (
	// 	let x = Math.floor(xBoxes / 3);
	// 	x <= xBoxes - Math.floor(xBoxes / 3);
	// 	x++
	// ) {
	// 	boxes[x] = []
	// 	for (
	// 		let y = Math.floor(yBoxes / 3);
	// 		y <= yBoxes - Math.floor(yBoxes / 3);
	// 		y++
	// 	) {
	// 		if (Math.random() > 0.5) boxes[x][y] = true
	// 	}
	// }
}

const calculateNewBoxes = () => {
	if (paused) return
	let newBoxes = []

	// fill newBoxes with false
	for (let i = 0; i < boxes.length; i++) {
		newBoxes.push([])
		for (let j = 0; j < boxes[i].length; j++) newBoxes[i].push(false)
	}

	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[x].length; y++) {
			const n = getNeighbors(boxes, x, y)
			if (n < 2 || n > 3) newBoxes[x][y] = false
			if ((boxes[x][y] === true && n === 2) || n === 3)
				newBoxes[x][y] = true
			if (boxes[x][y] === false && n === 3) newBoxes[x][y] = true
		}
	}

	boxes = newBoxes.map((x) => x)
}

const drawBoxes = () => {
	ctx.fillStyle = cellColor
	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[x].length; y++) {
			if (boxes[x][y] === true) {
				ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize)
			}
		}
	}
}

const drawButtons = () => {
	const buttonYMargin = 10
	buttonHeight = buttonBarHeight - buttonYMargin * 2
	const buttonXSpacing = 30
	buttonWidth = canvas.width / 5
	ctx.fillStyle = "green"

	startPause = {
		xStart: buttonXSpacing,
		yStart: canvas.height - buttonBarHeight + buttonYMargin / 2
	}

	ctx.rect(startPause.xStart, startPause.yStart, buttonWidth, buttonHeight)

	ctx.fill()
	const textSize = 30
	ctx.font = `${textSize}px Courier`
	ctx.textAlign = "center"
	ctx.fillStyle = "white"
	ctx.fillText(
		"Go",
		startPause.xStart + buttonWidth / 2,
		startPause.yStart + buttonHeight / 2 + textSize / 4
	)
}

const renderThings = (timeStamp: number) => {
	if (start === undefined) {
		start = timeStamp
	}

	if (timeStamp - lastFrame > frameCadence) {
		lastFrame = timeStamp
		clear()
		renderGrid()
		calculateNewBoxes()
		drawBoxes()
		drawButtons()
	}

	window.requestAnimationFrame(renderThings)
}

const handleClick = (event: PointerEvent) => {
	const { pageX, pageY } = event
	if (pageY > canvas.height - buttonBarHeight) {
		if (
			pageX > startPause.xStart &&
			pageY > startPause.yStart &&
			pageX < startPause.xStart + buttonWidth &&
			pageY < startPause.yStart + buttonHeight
		) {
			paused = !paused
		}
		return
	}
	const boxX = Math.floor(pageX / boxSize)
	const boxY = Math.floor(pageY / boxSize)
	boxes[boxX][boxY] = !boxes[boxX][boxY]
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
	canvas.addEventListener("click", handleClick)
	setBoxes()
	window.requestAnimationFrame(renderThings)
}

document.body.onload = initialize
window.onresize = resizeCanvas
