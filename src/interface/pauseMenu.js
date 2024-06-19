import gameStateSystem from '../systems/gameStateSystem.js'
import handleMenuNavigation from "./menuNavigation.js";
import ecsSystem from '../systems/ECSSystem.js';
import movementSystem from '../systems/movementSystem.js';
import levelManagementSystem from '../systems/levelManagementSystem.js';

const pauseMenu = document.querySelector('.pause-menu');
const mainMenu = document.querySelector('.main-menu');
const resumeButton = document.getElementById('resume-button');
const restartButton = document.getElementById('restart-button');
const mainMenuButton = document.getElementById('main-menu-button');

resumeButton.addEventListener('click', () => {
  gameStateSystem.resumeGame();
});

restartButton.addEventListener('click', () => {
  gameStateSystem.stopGame();
  pauseMenu.classList.add('hidden');
  ecsSystem.addSystem(movementSystem);
  levelManagementSystem.resetLevel();
  gameStateSystem.startGame();
})

// next level button

// settings button

// controls button

mainMenuButton.addEventListener('click', () => {
  pauseMenu.classList.add('hidden');
  mainMenu.classList.remove('hidden');
  ecsSystem.addSystem(movementSystem);
  gameStateSystem.stopGame();
})



document.addEventListener('DOMContentLoaded', () => {
  const pauseMenuButtons = pauseMenu.querySelector('.menu-buttons');
  if (pauseMenuButtons) handleMenuNavigation(pauseMenuButtons);
})