import System from "./systemTemplate.js";
import levels from "../configurations/levelConfigurations.js";
import { createBricksContainer, appendBricks } from "../entities/brickEntity.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import { createColorPicker } from "../interface/colorPicker.js";
import { restartLivesDisplay } from "../interface/livesDisplay.js";
import { restartScoreDisplay } from "../interface/scoreDisplay.js";
import ballEntity from "../entities/ballEntity.js";
import { restartTimeDisplay } from "../interface/timeDisplay.js";
import { appendPaddle } from "../entities/paddleEntity.js";

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
      createBricksContainer(levelData.gridColumns, levelData.gridRows, levelData.gridGap);
      ballEntity.appendBall(levelData.ball);
      appendPaddle(levelData.paddle, levelData.colorPickerColors);
      appendBricks(levelData.bricks, levelData.gridColumns, levelData.gridRows, levelData.gridGap);
      createColorPicker(levelData.colorPickerColors);
    } else {
      console.error("Invalid level index.");
    }
  }

  restartGameContainer() {
    gameContainer.innerHTML = '';
    restartLivesDisplay();
    restartScoreDisplay();
    restartTimeDisplay();
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