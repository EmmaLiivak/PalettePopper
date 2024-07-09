import Entity from "./entityTemplate.js";
import { paddleConfig, gameContainer } from "../configurations/entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent, RenderComponent } from "../components.js";
import ballEntity from './ballEntity.js'
import { gameStateSystem, renderingSystem, ecsSystem } from "../systems/index.js";
import colorPickerEntity from "./colorPickerEntity.js";

class PaddleEntity extends Entity {
  constructor() {
    super('paddle');
    this.initComponents();
    this.setCollisionCallbacks();
    this.setInputCallbacks();
    this.keyState = {};
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
    paddleConfig.collisionObjects.forEach(collisionObject => {
      this.collision.setCallback(collisionObject, () => this.handleCollision(collisionObject));
    });
  }

  handleCollision(collisionSide) {
    switch (collisionSide) {
      case 'leftWall':
        this.position.x = 0;
        break;
      case 'rightWall':
        this.position.x = gameContainer.width - this.size.width
        break;
      default:
        console.error('Invalid collision object type');
        break;
    }

    ballEntity.alignBallWithPaddle();
  }

  setInputCallbacks() {
    Object.entries(paddleConfig.keyMapping).forEach(([key, action]) => {
      this.input.setCallback(key, (keyState) => this.handleInput(action, keyState));
    });
  }

  handleInput(action, keyState) {
    if (!gameStateSystem.isGameRunning) return;

    const isKeyDown = keyState === 'down';
    if (this.keyState[action] === isKeyDown) return;

    this.keyState[action] = isKeyDown;
    this.updateVelocity();
    if (!ballEntity.isLaunched) ballEntity.alignBallWithPaddle();
  }

  updateVelocity() {
    const { moveLeft, moveRight } = this.keyState;

    if (moveLeft && moveRight) {
      this.decelerate();
    } else if (moveLeft) {
      this.setVelocity(-paddleConfig.defaultDX);
    } else if (moveRight) {
      this.setVelocity(paddleConfig.defaultDX);
    } else {
      this.decelerate(); // No key pressed, stop moving
    }
  }

  setVelocity(dx) {
    clearInterval(this.decelerationInterval);
    this.velocity.dx = dx;
    if (!ballEntity.isLaunched) ballEntity.velocity.dx = dx;
  }

  decelerate() {
    clearInterval(this.decelerationInterval);

    const initialDirection = Math.sign(this.velocity.dx);

    this.decelerationInterval = setInterval(() => {
      if (this.velocity.dx === 0 || Math.sign(this.velocity.dx) !== initialDirection) {
        clearInterval(this.decelerationInterval);
        this.setVelocity(0);
      } else {
        this.velocity.dx += (this.velocity.dx > 0 ? -paddleConfig.deceleration : paddleConfig.deceleration);
        if (!ballEntity.isLaunched) ballEntity.velocity.dx = this.velocity.dx;
      }
    }, 30);
  }

  // Reset paddle to it's initial position
  reset() {
    this.position.x = paddleConfig.startX;
    this.position.y = paddleConfig.startY;
    this.color.color = colorPickerEntity.getSelectedColor();
  }

  // Create and append paddle element to game container
  render(paddleConfig) {
    const paddleElement = renderingSystem.createEntityElement(paddleConfig);
    gameContainer.element.appendChild(paddleElement);
    renderingSystem.elements.set(paddleConfig.type, paddleElement);
    this.reset();
    renderingSystem.update([paddleEntity]);
  }
}

const paddleEntity = new PaddleEntity();
ecsSystem.addEntity(paddleEntity);

export default paddleEntity;