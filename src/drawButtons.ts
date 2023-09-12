import {
	Button,
	RenderedButton,
	buttonBarHeight,
	buttonWidth,
	font,
	paused,
	textSize
} from "."

export const drawButtons = (
	buttonHeight: number,
	buttonYMargin: number,
	buttons: Button[],
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) => {
	buttonHeight = buttonBarHeight - buttonYMargin * 2

	const renderedButtons: RenderedButton[] = []

	const buttonTop = canvas.height - buttonYMargin - buttonHeight

	const adjustedTextSize = Math.min(textSize / (700 / canvas.width), textSize)
	const adjustedButtonWidth = Math.min(
		buttonWidth / (1000 / canvas.width),
		buttonWidth
	)
	const adjustedButtonHeight = Math.min(
		buttonHeight / (700 / canvas.width),
		buttonHeight
	)

	const buttonXMargin =
		(canvas.width - buttons.length * adjustedButtonWidth) /
		(buttons.length + 1)

	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i]
		const xStart = buttonXMargin * (i + 1) + adjustedButtonWidth * i
		ctx.beginPath()
		ctx.rect(xStart, buttonTop, adjustedButtonWidth, adjustedButtonHeight)
		ctx.fillStyle = paused
			? button.pausedColor || button.color
			: button.color
		ctx.fill()
		ctx.closePath()

		renderedButtons.push({
			xStart,
			yStart: buttonTop,
			xEnd: xStart + adjustedButtonWidth,
			yEnd: buttonTop + adjustedButtonHeight,
			callback: button.callBack
		})

		ctx.font = `${adjustedTextSize}px ${font}`
		ctx.textAlign = "center"
		ctx.fillStyle = "white"
		ctx.fillText(
			paused ? button.pausedText || button.text : button.text,
			xStart + adjustedButtonWidth / 2,
			buttonTop + adjustedButtonHeight / 2 + textSize / 4
		)
	}

	return renderedButtons
}
