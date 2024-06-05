import paddleEntity from '../entities/paddleEntity.js'
import { gameLoop } from '../index.js';
import movementSystem from './movementSystem.js'
import inputSystem from './inputSystem.js';
import ecsSystem from './ECSSystem.js';
import System from "./systemTemplate.js";
import gameStateEntity from '../entities/gameStateEntity.js';
import { LivesComponent } from '../components.js';

class GameStateSystem extends System {
  constructor() {
    super();
    this.isGameRunning = false;
    this.lastUpdateTime = null;
    this.pauseSystem = new PauseSystem();
    this.gameEndSystem = new GameEndSystem();
  }

  update() {
    if (!this.isGameRunning) return;
    
    if (this.gameEndSystem.isGameOver()) {
      this.isGameRunning = false;
    }
  }

  startGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    gameLoop();
  }

  pauseGame() {
    this.isGameRunning = false;
    this.pauseSystem.pauseGame();
  }

  resumeGame() {
    this.isGameRunning = true;
    this.lastUpdateTime = performance.now();
    this.pauseSystem.resumeGame();
  }
}

class PauseSystem extends System {
  constructor() {
    super();
    this.pauseMenu = document.querySelector('.pause-menu');
    this.nextLevelButton = document.getElementById('next-level-button')
  }

  pauseGame() {
    this.nextLevelButton.classList.add('hidden');
    this.pauseMenu.classList.remove('hidden');
    ecsSystem.removeSystem(movementSystem);
    inputSystem.removeComponent(paddleEntity);
  }

  resumeGame() {
    this.pauseMenu.classList.add('hidden');
    ecsSystem.addSystem(movementSystem);
    inputSystem.addComponent(paddleEntity);
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
    const livesComponent = gameStateEntity.getComponent(LivesComponent);
    if (livesComponent.lives <= 0) {
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
      this.pauseMessage.innerText = 'Game Lost!';
    }
  }
}

const gameStateSystem = new GameStateSystem();
ecsSystem.addSystem(gameStateSystem);

export default gameStateSystem;