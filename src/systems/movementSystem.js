import System from "./system.js";
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

      // Calculate new positions
      const newX = position.x + velocity.dx;
      const newY = position.y + velocity.dy;

      // Update entity position
      position.setX(newX);
      position.setY(newY);
    }

    this.deleteStaleComponents();
  }
}