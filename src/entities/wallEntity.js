import Entity from "./entityTemplate.js";
import { PositionComponent, SizeComponent, CollisionComponent } from "../components.js";
import { gameContainerWidth, gameContainerHeight } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";

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

const topWallEntity = new WallEntity('topWall', 0, 0, gameContainerWidth, 0, 'topWall');
const bottomWallEntity = new WallEntity('bottomWall', 0, gameContainerHeight, gameContainerWidth, 0, 'bottomWall');
const leftWallEntity = new WallEntity('leftWall', 0, 0, 0, gameContainerHeight, 'leftWall');
const rightWallEntity = new WallEntity('rightWall', gameContainerWidth, 0, 0, gameContainerHeight, 'rightWall');

const walls = [topWallEntity, bottomWallEntity, leftWallEntity, rightWallEntity];

walls.forEach(wallEntity => {
  ecsSystem.addEntity(wallEntity);
});

export default walls;