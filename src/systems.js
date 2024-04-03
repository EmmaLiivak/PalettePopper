import { PositionComponent, VelocityComponent, DimensionComponent } from './components.js';

export default class System {
  constructor() {
    this.components = [];
  }

  update() {

  }

  deleteStaleComponents() {
    this.components = this.components.filter(x => !x.isDeleted);
  }
}

export class MovementSystem extends System {
  constructor(entity) {
    super();
    this.entity = entity;
  }

  update() {
    const positionComponent = this.entity.components.find(component => component instanceof PositionComponent);
    const velocityComponent = this.entity.components.find(component => component instanceof VelocityComponent);

    if (positionComponent && velocityComponent) {
      positionComponent.x += velocityComponent.dx;
      positionComponent.y += velocityComponent.dy;
    }
  }
}

export class RenderSystem extends System {
  constructor(entity, element) {
    super();
    this.entity = entity;
    this.element = element;
  }

  update() {
    const position = this.entity.components.find(component => component instanceof PositionComponent);
    this.element.style.left = `${position.x}px`;
    this.element.style.top = `${position.y}px`;
  }
}

export class WallCollisionSystem extends System {
  constructor(entity, gameWidth, gameHeight) {
    super();
    this.entity = entity;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  update() {
    const entityPosition = this.entity.components.find(component => component instanceof PositionComponent);
    const entityVelocity = this.entity.components.find(component => component instanceof VelocityComponent);
    const entityDimension = this.entity.components.find(component => component instanceof DimensionComponent);

    if (entityPosition.x + entityDimension.width > this.gameWidth || entityPosition.x < 0) {
      entityVelocity.dx = -entityVelocity.dx; // Reverse horizontal direction
    }
    if (entityPosition.y < 0 || entityPosition.y + entityDimension.height > this.gameHeight) {
      entityVelocity.dy = -entityVelocity.dy; // Reverse vertical direction
    }
  }
}