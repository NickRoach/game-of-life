import { Boxes } from "."
import { getNeighbors } from "./getNeighbors"

export const calculateNewBoxes = (boxes: Boxes) => {
	let newBoxes: Boxes = [[]]

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

	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[0].length; y++) {
			boxes[x][y] = newBoxes[x][y]
		}
	}
}
