import { Entity, EntityManager } from "./entity.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent } from "../components.js";
import { movementSystem, renderingSystem } from "../index.js";

const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

export const paddleEntity = new Entity('paddle');
EntityManager.addEntity(paddleEntity);

const paddleInputComponent = new InputComponent('paddle');
const paddleCollisionComponent = new CollisionComponent('paddle')

paddleEntity.attachComponents(
  new PositionComponent(containerWidth * 0.45, containerHeight - (containerHeight * 0.02) - 2),
  new VelocityComponent(0, 0),
  new SizeComponent(containerWidth * 0.1, containerHeight * 0.02),
  new ColorComponent(0),
  paddleInputComponent,
  paddleCollisionComponent
);

paddleCollisionComponent.setCallback('leftWall', () => handleWallCollision('left'));
paddleCollisionComponent.setCallback('rightWall', () => handleWallCollision('right'));

const handleWallCollision = (collisionSide) => {
  const position = paddleEntity.getComponent(PositionComponent);
  const size = paddleEntity.getComponent(SizeComponent);

  if (!position || !size) return;

  if (collisionSide === 'left') {
    position.x = 0;
  } else if (collisionSide === 'right') {
    position.x = containerWidth - size.width;
  }
};

// Define a mapping between keys and their corresponding actions
const keyMapping = {
  'a': 'moveLeft',
  'arrowleft': 'moveLeft',
  'd': 'moveRight',
  'arrowright': 'moveRight',
};

// Set up input callbacks based on the key mapping
Object.entries(keyMapping).forEach(([key, action]) => {
  paddleInputComponent.setCallback(key, (keyState) => {
    const velocity = paddleEntity.getComponent(VelocityComponent);

    if (keyState === 'down') {
      switch (action) {
        case 'moveLeft':
          velocity.dx = -3;
          break;
        case 'moveRight':
          velocity.dx = 3;
          break;
      }
    } else if (keyState === 'up') {
      switch (action) {
        case 'moveLeft':
        case 'moveRight':
          velocity.dx = 0;
          break;
      }
    }
  });
});