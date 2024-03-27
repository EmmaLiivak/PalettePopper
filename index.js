// Constants
const NUMBER_OF_BRICKS = 60;
const PADDLE_STEP = 10;

// Elements
const brickContainer = document.querySelector('.brickContainer');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const game = document.querySelector('.game');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const livesDisplay = document.querySelector('.lives');
const fpsDisplay = document.querySelector('.fps');

// Game dimensions
const gameWidth = game.offsetWidth;
const gameHeight = game.offsetHeight;

// Paddle dimensions
const paddleWidth = paddle.offsetWidth;
const paddleHeight = paddle.offsetHeight;

// Ball dimensions
const ballDiameter = ball.offsetWidth;
const ballRadius = ballDiameter / 2;
let ballX = paddle.offsetLeft + paddleWidth / 2 - ballRadius;
let ballY = gameHeight - paddleHeight - ballDiameter;
let speedX = 3; // Horizontal speed
let speedY = -3; // Vertical speed

// Game metrics variables
let lastUpdateTime = null;
let totalElapsedTime = 0;
let score = 0;
let lives = 3;
const times = [];
let fps;

// Generate bricks
generateBricks();
const bricks = document.querySelectorAll('.brick');

// Event listeners
document.addEventListener('keydown', handleKeyPress);

// Start game loop
gameLoop();

function generateBricks() {
  for (let i = 0; i < NUMBER_OF_BRICKS; i++){
    let brick = document.createElement('div');
    brick.classList.add('brick'); 
    let red = Math.floor(Math.random() * 255); 
    let blue = Math.floor(Math.random() * 255); 
    let green = Math.floor(Math.random() * 255); 
    brick.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`; 
    brickContainer.appendChild(brick); 
  }
}

function gameLoop() {
  moveBall();
  updateFPS();
  requestAnimationFrame(gameLoop);
}

function moveBall() {
  updateBallPosition();
  checkWallCollisions();
  checkPaddleCollision();
  checkBrickCollisions();
}

function updateBallPosition() {
  ballX += speedX;
  ballY += speedY;
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

function checkWallCollisions() {
  if (ballX > gameWidth - ballDiameter || ballX < 0) {
    speedX = -speedX; // Reverse horizontal direction
  }
  if (ballY < 0 || ballY > gameHeight - ballDiameter) {
    speedY = -speedY; // Reverse vertical direction
  }
}

function checkPaddleCollision() {
  if (ballY + ballDiameter > gameHeight - paddle.offsetHeight &&
    ballX >= paddle.offsetLeft && 
    ballX <= paddle.offsetLeft + paddle.offsetWidth) {
    speedY = -speedY; // Reverse vertical direction
  }
}

function checkBrickCollisions() {
  bricks.forEach(brick => {
    if (brick.classList.contains('removed')) {
      return; // Skip brick if already removed
    }
    if (isCollisionWithBrick(brick)) {
      handleBrickCollision(brick);
    }
  });
}

function isCollisionWithBrick(brick) {
  const brickRect = brick.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  
  return (
    ballRect.right >= brickRect.left && 
    ballRect.left <= brickRect.right &&
    ballRect.bottom >= brickRect.top &&
    ballRect.top <= brickRect.bottom
  );
}

function handleBrickCollision(brick) {
  // Remove the brick from the game
  brick.classList.add('removed');

  // Update score
  score += 100
  scoreDisplay.textContent = 'Score: ' + score;
  
  const brickRect = brick.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  
  const ballCenterX = ballRect.left + ballRect.width / 2;
  const ballCenterY = ballRect.top + ballRect.height / 2;
  const brickCenterX = brickRect.left + brickRect.width / 2;
  const brickCenterY = brickRect.top + brickRect.height / 2;
  
  const dx = ballCenterX - brickCenterX;
  const dy = ballCenterY - brickCenterY;
  
  Math.abs(dx) > Math.abs(dy) ? speedY = -speedY : speedX = -speedX;
}

function handleKeyPress(event) {
  switch(event.key) {
    case 'ArrowLeft':
      movePaddleLeft();
      break;
    case 'ArrowRight':
      movePaddleRight();
      break;
    default:
      break;
  }
}

function movePaddleLeft() {
  const paddlePositionX = paddle.offsetLeft;
  if (paddlePositionX > 0) {
    paddle.style.left = (paddlePositionX - PADDLE_STEP) + 'px';
  }
}

function movePaddleRight() {
  const paddlePositionX = paddle.offsetLeft;
  if (paddlePositionX + paddleWidth < (gameWidth - PADDLE_STEP)) {
    paddle.style.left = (paddlePositionX + PADDLE_STEP) + 'px';
  }
}

function updateFPS() {
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  fpsDisplay.textContent = 'FPS: ' + fps;
}
