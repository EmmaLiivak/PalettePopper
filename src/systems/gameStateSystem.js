import paddleEntity from '../entities/paddleEntity.js'
import movementSystem from './movementSystem.js'
import inputSystem from './inputSystem.js';
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
    this.gameEndSystem = new GameEndSystem();
  }

  update() {
    if (!this.isGameRunning) return;
    
    if (this.gameEndSystem.isGameOver()) this.isGameRunning = false;
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
    ecsSystem.addSystem(movementSystem);
    levelManagementSystem.resetLevel();
    this.startGame();
  }

  stopGame() {
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }
}

class GameEndSystem extends System {
  constructor() {
    super();
    this.pauseMenu = document.querySelector('.pause-menu');
    this.nextLevelButton = document.getElementById('next-level-button');
    this.resumeButton = document.getElementById('resume-button');
    this.restartButton = document.getElementById('restart-button');
    this.pauseMessage = document.getElementById('pause-message');
  }

  isGameOver() {
    if (gameManagerEntity.lives.lives <= 0) {
      this.endGame(false); // All lives lost, game lost
      return true;
    }

    if (!ecsSystem.entities.some(entity => entity.name === 'brick')) {
      this.endGame(true); // All bricks removed, game won
      return true;
    }

    return false;
  }

  endGame(isWin) {
    this.pauseMenu.classList.remove('hidden');
    ecsSystem.removeSystem(movementSystem);
    inputSystem.removeComponent(paddleEntity);

    if (isWin) {
      this.nextLevelButton.classList.remove('hidden');
      this.resumeButton.classList.add('hidden');
      this.pauseMessage.innerText = 'Game Won!';
    } else {
      this.resumeButton.classList.add('hidden');
      this.nextLevelButton.classList.add('hidden');
      this.pauseMessage.innerText = 'Game Lost!';
    }
  }
}

const gameStateSystem = new GameStateSystem();
ecsSystem.addSystem(gameStateSystem);

export default gameStateSystem;