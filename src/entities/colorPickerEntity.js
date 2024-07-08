import Entity from "../entities/entityTemplate.js";
import paddleEntity from "../entities/paddleEntity.js";
import { InputComponent } from "../components.js";
import { gameStateSystem, ecsSystem } from "../systems/index.js";
import { ballConfig, colorPickerConfig } from "../configurations/entityConfigurations.js"
import ballEntity from "./ballEntity.js";

class ColorPickerEntity extends Entity {
  constructor() {
    super('colorPicker');
    this.colors = colorPickerConfig.colors;
    this.selectedColorIndex = colorPickerConfig.startSelectedColorIndex;
    this.colorPickerContainer = document.querySelector('.color-picker-container');
    this.initComponents();
    this.setInputCallbacks();
  }

  initComponents() {
    this.attachComponents(new InputComponent('colorPicker'));
    this.input = this.getComponent(InputComponent);
  }

  setInputCallbacks() {
    Object.entries(colorPickerConfig.keyMapping).forEach(([key, action]) => {
      this.input.setCallback(key, (keyState) => this.handleInput(action, keyState));
    });
  }

  handleInput(action, keyState) {
    if (!gameStateSystem.isGameRunning || keyState === 'down') return;

    this.selectedColorIndex = action === 'colorUp'
      ? (this.selectedColorIndex - 1 + this.colors.length) % this.colors.length
      : (this.selectedColorIndex + 1) % this.colors.length;

    paddleEntity.color.color = this.getSelectedColor();
    if (!ballEntity.isLaunched) {
      ballEntity.color.color = this.getSelectedColor();
    }
    this.updateColorPicker(action === 'colorUp' ? 'up' : 'down');
  }

  getSelectedColor() {
    return this.colors[this.selectedColorIndex].hexCode;
  }

  updateColorPicker(direction) {
    this.colorDots.forEach((dot, index) => {
      index === this.selectedColorIndex ? this.selectDot(dot) : this.deselectDot(dot, direction);
    });
  }

  selectDot(dot) {
    dot.classList.add('selected-color');
    dot.style.order = 1;
  }

  deselectDot(dot, direction) {
    dot.classList.remove('selected-color');
    const order = dot.style.order;
    dot.style.order = direction === 'down'
      ? (order + 1 > 1 ? 0 : 2)
      : (order - 1 < 1 ? 2 : 0);
  }

  render() {
    const firstChild = this.colorPickerContainer.firstChild;
    if (firstChild) {
      this.colorPickerContainer.removeChild(firstChild);
    }

    const colorPicker = document.createElement('div');
    colorPicker.className = 'color-picker';
    this.colorPickerContainer.appendChild(colorPicker);

    this.colors.forEach((color, index) => {
      const colorDot = document.createElement('div');
      colorDot.classList.add('color-dot');
      colorDot.style.backgroundColor = color.hexCode;
      colorDot.setAttribute('data-index', index);
      colorDot.style.order = index;
      if (index === 1) colorDot.classList.add('selected-color');
      colorPicker.appendChild(colorDot);
    });

    this.colorDots = document.querySelectorAll('.color-dot');
    this.selectedColorIndex = colorPickerConfig.startSelectedColorIndex;
  }
}

const colorPickerEntity = new ColorPickerEntity();
ecsSystem.addEntity(colorPickerEntity);

export default colorPickerEntity;