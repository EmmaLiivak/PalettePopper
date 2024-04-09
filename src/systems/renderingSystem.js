import { PositionComponent } from "../components.js";
import System from "./system.js";

export class RenderingSystem extends System {
  constructor(entities, elements) {
    super();
    this.entities = entities;
    this.elements = elements;
    this.subscribeToPositionChanges();
  }

  subscribeToPositionChanges() {
    for (const entity of this.entities) {
      const position = entity.getComponent(PositionComponent);

      if (!position) continue;

      position.subscribe(() => {
        this.renderEntity(entity);
      });
    }
  }

  renderEntity(entity) {
    const position = entity.getComponent(PositionComponent);
    const element = this.elements[entity.name];

    if (!position && !element) return;

    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  }
}