import levelManagementSystem from "../systems/levelManagementSystem.js";
import inputSystem from "../systems/inputSystem.js";
import gameStateSystem from '../systems/gameStateSystem.js'

const playButton = document.getElementById('play-button');
const mainMenu = document.querySelector('.main-menu');

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