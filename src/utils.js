const timeDisplay = document.querySelector('.time');
const fpsDisplay = document.querySelector('.fps');

let gamePaused = false;

let lastUpdateTime = null;
let totalElapsedTime = 0;
const times = [];
let fps;

export function UpdateTime() {
  if (gamePaused) return;
  let currentTime = performance.now();
  let elapsedTime = currentTime - lastUpdateTime;
  totalElapsedTime += elapsedTime;
  let seconds = Math.floor(totalElapsedTime / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  timeDisplay.textContent = 'Time: ' + minutes + ':' + seconds;

  lastUpdateTime = currentTime;
}

export function UpdateFPS() {
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  fpsDisplay.textContent = 'FPS: ' + fps;
}