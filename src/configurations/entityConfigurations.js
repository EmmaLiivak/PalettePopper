import colors from "./colorConfigurations.js";

export const gameContainer = {
	element: document.querySelector('.game-container'),
	width: document.querySelector('.game-container').offsetWidth,
	height: document.querySelector('.game-container').offsetHeight,
};

export const paddleConfig = {
	startX: gameContainer.width / 2 - (gameContainer.width * 0.1 / 2) - 1,
	startY: gameContainer.height - (gameContainer.height * 0.02) - 1,
	startDX: 0,
	startDY: 0,
	defaultDX: 4,
	width: gameContainer.width * 0.15,
	height: gameContainer.height * 0.02,
	deceleration: 0.5,
	color: 'black',
	type: 'paddle',
	sections: [
		{ position: (gameContainer.width * 0.15) / 5, dx: -3 },          // Left edge
		{ position: ((gameContainer.width * 0.15) / 5) * 2, dx: -1.5 },  // Left center
		{ position: ((gameContainer.width * 0.15) / 5) * 3, dx: 0 },     // Middle
		{ position: ((gameContainer.width * 0.15) / 5) * 4, dx: 1.5 },   // Right center
		{ position: (gameContainer.width * 0.15), dx: 3 },               // Right edge
	],
	collisionObjects: [
		'leftWall',
		'rightWall',
	],
	keyMapping: {
		'a': 'moveLeft',
		'arrowleft': 'moveLeft',
		'd': 'moveRight',
		'arrowright': 'moveRight',
	},
};

export const ballConfig = {
	startX: paddleConfig.startX + (paddleConfig.width / 2) - (gameContainer.width * 0.01 / 2),
	startY: paddleConfig.startY - (gameContainer.width * 0.01) - 0.5,
	startDX: 0,
	startDY: 0,
	defaultDX: 0,
	defaultDY: 3,
	desiredSpeed: 3,
	width: gameContainer.width * 0.01,
	height: gameContainer.width * 0.01,
	color: 'red',
	type: 'ball',
	collisionObjects: [
		'topWall',
		'bottomWall',
		'leftWall',
		'rightWall',
		'paddle',
		'brick',
	],
};

export const colorPickerConfig = {
	startSelectedColorIndex: 1,
	colors: [
		colors.permanentRose, colors.cadmiumYellow, colors.ceruleanBlue,
	],
	keyMapping: {
		'w': 'colorUp',
		'arrowup': 'colorUp',
		's': 'colorDown',
		'arrowdown': 'colorDown',
	},
};