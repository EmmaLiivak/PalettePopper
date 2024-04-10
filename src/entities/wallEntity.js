import { Entity, EntityManager } from "./entityTemplate.js";
import { PositionComponent, SizeComponent, CollisionComponent } from "../components.js";

const gameContainer = document.querySelector('.gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

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

export const topWallEntity = new WallEntity('topWall', 0, 0, containerWidth, 0, 'topWall');
export const bottomWallEntity = new WallEntity('bottomWall', 0, containerHeight, containerWidth, 0, 'bottomWall');
export const leftWallEntity = new WallEntity('leftWall', 0, 0, 0, containerHeight, 'leftWall');
export const rightWallEntity = new WallEntity('rightWall', containerWidth, 0, 0, containerHeight, 'rightWall');

EntityManager.addEntity(topWallEntity);
EntityManager.addEntity(bottomWallEntity);
EntityManager.addEntity(leftWallEntity);
EntityManager.addEntity(rightWallEntity);