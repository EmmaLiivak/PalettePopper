import System from "./systemTemplate.js";
import { ColorComponent, PositionComponent, RenderComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js"
import { gameContainer } from "../configurations/entityConfigurations.js";

class RenderingSystem extends System {
  constructor() {
    super();
    this.elements = new Map();
    this.bricksContainer = null;
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

  loadLevel(levelData) {
    console.log(levelData);
    this.clearGameContainer();
    this.createBricksContainer(levelData.gridColumns, levelData.gridRows);
    this.appendBallAndPaddle(levelData.ball, levelData.paddle);
    this.appendBricks(levelData.bricks);
  }

  clearGameContainer() {
    gameContainer.innerHTML = '';
  }

  createBricksContainer(gridColumns, gridRows) {
    this.bricksContainer = document.createElement('div');
    this.bricksContainer.classList.add('bricksContainer');
    this.bricksContainer.style.display = 'grid';
    this.bricksContainer.style.gridTemplateColumns = `repeat(${gridColumns}, auto)`;
    this.bricksContainer.style.gap = '5px';
    this.bricksContainer.style.height = `${gridRows * 10}%`;
    gameContainer.appendChild(this.bricksContainer);
  }

  appendBallAndPaddle(ballConfig, paddleConfig) {
    const ballElement = this.createEntity(ballConfig);
    gameContainer.appendChild(ballElement);
    this.elements.set(ballConfig.type, ballElement);
  
    const paddleElement = this.createEntity(paddleConfig);
    gameContainer.appendChild(paddleElement);
    this.elements.set(paddleConfig.type, paddleElement);
  }

  appendBricks(bricks) {
    bricks.forEach(brickConfig => {
      const brickElement = document.createElement('div');
      brickElement.classList.add('brick');
      brickElement.style.backgroundColor = brickConfig;
      this.bricksContainer.appendChild(brickElement);
      this.elements.set('brick', brickElement);
    });
  }

  createEntity(entityConfig) {
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
    element.style.color = color;
  }
}

const renderingSystem = new RenderingSystem();
ecsSystem.addSystem(renderingSystem);

export default renderingSystem;