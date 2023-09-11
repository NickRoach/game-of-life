import { Button, RenderedButton, buttonBarHeight, paused } from "."

export const drawButtons = (
	buttonHeight: number,
	buttonXMargin: number,
	buttonYMargin: number,
	buttons: Button[],
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) => {
	buttonHeight = buttonBarHeight - buttonYMargin * 2

	const renderedButtons: RenderedButton[] = []

	const buttonTop = canvas.height - buttonYMargin - buttonHeight
	const buttonWidth =
		(canvas.width - buttonXMargin * (buttons.length + 1)) / buttons.length

	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i]
		const xStart = buttonXMargin * (i + 1) + buttonWidth * i
		ctx.beginPath()
		ctx.rect(xStart, buttonTop, buttonWidth, buttonHeight)
		ctx.fillStyle = paused
			? button.pausedColor || button.color
			: button.color
		ctx.fill()
		ctx.closePath()

		renderedButtons.push({
			xStart,
			yStart: buttonTop,
			xEnd: xStart + buttonWidth,
			yEnd: buttonTop + buttonHeight,
			callback: button.callBack
		})

		const textSize = 30
		ctx.font = `${textSize}px Courier`
		ctx.textAlign = "center"
		ctx.fillStyle = "white"
		ctx.fillText(
			paused ? button.pausedText || button.text : button.text,
			xStart + buttonWidth / 2,
			buttonTop + buttonHeight / 2 + textSize / 4
		)
	}

	return renderedButtons
}
