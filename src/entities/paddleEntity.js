import Entity from "./entityTemplate.js";
import { paddleConfig, gameContainerWidth } from "../configurations/entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent, RenderComponent } from "../components.js";
import ecsSystem from "../systems/ECSSystem.js";

const paddleEntity = new Entity('paddle');
ecsSystem.addEntity(paddleEntity);

const paddleInputComponent = new InputComponent('paddle');
const paddleCollisionComponent = new CollisionComponent('paddle')
paddleEntity.attachComponents(
  new PositionComponent(paddleConfig.startX, paddleConfig.startY),
  new VelocityComponent(paddleConfig.startDX, paddleConfig.startDY),
  new SizeComponent(paddleConfig.width, paddleConfig.height),
  new ColorComponent(paddleConfig.color),
  new RenderComponent(),
  paddleInputComponent,
  paddleCollisionComponent
);

// Set callbacks for collision with walls
paddleCollisionComponent.setCallback('leftWall', () => handleWallCollision('left'));
paddleCollisionComponent.setCallback('rightWall', () => handleWallCollision('right'));

const handleWallCollision = (collisionSide) => {
  const position = paddleEntity.getComponent(PositionComponent);
  const size = paddleEntity.getComponent(SizeComponent);
  if (!position || !size) return;

  if (collisionSide === 'left') {
    position.x = 0;
  }
  if (collisionSide === 'right') {
    position.x = gameContainerWidth - size.width;
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
          velocity.dx = -paddleConfig.defaultDX;
          break;
        case 'moveRight':
          velocity.dx = paddleConfig.defaultDX;
          break;
      }
    }
    if (keyState === 'up') {
      switch (action) {
        case 'moveLeft':
        case 'moveRight':
          velocity.dx = 0;
          break;
      }
    }
  });
});

export default paddleEntity;