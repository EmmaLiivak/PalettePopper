import Entity from './entity.js';
import { PositionComponent, VelocityComponent, RenderComponent, CollisionComponent, DimensionComponent, KeyboardInputComponent } from './components.js';
import { MovementSystem, RenderSystem, WallCollisionSystem, KeyboardInputSystem } from './systems.js';

const game = document.querySelector('.gameContainer');

// Game dimensions
const gameWidth = game.offsetWidth;
const gameHeight = game.offsetHeight;

const ball = new Entity();
ball.attachComponents(
  new PositionComponent(0, 0),
  new DimensionComponent(window.innerWidth * 0.01, window.innerWidth * 0.01),
  new VelocityComponent(2, -2),
  new RenderComponent('ball'),
  new CollisionComponent('ball')
);

const paddle = new Entity();
paddle.attachComponents(
  new PositionComponent(gameHeight, gameWidth / 2),
  new DimensionComponent(gameHeight * 0.02, gameWidth * 0.1),
  new RenderComponent('paddle'),
  new CollisionComponent('paddle'),
  new KeyboardInputComponent()
)

const ballHTML = document.querySelector('.ball');
const paddleHTML = document.querySelector('.paddle')

const movementSystem = new MovementSystem(ball);
const ballRenderSystem = new RenderSystem(ball, ballHTML);
const paddleRenderSystem = new RenderSystem(paddle, paddleHTML);
const wallCollisionSystem = new WallCollisionSystem(ball, gameWidth, gameHeight);
const keyboardInputSystem = new KeyboardInputSystem(paddle);

// Main game loop
function gameLoop() {
  // Update the movement system
  movementSystem.update();

  // Update collision system
  wallCollisionSystem.update();

  keyboardInputSystem.update();

  // Render the ball using the render system
  ballRenderSystem.update();
  paddleRenderSystem.update();

  // Request the next animation frame
  requestAnimationFrame(gameLoop)
}

// Start the game loop
gameLoop();