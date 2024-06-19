import levelManagementSystem from "../systems/levelManagementSystem.js";
import inputSystem from "../systems/inputSystem.js";
import gameStateSystem from '../systems/gameStateSystem.js'
import handleMenuNavigation from "./menuNavigation.js";

const mainMenu = document.querySelector('.main-menu');
const playButton = document.getElementById('play-button');
const settingsButton = document.getElementById('settings-button');
const controlsButton = document.getElementById('controls-button');
const levelSelectButton = document.querySelector('.level-select-button');

playButton.addEventListener('click', () => {
  console.log('Loading level ' + (levelManagementSystem.currentLevelIndex + 1) + '...');
  levelManagementSystem.loadLevel();
  inputSystem.startListening();
  gameStateSystem.startGame();
  closeMenu();
});

function updateLevel() {
  levelSpan.textContent = 'Level ' + (levelManagementSystem.currentLevelIndex + 1);
}

function closeMenu() {
  mainMenu.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const mainMenuButtons = mainMenu.querySelector('.menu-buttons');
  if (mainMenuButtons) handleMenuNavigation(mainMenuButtons);
})