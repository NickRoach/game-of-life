import { CallbackParams, showGrid } from "."
import { clearCanvas } from "./clearCanvas"
import { drawBoxes } from "./drawBoxes"
import { drawButtons } from "./drawButtons"
import { drawGrid } from "./drawGrid"

export const redraw = (params: CallbackParams) => {
	clearCanvas(params.canvas, params.ctx)
	if (showGrid) drawGrid(params.boxes, params.ctx)
	drawBoxes(params.boxes, params.ctx)
	drawButtons(
		params.buttonBarHeight,
		params.buttonYMargin,
		params.buttons,
		params.canvas,
		params.ctx
	)
}
