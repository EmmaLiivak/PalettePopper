class Component {
  constructor() {
    this.id = crypto.randomUUID();
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }
}

class ObservableComponent extends Component {
  constructor() {
    super();
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notify() {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }
}

export class PositionComponent extends ObservableComponent {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  setX(x) {
    this.x = x;
    this.notify();
  }

  setY(y) {
    this.y = y;
    this.notify();
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

export class ColorComponent extends ObservableComponent {
  constructor(color) {
    super();
    this.color = color;
  }

  setColor(color) {
    this.color = color;
    this.notify();
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