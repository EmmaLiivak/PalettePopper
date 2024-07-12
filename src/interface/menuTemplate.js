import handleMenuNavigation from "./menuNavigation.js";
import { updateDynamicPauseMenuElements } from "./pauseMenu.js";

export default class Menu {
  constructor(menuType) {
    this.menuElement = document.querySelector(menuType);
    this.menuButtons = this.menuElement.querySelector('.menu-buttons');
    this.navigation = handleMenuNavigation(this.menuButtons);
    this.settingsButton = this.menuElement.querySelector('#settings-button');
    this.controlsButton = this.menuElement.querySelector('#controls-button');

    this.controlsMenu = new SubMenu(this, '.controls-menu');
    this.settingsMenu = new SubMenu(this, '.settings-menu');
    this.backButtons = document.querySelectorAll('.back-button');

    this.settingsButton.addEventListener('click', () => {
      this.showSubMenu(this.settingsMenu);
    });

    this.controlsButton.addEventListener('click', () => {
      this.showSubMenu(this.controlsMenu);
    });

    this.backButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.hideSubMenu();
      });
    });
  }

  showSubMenu(subMenu) {
    subMenu.menuElement.classList.remove('hidden');
    this.navigation.disable();
    subMenu.navigation.enable();
  }

  hideSubMenu() {
    this.controlsMenu.menuElement.classList.add('hidden');
    this.settingsMenu.menuElement.classList.add('hidden');
    this.controlsMenu.navigation.disable();
    this.settingsMenu.navigation.disable();
    this.navigation.enable();
  }

  show(isGameOver = false, isGameWon = false) {
    updateDynamicPauseMenuElements(isGameOver, isGameWon);
    this.menuElement.classList.remove('hidden');
    this.navigation.enable();
  }

  hide() {
    this.menuElement.classList.add('hidden');
    this.navigation.disable();
  }
}

class SubMenu {
  constructor(parentMenu, menuType) {
    this.menuElement = document.querySelector(menuType);
    this.menuButtons = this.menuElement.querySelector('.menu-buttons');
    this.navigation = handleMenuNavigation(this.menuButtons);
    this.parentMenu = parentMenu;
  }
}