import { colorCount, stateCount } from './params.js';

const hue = (h) => {
	h = (h % 360 + 360) % 360;

	const c = 1;
	const hp = h / 60;
	const x = 1 * (1 - Math.abs((hp % 2) - 1));

	let r = 0, g = 0, b = 0;

	if (0 <= hp && hp < 1) [r,g,b] = [1, x, 0];
	else if (1 <= hp && hp < 2) [r,g,b] = [x, 1, 0];
	else if (2 <= hp && hp < 3) [r,g,b] = [0, 1, x];
	else if (3 <= hp && hp < 4) [r,g,b] = [0, x, 1];
	else if (4 <= hp && hp < 5) [r,g,b] = [x, 0, 1];
	else if (5 <= hp && hp < 6) [r,g,b] = [1, 0, x];

	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);

	const toHexChar = n => Math.floor(n / 17).toString(16);

	return `#${toHexChar(r)}${toHexChar(g)}${toHexChar(b)}`;
}

const randomParams = () => {
	return [
		Math.floor(colorCount*Math.random()),
		hue(360/colorCount * Math.floor(colorCount*Math.random())),
		Math.floor(4*Math.random()-1),
		Math.floor(stateCount*Math.random())
	];
}

class Ant {
	constructor(x, y, dix) {
		this.x = x;
		this.y = y;
		this.dix = dix;
		this.state = 0;
		this.params = this.newParams();
	}

	newParams() {
		const params = [];
		for(let i=0; i<colorCount*stateCount; i++)
			params.push(randomParams());
		return params;
	}
}
export default Ant;
