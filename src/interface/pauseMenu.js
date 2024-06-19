import gameStateSystem from '../systems/gameStateSystem.js'
import handleMenuNavigation from "./menuNavigation.js";

const pauseMenu = document.querySelector('.pause-menu');
const resumeButton = document.getElementById('resume-button');

resumeButton.addEventListener('click', () => {
  gameStateSystem.resumeGame();
});

document.addEventListener('DOMContentLoaded', () => {
  const pauseMenuButtons = pauseMenu.querySelector('.menu-buttons');
  if (pauseMenuButtons) handleMenuNavigation(pauseMenuButtons);
})