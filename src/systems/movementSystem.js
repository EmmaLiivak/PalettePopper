import System from "./systemTemplate.js";
import { PositionComponent, VelocityComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js";

class MovementSystem extends System {
  constructor() {
    super();
  }

  update(entities) {
    for (const entity of entities) {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);

      if (!position || !velocity) continue;

      // Update entity position component
      position.x += velocity.dx;
      position.y += velocity.dy;
    }
  }
}

const movementSystem = new MovementSystem();
ecsSystem.addSystem(movementSystem);

export default movementSystem;