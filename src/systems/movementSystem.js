import System from "./systemTemplate.js";
import { PositionComponent, VelocityComponent } from "../components.js";

export class MovementSystem extends System {
  constructor() {
    super();
  }

  update() {
    for (const entity of this.components) {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);

      if (!position || !velocity) continue;

      // Update entity position component
      position.x += velocity.dx;
      position.y += velocity.dy;
    }

    this.deleteStaleComponents();
  }
}