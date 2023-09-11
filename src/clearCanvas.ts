import { backgroundColor } from "."

export const clearCanvas = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) => {
	ctx.fillStyle = backgroundColor
	ctx.beginPath()
	ctx.rect(0, 0, canvas.width, canvas.height)
	ctx.fill()
	ctx.closePath()
}
