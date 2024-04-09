import Entity from "./entity";

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