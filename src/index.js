import { updateTime } from './interface/timeDisplay.js';
import { ballEntity, bricks, gameStateEntity, paddleEntity, walls} from './entities/index.js'
import { collisionSystem, ecsSystem, gameStateSystem, inputSystem, movementSystem, renderingSystem } from './systems/index.js'
import './systems/index.js';

// Main game loop
function gameLoop() {
  if (gameStateSystem.isGameRunning) {
    ecsSystem.update();
    updateTime();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();