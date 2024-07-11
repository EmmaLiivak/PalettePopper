import { InputComponent, LivesComponent, ScoreComponent } from "../components.js";
import Entity from "./entityTemplate.js";
import gameStateSystem from "../systems/gameStateSystem.js";
import ecsSystem from "../systems/ECSSystem.js";
import levelManagementSystem from "../systems/levelManagementSystem.js";

class GameManagerEntity extends Entity {
  constructor() {
    super('gameState');
    this.livesDisplay = document.querySelector('.lives');
    this.scoreDisplay = document.querySelector('.score');
    this.timeDisplay = document.querySelector('.time');
    this.levelDisplay = document.querySelector('.level');
    this.initialLives = 3;
    this.initialScore = 0;
    this.totalElapsedTime = 0;
    this.initComponents();
    this.setInputCallbacks();
    this.resetDisplays(); // Ensure displays are initialized correctly
  }

  initComponents() {
    this.attachComponents(
      new InputComponent('gameState'),
      new LivesComponent(this.initialLives),
      new ScoreComponent(this.initialScore),
    );

    this.input = this.getComponent(InputComponent);
    this.lives = this.getComponent(LivesComponent);
    this.score = this.getComponent(ScoreComponent);
  }

  setInputCallbacks() {
    this.input.setCallback('p', (keyState) => this.togglePause(keyState));
    this.input.setCallback('r', () => gameStateSystem.restartLevel());
  }

  togglePause(keyState) {
    if (keyState != 'down') return;

    gameStateSystem.isGameRunning ? gameStateSystem.pauseGame() : gameStateSystem.resumeGame();
  }

  updateScoreDisplay(brickValue = 100) {
    this.score.score += brickValue;
    this.scoreDisplay.innerHTML = 'Score: ' + this.score.score;
  }

  updateLivesDisplay() {
    this.lives.lives--;
    this.livesDisplay.innerHTML = 'Lives: ' + '&#10084;'.repeat(this.lives.lives);
  }

  updateTimeDisplay() {
    if (!gameStateSystem.isGameRunning) return;
  
    let currentTime = performance.now();
    let elapsedTime = currentTime - gameStateSystem.lastUpdateTime;
    gameStateSystem.lastUpdateTime = currentTime;
    this.totalElapsedTime += elapsedTime;
  
    let seconds = Math.floor(this.totalElapsedTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
  
    this.timeDisplay.textContent = 'Time: ' + minutes + ':' + seconds;
  }

  updateLevelDisplay() {
    this.levelDisplay.innerHTML = 'Level ' + (levelManagementSystem.currentLevelIndex + 1);
  }

  resetDisplays() {
    // Restart lives display
    this.lives.lives = this.initialLives;
    this.livesDisplay.innerHTML = 'Lives: ' + '&#10084;'.repeat(this.lives.lives);

    // Restart score display
    this.score.score = this.initialScore;
    this.scoreDisplay.innerHTML = 'Score: ' + this.score.score;

    // Restart time display
    this.totalElapsedTime = 0;
    this.timeDisplay.textContent = 'Time: 00:00';
  }
}

const gameManagerEntity = new GameManagerEntity();
ecsSystem.addEntity(gameManagerEntity);

export default gameManagerEntity;