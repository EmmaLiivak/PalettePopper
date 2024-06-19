import Entity from "./entityTemplate.js";
import { CollisionComponent, PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, RenderComponent } from "../components.js";
import { ballConfig, paddleConfig } from "../configurations/entityConfigurations.js";
import ecsSystem from "../systems/ECSSystem.js";
import paddleEntity from "./paddleEntity.js";
import { updateLivesDisplay } from "../interface/livesDisplay.js";
import { gameStateSystem } from "../systems/index.js";

export let ballIsLaunched = false;

const ballEntity = new Entity('ball');
ecsSystem.addEntity(ballEntity);

const ballCollisionComponent = new CollisionComponent('ball');
const ballInputComponent = new InputComponent('ball');

ballEntity.attachComponents(
  new PositionComponent(ballConfig.startX, ballConfig.startY),
  new VelocityComponent(ballConfig.startDX, ballConfig.startDY),
  new SizeComponent(ballConfig.width, ballConfig.height),
  new ColorComponent(ballConfig.color),
  new RenderComponent(),
  ballCollisionComponent,
  ballInputComponent
);

// Add collision callbacks to ball
ballCollisionComponent.setCallback('topWall', () => collisionHandler('topWall'));
ballCollisionComponent.setCallback('leftWall', () => collisionHandler('leftWall'));
ballCollisionComponent.setCallback('rightWall', () => collisionHandler('rightWall'));
ballCollisionComponent.setCallback('bottomWall', () => collisionHandler('bottomWall'));
ballCollisionComponent.setCallback('paddle', () => collisionHandler('paddle'));
ballCollisionComponent.setCallback('brick', () => collisionHandler('brick'));

function collisionHandler(collisionObject) {
  const velocity = ballEntity.getComponent(VelocityComponent);
  const position = ballEntity.getComponent(PositionComponent);
  const ballColor = ballEntity.getComponent(ColorComponent);
  const paddleColor = paddleEntity.getComponent(ColorComponent);

  switch (collisionObject) {
    case 'bottomWall':
      // Reset ball to start position and velocity
      position.x = ballConfig.startX;
      position.y = ballConfig.startY;
      velocity.dx = ballConfig.startDX;
      velocity.dy = ballConfig.startDY;
      ballIsLaunched = false;

      // Reset paddle to start position
      const paddlePosition = paddleEntity.getComponent(PositionComponent);
      paddlePosition.x = paddleConfig.startX;
      paddlePosition.y = paddleConfig.startY;

      // Update lives
      updateLivesDisplay();
      break;

    case 'topWall':
    case 'brick':
      velocity.dy = -velocity.dy;
      break;
    case 'paddle':
      velocity.dy = -velocity.dy;
      ballColor.color = paddleColor.color;
      break;

    case 'rightWall':
    case 'leftWall':
      velocity.dx = -velocity.dx;
      break;
      
    default:
      console.error('Invalid collision object type');
      break;
  }
}

// Add callback to launch the ball when space is pressed
ballInputComponent.setCallback(' ', () => launchBall());

function launchBall() {
  const velocity = ballEntity.getComponent(VelocityComponent);
  if (!ballIsLaunched && gameStateSystem.isGameRunning) {
    velocity.dx = ballConfig.defaultDX;
    velocity.dy = ballConfig.defaultDY;
    ballIsLaunched = true;
  }
}

export function alignBallWithPaddle () {
  if (!ballIsLaunched){
    const paddlePosition = paddleEntity.getComponent(PositionComponent);
    const paddleSize = paddleEntity.getComponent(SizeComponent);
    const ballPosition = ballEntity.getComponent(PositionComponent);
    const ballSize = ballEntity.getComponent(SizeComponent);

    // Calculate the new x position for the ball to align it with the center of the paddle
    const newBallX = paddlePosition.x + (paddleSize.width / 2) - (ballSize.width / 2);
    ballPosition.x = newBallX;
  }
}

export default ballEntity;