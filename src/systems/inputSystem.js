import System from "./systemTemplate.js";
import { InputComponent } from "../components.js";
import ecsSystem from "./ECSSystem.js";

class InputSystem extends System {
  constructor() {
    super();
    this.keyDownHandler = this.handleKeyDown.bind(this);
    this.keyUpHandler = this.handleKeyUp.bind(this);
  }

  startListening() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  stopListening() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  handleKeyDown(event) {
    const key = event.keyCode;
    for (const entity of ecsSystem.entities) {
      const inputComponent = entity.getComponent(InputComponent);
      if (!inputComponent) continue;
      inputComponent.invokeCallbacks(key, 'down');
    }
  }

  handleKeyUp(event) {
    const key = event.keyCode;
    for (const entity of ecsSystem.entities) {
      const inputComponent = entity.getComponent(InputComponent);
      if (!inputComponent) continue;
      inputComponent.invokeCallbacks(key,  'up');
    }
  }
}

const inputSystem = new InputSystem();
export default inputSystem;