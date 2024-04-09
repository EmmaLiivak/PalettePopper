import { Entity, EntityManager } from "./entity.js";
import { movementSystem } from '../index.js'
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent } from "../components.js";

const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

export const paddleEntity = new Entity('paddle');
EntityManager.addEntity(paddleEntity);

const paddleCollisionComponent = new CollisionComponent('paddle');
const paddleInputComponent = new InputComponent('paddle');

paddleEntity.attachComponents(
  new PositionComponent(containerWidth * 0.45, containerHeight - (containerHeight * 0.02) - 2),
  new VelocityComponent(0, 0),
  new SizeComponent(0, 0),
  new ColorComponent(0),
  paddleCollisionComponent,
  paddleInputComponent
);

// Set up collision callbacks for the paddle entity
paddleCollisionComponent.setCallback('leftWall', () => stopPaddleMovement(paddleEntity));
paddleCollisionComponent.setCallback('rightWall', () => stopPaddleMovement(paddleEntity));

function stopPaddleMovement(paddle) {
  console.log('collision');
  const velocity = paddle.getComponent(VelocityComponent);
  velocity.dx = 0;
}

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
          movementSystem.addComponent(paddleEntity);
          velocity.dx = -1;
          break;
        case 'moveRight':
          movementSystem.addComponent(paddleEntity);
          velocity.dx = 1;
          break;
      }
    } else if (keyState === 'up') {
      switch (action) {
        case 'moveLeft':
        case 'moveRight':
          movementSystem.removeComponent(paddleEntity);
          velocity.dx = 0;
          break;
      }
    }
  });
});