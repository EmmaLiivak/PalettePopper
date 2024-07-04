// Game Container data and configuration
export const gameContainer = document.querySelector('.game-container');
export const gameContainerWidth = gameContainer.offsetWidth;
export const gameContainerHeight = gameContainer.offsetHeight;

export const paddleConfig = {
    startX: gameContainerWidth / 2 - (gameContainerWidth * 0.1 / 2) - 1,
    startY: gameContainerHeight - (gameContainerHeight * 0.02) - 1,
    startDX: 0,
    startDY: 0,
    defaultDX: 3,
    width: gameContainerWidth * 0.15,
    height: gameContainerHeight * 0.02,
    color: 'black',
    type: 'paddle'
};

export const ballConfig = {
    startX: paddleConfig.startX + (paddleConfig.width / 2) - (gameContainerWidth * 0.01 / 2),
    startY: paddleConfig.startY - (gameContainerWidth * 0.01),
    startDX: 0,
    startDY: 0,
    defaultDX: 2,
    defaultDY: 2,
    width: gameContainerWidth * 0.01,
    height: gameContainerWidth * 0.01,
    color: 'red',
    type: 'ball'
};