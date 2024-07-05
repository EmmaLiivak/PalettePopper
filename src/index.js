import { ballEntity, gameManagerEntity, paddleEntity, walls} from './entities/index.js'
import { collisionSystem, ecsSystem, gameStateSystem, inputSystem, movementSystem, renderingSystem } from './systems/index.js'
import './systems/index.js';

// Main game loop
function gameLoop() {
  if (gameStateSystem.isGameRunning) {
    ecsSystem.update();
    gameManagerEntity.updateTimeDisplay();
  }

  requestAnimationFrame(gameLoop);
}

inputSystem.startListening();
gameLoop();