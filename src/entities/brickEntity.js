import { PositionComponent, SizeComponent, ColorComponent, CollisionComponent, RenderComponent } from "../components.js";
import Entity from "./entityTemplate.js";
import ecsSystem from "../systems/ECSSystem.js";
import { ballEntity } from "./index.js";
import { updateScoreDisplay } from "../interface/scoreDisplay.js";

// Brick Entity Template
export class BrickEntity extends Entity {
  constructor(x, y, width, height, color, brickElement) {
    super('brick');
    this.color = color;
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
      const ballColor = ballEntity.getComponent(ColorComponent).color;
      // Check if the brick is already removed
      if (!brickElement.classList.contains('removed') && this.color === ballColor) {
        brickElement.classList.add('removed');
        ecsSystem.removeEntity(this);
        updateScoreDisplay();
      }
    });
  }
}

const bricks = [];
export default bricks;