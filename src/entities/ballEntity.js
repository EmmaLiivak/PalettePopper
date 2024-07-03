import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import { ballConfig } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";
import paddleEntity from "./paddleEntity.js";
import { gameStateSystem, renderingSystem } from "../systems/index.js";
import { gameContainer } from "../configurations/entityConfigurations.js";
import gameStateEntity from "./gameManagerEntity.js";

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
    Object.values(COLLISION_OBJECTS).forEach(collisionObject => {
      this.collision.setCallback(collisionObject, () => this.handleCollision(collisionObject));
    });
  }

  // Add callback to launch the ball when space is pressed
  setInputCallbacks() {
    this.input.setCallback(' ', () => this.launchBall());
  }

  handleCollision(collisionObject) {
    switch (collisionObject) {
      case COLLISION_OBJECTS.BOTTOM_WALL:
        this.reset();
        paddleEntity.reset();
        gameStateEntity.updateLivesDisplay();
        break;

      case COLLISION_OBJECTS.TOP_WALL:
      case COLLISION_OBJECTS.BRICK:
        this.velocity.dy = -this.velocity.dy;
        break;
      
      case COLLISION_OBJECTS.PADDLE:
        this.velocity.dy = -this.velocity.dy;
        this.color.color = paddleEntity.color.color;
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
  }

  // Append the ball element to the game container
  render(ballConfig) {
    const ballElement = renderingSystem.createEntityElement(ballConfig);
    gameContainer.appendChild(ballElement);
    renderingSystem.elements.set(ballConfig.type, ballElement);
    this.reset();
  }
}

const ballEntity = new BallEntity();
ecsSystem.addEntity(ballEntity);

export default ballEntity;