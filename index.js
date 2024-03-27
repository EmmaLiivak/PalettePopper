const NUMBER_OF_BRICKS = 60;
const PADDLE_STEP = 10;

const brickContainer = document.querySelector('.brickContainer');
const paddle = document.querySelector('.paddle');
const gameWidth = document.querySelector('.game').offsetWidth - PADDLE_STEP;
const paddleWidth = paddle.offsetWidth;

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
  if (paddlePositionX + paddleWidth < gameWidth) {
    paddle.style.left = (paddlePositionX + PADDLE_STEP) + 'px';
  }
}

document.addEventListener('keydown', handleKeyPress);