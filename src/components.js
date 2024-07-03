class Component {
  constructor() {
    this.id = crypto.randomUUID();
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }
}

export class PositionComponent extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class VelocityComponent extends Component {
  constructor(dx, dy) {
    super();
    this.dx = dx;
    this.dy = dy;
  }
}

export class SizeComponent extends Component {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
}

export class ColorComponent extends Component {
  constructor(color) {
    super();
    this.color = color;
  }
}

export class RenderComponent extends Component {
  constructor() {
    super();
  }
}

class CallbackManagerComponent extends Component {
  constructor(tag) {
    super();
    this.tag = tag;
    this.callbacks = {};
  }

  setCallback(targetTag, callback) {
    this.callbacks[targetTag] = callback;
  }

  removeCallback(targetTag) {
    delete this.callbacks[targetTag];
  }

  clearCallbacks() {
    this.callbacks = {};
  }

  invokeCallbacks(targetTag, ...args) {
    const callback = this.callbacks[targetTag];
    if (callback && typeof callback === 'function') {
      callback(...args);
    }
  }
}

export class CollisionComponent extends CallbackManagerComponent {
  constructor(collisionTag) {
    super(collisionTag);
  }
}

export class InputComponent extends CallbackManagerComponent {
  constructor(inputTag) {
    super(inputTag);
  }
}

export class GameStateComponent extends CallbackManagerComponent {
  constructor(gameStateTag) {
    super(gameStateTag);
  }
}

export class LivesComponent extends Component {
  constructor(initialLives) {
    super();
    this.lives = initialLives;
  }
}

export class ScoreComponent extends Component {
  constructor() {
    super();
    this.score = 0;
  }
}