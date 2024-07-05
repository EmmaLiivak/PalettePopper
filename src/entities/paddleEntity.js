import Entity from "./entityTemplate.js";
import { paddleConfig, gameContainer } from "../configurations/entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent, RenderComponent } from "../components.js";
import ballEntity from './ballEntity.js'
import { gameStateSystem, renderingSystem, ecsSystem } from "../systems/index.js";
import colorPickerEntity from "./colorPickerEntity.js";

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
    );

    this.position = this.getComponent(PositionComponent);
    this.velocity = this.getComponent(VelocityComponent);
    this.size = this.getComponent(SizeComponent);
    this.color = this.getComponent(ColorComponent);
    this.input = this.getComponent(InputComponent);
    this.collision = this.getComponent(CollisionComponent);
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
      this.position.x = gameContainer.width - this.size.width;
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
  render(paddleConfig) {
    const paddleElement = renderingSystem.createEntityElement(paddleConfig);
    gameContainer.element.appendChild(paddleElement);
    renderingSystem.elements.set(paddleConfig.type, paddleElement);
    this.reset();

    // Update paddle color
    this.color.color = colorPickerEntity.getSelectedColor();
    renderingSystem.update([paddleEntity]);
  }
}

const paddleEntity = new PaddleEntity();
ecsSystem.addEntity(paddleEntity);

export default paddleEntity;