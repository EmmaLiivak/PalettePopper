import { gameStateSystem } from "./systems/index.js";

const timeDisplay = document.querySelector('.time');

let totalElapsedTime = 0;

export function updateTime() {
  if (!gameStateSystem.isGameRunning) return;

  let currentTime = performance.now();
  let elapsedTime = currentTime - gameStateSystem.lastUpdateTime;

  gameStateSystem.lastUpdateTime = currentTime;
  
  totalElapsedTime += elapsedTime;

  let seconds = Math.floor(totalElapsedTime / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  timeDisplay.textContent = 'Time: ' + minutes + ':' + seconds;
}