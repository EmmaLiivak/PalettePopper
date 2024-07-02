import { PositionComponent, SizeComponent, ColorComponent, CollisionComponent, RenderComponent } from "../components.js";
import Entity from "./entityTemplate.js";
import ecsSystem from "../systems/ECSSystem.js";
import { ballEntity } from "./index.js";
import { updateScoreDisplay } from "../interface/scoreDisplay.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import renderingSystem from "../systems/renderingSystem.js";

// Brick Entity Template
class BrickEntity extends Entity {
  constructor(x, y, width, height, color) {
    super('brick');
    this.color = color;
    this.initComponents(x, y, width, height, color);
    this.setupCollisionCallback();
  }

  initComponents(x, y, width, height, color) {
    this.attachComponents(
      new PositionComponent(x, y),
      new SizeComponent(width, height),
      new ColorComponent(color),
      new CollisionComponent('brick'),
      new RenderComponent()
    );
  }

  setupCollisionCallback() {
    const collisionComponent = this.getComponent(CollisionComponent);
    collisionComponent.setCallback('ball', () => {
      const ballColor = ballEntity.getComponent(ColorComponent).color;
      // Check if the brick is already removed
      if (!this.element.classList.contains('removed') && this.color === ballColor) {
        this.element.classList.add('removed');
        ecsSystem.removeEntity(this);
        updateScoreDisplay();
      }
    });
  }

  static createBricksContainer(gridColumns, gridRows, gridGap) {
    const bricksContainer = document.createElement('div');
    bricksContainer.classList.add('brick-container');
    bricksContainer.style.display = 'grid';
    bricksContainer.style.gridTemplateColumns = `repeat(${gridColumns}, auto)`;
    bricksContainer.style.gap = `${gridGap}px`;
    bricksContainer.style.height = `${gridRows * 10}%`;
    gameContainer.appendChild(bricksContainer);
    return bricksContainer;
  }

  static appendBricks(bricks, gridColumns, gridRows, gridGap) {
    const bricksContainer = BrickEntity.createBricksContainer(gridColumns, gridRows, gridGap);
    const brickContainerWidth = bricksContainer.offsetWidth;
    const brickContainerHeight = bricksContainer.offsetHeight;
  
    // Calculate the size of each brick
    const totalGapWidth = (gridColumns - 1) * gridGap;
    const brickWidth = (brickContainerWidth - totalGapWidth) / gridColumns;
    const totalGapHeight = (gridRows - 1) * gridGap;
    const brickHeight = (brickContainerHeight - totalGapHeight) / gridRows;
  
    bricks.forEach((brickConfig, index) => {
      // Calculate the row and column of the current brick
      const row = Math.floor(index / gridColumns);
      const col = index % gridColumns;
  
      // Calculate the position of the current brick
      const brickX = col * (brickWidth + gridGap);
      const brickY = row * (brickHeight + gridGap);
  
      // Create and add the brick entity element for rendering system
      const brickElement = document.createElement('div');
      brickElement.classList.add('brick');
      brickElement.style.backgroundColor = brickConfig;
      bricksContainer.appendChild(brickElement);
      renderingSystem.elements.set('brick', brickElement);
  
      // Create and add the brick entity
      const brick = new BrickEntity(brickX, brickY, brickWidth, brickHeight, brickConfig, brickElement);
      ecsSystem.addEntity(brick);

      // Attach element reference to brick entity for collision callback
      brick.element = brickElement;
    });
  }
}

export default BrickEntity;