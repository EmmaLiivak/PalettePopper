import gameStateSystem from '../systems/gameStateSystem.js'
import Menu from './menuTemplate.js';
import mainMenu from './mainMenu.js';
import levelManagementSystem from '../systems/levelManagementSystem.js';

class PauseMenu extends Menu {
  constructor() {
    super('.pause-menu');
    this.dynamicButton = this.menuElement.querySelector('#dynamic-button');
    this.restartButton = this.menuElement.querySelector('#restart-button');
    this.mainMenuButton = this.menuElement.querySelector('#main-menu-button');
    this.nextLevelButton = this.menuElement.querySelector('#next-level-button');
    this.pauseMessage = this.menuElement.querySelector('#pause-message');

    this.dynamicButton.addEventListener('click', () => {
      if (this.dynamicButton.textContent === 'Resume') {
        gameStateSystem.resumeGame();
      } else if (this.dynamicButton.textContent === 'Next Level') {
        levelManagementSystem.goToNextLevel();
      }
      this.hide();
    })

    this.restartButton.addEventListener('click', () => {
      gameStateSystem.restartLevel();
      this.hide();
    });

    this.mainMenuButton.addEventListener('click', () => {
      mainMenu.show();
      this.hide();
    });
  }
}

export function updateDynamicPauseMenuElements(isGameOver, isGameWon) {
  if (!isGameOver) {
    pauseMenu.dynamicButton.textContent = 'Resume';
    pauseMenu.pauseMessage.textContent = 'Game Paused';
    pauseMenu.dynamicButton.classList.remove('hidden');
    pauseMenu.dynamicButton.focus();
  } else if (isGameWon) {
    pauseMenu.dynamicButton.textContent = 'Next Level';
    pauseMenu.pauseMessage.textContent = 'Game Won!';
    pauseMenu.dynamicButton.classList.remove('hidden');
    pauseMenu.dynamicButton.focus();
  } else {
    pauseMenu.pauseMessage.textContent = 'Game Lost!';
    pauseMenu.dynamicButton.classList.add('hidden');
    pauseMenu.navigation.updateCurrentIndex(1);
  }
}

const endMenu = document.querySelector('.end-menu');
const endButton = document.querySelector('#end-button');

endButton.addEventListener('click', () => {
  endMenu.classList.add('hidden');
  endButton.focus();
  mainMenu.show();
});

export function showEndMenu() {
  pauseMenu.hide();
  endMenu.classList.remove('hidden');
}

const pauseMenu = new PauseMenu();
export default pauseMenu;