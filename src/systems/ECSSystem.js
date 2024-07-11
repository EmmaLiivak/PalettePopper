import System from "./systemTemplate.js";

class ECSSystem extends System {
  constructor() {
    super();
    this.systems = [];
  }

  addSystem(system) {
    this.systems.push(system);
  }

  removeSystem(system) {
    const index = this.systems.indexOf(system);
    if (index !== -1) {
      this.systems.splice(index, 1);
    }
  }

  update(deltaTime) {
    for (const system of this.systems) {
      system.update(this.entities, deltaTime);
    }
  }
}

const ecsSystem = new ECSSystem();
export default ecsSystem;