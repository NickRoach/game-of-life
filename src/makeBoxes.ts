import { Boxes, boxSize, buttonBarHeight } from "."

export const makeBoxes = (canvas: HTMLCanvasElement) => {
	const boxes: Boxes = [[]]
	const xBoxes = Math.floor(canvas.width / boxSize) - 1
	const yBoxes = Math.floor((canvas.height - buttonBarHeight) / boxSize) - 1
	for (let x = 0; x <= xBoxes; x++) {
		boxes[x] = []
		for (let y = 0; y <= yBoxes; y++) {
			boxes[x][y] = false
		}
	}
	return boxes
}
