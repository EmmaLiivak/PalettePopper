import { Entity, EntityManager } from "./entityTemplate.js";
import { paddleConfig } from "./entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent } from "../components.js";

export const paddleEntity = new Entity('paddle');
EntityManager.addEntity(paddleEntity);

const paddleInputComponent = new InputComponent('paddle');
const paddleCollisionComponent = new CollisionComponent('paddle')

paddleEntity.attachComponents(
  new PositionComponent(paddleConfig.startX, paddleConfig.startY),
  new VelocityComponent(paddleConfig.startDX, paddleConfig.startDY),
  new SizeComponent(paddleConfig.width, paddleConfig.height),
  new ColorComponent(paddleConfig.color),
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
          velocity.dx = -paddleConfig.DX;
          break;
        case 'moveRight':
          velocity.dx = paddleConfig.DX;
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