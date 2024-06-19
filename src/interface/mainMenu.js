import levelManagementSystem from "../systems/levelManagementSystem.js";
import inputSystem from "../systems/inputSystem.js";
import gameStateSystem from '../systems/gameStateSystem.js'
import handleMenuNavigation from "./menuNavigation.js";
import ecsSystem from "../systems/ECSSystem.js";
import movementSystem from "../systems/movementSystem.js";

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
  mainMenu.classList.add('hidden');
});

function updateLevel() {
  levelSpan.textContent = 'Level ' + (levelManagementSystem.currentLevelIndex + 1);
}

document.addEventListener('DOMContentLoaded', () => {
  const mainMenuButtons = mainMenu.querySelector('.menu-buttons');
  if (mainMenuButtons) handleMenuNavigation(mainMenuButtons);
})