import handleMenuNavigation from "./menuNavigation.js";
import { updateDynamicPauseMenuElements } from "./pauseMenu.js";

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
    this.volumeSlider = document.getElementById('volume-slider');
    this.backgroundMusic = document.getElementById('background-music')

    this.settingsButton.addEventListener('click', () => {
      this.showSubMenu(this.settingsMenu);
    });

    this.controlsButton.addEventListener('click', () => {
      this.showSubMenu(this.controlsMenu);
    });

    this.backButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.parentElement.classList.add('hidden');
        this.navigation.enable();
        this.stopKeepingFocus(button);
      });
    });

    this.volumeSlider.addEventListener('input', () => {
      this.backgroundMusic.volume = this.volumeSlider.value / 100;
    });
  }

  showSubMenu(subMenu) {
    subMenu.classList.remove('hidden');
    this.keepFocusOnBackButton(subMenu);
    this.navigation.disable();
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

  keepFocusOnBackButton(menu) {
    const backButton = menu.querySelector('.back-button');
    backButton.classList.add('focused');
    this.focusInterval = setInterval(() => {
      if (document.activeElement !== backButton) {
        backButton.focus();
      }
    }, 100);
  }

  stopKeepingFocus(button) {
    button.classList.remove('focused');
    clearInterval(this.focusInterval);
  }
}