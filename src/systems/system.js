export default class System {
  constructor() {
    this.components = [];
  }

  update() {}

  addComponent(component) {
    this.components.push(component);
  }
  
  deleteStaleComponents() {
    this.components = this.components.filter(x => !x.isDeleted);
  }
}