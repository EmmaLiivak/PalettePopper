import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, CollisionComponent, PlayerInputComponent } from "./components.js";
import { OnCollisionWithWall } from "./systems/collisionSystem.js";

const game = document.querySelector('.gameContainer');
const containerWidth = game.offsetWidth;
const containerHeight = game.offsetHeight;

const ballStartX = containerWidth / 2;
const ballStartY = containerWidth / 2;
const ballStartDX = 2;
const ballStartDY = 2;
const ballWidth = window.innerWidth * 0.01;
const ballHeight = window.innerWidth * 0.01;
const ballColor = 'red';

const numRows = 5;
const numColumns = 10;

const brickWidth = 0;
const brickHeight = 0;
const brickColor = 'pink';

// Base Entity Template
export default class Entity {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.components = [];
  }

  attachComponents(...components) {
    this.components = [...this.components, ...components];
  }

  removeAllComponents() {
    for (const component of this.components) {
      component.delete();
    }
    this.components = [];
  }

  hasComponent(componentType) {
    return this.components.some(component => component instanceof componentType);
  }

  getComponent(componentType) {
    return this.components.find(component => component instanceof componentType);
  }
}

export const BallEntity = new Entity('ball');
const ballCollisionComponent = new CollisionComponent('ball');
BallEntity.attachComponents(
  new PositionComponent(ballStartX, ballStartY),
  new VelocityComponent(ballStartDX, ballStartDY),
  new SizeComponent(ballWidth, ballHeight),
  new ColorComponent(ballColor),
  ballCollisionComponent
);

ballCollisionComponent.setCallback('topWall', () => OnCollisionWithWall(BallEntity, 'top'));
ballCollisionComponent.setCallback('leftWall', () => OnCollisionWithWall(BallEntity, 'left'));
ballCollisionComponent.setCallback('rightWall', () => OnCollisionWithWall(BallEntity, 'right'));
ballCollisionComponent.setCallback('bottomWall', () => OnCollisionWithWall(BallEntity, 'bottom'));

const paddleEntity = new Entity('paddle');
paddleEntity.attachComponents(
  new PositionComponent(0, 0),
  new VelocityComponent(0, 0),
  new SizeComponent(0, 0),
  new ColorComponent(0),
  new CollisionComponent('paddle'),
  new PlayerInputComponent('paddle')
);

// Brick Entity Template
class BrickEntity extends Entity {
  constructor(name, width, height, color, collisionTag) {
    super(name);
    this.attachComponents(
      new SizeComponent(width, height),
      new ColorComponent(color),
      new CollisionComponent(collisionTag)
    );
  }
}

const brickEntities = [];

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numColumns; j++) {
    const brickEntity = new BrickEntity('brick', brickWidth, brickHeight, brickColor, 'brick');
    brickEntities.push(brickEntity);
  }
}

// Wall Entity Template
class WallEntity extends Entity {
  constructor(name, x, y, width, height, collisionTag) {
    super(name);
    this.attachComponents(
      new PositionComponent(x, y),
      new SizeComponent(width, height),
      new CollisionComponent(collisionTag)
    );
  }
}

export const TopWallEntity = new WallEntity('topWall', 0, 0, containerWidth, 0, 'topWall');
export const BottomWallEntity = new WallEntity('bottomWall', 0, containerHeight, containerWidth, 0, 'bottomWall');
export const LeftWallEntity = new WallEntity('leftWall', 0, 0, 0, containerHeight, 'leftWall');
export const RightWallEntity = new WallEntity('rightWall', containerWidth, 0, 0, containerHeight, 'rightWall');