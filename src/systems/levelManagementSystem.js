import System from "./systemTemplate.js";
import renderingSystem from "./renderingSystem.js";
import levels from "../configurations/levelConfigurations.js";

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
      renderingSystem.loadLevel(levelData);
    } else {
      console.error("Invalid level index.");
    }
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