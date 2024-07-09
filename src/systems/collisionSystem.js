import System from "./systemTemplate.js";
import { CollisionComponent, PositionComponent, SizeComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js";

class CollisionSystem extends System {
  constructor() {
    super();
  }

  update(entities) {
    // Check for collision between two entities with collision components
    for (const entity of entities) {
      if (!entity.hasComponent(CollisionComponent)) continue;

      this.checkCollisionsForEntity(entity, entities);
    }
  }

  checkCollisionsForEntity(entity, entities) {
    for (const otherEntity of entities) {
      if (entity === otherEntity || !otherEntity.hasComponent(CollisionComponent)) continue;

      if (this.areEntitiesColliding(entity, otherEntity)) {
        this.calculateHitPoint(entity, otherEntity);
        this.handleCollision(entity, otherEntity);
      }
    }
  }

  areEntitiesColliding(entity1, entity2) {
    this.pos1 = entity1.getComponent(PositionComponent);
    this.pos2 = entity2.getComponent(PositionComponent);
    this.size1 = entity1.getComponent(SizeComponent);
    this.size2 = entity2.getComponent(SizeComponent);

    return (
      this.pos1.x - 1 < this.pos2.x + this.size2.width &&
      this.pos1.x + this.size1.width > this.pos2.x + 1 &&
      this.pos1.y - 1 < this.pos2.y + this.size2.height &&
      this.pos1.y + this.size1.height > this.pos2.y + 1
    );
  }

  calculateHitPoint() {
    const overlapLeft = Math.max(this.pos1.x, this.pos2.x);
    const overlapRight = Math.min(this.pos1.x + this.size1.width, this.pos2.x + this.size2.width);
    const overlapTop = Math.max(this.pos1.y, this.pos2.y);
    const overlapBottom = Math.min(this.pos1.y + this.size1.height, this.pos2.y + this.size2.height);

    const hitPoint = {
      x: (overlapLeft + overlapRight) / 2,
      y: (overlapTop + overlapBottom) / 2
    };

    this.hitPoint = hitPoint;
  }

  handleCollision(entity1, entity2, hitPoint) {
    const collisionComponent1 = entity1.getComponent(CollisionComponent);
    const collisionComponent2 = entity2.getComponent(CollisionComponent);

    const tag1 = collisionComponent1.tag;
    const tag2 = collisionComponent2.tag;

    collisionComponent1.invokeCallbacks(tag2, entity1, entity2, this.hitPoint);
    collisionComponent2.invokeCallbacks(tag1, entity2, entity1, this.hitPoint);
  }
}

const collisionSystem = new CollisionSystem();
ecsSystem.addSystem(collisionSystem);

export default collisionSystem;