import ecsSystem from './ECSSystem.js';
import System from "./systemTemplate.js";
import gameManagerEntity from '../entities/gameManagerEntity.js';
import levelManagementSystem from './levelManagementSystem.js';
import pauseMenu from '../interface/pauseMenu.js';

class GameStateSystem extends System {
  constructor() {
    super();
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  update() {
    if (!this.isGameRunning) return;
    
    if (this.isGameOver()) this.stopGame();
  }

  startGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
  }

  pauseGame() {
    this.isGameRunning = false;
    pauseMenu.show();
  }

  resumeGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    pauseMenu.hide();
  }

  restartLevel() {
    this.stopGame();
    levelManagementSystem.resetLevel();
    this.startGame();
  }

  stopGame() {
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  isGameOver() {
    if (gameManagerEntity.lives.lives <= 0) {
      pauseMenu.show(true, false); // All lives lost, game lost
      return true;
    }

    if (!ecsSystem.entities.some(entity => entity.name === 'brick')) {
      pauseMenu.show(true, true); // All bricks removed, game won
      return true;
    }

    return false;
  }
}

const gameStateSystem = new GameStateSystem();
ecsSystem.addSystem(gameStateSystem);

export default gameStateSystem;