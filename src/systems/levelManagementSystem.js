import System from "./systemTemplate.js";
import levels from "../configurations/levelConfigurations.js";
import BrickEntity from "../entities/brickEntity.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import { ballEntity, paddleEntity, gameManagerEntity, colorPickerEntity } from "../entities/index.js";
import { gameStateSystem } from "./index.js";

class LevelManagementSystem extends System {
  constructor(levels) {
    super();
    this.levels = levels;
    this.currentLevelIndex = 0;
  }

  loadLevel(levelIndex = this.currentLevelIndex) {
    this.currentLevelIndex = levelIndex;
    if (levelIndex >= 0 && levelIndex < this.levels.length) {
      const levelData = levels[levelIndex];
      colorPickerEntity.render();
      BrickEntity.renderBricks(levelData.bricks, levelData.gridColumns, levelData.gridRows, levelData.gridGap);
      paddleEntity.render(levelData.paddle);
      ballEntity.renderBall(levelData.ball);
    } else {
      console.error("Invalid level index.");
    }
  }

  restartGameContainer() {
    // Clear bricks
    BrickEntity.clearBricks();
    // Clear all child elements of the game container
    while (gameContainer.element.firstChild) {
      gameContainer.element.removeChild(gameContainer.element.firstChild);
    }

    gameContainer.element.innerHTML = '';

    gameManagerEntity.resetDisplays();
  }

  goToNextLevel() {
    this.currentLevelIndex++;

    if (this.currentLevelIndex < levels.length) {
      this.loadLevel();
      gameStateSystem.startGame();
    } else {
      console.log("All levels completed.");
    }
  }

  resetLevel() {
    this.restartGameContainer();
    this.loadLevel();
  }
}

const levelManagementSystem = new LevelManagementSystem(levels);
export default levelManagementSystem;