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
      this.collision.setCallback(collisionObject, (ball, otherEntity) => {
        this.handleCollision(collisionObject, otherEntity)
      });
    });
  }

  handleCollision(collisionObject, otherEntity) {
    if (!this.isLaunched) return;
    switch (collisionObject) {
      case 'bottomWall':
        this.reset();
        paddleEntity.reset();
        gameStateEntity.updateLivesDisplay();
        break;

      case 'topWall':
        this.velocity.dy = -this.velocity.dy;
        this.position.y += this.velocity.dy;
        break;

      case 'rightWall':
      case 'leftWall':
        this.velocity.dx = -this.velocity.dx;
        this.position.x += this.velocity.dx;
        break;
      
      case 'paddle':
        // Determine where the ball hits the paddle
        const hitPosition = this.position.x + this.size.width / 2 - paddleEntity.position.x;

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

        const ballBottomEdgeNextFrame = this.position.y + this.size.height - Math.abs(this.velocity.dy);
        const ballTopEdgeNextFrame = this.position.y + Math.abs(this.velocity.dy);

        // Determine if the ball is hitting the brick from the top or bottom
        if (ballBottomEdgeNextFrame <= brickPosition.y ||
          ballTopEdgeNextFrame >= brickPosition.y + brickSize.height) {
          this.velocity.dy = -this.velocity.dy; // Reverse vertical direction
          this.position.y += this.velocity.dy;
        } else {
          this.velocity.dx = -this.velocity.dx; // Reverse horizontal direction
          this.position.x += this.velocity.dx;
        }
        break;
      
      default:
        console.error('Invalid collision object type');
        break;
    }
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
  }

  // Append the ball element to the game container
  renderBall(config) {
    const ballElement = renderingSystem.createEntityElement(config);
    gameContainer.element.appendChild(ballElement);
    renderingSystem.elements.set(config.type, ballElement);
    this.reset();
  }
}

const ballEntity = new BallEntity();
ecsSystem.addEntity(ballEntity);

export default ballEntity;