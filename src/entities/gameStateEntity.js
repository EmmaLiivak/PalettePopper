import { InputComponent } from "../components.js";
import { Entity } from "./entityTemplate.js";
import { EntityManager } from "./entityTemplate.js";
import { gameSystem } from "../index.js";

export const gameStateEntity = new Entity('gameState');

EntityManager.addEntity(gameStateEntity);

const gameStateInputComponent = new InputComponent('gameState');

gameStateEntity.attachComponents(gameStateInputComponent);

gameStateInputComponent.setCallback('p', (keyState) => togglePause(keyState));

function togglePause(keyState) {
  if (keyState === 'down') {
    gameSystem.isGameRunning ? gameSystem.pauseGame() : gameSystem.resumeGame();
  }
}