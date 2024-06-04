import { LivesComponent } from "../components.js";
import { gameStateEntity } from "../entities/index.js";

const livesDisplay = document.querySelector('.lives');
let livesComponent = gameStateEntity.getComponent(LivesComponent);

export function updateLivesDisplay() {
  livesComponent.lives--;
  livesDisplay.innerHTML = 'Lives: ' + '&#10084;'.repeat(livesComponent.lives);
}