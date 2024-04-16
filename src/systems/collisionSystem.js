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
        this.invokeCallbacks(entity, otherEntity);
      }
    }
  }

  areEntitiesColliding(entity1, entity2) {
    const pos1 = entity1.getComponent(PositionComponent);
    const pos2 = entity2.getComponent(PositionComponent);
    const size1 = entity1.getComponent(SizeComponent);
    const size2 = entity2.getComponent(SizeComponent);

    return (
      pos1.x - 1 < pos2.x + size2.width &&
      pos1.x + size1.width > pos2.x + 1 &&
      pos1.y - 1 < pos2.y + size2.height &&
      pos1.y + size1.height > pos2.y + 1
    );
  }

  invokeCallbacks(entity1, entity2) {
    const collisionComponent1 = entity1.getComponent(CollisionComponent);
    const collisionComponent2 = entity2.getComponent(CollisionComponent);

    const tag1 = collisionComponent1.tag;
    const tag2 = collisionComponent2.tag;

    collisionComponent1.invokeCallbacks(tag2, entity1, entity2);
    collisionComponent2.invokeCallbacks(tag1, entity2, entity1);
  }
}

const collisionSystem = new CollisionSystem();
ecsSystem.addSystem(collisionSystem);

export default collisionSystem;