import paddleEntity from '../entities/paddleEntity.js'
import { gameLoop } from '../index.js';
import movementSystem from './movementSystem.js'
import inputSystem from './inputSystem.js';
import ecsSystem from './ECSSystem.js';
import System from "./systemTemplate.js";

const pauseMenu = document.querySelector('.pause-menu');

class GameStateSystem extends System {
  constructor() {
    super();
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  startGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();

    gameLoop();
  }

  pauseGame() {
    this.isGameRunning = false;
    pauseMenu.style.display = 'flex';

    ecsSystem.removeSystem(movementSystem);
    inputSystem.removeComponent(paddleEntity);
  }

  resumeGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    pauseMenu.style.display = 'none';

    ecsSystem.addSystem(movementSystem);
    inputSystem.addComponent(paddleEntity);
  }
}

const gameStateSystem = new GameStateSystem();
export default gameStateSystem;