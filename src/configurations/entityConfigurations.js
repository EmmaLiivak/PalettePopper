import colors from "./colorConfigurations.js";

export const gameContainer = {
	element: document.querySelector('.game-container'),
	width: document.querySelector('.game-container').offsetWidth,
	height: document.querySelector('.game-container').offsetHeight,
};

const paddleWidth = gameContainer.width * 0.15;
const numPaddleSections = 9;
const sectionWidth = paddleWidth / numPaddleSections;

export const paddleConfig = {
	startX: gameContainer.width / 2 - (gameContainer.width * 0.1 / 2) - 1,
	startY: gameContainer.height - (gameContainer.height * 0.02) - 1,
	startDX: 0,
	startDY: 0,
	defaultDX: 4,
	width: paddleWidth,
	height: gameContainer.height * 0.02,
	deceleration: 0.5,
	color: 'black',
	type: 'paddle',
	sections: [
		{ start: 0, end: sectionWidth, dx: -4 },
		{ start: sectionWidth, end: sectionWidth * 2, dx: -3 },
		{ start: sectionWidth * 2, end: sectionWidth * 3, dx: -2 },
		{ start: sectionWidth * 3, end: sectionWidth * 4, dx: -1 },
		{ start: sectionWidth * 4, end: sectionWidth * 5, dx: 0 },
		{ start: sectionWidth * 5, end: sectionWidth * 6, dx: 1 },
		{ start: sectionWidth * 6, end: sectionWidth * 7, dx: 2 },
		{ start: sectionWidth * 7, end: sectionWidth * 8, dx: 3 },
		{ start: sectionWidth * 8, end: paddleWidth, dx: 4 },
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
	defaultDY: 4,
	desiredSpeed: 4,
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