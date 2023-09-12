import { Boxes, cellColor, boxSize } from "."

export const drawBoxes = (boxes: Boxes, ctx: CanvasRenderingContext2D) => {
	ctx.fillStyle = cellColor
	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[x].length; y++) {
			if (boxes[x][y] === true) {
				ctx.beginPath()
				ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize)
				ctx.closePath()
			}
		}
	}
}
