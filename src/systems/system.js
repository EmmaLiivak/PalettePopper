export default class System {
  constructor() {
    this.components = [];
  }

  update() {}

  addComponent(component) {
    this.components.push(component);
  }

  removeComponent(component) {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }
  
  deleteStaleComponents() {
    this.components = this.components.filter(x => !x.isDeleted);
  }
}