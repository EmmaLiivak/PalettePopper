import { InputComponent, LivesComponent, ScoreComponent } from "../components.js";
import Entity from "./entityTemplate.js";
import gameStateSystem from "../systems/gameStateSystem.js";
import ecsSystem from "../systems/ECSSystem.js";

const gameStateEntity = new Entity('gameState');
ecsSystem.addEntity(gameStateEntity);

const gameStateInputComponent = new InputComponent('gameState');

const initialLives = 3;
gameStateEntity.attachComponents(
  gameStateInputComponent, 
  new LivesComponent(initialLives),
  new ScoreComponent()
);

gameStateInputComponent.setCallback('p', (keyState) => togglePause(keyState));
function togglePause(keyState) {
  if (keyState === 'down') {
    gameStateSystem.isGameRunning ? gameStateSystem.pauseGame() : gameStateSystem.resumeGame();
  }
}

export default gameStateEntity;