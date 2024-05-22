import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import { ballConfig, paddleConfig } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";
import paddleEntity from "./paddleEntity.js";

const ballEntity = new Entity('ball');
ecsSystem.addEntity(ballEntity);

const ballCollisionComponent = new CollisionComponent('ball');
const ballInputComponent = new InputComponent('ball');

ballEntity.attachComponents(
  new PositionComponent(ballConfig.startX, ballConfig.startY),
  new VelocityComponent(ballConfig.startDX, ballConfig.startDY),
  new SizeComponent(ballConfig.width, ballConfig.height),
  new ColorComponent(ballConfig.color),
  new RenderComponent(),
  ballCollisionComponent,
  ballInputComponent
);

// Add collision callbacks to ball
ballCollisionComponent.setCallback('topWall', () => collisionHandler('topWall'));
ballCollisionComponent.setCallback('leftWall', () => collisionHandler('leftWall'));
ballCollisionComponent.setCallback('rightWall', () => collisionHandler('rightWall'));
ballCollisionComponent.setCallback('bottomWall', () => collisionHandler('bottomWall'));
ballCollisionComponent.setCallback('paddle', () => collisionHandler('paddle'));
ballCollisionComponent.setCallback('brick', () => collisionHandler('brick'));

function collisionHandler(collisionObject) {
  const velocity = ballEntity.getComponent(VelocityComponent);
  const position = ballEntity.getComponent(PositionComponent);

  switch (collisionObject) {
    case 'bottomWall':
      // Reset ball to start position and velocity
      position.x = ballConfig.startX;
      position.y = ballConfig.startY;
      velocity.dx = ballConfig.startDX;
      velocity.dy = ballConfig.startDY;

      // Reset paddle to start position
      const paddlePosition = paddleEntity.getComponent(PositionComponent);
      paddlePosition.x = paddleConfig.startX;
      paddlePosition.y = paddleConfig.startY;
      
      break;
    case 'topWall':
    case 'paddle':
    case 'brick':
      velocity.dy = -velocity.dy;
      break;
    case 'rightWall':
    case 'leftWall':
      velocity.dx = -velocity.dx;
      break;
    default:
      console.error('Invalid collision object type');
      break;
  }
}

// Add callback to launch the ball when space is pressed
ballInputComponent.setCallback(' ', () => launchBall());

function launchBall() {
  console.log('ball launch');
  const velocity = ballEntity.getComponent(VelocityComponent);
  if (velocity.dx === 0 && velocity.dy === 0) {
    velocity.dx = ballConfig.defaultDX;
    velocity.dy = ballConfig.defaultDY;
  }
  console.log(velocity);
}

export default ballEntity;