import { Position, Velocity } from './components.js';

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
    const positionComponent = this.entity.components.find(component => component instanceof Position);
    const velocityComponent = this.entity.components.find(component => component instanceof Velocity);

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
    const position = this.entity.components.find(component => component instanceof Position);
    this.element.style.left = `${position.x}px`;
    this.element.style.top = `${position.y}px`;
  }
}