import gameStateSystem from '../systems/gameStateSystem.js'
import Menu from './menuTemplate.js';
import mainMenu from './mainMenu.js';

class PauseMenu extends Menu {
  constructor() {
    super('.pause-menu');
    this.resumeButton = this.menuElement.querySelector('#resume-button');
    this.restartButton = this.menuElement.querySelector('#restart-button');
    this.mainMenuButton = this.menuElement.querySelector('#main-menu-button');
    this.nextLevelButton = this.menuElement.querySelector('#next-level-button');
    this.pauseMessage = this.menuElement.querySelector('#pause-message');

    this.resumeButton.addEventListener('click', () => {
      this.hide();
      gameStateSystem.resumeGame();
    });

    this.restartButton.addEventListener('click', () => {
      this.hide();
      gameStateSystem.restartLevel();
    });

    this.mainMenuButton.addEventListener('click', () => {
      this.hide();
      mainMenu.show();
    });
  }
}

const pauseMenu = new PauseMenu();
export default pauseMenu;