import { Entity, EntityManager } from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent } from "../components.js";
import { ballConfig } from "./entityConfigurations.js";

export const ballEntity = new Entity('ball');

EntityManager.addEntity(ballEntity);

const ballCollisionComponent = new CollisionComponent('ball');
ballEntity.attachComponents(
  new PositionComponent(ballConfig.startX, ballConfig.startY),
  new VelocityComponent(ballConfig.startDX, ballConfig.startDY),
  new SizeComponent(ballConfig.width, ballConfig.height),
  new ColorComponent(ballConfig.color),
  ballCollisionComponent
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