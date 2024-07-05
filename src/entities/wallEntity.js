import Entity from "./entityTemplate.js";
import { PositionComponent, SizeComponent, CollisionComponent } from "../components.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
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

// Create wall entities
const topWallEntity = new WallEntity('topWall', 0, 0, gameContainer.width, 0, 'topWall');
const bottomWallEntity = new WallEntity('bottomWall', 0, gameContainer.height, gameContainer.width, 0, 'bottomWall');
const leftWallEntity = new WallEntity('leftWall', 0, 0, 0, gameContainer.height, 'leftWall');
const rightWallEntity = new WallEntity('rightWall', gameContainer.width, 0, 0, gameContainer.height, 'rightWall');

const walls = [topWallEntity, bottomWallEntity, leftWallEntity, rightWallEntity];

// Add wall entities to ECS system
walls.forEach(wallEntity => {
  ecsSystem.addEntity(wallEntity);
});

export default walls;