import System from "./system.js";
import { InputComponent } from "../components.js";

export default class InputSystem extends System {
  constructor(entities) {
    super();
    this.entities = entities;
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
    const key = event.key.toLowerCase();
    console.log(`${key} key down`);
    this.entities.forEach(entity => {
      const inputComponent = entity.getComponent(InputComponent);
      if (inputComponent) {
        inputComponent.invokeCallbacks(key, 'down');
      }
    });
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    this.entities.forEach(entity => {
      const inputComponent = entity.getComponent(InputComponent);
      if (inputComponent) {
        inputComponent.invokeCallbacks(key,  'up');
      }
    });
  }
}