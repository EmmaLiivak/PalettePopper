import System from "./systemTemplate.js";
import { ColorComponent, PositionComponent, RenderComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js"

class RenderingSystem extends System {
  constructor() {
    super();
    this.elements = new Map(); // Map to store elements associated with entities
  }

  update(entities) {
    // Update existing elements based on entities
    entities.forEach(entity => {
      const element = this.elements.get(entity.name);
      if (!element) return;

      const position = entity.getComponent(PositionComponent);
      const color = entity.getComponent(ColorComponent);

      if (position) this.renderEntityPosition(element, position);
      if (color) this.renderEntityColor(element, color.color);
    });
  }

  createEntityElement(entityConfig) {
    const entityElement = document.createElement('div');
    entityElement.classList.add(entityConfig.type);
    entityElement.style.width = `${entityConfig.width}px`;
    entityElement.style.height = `${entityConfig.height}px`;
    entityElement.style.left = `${entityConfig.startX}px`;
    entityElement.style.top = `${entityConfig.startY}px`;
    entityElement.style.backgroundColor = entityConfig.color;
    return entityElement;
  }

  renderEntityPosition(element, position) {
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  }

  renderEntityColor(element, color) {
    element.style.backgroundColor = color;
  }
}

const renderingSystem = new RenderingSystem();
ecsSystem.addSystem(renderingSystem);

export default renderingSystem;