import handleMenuNavigation from "./menuNavigation.js";

export default class Menu {
  constructor(menuType) {
    this.menuElement = document.querySelector(menuType);
    this.menuButtons = this.menuElement.querySelector('.menu-buttons');
    this.navigation = handleMenuNavigation(this.menuButtons);
    this.settingsButton = this.menuElement.querySelector('#settings-button');
    this.controlsButton = this.menuElement.querySelector('#controls-button');
    this.controlsMenu = document.querySelector('.controls-menu');
    this.settingsMenu = document.querySelector('.settings-menu');
    this.backButtons = document.querySelectorAll('.back-button');

    this.settingsButton.addEventListener('click', () => {
      this.settingsMenu.classList.remove('hidden');
      this.settingsMenu.querySelector('.back-button').focus();
      this.keepFocusOnBackButton(this.settingsMenu);
      this.navigation.disable();
    });

    this.controlsButton.addEventListener('click', () => {
      this.controlsMenu.classList.remove('hidden');
      this.controlsMenu.querySelector('.back-button').focus();
      this.keepFocusOnBackButton(this.controlsMenu);
      this.navigation.disable();
    });

    this.backButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.parentElement.classList.add('hidden');
        this.navigation.enable();
        this.stopKeepingFocus();
      });
    });
  }

  show() {
    this.menuElement.classList.remove('hidden');
    this.navigation.enable();
  }

  hide() {
    this.menuElement.classList.add('hidden');
    this.navigation.disable();
  }

  keepFocusOnBackButton(menu) {
    this.focusInterval = setInterval(() => {
      const backButton = menu.querySelector('.back-button');
      if (document.activeElement !== backButton) {
        backButton.focus();
      }
    }, 100);
  }

  stopKeepingFocus() {
    clearInterval(this.focusInterval);
  }
}