import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import { ballConfig } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";
import paddleEntity, { restartPaddle } from "./paddleEntity.js";
import { updateLivesDisplay } from "../interface/livesDisplay.js";
import { gameStateSystem, renderingSystem } from "../systems/index.js";
import { gameContainer } from "../configurations/entityConfigurations.js";

const COLLISION_OBJECTS = {
  TOP_WALL: 'topWall',
  LEFT_WALL: 'leftWall',
  RIGHT_WALL: 'rightWall',
  BOTTOM_WALL: 'bottomWall',
  PADDLE: 'paddle',
  BRICK: 'brick'
};

class BallEntity extends Entity {
  constructor() {
    super('ball');
    this.isLaunched = false;
    this.initComponents();
    this.setupCollisionCallbacks();
    this.setupInputCallbacks();
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
  setupCollisionCallbacks() {
    Object.values(COLLISION_OBJECTS).forEach(collisionObject => {
      this.collision.setCallback(collisionObject, () => this.handleCollision(collisionObject));
    });
  }

  // Add callback to launch the ball when space is pressed
  setupInputCallbacks() {
    this.input.setCallback(' ', () => this.launchBall());
  }

  handleCollision(collisionObject) {
    const paddleColor = paddleEntity.getComponent(ColorComponent); 

    switch (collisionObject) {
      case COLLISION_OBJECTS.BOTTOM_WALL:
        this.restartBall();
        restartPaddle();
        updateLivesDisplay();
        break;

      case COLLISION_OBJECTS.TOP_WALL:
      case COLLISION_OBJECTS.BRICK:
        this.velocity.dy = -this.velocity.dy;
        break;
      
      case COLLISION_OBJECTS.PADDLE:
        this.velocity.dy = -this.velocity.dy;
        this.color.color = paddleColor.color;
        break;

      case COLLISION_OBJECTS.RIGHT_WALL:
      case COLLISION_OBJECTS.LEFT_WALL:
        this.velocity.dx = -this.velocity.dx;
        break;
      
      default:
        console.error('Invalid collision object type');
        break;
    }
  }

  // Add velocity to ball to launch it
  launchBall() {
    if (this.isLaunched || !gameStateSystem.isGameRunning) return;

    this.velocity.dx = ballConfig.defaultDX;
    this.velocity.dy = ballConfig.defaultDY;
    this.isLaunched = true;
  }

  // Align ball with paddle while the ball is not launched
  alignBallWithPaddle() {
    if (this.isLaunched) return;

    const paddlePosition = paddleEntity.getComponent(PositionComponent);
    const paddleSize = paddleEntity.getComponent(SizeComponent);

    // Calculate the new x position for the ball to align it with the center of the paddle
    this.position.x = paddlePosition.x + (paddleSize.width / 2) - (this.size.width / 2);
  }

  // Return ball to it's initial position and velocity
  restartBall() {
    this.position.x = ballConfig.startX;
    this.position.y = ballConfig.startY;
    this.velocity.dx = ballConfig.startDX;
    this.velocity.dy = ballConfig.startDY;
    this.isLaunched = false;
  }

  // Append the ball element to the game container
  appendBall(ballConfig) {
    const ballElement = renderingSystem.createEntityElement(ballConfig);
    gameContainer.appendChild(ballElement);
    renderingSystem.elements.set(ballConfig.type, ballElement);
    this.restartBall();
  }
}

const ballEntity = new BallEntity();
ecsSystem.addEntity(ballEntity);

export default ballEntity;