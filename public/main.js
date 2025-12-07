import Ant from './Ant.js';
import { colorCount, stateCount } from './params.js';

const cellSize = 1;
const dt = 0;
const antCount = 10;
let batchSize = 1000;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let xCount = Math.floor(canvas.width/cellSize);
let yCount = Math.floor(canvas.height/cellSize);
const dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];

const mod = (x, n) => {
  return ((x % n) + n) % n;
}

const displayState = () => {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for(let i=0; i<yCount; i++) {
		for(let j=0; j<xCount; j++) {
			ctx.fillStyle = state[i][j] ? '#fff' : '#000';
			ctx.fillRect(cellSize*j, cellSize*i, cellSize, cellSize);
		}
	}
}

const antIter = (ant, params) => {
	state[ant.y][ant.x] = params[0];
	ctx.fillStyle = params[1];
	ant.dix = mod(ant.dix+params[2], dirs.length);
	ant.state = params[3];
}

const stateIsEmpty = () => {
	for(const row of state)
		for(const val of state)
			if(val !== 0) return false;
	return true;
}

const iter = (ant) => {
	antIter(ant, ant.params[colorCount*ant.state + state[ant.y][ant.x]]);

	ctx.fillRect(cellSize*ant.x, cellSize*ant.y, cellSize, cellSize);
	ant.x = mod(ant.x + dirs[ant.dix][0], xCount);
	ant.y = mod(ant.y + dirs[ant.dix][1], yCount);
}

let state, ants;
const reset = () => {
	state = Array.from({ length: yCount }, () => Array(xCount).fill(0));
	ants = [];
	for(let i=0; i<antCount; i++)
		ants.push(new Ant(Math.floor((i+1)*xCount/(antCount+1)), Math.floor(yCount/2), 0));


	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
reset();

const loop = () => {
	for(let i=0; i<batchSize; i++)
		for(let j=0; j<antCount; j++)
			iter(ants[j]);
}
setInterval(loop, dt);
loop();

const handleKeyDown = (e) => {
	switch(e.key) {
		case ' ':
			reset();
			break;
	}
}
document.addEventListener('keydown', handleKeyDown);

const handleResize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	xCount = Math.floor(canvas.width/cellSize);
	yCount = Math.floor(canvas.height/cellSize);
	reset();
}
window.addEventListener('resize', handleResize);
