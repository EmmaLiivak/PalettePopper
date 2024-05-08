import levelManagementSystem from "../systems/levelManagementSystem.js";
import inputSystem from "../systems/inputSystem.js";
import gameStateSystem from '../systems/gameStateSystem.js'

const playButton = document.getElementById('play-button');
const gameMenu = document.querySelector('.game-menu');

function updateLevel() {
  levelSpan.textContent = 'Level ' + (levelManagementSystem.currentLevelIndex + 1);
}

playButton.addEventListener('click', () => {
  console.log('Loading level ' + (levelManagementSystem.currentLevelIndex + 1) + '...');
  levelManagementSystem.loadLevel();
  inputSystem.startListening();
  gameStateSystem.startGame();
  closeMenu();
});

function closeMenu() {
  gameMenu.style.display = 'none';
  console.log('Menu closed.');
}