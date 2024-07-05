import levelManagementSystem from "../systems/levelManagementSystem.js";
import gameStateSystem from '../systems/gameStateSystem.js'
import Menu from "./menuTemplate.js";

class MainMenu extends Menu {
  constructor() {
    super('.main-menu');
    this.playButton = this.menuElement.querySelector('#play-button');
    this.levelDisplay = this.menuElement.querySelector('#level-display');
    this.prevLevelButton = this.menuElement.querySelector('#prev-level');
    this.nextLevelButton = this.menuElement.querySelector('#next-level');

    this.playButton.addEventListener('click', () => {
      console.log('Loading level ' + (levelManagementSystem.currentLevelIndex + 1) + '...');
      levelManagementSystem.loadLevel();
      gameStateSystem.startGame();
      this.hide();
    });

    this.prevLevelButton.addEventListener('click', () => {
      if (levelManagementSystem.currentLevelIndex <= 0) return;
      levelManagementSystem.currentLevelIndex--;
      this.updateLevel();
    });
    
    this.nextLevelButton.addEventListener('click', () => {
      if (levelManagementSystem.currentLevelIndex >= levelManagementSystem.levels.length - 1) return;
      levelManagementSystem.currentLevelIndex++;
      this.updateLevel();
    });

    this.updateLevel();
  }

  updateLevel() {
    this.levelDisplay.textContent = 'Level ' + (levelManagementSystem.currentLevelIndex + 1);
  }
}

const mainMenu = new MainMenu();
export default mainMenu;