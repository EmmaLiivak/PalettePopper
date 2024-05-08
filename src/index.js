import { updateTime } from './utils.js';
import { ballEntity, bricks, gameStateEntity, paddleEntity, walls} from './entities/index.js'
import { collisionSystem, ecsSystem, gameStateSystem, inputSystem, movementSystem, renderingSystem } from './systems/index.js'
import './systems/index.js';

// Main game loop
export function gameLoop() {
  ecsSystem.update();

  updateTime();

  requestAnimationFrame(gameLoop);
}