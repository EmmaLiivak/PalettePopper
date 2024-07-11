import { gameManagerEntity } from './entities/index.js'
import { ecsSystem, gameStateSystem} from './systems/index.js'
import './systems/index.js';

// Main game loop
function gameLoop() {
  if (gameStateSystem.isGameRunning) {
    ecsSystem.update();
    gameManagerEntity.updateTimeDisplay();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();