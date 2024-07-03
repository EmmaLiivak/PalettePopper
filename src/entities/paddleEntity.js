import Entity from "./entityTemplate.js";
import { paddleConfig, gameContainerWidth } from "../configurations/entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent, RenderComponent, ColorPickerComponent } from "../components.js";
import ecsSystem from "../systems/ECSSystem.js";
import ballEntity from './ballEntity.js'
import { updateColorPicker } from "../interface/colorPicker.js";
import { gameStateSystem, renderingSystem } from "../systems/index.js";
import { gameContainer } from "../configurations/entityConfigurations.js";

const COLLISION_OBJECTS = {
  LEFT_WALL: 'leftWall',
  RIGHT_WALL: 'rightWall',
};

// Defined mapping between keys and their corresponding actions
const KEY_MAPPING = {
  'a': 'moveLeft',
  'arrowleft': 'moveLeft',
  'd': 'moveRight',
  'arrowright': 'moveRight',
  'w': 'colorUp',
  'arrowup': 'colorUp',
  's': 'colorDown',
  'arrowdown': 'colorDown',
};

class PaddleEntity extends Entity {
  constructor() {
    super('paddle');
    this.initComponents();
    this.setCollisionCallbacks();
    this.setInputCallbacks();
  }

  initComponents() {
    this.attachComponents(
      new PositionComponent(paddleConfig.startX, paddleConfig.startY),
      new VelocityComponent(paddleConfig.startDX, paddleConfig.startDY),
      new SizeComponent(paddleConfig.width, paddleConfig.height),
      new ColorComponent(paddleConfig.color),
      new RenderComponent(),
      new InputComponent('paddle'),
      new CollisionComponent('paddle'),
      new ColorPickerComponent()
    )

    this.position = this.getComponent(PositionComponent);
    this.velocity = this.getComponent(VelocityComponent);
    this.size = this.getComponent(SizeComponent);
    this.color = this.getComponent(ColorComponent);
    this.input = this.getComponent(InputComponent);
    this.collision = this.getComponent(CollisionComponent);
    this.colorPicker = this.getComponent(ColorPickerComponent);
  }

  setCollisionCallbacks() {
    Object.values(COLLISION_OBJECTS).forEach(collisionObject => {
      this.collision.setCallback(collisionObject, () => this.handleWallCollision(collisionObject));
    });
  }

  handleWallCollision(collisionSide) {
    if (!this.position || !this.size) return;

    if (collisionSide === COLLISION_OBJECTS.LEFT_WALL) {
      this.position.x = 0;
    } else if (collisionSide === COLLISION_OBJECTS.RIGHT_WALL) {
      this.position.x = gameContainerWidth - this.size.width;
    }

    ballEntity.alignBallWithPaddle();
  }

  setInputCallbacks() {
    Object.entries(KEY_MAPPING).forEach(([key, action]) => {
      this.input.setCallback(key, (keyState) => this.handleInput(action, keyState));
    });
  }

  handleInput(action, keyState) {
    if (!gameStateSystem.isGameRunning) return;

    if (keyState === 'down') {
      this.handleKeyDown(action);
    } else if (keyState === 'up') {
      this.handleKeyUp(action);
    }
  }

  handleKeyDown(action) {
    switch (action) {
      case 'moveLeft':
        this.velocity.dx = -paddleConfig.defaultDX;
        if (!ballEntity.isLaunched) ballEntity.velocity.dx = -paddleConfig.defaultDX;
        break;
      case 'moveRight':
        this.velocity.dx = paddleConfig.defaultDX;
        if (!ballEntity.isLaunched) ballEntity.velocity.dx = paddleConfig.defaultDX;
        break;
      case 'colorUp':
        this.colorPicker.selectColor((this.colorPicker.selectedColorIndex - 1 + this.colorPicker.colors.length) % this.colorPicker.colors.length);
        this.color.color = this.colorPicker.getSelectedColor();
        updateColorPicker(this.colorPicker.selectedColorIndex, 'up');
        break;
      case 'colorDown':
        this.colorPicker.selectColor((this.colorPicker.selectedColorIndex + 1) % this.colorPicker.colors.length);
        this.color.color = this.colorPicker.getSelectedColor();
        updateColorPicker(this.colorPicker.selectedColorIndex, 'down');
        break;
    }
  }

  handleKeyUp(action) {
    switch (action) {
      case 'moveLeft':
      case 'moveRight':
        // Stop moving
        this.velocity.dx = 0;
        if (!ballEntity.isLaunched) ballEntity.velocity.dx = 0;
        break;
    }

    ballEntity.alignBallWithPaddle();
  }

  // Reset paddle to it's initial position
  reset() {
    this.position.x = paddleConfig.startX;
    this.position.y = paddleConfig.startY;
  }

  // Create and append paddle element to game container
  append(paddleConfig, colorPickerColors) {
    const paddleElement = renderingSystem.createEntityElement(paddleConfig);
    gameContainer.appendChild(paddleElement);
    renderingSystem.elements.set(paddleConfig.type, paddleElement);
    this.reset();

    // Update paddle colors
    this.colorPicker.colors = colorPickerColors;
    this.color.color = this.colorPicker.getSelectedColor();

    renderingSystem.update([paddleEntity]);
  }
}

const paddleEntity = new PaddleEntity();
ecsSystem.addEntity(paddleEntity);

export default paddleEntity;