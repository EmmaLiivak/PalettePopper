import { PositionComponent } from "../components.js";
import System from "./system.js";

export class RenderingSystem extends System {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  update() {
    for (const entity of this.components) {
      this.renderEntityPosition(entity);
    }
  }

  renderEntityPosition(entity) {
    const position = entity.getComponent(PositionComponent);
    const element = this.elements[entity.name];

    if (!position && !element) return;

    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  }
}