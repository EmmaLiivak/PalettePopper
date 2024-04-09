import { CollisionComponent, VelocityComponent, PositionComponent, SizeComponent } from "../components.js";
import System from "./system.js";

export default class CollisionSystem extends System {
  constructor(entities) {
    super();
    this.entities = entities;
  }

  update() {
    this.entities.forEach(entity => {
      if (entity.hasComponent(CollisionComponent)){
        this.entities.forEach(otherEntity => {
          if (entity.id !== otherEntity.id && otherEntity.hasComponent(CollisionComponent)) {
            if (this.checkCollision(entity, otherEntity)) {
              this.handleCollision(entity, otherEntity);
              this.handleCollision(otherEntity, entity);
            }
          }
        });
      }
    });
  }

  checkCollision(entity1, entity2) {
    const pos1 = entity1.getComponent(PositionComponent);
    const pos2 = entity2.getComponent(PositionComponent);
    const size1 = entity1.getComponent(SizeComponent);
    const size2 = entity2.getComponent(SizeComponent);

    return (
      pos1.x - 1 < pos2.x + size2.width &&
      pos1.x + size1.width > pos2.x + 1 &&
      pos1.y - 1 < pos2.y + size2.height &&
      pos1.y + size1.height > pos2.y + 1
    );
  }

  handleCollision(entity1, entity2) {
    if (entity1.name !== 'ball') return;

    const velocity = entity1.getComponent(VelocityComponent);

    switch (entity2.name) {
      case 'topWall':
      case 'bottomWall':
        velocity.dy = -velocity.dy;
        break;
      case 'rightWall':
      case 'leftWall':
        velocity.dx = -velocity.dx;
        break;
      default:
        console.error('Invalid wall type');
        break;
    }
  }
}