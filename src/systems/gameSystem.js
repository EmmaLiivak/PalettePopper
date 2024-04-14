import { ballEntity } from '../entities/ballEntity.js';
import { paddleEntity } from '../entities/paddleEntity.js';
import { gameLoop, movementSystem, inputSystem } from '../index.js';
import System from "./systemTemplate.js";

export default class GameSystem extends System {
  constructor(levels) {
    super();
    //this.levels = levels;
    //this.currentLevelIndex = 0;
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  renderLevel(levelIndex = 0) {
    // Render level (bricks, ball, paddle)
    // Show menu
  }

  startGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    gameLoop();
    // Hide menu
  }

  pauseGame() {
    console.log('pause game');
    this.isGameRunning = false;
    movementSystem.removeComponent(ballEntity);
    inputSystem.removeComponent(paddleEntity);
    // Show menu
  }

  resumeGame() {
    console.log('resume game');
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    movementSystem.addComponent(ballEntity);
    inputSystem.addComponent(paddleEntity);
    // Hide menu
  }
}