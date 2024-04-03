import Entity from './entity.js';
import { PositionComponent, VelocityComponent, RenderComponent, CollisionComponent, DimensionComponent } from './components.js';
import { MovementSystem, RenderSystem, WallCollisionSystem } from './systems.js';

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

const ballHTML = document.querySelector('.ball');

const movementSystem = new MovementSystem(ball);
const ballRenderSystem = new RenderSystem(ball, ballHTML);
const wallCollisionSystem = new WallCollisionSystem(ball, gameWidth, gameHeight);

// Main game loop
function gameLoop() {
  // Update the movement system
  movementSystem.update();

  // Update collision system
  wallCollisionSystem.update();

  // Render the ball using the render system
  ballRenderSystem.update();

  // Request the next animation frame
  requestAnimationFrame(gameLoop)
}

// Start the game loop
gameLoop();