import System from "./systemTemplate.js";
import renderingSystem from "./renderingSystem.js";
import ecsSystem from "./ECSSystem.js";
import levels from "../configurations/levelConfigurations.js";
import { BrickEntity } from "../entities/brickEntity.js";
import { gameContainer } from "../configurations/entityConfigurations.js";

class LevelManagementSystem extends System {
  constructor(levels) {
    super();
    this.levels = levels;
    this.currentLevelIndex = 0;
    this.bricksContainer = null;
  }

  loadLevel(levelIndex = this.currentLevelIndex) {
    this.currentLevelIndex = levelIndex;
    if (levelIndex >= 0 && levelIndex < this.levels.length) {
      const levelData = levels[levelIndex];
      this.clearGameContainer();
      this.createBricksContainer(levelData.gridColumns, levelData.gridRows, levelData.gridGap);
      this.appendBallAndPaddle(levelData.ball, levelData.paddle);
      this.appendBricks(levelData.bricks, levelData.gridColumns, levelData.gridRows, levelData.gridGap);
    } else {
      console.error("Invalid level index.");
    }
  }

  clearGameContainer() {
    gameContainer.innerHTML = '';
  }

  createBricksContainer(gridColumns, gridRows, gridGap) {
    this.bricksContainer = document.createElement('div');
    this.bricksContainer.classList.add('brick-container');
    this.bricksContainer.style.display = 'grid';
    this.bricksContainer.style.gridTemplateColumns = `repeat(${gridColumns}, auto)`;
    this.bricksContainer.style.gap = `${gridGap}px`;
    this.bricksContainer.style.height = `${gridRows * 10}%`;
    gameContainer.appendChild(this.bricksContainer);
  }

  appendBallAndPaddle(ballConfig, paddleConfig) {
    const ballElement = renderingSystem.createEntityElement(ballConfig);
    gameContainer.appendChild(ballElement);
    renderingSystem.elements.set(ballConfig.type, ballElement);
  
    const paddleElement = renderingSystem.createEntityElement(paddleConfig);
    gameContainer.appendChild(paddleElement);
    renderingSystem.elements.set(paddleConfig.type, paddleElement);
  }

  appendBricks(bricks, gridColumns, gridRows, gridGap) {
    const brickContainerWidth = this.bricksContainer.offsetWidth;
    const brickContainerHeight = this.bricksContainer.offsetHeight;

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
      this.bricksContainer.appendChild(brickElement);
      renderingSystem.elements.set('brick', brickElement);

      // Create and add the brick entity
      const brick = new BrickEntity(brickX, brickY, brickWidth, brickHeight, brickConfig, brickElement);
      ecsSystem.addEntity(brick);
    });
  }

  goToNextLevel() {
    this.currentLevelIndex++;
    if (this.currentLevelIndex < levels.length) {
      this.loadLevel();
    } else {
      console.log("All levels completed.");
    }
  }

  resetLevel() {
    this.loadLevel(this.currentLevelIndex);
  }
}

const levelManagementSystem = new LevelManagementSystem(levels);
export default levelManagementSystem;