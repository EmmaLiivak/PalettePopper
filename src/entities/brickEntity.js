import { PositionComponent, SizeComponent, ColorComponent, CollisionComponent, RenderComponent } from "../components.js";
import Entity from "./entityTemplate.js";

// Brick Entity Template
export class BrickEntity extends Entity {
  constructor(x, y, width, height, color, brickElement) {
    super('brick');
    this.attachComponents(
      new PositionComponent(x, y),
      new SizeComponent(width, height),
      new ColorComponent(color),
      new CollisionComponent('brick'),
      new RenderComponent()
    );

    // Add collision callback for the brick entity
    const collisionComponent = this.getComponent(CollisionComponent);
    collisionComponent.setCallback('ball', () => {
      // Check if the brick is already removed
      if (!brickElement.classList.contains('removed')) {
        brickElement.classList.add('removed');
      }
    });
  }
}

const bricks = [];
export default bricks;