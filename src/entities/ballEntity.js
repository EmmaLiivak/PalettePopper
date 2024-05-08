import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import { ballConfig } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";

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

ballCollisionComponent.setCallback('topWall', () => collisionHandler('topWall'));
ballCollisionComponent.setCallback('leftWall', () => collisionHandler('leftWall'));
ballCollisionComponent.setCallback('rightWall', () => collisionHandler('rightWall'));
ballCollisionComponent.setCallback('bottomWall', () => collisionHandler('bottomWall'));
ballCollisionComponent.setCallback('paddle', () => collisionHandler('paddle'));

function collisionHandler(collisionObject) {
  const velocity = ballEntity.getComponent(VelocityComponent);

  switch (collisionObject) {
    case 'bottomWall':
    case 'topWall':
    case 'paddle':
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