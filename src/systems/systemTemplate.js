// Base system template
export default class System {
  constructor() {
    this.components = [];
    this.entities = [];
    this.elements = new Map();
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  addComponent(component) {
    this.components.push(component);
  }

  removeComponent(component) {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  addElement(entityName, element) {
    this.elements.set(entityName, element);
  }

  removeElement(entityName) {
    this.elements.delete(entityName);
  }
}