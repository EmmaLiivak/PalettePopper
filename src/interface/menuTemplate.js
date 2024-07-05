import handleMenuNavigation from "./menuNavigation.js";

export default class Menu {
  constructor(menuType) {
    this.menuElement = document.querySelector(menuType);
    this.menuButtons = this.menuElement.querySelector('.menu-buttons');
    this.navigation = handleMenuNavigation(this.menuButtons);
    this.settingsButton = this.menuElement.querySelector('#settings-button');
    this.controlsButton = this.menuElement.querySelector('#controls-button');

    this.settingsButton.addEventListener('click', () => {
      this.hide();
      settingsMenu.show();
    });

    this.controlsButton.addEventListener('click', () => {
      this.hide();
      controlsMenu.show();
    });
  }

  show() {
    this.menuElement.classList.remove('hidden');
    this.navigation.resetFocus();
  }

  hide() {
    this.menuElement.classList.add('hidden');
  }
}