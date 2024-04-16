import System from "./systemTemplate.js";
import { ColorComponent, PositionComponent, RenderComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js"
import { gameContainer } from "../configurations/entityConfigurations.js";

class RenderingSystem extends System {
  constructor() {
    super();
  }

  initialize() {
    const renderableEntities = ecsSystem.entities.filter(entity =>
      entity.hasComponent(RenderComponent)
    );

    renderableEntities.forEach(entity => {
      const element = this.createVisualElementForEntity(entity);

      this.addElement(entity.name, element);
    });
  }

  update(entities) {
    this.elements.forEach((element, entityName) => {
      const entity = entities.find(entity => entity.name === entityName);
      if (!entity) return;

      const position = entity.getComponent(PositionComponent);
      const color = entity.getComponent(ColorComponent);

      if (position) this.renderEntityPosition(element, position);
      if (color) this.renderEntityColor(element, color);
    });
  }

  createVisualElementForEntity(entity) {
    const element = document.createElement('div');
    element.classList.add(`${entity.name}`);
    gameContainer.appendChild(element);
    return element;
  }

  renderEntityPosition(element, position) {
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  }

  renderEntityColor(element, color) {
    element.style.color = color;
  }
}

const renderingSystem = new RenderingSystem();
ecsSystem.addSystem(renderingSystem);

export default renderingSystem;