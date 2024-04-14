import { MovementSystem } from './systems/movementSystem.js'
import { RenderingSystem } from './systems/renderingSystem.js';
import CollisionSystem from './systems/collisionSystem.js';
import { UpdateTime } from './utils.js';
import { entities } from './entities/entityTemplate.js';
import { ballEntity } from './entities/ballEntity.js';
import { paddleEntity } from './entities/paddleEntity.js';
import InputSystem from './systems/inputSystem.js';
import { topWallEntity, bottomWallEntity, leftWallEntity, rightWallEntity } from './entities/wallEntity.js'
import { gameStateEntity } from './entities/gameStateEntity.js';
import GameSystem from './systems/gameSystem.js';

// Create the systems
export const movementSystem = new MovementSystem();
movementSystem.addComponent(ballEntity);
movementSystem.addComponent(paddleEntity);

const collisionSystem = new CollisionSystem(entities);
export const inputSystem = new InputSystem(entities);
inputSystem.startListening();

export const renderingSystem = new RenderingSystem({
  'ball': document.querySelector('.ball'),
  'paddle': document.querySelector('.paddle')
});
renderingSystem.addComponent(ballEntity);
renderingSystem.addComponent(paddleEntity);

export const gameSystem = new GameSystem();

// Main game loop
export function gameLoop() {
  if (gameSystem.isGameRunning) {
    inputSystem.update();
    movementSystem.update();
    collisionSystem.update();
    renderingSystem.update();

    UpdateTime();

    requestAnimationFrame(gameLoop);
  } else {
    inputSystem.update();

    requestAnimationFrame(gameLoop);
  }
}

window.addEventListener('load', () => {
  renderingSystem.update();
  const startOption = confirm('Start game?');
  if (startOption) {
    gameSystem.startGame();
  }
})