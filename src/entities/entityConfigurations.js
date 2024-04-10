// Game Container data and configuration
const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

// Initial ball configuration
export const ballConfig = {
    startX: containerWidth / 2,
    startY: containerWidth / 2,
    startDX: 0,
    startDY: 0,
    DX: 3,
    DY: 3,
    width: containerWidth * 0.01,
    height: containerWidth * 0.01,
    color: 'red'
};

// Initial paddle configuration
export const paddleConfig = {
    startX: containerWidth * 0.45,
    startY: containerHeight - (containerHeight * 0.02),
    startDX: 0,
    startDY: 0,
    DX: 3,
    width: containerWidth * 0.1,
    height: containerHeight * 0.02,
    color: 'black'
};