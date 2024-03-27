const brickContainer = document.querySelector('.brickContainer');
const paddle = document.querySelector('.paddle');
const gameWidth = document.querySelector('.game').offsetWidth;
const paddleWidth = paddle.offsetWidth;

const NUMBER_OF_BRICKS = 60;
const PADDLE_STEP = 10;

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

function movePaddle(e) {
  let paddleLeft = paddle.offsetLeft;

  switch(e.key) {
    case 'ArrowLeft':
      if (paddleLeft > 0) {
        paddle.style.left = (paddleLeft - PADDLE_STEP) + 'px';
      }
      break;
    case 'ArrowRight':
      if (paddleLeft + paddleWidth < gameWidth) {
        paddle.style.left = (paddleLeft + PADDLE_STEP) + 'px';
      }
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', movePaddle);