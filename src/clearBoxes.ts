import { Boxes } from "."

export const clearBoxes = (boxes: Boxes) => {
	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[0].length; y++) {
			boxes[x][y] = false
		}
	}
}
