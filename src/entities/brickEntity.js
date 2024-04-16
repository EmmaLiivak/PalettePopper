import { PositionComponent, SizeComponent, ColorComponent, CollisionComponent, RenderComponent } from "../components.js";
import Entity from "./entityTemplate.js";

// Brick Entity Template
class BrickEntity extends Entity {
  constructor(width, height, color) {
    super('brick');
    this.attachComponents(
      new PositionComponent(x, y),
      new SizeComponent(width, height),
      new ColorComponent(color),
      new CollisionComponent('brick'),
      new RenderComponent()
    );
  }
}

const bricks = [];
export default bricks;