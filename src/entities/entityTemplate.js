// Base Entity Template
export default class Entity {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.components = [];
  }

  attachComponents(...components) {
    this.components = [...this.components, ...components];
  }

  removeComponent(componentType) {
    const index = this.components.findIndex(component => component instanceof componentType);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  removeAllComponents() {
    for (const component of this.components) {
      component.delete();
    }
    this.components = [];
  }

  hasComponent(componentType) {
    return this.components.some(component => component instanceof componentType);
  }

  getComponent(componentType) {
    return this.components.find(component => component instanceof componentType);
  }
}