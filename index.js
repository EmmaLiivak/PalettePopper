const NUMBER_OF_BRICKS = 60;
const PADDLE_STEP = 10;

const brickContainer = document.querySelector('.brickContainer');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const game = document.querySelector('.game');

const gameWidth = game.offsetWidth;
const gameHeight = game.offsetHeight;
const paddleWidth = paddle.offsetWidth;
const ballDiameter = ball.offsetWidth;
const ballRadius = ballDiameter / 2;
let ballX = gameWidth / 2; // Initial horizontal position
let ballY = ballRadius; // Initial vertical position
let speedX = 3; // Horizontal speed
let speedY = -3; // Vertical speed

function generateBricks(){
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

generateBricks();

function moveBall() {
  updateBallPosition();
  checkWallCollisions();
  checkPaddleCollision();
}

function updateBallPosition() {
  ballX += speedX;
  ballY += speedY;
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

function checkWallCollisions() {
  // Collides with left or right wall
  if (ballX > gameWidth - ballDiameter || ballX < 0) {
    speedX = -speedX; // Reverse horizontal direction
  }
  // collides with top or bottom wall
  if (ballY < 0 || ballY > gameHeight - ballDiameter) {
    speedY = -speedY; // Reverse vertical direction
  }
}

function checkPaddleCollision() {
  if (ballY + ballDiameter >= gameHeight - paddle.offsetHeight &&
    ballX >= paddle.offsetLeft && 
    ballX <= paddle.offsetLeft + paddle.offsetWidth) {
      speedY = -speedY; // Reverse vertical direction
    }
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

document.addEventListener('keydown', handleKeyPress);


function gameLoop() {
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();