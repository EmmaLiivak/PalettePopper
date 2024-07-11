import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import paddleEntity from "./paddleEntity.js";
import { gameStateSystem, renderingSystem, ecsSystem } from "../systems/index.js";
import { gameContainer, ballConfig, paddleConfig} from "../configurations/entityConfigurations.js";
import gameStateEntity from "./gameManagerEntity.js";

class BallEntity extends Entity {
  constructor() {
    super('ball');
    this.isLaunched = false;
    this.initComponents();
    this.setCollisionCallbacks();
    this.setInputCallbacks();
    this.bounceSound = new Audio('./assets/bounce.wav');
    this.launchMessage = document.querySelector('#launch-message');
  }

  initComponents() {
    this.attachComponents(
      new PositionComponent(ballConfig.startX, ballConfig.startY),
      new VelocityComponent(ballConfig.startDX, ballConfig.startDY),
      new SizeComponent(ballConfig.width, ballConfig.height),
      new ColorComponent(ballConfig.color),
      new RenderComponent(),
      new CollisionComponent('ball'),
      new InputComponent('ball')
    );

    this.position = this.getComponent(PositionComponent);
    this.velocity = this.getComponent(VelocityComponent);
    this.size = this.getComponent(SizeComponent);
    this.color = this.getComponent(ColorComponent);
    this.render = this.getComponent(RenderComponent);
    this.collision = this.getComponent(CollisionComponent);
    this.input = this.getComponent(InputComponent);
  }

  // Add callbacks to all collision objects
  setCollisionCallbacks() {
    ballConfig.collisionObjects.forEach(collisionObject => {
      this.collision.setCallback(collisionObject, (ball, otherEntity, hitPosition) => {
        this.handleCollision(collisionObject, otherEntity, hitPosition)
      });
    });
  }

  handleCollision(collisionObject, otherEntity, hitPoint) {
    if (!this.isLaunched) return;
    switch (collisionObject) {
      case 'bottomWall':
        this.reset();
        paddleEntity.reset();
        gameStateEntity.updateLivesDisplay();
        break;

      case 'topWall':
        this.bounceSound.play();
        this.setVelocity(this.velocity.dx, -this.velocity.dy);
        break;

      case 'rightWall':
      case 'leftWall':
        this.bounceSound.play();
        this.setVelocity(-this.velocity.dx);
        break;
      
      case 'paddle':
        this.bounceSound.play();
        const hitPosition = hitPoint.x - paddleEntity.position.x;
        // Find the appropriate section in paddleConfig based on hit position
        const section = paddleConfig.sections.find(
          section => hitPosition >= section.start && hitPosition < section.end
        );

        if (!section) break;

        // Set new velocity direction
        this.velocity.dy = -this.velocity.dy;
        this.velocity.dx = section.dx;

        // Normalize velocity vector to desired speed
        const magnitude = Math.sqrt(this.velocity.dx ** 2 + this.velocity.dy ** 2);
        this.velocity.dx = (this.velocity.dx / magnitude) * ballConfig.desiredSpeed;
        this.velocity.dy = -(Math.abs(this.velocity.dy / magnitude) * ballConfig.desiredSpeed);

        // Match ball color to paddle color
        this.color.color = paddleEntity.color.color
        break;

      case 'brick':
        const brickPosition = otherEntity.getComponent(PositionComponent);
        const brickSize = otherEntity.getComponent(SizeComponent);

        // Calculate the distances from the ball's center to the brick's edges
        const distanceToLeft = Math.abs(hitPoint.x - brickPosition.x);
        const distanceToRight = Math.abs(hitPoint.x - (brickPosition.x + brickSize.width));
        const distanceToTop = Math.abs(hitPoint.y - brickPosition.y);
        const distanceToBottom = Math.abs(hitPoint.y - (brickPosition.y + brickSize.height));

        // Determine the smallest distance to decide the collision direction
        const minDistanceX = Math.min(distanceToLeft, distanceToRight);
        const minDistanceY = Math.min(distanceToTop, distanceToBottom);

        // Handle collision based on the smallest distance
        if (minDistanceX < minDistanceY) {
          // Horizontal collision
          this.setVelocity(-this.velocity.dx);
        } else {
          // Vertical collision
          this.setVelocity(this.velocity.dx, -this.velocity.dy);
        }
        break;
      
      default:
        console.error('Invalid collision object type');
        break;
    }
  }

  setVelocity(dx = this.velocity.dx, dy = this.velocity.dy) {
    this.velocity.dx = dx;
    this.velocity.dy = dy;

    // Adjust ball position to prevent sticking
    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;
  }

   // Add callback to launch the ball when space is pressed
   setInputCallbacks() {
    this.input.setCallback(' ', () => this.launch());
  }

  // Add velocity to ball to launch it
  launch() {
    if (this.isLaunched || !gameStateSystem.isGameRunning) return;

    this.velocity.dx = ballConfig.defaultDX;
    this.velocity.dy = ballConfig.defaultDY;
    this.isLaunched = true;
    this.launchMessage.classList.add('hidden');
  }

  // Align ball with paddle while the ball is not launched
  alignBallWithPaddle() {
    if (this.isLaunched) return;

    // Calculate the new x position for the ball to align it with the center of the paddle
    this.position.x = paddleEntity.position.x + (paddleEntity.size.width / 2) - (this.size.width / 2);
  }

  // Return ball to it's initial position and velocity
  reset() {
    this.position.x = ballConfig.startX;
    this.position.y = ballConfig.startY;
    this.velocity.dx = ballConfig.startDX;
    this.velocity.dy = ballConfig.startDY;
    this.isLaunched = false;
    this.color.color = paddleEntity.color.color;
    this.launchMessage.classList.remove('hidden');
  }

  // Append the ball element to the game container
  renderBall(config) {
    this.element = renderingSystem.createEntityElement(config);
    gameContainer.element.appendChild(this.element);
    renderingSystem.elements.set(config.type, this.element);
    this.reset();
  }
}

const ballEntity = new BallEntity();
ecsSystem.addEntity(ballEntity);

export default ballEntity;