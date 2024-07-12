import mainMenu from "./mainMenu.js";
import levelManagementSystem from "../systems/levelManagementSystem.js";

  // Function to handle keyboard navigation
  export default function handleMenuNavigation(menuContainer) {
    const menuButtons = Array.from(menuContainer.querySelectorAll('button, .level-select-button, .slider-container'));
    const volumeSliders = Array.from(menuContainer.querySelectorAll('.slider-container input[type="range"]'));
    let currentIndex = 0;

    const focusButton = (index) => {
      menuButtons.forEach(button => button.classList.remove('focused'));
      currentIndex = index;
      menuButtons[currentIndex].focus();
      menuButtons[currentIndex].classList.add('focused');
    };

    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 9: // tab
        case 40: // down arrow
        case 83: // s
          e.preventDefault();
          focusButton((currentIndex + 1) % menuButtons.length);
          break;
        case 38: // up arrow
        case 87: // w
          e.preventDefault();
          focusButton((currentIndex - 1 + menuButtons.length) % menuButtons.length);
          break;
        case 37: // left arrow
        case 65: // a
          e.preventDefault();
          // Go down a level
          if (menuButtons[currentIndex].id === 'level-select-button') {
            levelManagementSystem.currentLevelIndex = Math.max(0, levelManagementSystem.currentLevelIndex - 1);
            mainMenu.updateLevel();
          }
          // Decrease volume
          if (menuButtons[currentIndex].classList.contains('slider-container')) {
            const slider = volumeSliders.find(slider => slider === menuButtons[currentIndex].querySelector('input[type="range"]'));
            slider.value = Math.max(0, slider.value - 10);
            slider.dispatchEvent(new Event('input'));
          }
          break;
        case 39: // right arrow
        case 68: // d
          e.preventDefault();
          if (menuButtons[currentIndex].id === 'level-select-button') {
            levelManagementSystem.currentLevelIndex = Math.min(levelManagementSystem.levels.length - 1, levelManagementSystem.currentLevelIndex + 1);
            mainMenu.updateLevel();
          }
          if (menuButtons[currentIndex].classList.contains('slider-container')) {
            const slider = volumeSliders.find(slider => slider === menuButtons[currentIndex].querySelector('input[type="range"]'));
            slider.value = Math.min(100, parseInt(slider.value) + 10);
            slider.dispatchEvent(new Event('input'));
          }
          break;
      }
    };

    const maintainFocus = () => {
      if (!menuButtons.includes(document.activeElement)) {
          menuButtons[currentIndex].focus();
      }
    };

    const enable = () => {
      focusButton(currentIndex)
      menuContainer.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', maintainFocus);
      document.addEventListener('focusout', maintainFocus);
    };
  
    const disable = () => {
      menuContainer.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', maintainFocus);
      document.removeEventListener('focusout', maintainFocus);
    };

    const updateCurrentIndex = (newIndex) => {
      currentIndex = newIndex;
    };
  
    // Initially enable the navigation
    enable();

    // Return control functions
    return {
      enable,
      disable,
      updateCurrentIndex
    };
  }