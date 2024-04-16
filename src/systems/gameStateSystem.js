import paddleEntity from '../entities/paddleEntity.js'
import { gameLoop } from '../index.js';
import movementSystem from './movementSystem.js'
import inputSystem from './inputSystem.js';
import ecsSystem from './ECSSystem.js';
import System from "./systemTemplate.js";

class GameStateSystem extends System {
  constructor(levels) {
    super();
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  startGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();

    gameLoop();
    // Hide menu
  }

  pauseGame() {
    this.isGameRunning = false;

    ecsSystem.removeSystem(movementSystem);
    inputSystem.removeComponent(paddleEntity);
  }

  resumeGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();

    ecsSystem.addSystem(movementSystem);
    inputSystem.addComponent(paddleEntity);
  }
}

const gameStateSystem = new GameStateSystem();
export default gameStateSystem;