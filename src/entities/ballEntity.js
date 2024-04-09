import { Entity, EntityManager } from "./entity.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent } from "../components.js";

const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

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

ballCollisionComponent.setCallback('topWall', () => onCollisionWithWall(ballEntity, 'top'));
ballCollisionComponent.setCallback('leftWall', () => onCollisionWithWall(ballEntity, 'left'));
ballCollisionComponent.setCallback('rightWall', () => onCollisionWithWall(ballEntity, 'right'));
ballCollisionComponent.setCallback('bottomWall', () => onCollisionWithWall(ballEntity, 'bottom'));


function onCollisionWithWall(ball, wallType) {
  const velocity = ball.getComponent(VelocityComponent);

  switch (wallType) {
    case 'top':
    case 'bottom':
      velocity.dy = -velocity.dy;
      break;
    case 'right':
    case 'left':
      velocity.dx = -velocity.dx;
      break;
    default:
      console.error('Invalid wall type');
      break;
  }
}