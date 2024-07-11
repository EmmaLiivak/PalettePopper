import colors from "./colorConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";
import { PositionComponent, SizeComponent } from "../components.js";

export let gameContainer = {
  element: document.querySelector('.game-container'),
  get width() {
    return this.element.offsetWidth;
  },
  get height() {
    return this.element.offsetHeight;
  },
};

const referenceSize = Math.max(gameContainer.width, gameContainer.height);

const paddleWidth = referenceSize * 0.15;
const paddleHeight = referenceSize * 0.02
const numPaddleSections = 9;
const sectionWidth = paddleWidth / numPaddleSections;

export const paddleConfig = {
	get startX() {
    return gameContainer.width / 2 - this.width / 2;
  },
  get startY() {
    return gameContainer.height - this.height - 1;
  },
	startDX: 0,
	startDY: 0,
	defaultDX: 4,
	width: paddleWidth,
	height: paddleHeight,
	initialDeceleration: 2,
	decelerationFactor: 0.5,
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

const ballRadius = referenceSize * 0.015;

export const ballConfig = {
  get startX() {
    return paddleConfig.startX + (paddleConfig.width / 2) - (this.width / 2);
  },
  get startY() {
    return paddleConfig.startY - (this.height) - 0.5;
  },
	startDX: 0,
	startDY: 0,
	defaultDX: 0,
	defaultDY: 4,
	desiredSpeed: 4,
	width: ballRadius,
	height: ballRadius,
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

function updateEntitySizeAndPosition() {
	ecsSystem.entities.forEach(entity => {
		if (entity.hasComponent(SizeComponent) && entity.hasComponent(PositionComponent)) {

			if (['topWall', 'bottomWall', 'leftWall', 'rightWall'].includes(entity.name)) {
				updateWallDimensions(entity);
				return;
			}

			const rect = entity.element.getBoundingClientRect();
			const sizeComponent = entity.getComponent(SizeComponent);
			const positionComponent = entity.getComponent(PositionComponent);

			sizeComponent.width = rect.width;
			sizeComponent.height = rect.height;

			const gameContainerRect = gameContainer.element.getBoundingClientRect();
			positionComponent.x = rect.left - gameContainerRect.left;
      positionComponent.y = rect.top - gameContainerRect.top;
		}
	});
}

function updateWallDimensions(wallEntity) {
  const sizeComponent = wallEntity.getComponent(SizeComponent);
  const positionComponent = wallEntity.getComponent(PositionComponent);

	switch (wallEntity.name) {
		case 'topWall':
			Object.assign(sizeComponent, { width: gameContainer.width, height: 0 });
			Object.assign(positionComponent, { x: 0, y: 0 });
			break;
		case 'bottomWall':
			Object.assign(sizeComponent, { width: gameContainer.width, height: 0 });
			Object.assign(positionComponent, { x: 0, y: gameContainer.height });
			break;
		case 'leftWall':
			Object.assign(sizeComponent, { width: 0, height: gameContainer.height });
			Object.assign(positionComponent, { x: 0, y: 0 });
			break;
		case 'rightWall':
			Object.assign(sizeComponent, { width: 0, height: gameContainer.height });
			Object.assign(positionComponent, { x: gameContainer.width, y: 0 });
			break;
		default:
			console.error('Unknown wall type');
  }
}

function debounce(func, delay) {
  let timeoutID;

  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

window.addEventListener('resize', debounce(() => {
	updateEntitySizeAndPosition();
}, 300));