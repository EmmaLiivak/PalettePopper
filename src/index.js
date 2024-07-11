import { gameManagerEntity } from './entities/index.js'
import { ecsSystem, gameStateSystem} from './systems/index.js'
import './systems/index.js';

let lastFrameTime = 0;

// Main game loop
function gameLoop(currentTime) {
  // Calculate deltaTime
  const deltaTime = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;

  if (gameStateSystem.isGameRunning) {
    ecsSystem.update(deltaTime);
    gameManagerEntity.updateTimeDisplay();
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);