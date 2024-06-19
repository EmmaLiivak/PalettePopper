  // Function to handle keyboard navigation
  export default function handleMenuNavigation(menuContainer) {
    const buttons = menuContainer.querySelectorAll('button, .level-select-button');
    let currentIndex = 0;

    // Focus on the first button initially
    if (buttons.length > 0) {
      buttons[currentIndex].focus();
    }

    menuContainer.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          currentIndex = (currentIndex + 1) % buttons.length;
          buttons[currentIndex].focus();
          break;
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[currentIndex].focus();
          break;
      }
    });
  }