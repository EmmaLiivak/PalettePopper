import Entity from './entity.js';
import { Position, Velocity, Render } from './components.js';
import { MovementSystem, RenderSystem } from './systems.js';

// Create a new entity
const ball = new Entity();

// Create and attach components to the entity
const position = new Position(0, 0);
const velocity = new Velocity(2, -2);
const render = new Render('ball');

ball.attachComponents(position, velocity, render);

const ballHTML = document.querySelector('.ball')

const movementSystem = new MovementSystem(ball);
const renderSystem = new RenderSystem(ball, ballHTML);

// Main game loop
function gameLoop() {
  // Update the movement system
  movementSystem.update();

  // Render the ball using the render system
  renderSystem.update();

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();