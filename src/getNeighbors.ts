import { Boxes } from "."

export const getNeighbors = (boxes: Boxes, x: number, y: number) => {
	const getU = (y: number) => {
		if (y === 0) return boxes[0].length - 1
		return y - 1
	}

	const getD = (y: number) => {
		if (y === boxes[0].length - 1) return 0
		return y + 1
	}

	const getL = (x: number) => {
		if (x === 0) return boxes.length - 1
		return x - 1
	}

	const getR = (x: number) => {
		if (x === boxes.length - 1) return 0
		return x + 1
	}

	let counter = 0

	// left up
	if (boxes[getL(x)][getU(y)]) counter++
	// left middle
	if (boxes[getL(x)][y]) counter++
	// left down
	if (boxes[getL(x)][getD(y)]) counter++
	// middle up
	if (boxes[x][getU(y)]) counter++
	// middle down
	if (boxes[x][getD(y)]) counter++
	// right up
	if (boxes[getR(x)][getU(y)]) counter++
	// right middle
	if (boxes[getR(x)][y]) counter++
	// right bottom
	if (boxes[getR(x)][getD(y)]) counter++

	return counter
}
