import Entity from "./entityTemplate.js";
import { paddleConfig, gameContainerWidth } from "../configurations/entityConfigurations.js";
import { PositionComponent, VelocityComponent, SizeComponent, ColorComponent, InputComponent, CollisionComponent, RenderComponent, ColorPickerComponent } from "../components.js";
import ecsSystem from "../systems/ECSSystem.js";
import ballEntity from './ballEntity.js'
import { updateColorPicker } from "../interface/colorPicker.js";
import { gameStateSystem, renderingSystem } from "../systems/index.js";
import { gameContainer } from "../configurations/entityConfigurations.js";

const paddleEntity = new Entity('paddle');
ecsSystem.addEntity(paddleEntity);

const paddleInputComponent = new InputComponent('paddle');
const paddleCollisionComponent = new CollisionComponent('paddle')
const paddleColorPickerComponent = new ColorPickerComponent();

paddleEntity.attachComponents(
  new PositionComponent(paddleConfig.startX, paddleConfig.startY),
  new VelocityComponent(paddleConfig.startDX, paddleConfig.startDY),
  new SizeComponent(paddleConfig.width, paddleConfig.height),
  new ColorComponent(paddleConfig.color),
  new RenderComponent(),
  paddleInputComponent,
  paddleCollisionComponent,
  paddleColorPickerComponent
);

// Set callbacks for collision with walls
paddleCollisionComponent.setCallback('leftWall', () => handleWallCollision('left'));
paddleCollisionComponent.setCallback('rightWall', () => handleWallCollision('right'));

const handleWallCollision = (collisionSide) => {
  const position = paddleEntity.getComponent(PositionComponent);
  const size = paddleEntity.getComponent(SizeComponent);
  if (!position || !size) return;

  if (collisionSide === 'left') {
    position.x = 0;
  }
  if (collisionSide === 'right') {
    position.x = gameContainerWidth - size.width;
  }
  ballEntity.alignBallWithPaddle();
};

// Define a mapping between keys and their corresponding actions
const keyMapping = {
  'a': 'moveLeft',
  'arrowleft': 'moveLeft',
  'd': 'moveRight',
  'arrowright': 'moveRight',
  'w': 'colorUp',
  'arrowup': 'colorUp',
  's': 'colorDown',
  'arrowdown': 'colorDown'
};

// Set up input callbacks based on the key mapping
Object.entries(keyMapping).forEach(([key, action]) => {
  paddleInputComponent.setCallback(key, (keyState) => {
    if (!gameStateSystem.isGameRunning) return;
    
    const paddleVelocity = paddleEntity.getComponent(VelocityComponent);
    const ballVelocity = ballEntity.getComponent(VelocityComponent);
    const paddleColor = paddleEntity.getComponent(ColorComponent);

    if (keyState === 'down') {
      switch (action) {
        // Move the paddle
        case 'moveLeft':
          paddleVelocity.dx = -paddleConfig.defaultDX;
          if (!ballEntity.isLaunched) ballVelocity.dx = -paddleConfig.defaultDX;
          break;
        case 'moveRight':
          paddleVelocity.dx = paddleConfig.defaultDX;
          if (!ballEntity.isLaunched) ballVelocity.dx = paddleConfig.defaultDX;
          break;
        // Change the color of the paddle
        case 'colorUp':
          paddleColorPickerComponent.selectColor((paddleColorPickerComponent.selectedColorIndex - 1 + paddleColorPickerComponent.colors.length) % paddleColorPickerComponent.colors.length);
          paddleColor.color = paddleColorPickerComponent.getSelectedColor();
          updateColorPicker(paddleColorPickerComponent.selectedColorIndex, 'up');
          break;
        case 'colorDown':
          paddleColorPickerComponent.selectColor((paddleColorPickerComponent.selectedColorIndex + 1) % paddleColorPickerComponent.colors.length);
          paddleColor.color = paddleColorPickerComponent.getSelectedColor();
          updateColorPicker(paddleColorPickerComponent.selectedColorIndex, 'down');
          break;
      }
    }
    if (keyState === 'up') {
      switch (action) {
        case 'moveLeft':
        case 'moveRight':
          paddleVelocity.dx = 0;
          if (!ballEntity.isLaunched) ballVelocity.dx = 0;
          break;
      }
      ballEntity.alignBallWithPaddle();
    }
  });
});

// Reset paddle to it's initial position
export function restartPaddle() {
  const paddlePosition = paddleEntity.getComponent(PositionComponent);
  paddlePosition.x = paddleConfig.startX;
  paddlePosition.y = paddleConfig.startY;
}

// Create and append paddle element to game container
export function appendPaddle(paddleConfig, colorPickerColors) {
  const paddleElement = renderingSystem.createEntityElement(paddleConfig);
  gameContainer.appendChild(paddleElement);
  renderingSystem.elements.set(paddleConfig.type, paddleElement);
  restartPaddle();

  // Update paddle colors
  const paddleColorPickerComponent = paddleEntity.getComponent(ColorPickerComponent);
  paddleColorPickerComponent.colors = colorPickerColors;
  paddleEntity.getComponent(ColorComponent).color = paddleColorPickerComponent.getSelectedColor();

  renderingSystem.update([paddleEntity]);
}

export default paddleEntity;