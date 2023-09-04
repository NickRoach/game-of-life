let lineLength = window.innerWidth / 3
let start: number
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let lastFrame = 0
let row = 0
const backgroundColor = "#000000"
const cellColor = "turquoise"
let direction = "down"
const showGrid = false
const boxSize = 3
let boxes: boolean[][] = [[], []]

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
		ctx.lineTo(i, canvas.height)
		ctx.stroke()
	}

	// draw horizontal lines
	for (let i = 0; i < canvas.height; i += boxSize) {
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
	const yBoxes = Math.floor(canvas.height / boxSize)
	for (let x = 0; x <= xBoxes; x++) {
		boxes[x] = []
		for (let y = 0; y <= yBoxes; y++) {
			boxes[x][y] = false
			if (Math.random() > 0.9) boxes[x][y] = true
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
}

const calculateNewBoxes = () => {
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

const renderThings = (timeStamp: number) => {
	if (start === undefined) {
		start = timeStamp
	}

	if (timeStamp - lastFrame > 50) {
		lastFrame = timeStamp
		clear()
		renderGrid()
		calculateNewBoxes()
		drawBoxes()
	}

	window.requestAnimationFrame(renderThings)
}

const handleClick = (event: PointerEvent) => {
	setBoxes()
	// console.log(event)
	// calculateNewBoxes()
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
