import paddleEntity from '../entities/paddleEntity.js'
import { gameLoop } from '../index.js';
import movementSystem from './movementSystem.js'
import inputSystem from './inputSystem.js';
import ecsSystem from './ECSSystem.js';
import System from "./systemTemplate.js";
import gameStateEntity from '../entities/gameStateEntity.js';
import { LivesComponent } from '../components.js';

const pauseMenu = document.querySelector('.pause-menu');

class GameStateSystem extends System {
  constructor() {
    super();
    this.isGameRunning = false;
    this.lastUpdateTime = null;
  }

  update() {
    if (!this.isGameRunning) return;
    this.checkGameEnd();
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

  checkGameEnd() {
    const livesComponent = gameStateEntity.getComponent(LivesComponent);
    if (livesComponent.lives <= 0) {
      this.endGame(false); // Game lost
    }

    if (!ecsSystem.entities.some(entity => entity.name === 'brick')) {
      this.endGame(true); // All bricks removed, game won
    }
  }

  endGame(isWin) {
    this.pauseGame();

    if (isWin) {
      console.log('Game Won!');
    } else {
      console.log('Game Over!');
    }
  }
}

const gameStateSystem = new GameStateSystem();
ecsSystem.addSystem(gameStateSystem);

export default gameStateSystem;