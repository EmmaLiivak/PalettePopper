import { MovementSystem } from './systems/movementSystem.js'
import { RenderingSystem } from './systems/renderingSystem.js';
import CollisionSystem from './systems/collisionSystem.js';
import { BallEntity, TopWallEntity, BottomWallEntity, LeftWallEntity, RightWallEntity } from './entities.js'
import { UpdateFPS, UpdateTime } from './utils.js';

const game = document.querySelector('.gameContainer');
const containerWidth = game.offsetWidth;
const containerHeight = game.offsetHeight;

const entities = [BallEntity, TopWallEntity, BottomWallEntity, LeftWallEntity, RightWallEntity];

const movementSystem = new MovementSystem();
const collisionSystem = new CollisionSystem(entities);
new RenderingSystem(entities, {
  'ball': document.querySelector('.ball'),
});

movementSystem.addComponent(BallEntity);

// Main game loop
function gameLoop() {
  movementSystem.update();
  collisionSystem.update();

  UpdateTime();
  UpdateFPS();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();