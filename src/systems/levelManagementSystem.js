import System from "./systemTemplate.js";
import renderingSystem from "./renderingSystem.js";
import levels from "../configurations/levelConfigurations.js";
import { createBricksContainer, appendBricks } from "../entities/brickEntity.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import { createColorPicker } from "../interface/colorPicker.js";
import { ColorComponent, ColorPickerComponent } from "../components.js";
import paddleEntity, { restartPaddle } from "../entities/paddleEntity.js"
import { restartLivesDisplay } from "../interface/livesDisplay.js";
import { restartScoreDisplay } from "../interface/scoreDisplay.js";
import { appendBall, restartBall } from "../entities/ballEntity.js";
import { restartTimeDisplay } from "../interface/timeDisplay.js";

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
      appendBall(levelData.ball)
      this.appendPaddle(levelData.paddle, levelData.colorPickerColors);
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

  appendPaddle(paddleConfig, colorPickerColors) {
    // Paddle setup
    const paddleElement = renderingSystem.createEntityElement(paddleConfig);
    gameContainer.appendChild(paddleElement);
    renderingSystem.elements.set(paddleConfig.type, paddleElement);
    restartPaddle();

    // Update paddle colors
    const paddleColorPickerComponent = paddleEntity.getComponent(ColorPickerComponent);
    paddleColorPickerComponent.colors = colorPickerColors;
    paddleEntity.getComponent(ColorComponent).color = paddleColorPickerComponent.getSelectedColor();

    renderingSystem.update([paddleEntity]);
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