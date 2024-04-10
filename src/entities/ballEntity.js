import { Entity, EntityManager } from "./entity.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent } from "../components.js";

const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;

const ballStartX = containerWidth / 2;
const ballStartY = containerWidth / 2;
const ballStartDX = 2;
const ballStartDY = 2;
const ballWidth = window.innerWidth * 0.01;
const ballHeight = window.innerWidth * 0.01;
const ballColor = 'red';

export const ballEntity = new Entity('ball');

EntityManager.addEntity(ballEntity);

const ballCollisionComponent = new CollisionComponent('ball');
ballEntity.attachComponents(
  new PositionComponent(ballStartX, ballStartY),
  new VelocityComponent(ballStartDX, ballStartDY),
  new SizeComponent(ballWidth, ballHeight),
  new ColorComponent(ballColor),
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