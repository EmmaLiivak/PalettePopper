// Game Container data and configuration
const gameContainer = document.querySelector('.gameContainer');
export const gameContainerWidth = gameContainer.offsetWidth;
export const gameContainerHeight = gameContainer.offsetHeight;

// Initial paddle configuration
export const paddleConfig = {
    startX: gameContainerWidth / 2 - (gameContainerWidth * 0.1 / 2) - 1,
    startY: gameContainerHeight - (gameContainerHeight * 0.02) - 1,
    startDX: 0,
    startDY: 0,
    DX: 3,
    width: gameContainerWidth * 0.1,
    height: gameContainerHeight * 0.02,
    color: 'black'
};

// Initial ball configuration
export const ballConfig = {
    startX: paddleConfig.startX + (paddleConfig.width / 2) - (gameContainerWidth * 0.01 / 2),
    startY: paddleConfig.startY - (gameContainerWidth * 0.01) - 1,
    startDX: 0,
    startDY: 0,
    defaultDX: 2,
    defaultDY: 2,
    width: gameContainerWidth * 0.01,
    height: gameContainerWidth * 0.01,
    color: 'red'
};