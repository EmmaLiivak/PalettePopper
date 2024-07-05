import mainMenu from "./mainMenu.js";
import levelManagementSystem from "../systems/levelManagementSystem.js";

  // Function to handle keyboard navigation
  export default function handleMenuNavigation(menuContainer) {
    const menuButtons = Array.from(menuContainer.querySelectorAll('button, .level-select-button'));
    let currentIndex = 0;

    const focusButton = (index) => {
      currentIndex = index;
      menuButtons[currentIndex].focus();
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Tab':
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          focusButton((currentIndex + 1) % menuButtons.length);
          break;
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          focusButton((currentIndex - 1 + menuButtons.length) % menuButtons.length);
          break;
        case 'ArrowLeft':
        case 'd':
          if (menuButtons[currentIndex].id != 'level-select-button') return;
          if (levelManagementSystem.currentLevelIndex <= 0) return;
          levelManagementSystem.currentLevelIndex--;
          mainMenu.updateLevel();
          break;
        case 'ArrowRight':
        case 'a':
          if (menuButtons[currentIndex].id != 'level-select-button') return;
          if (levelManagementSystem.currentLevelIndex >= levelManagementSystem.levels.length - 1) return;
          levelManagementSystem.currentLevelIndex++;
          mainMenu.updateLevel();
          break;
      }
    };

    const maintainFocus = () => {
      if (!menuButtons.includes(document.activeElement)) {
          menuButtons[currentIndex].focus();
      }
    };

    const enable = () => {
      focusButton(0)
      menuContainer.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', maintainFocus);
      document.addEventListener('focusout', maintainFocus);
    };
  
    const disable = () => {
      menuContainer.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', maintainFocus);
      document.removeEventListener('focusout', maintainFocus);
    };
  
    // Initially enable the navigation
    enable();

    // Return control functions
    return {
      enable,
      disable
    };
  }