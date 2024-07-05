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

    keyState === 'down' ? this.handleKeyDown(action) : this.handleKeyUp(action);
  }

  handleKeyDown(action) {
    switch (action) {
      case 'moveLeft':
        this.setVelocity(-paddleConfig.defaultDX);
        break;
      case 'moveRight':
        this.setVelocity(paddleConfig.defaultDX);
        break;
      default:
        console.error('Invalid key down action');
        break;
    }
  }

  setVelocity(dx) {
    this.velocity.dx = dx;
    if (!ballEntity.isLaunched) ballEntity.velocity.dx = dx;
  }

  handleKeyUp(action) {
    action === 'moveLeft' || action === 'moveRight' 
      ? this.stopMoving()
      : console.error('Invalid key up action');
  }

  stopMoving() {
    this.velocity.dx = 0;
    if (!ballEntity.isLaunched) ballEntity.velocity.dx = 0;
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