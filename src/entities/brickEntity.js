import { PositionComponent, SizeComponent, ColorComponent, CollisionComponent, RenderComponent } from "../components.js";
import Entity from "./entityTemplate.js";
import ecsSystem from "../systems/ECSSystem.js";
import { ballEntity, gameManagerEntity } from "./index.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import renderingSystem from "../systems/renderingSystem.js";

// Brick Entity Template
class BrickEntity extends Entity {
  static bricks = [];

  constructor(x, y, width, height, color, element) {
    super('brick');
    this.color = color
    this.element = element;
    this.initComponents(x, y, width, height, color);
    this.setCollisionCallbacks();
    BrickEntity.bricks.push(this);
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

  setCollisionCallbacks() {
    const collisionComponent = this.getComponent(CollisionComponent);
    collisionComponent.setCallback('ball', () => {
      // Check if the brick is already removed
      if (this.element.classList.contains('removed')) return;
      
      // Check if the ball color matches the brick color
      if (this.color.hexCode === ballEntity.color.color) {
        this.element.classList.add('removed');
        ecsSystem.removeEntity(this);
        gameManagerEntity.updateScoreDisplay();
        return;
      }

      // Check secondary color conditions
      if (this.color.isSecondary) {
        // Check if any required hits colors match ball color
        const matchingPrimaryColor = this.color.requiredHits.find(primaryColor => primaryColor.hexCode === ballEntity.color.color);
        // Change the brick color to primary color if match was found
        if (matchingPrimaryColor) {
          const newPrimaryColor = this.color.requiredHits.find(primaryColor => primaryColor !== matchingPrimaryColor);
          this.color = newPrimaryColor;
          this.element.style.backgroundColor = newPrimaryColor.hexCode;
          gameManagerEntity.updateScoreDisplay();
          return;
        }
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
    gameContainer.element.appendChild(bricksContainer);
    return bricksContainer;
  }

  static renderBricks(bricks, gridColumns, gridRows, gridGap) {
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
      brickElement.style.backgroundColor = brickConfig.hexCode;
      if (brickConfig.isTransparent) brickElement.classList.add('removed');
      bricksContainer.appendChild(brickElement);
      renderingSystem.elements.set('brick', brickElement);
  
      // Create and add the brick entity
      const brick = new BrickEntity(brickX, brickY, brickWidth, brickHeight, brickConfig, brickElement);
      if (!brickConfig.isTransparent) ecsSystem.addEntity(brick);
    });
  }

  static clearBricks() {
    BrickEntity.bricks.forEach(brick => {
      if (brick.element.parentElement) {
        brick.element.parentElement.removeChild(brick.element);
      }
      ecsSystem.removeEntity(brick);
    });
    BrickEntity.bricks = [];
  }
}

export default BrickEntity;