export default class Component {
  constructor() {
    this.id = crypto.randomUUID();
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }
}

// Position Component
export class PositionComponent extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

// Dimension Component
export class DimensionComponent extends Component {
  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
  }
}

// Velocity Component
export class VelocityComponent extends Component {
  constructor(dx, dy) {
    super();
    this.dx = dx;
    this.dy = dy;
  }
}

// Dimension component
export class Dimension extends Component {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
}

// Render component
export class RenderComponent extends Component {
  constructor(type) {
    super();
    this.type = type;
  }
}

// Collision component
export class CollisionComponent extends Component {
  constructor(collisionTag) {
    super();
    this.collisionTag = collisionTag;
    this.collisionCallbacks = {};
  }

  setCollisionCallback(targetCollisionTag, callback) {
    this.collisionCallbacks[targetCollisionTag] = callback;
  }
}