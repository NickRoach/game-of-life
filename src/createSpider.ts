import { Boxes } from "."

const spiderWidth = 31
const spiderHeight = 7
const spiderLayout = [
	[
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
		1, 0, 0, 0, 0, 0, 0
	],
	[
		0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1,
		1, 0, 1, 1, 0, 0, 0
	],
	[
		0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0,
		1, 0, 1, 1, 0, 1, 0
	],
	[
		1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		1, 0, 1, 0, 0, 0, 1
	],
	[
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		1, 1, 1, 0, 0, 0, 0
	],
	[
		0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 0, 1, 0, 0, 1, 0
	],
	[
		0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 0, 0, 0
	]
]

export const createSpider = (boxes: Boxes) => {
	const leftX = Math.floor(boxes.length / 2 - spiderWidth / 2)
	const topY = Math.floor(boxes[0].length / 2 - spiderHeight / 2)
	for (let i = 0; i < spiderLayout.length; i++) {
		for (let j = 0; j < spiderLayout[0].length; j++) {
			boxes[leftX + j][topY + i] = !!spiderLayout[i][j]
		}
	}
}
