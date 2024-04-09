import { MovementSystem } from './systems/movementSystem.js'
import { RenderingSystem } from './systems/renderingSystem.js';
import CollisionSystem from './systems/collisionSystem.js';
import { UpdateFPS, UpdateTime } from './utils.js';
import { entities } from './entities/entity.js';
import { ballEntity } from './entities/ballEntity.js';
import { paddleEntity } from './entities/paddleEntity.js';
import InputSystem from './systems/inputSystem.js';
import { topWallEntity, bottomWallEntity, leftWallEntity, rightWallEntity } from './entities/wallEntity.js'

export const movementSystem = new MovementSystem();
movementSystem.addComponent(ballEntity);

const collisionSystem = new CollisionSystem(entities);
const inputSystem = new InputSystem(entities);
inputSystem.startListening();

new RenderingSystem(entities, {
  'ball': document.querySelector('.ball'),
  'paddle': document.querySelector('.paddle')
});

// Main game loop
function gameLoop() {
  inputSystem.update();
  movementSystem.update();
  collisionSystem.update();

  UpdateTime();
  UpdateFPS();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();