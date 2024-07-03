import System from "./systemTemplate.js";
import levels from "../configurations/levelConfigurations.js";
import BrickEntity from "../entities/brickEntity.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import ballEntity from "../entities/ballEntity.js";
import paddleEntity from "../entities/paddleEntity.js";
import gameManagerEntity from "../entities/gameManagerEntity.js";
import colorPickerEntity from "../entities/colorPickerEntity.js";

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
      this.restartGameContainer();
      colorPickerEntity.render(levelData.colorPickerColors);
      BrickEntity.appendBricks(levelData.bricks, levelData.gridColumns, levelData.gridRows, levelData.gridGap);
      ballEntity.appendBall(levelData.ball);
      paddleEntity.render(levelData.paddle);
    } else {
      console.error("Invalid level index.");
    }
  }

  restartGameContainer() {
    gameContainer.innerHTML = '';
    gameManagerEntity.restartDisplays();
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
    this.loadLevel();
  }
}

const levelManagementSystem = new LevelManagementSystem(levels);
export default levelManagementSystem;