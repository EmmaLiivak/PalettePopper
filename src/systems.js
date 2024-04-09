import { PositionComponent, VelocityComponent, SpeedComponent, DimensionComponent, BodyComponent, CollisionComponent, SizeComponent } from './components.js';

// Keyboard Input System
export class KeyboardInputSystem extends System {
  constructor(entity, gameWidth) {
    super();
    this.entity = entity;
    this.gameWidth = gameWidth;
    this.left = false;
    this.right = false;
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    switch (event.code) {
      case 'KeyA':
      case 'ArrowLeft':
        this.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.right = true;
        break;
      default:
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'KeyA':
      case 'ArrowLeft':
        this.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.right = false;
        break;
      default:
        break;
    }
  }

  update() {
    // Update the position of the entity
    const entityPosition = this.entity.getComponent(PositionComponent);
    const entityDimension = this.entity.getComponent(DimensionComponent);
    const entitySpeed = this.entity.getComponent(SpeedComponent);
    
    if (this.left && entityPosition.x > 0) {
      entityPosition.x -= entitySpeed.speed;
    }
    if (this.right && entityPosition.x + entityDimension.width < this.gameWidth) {
      entityPosition.x += entitySpeed.speed;
    }
  }
}
