import { Boxes, boxSize, buttonBarHeight } from "."

export const drawGrid = (boxes: Boxes, ctx: CanvasRenderingContext2D) => {
	ctx.lineWidth = 0.5
	ctx.strokeStyle = "#999999"

	// draw vertical lines
	for (let i = 0; i <= boxes.length; i++) {
		ctx.beginPath()
		ctx.moveTo(i * boxSize, 0)
		ctx.lineTo(i * boxSize, boxes[0].length * boxSize)
		ctx.stroke()
		ctx.closePath()
	}

	// draw horizontal lines
	for (let i = 0; i <= boxes[0].length; i++) {
		ctx.beginPath()
		ctx.moveTo(0, i * boxSize)
		ctx.lineTo(boxes.length * boxSize, i * boxSize)
		ctx.stroke()
		ctx.closePath()
	}
}
