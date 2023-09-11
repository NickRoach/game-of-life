import { Boxes } from "."

export const randomizeBoxes = (boxConcentration: number, boxes: Boxes) => {
	for (let x = 0; x < boxes.length; x++) {
		for (let y = 0; y < boxes[0].length; y++) {
			if (Math.random() < boxConcentration) {
				boxes[x][y] = true
			} else {
				boxes[x][y] = false
			}
		}
	}
}
