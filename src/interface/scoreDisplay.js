import { ScoreComponent } from "../components.js";
import { gameStateEntity } from "../entities/index.js";

const scoreDisplay = document.querySelector('.score');
let scoreComponent = gameStateEntity.getComponent(ScoreComponent)

export function updateScoreDisplay() {
  scoreComponent.score += 100;
  scoreDisplay.innerHTML = 'Score: ' + scoreComponent.score;
}

export function restartScoreDisplay() {
  scoreComponent.score = 0;
  scoreDisplay.innerHTML = 'Score: ' + scoreComponent.score;
}