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
export class Position extends Component {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

// Velocity Component
export class Velocity extends Component {
  constructor(dx, dy) {
    super();
    this.dx = dx;
    this.dy = dy;
  }
}

// Render component
export class Render extends Component {
  constructor(type) {
    super();
    this.type = type;
  }
}