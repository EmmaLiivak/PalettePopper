const colorPickerContainer = document.querySelector('.color-picker');

export function createColorPicker(colors) {
  colorPickerContainer.innerHTML = '';

  colors.forEach((color, index) => {
    const colorDot = document.createElement('div');
    colorDot.classList.add('color-dot');
    colorDot.style.backgroundColor = color;
    colorDot.setAttribute('data-index', index);
    colorDot.style.order = index;
    if (index === 1) colorDot.classList.add('selected-color');
    colorPickerContainer.appendChild(colorDot);
  });
}

export function updateColorPicker(selectedIndex, direction) {
  const colorDots = document.querySelectorAll('.color-dot');

  colorDots.forEach((dot, index) => {
    if (index === selectedIndex) {
      dot.classList.add('selected-color');
      dot.style.order = 1;
    } else {
      dot.classList.remove('selected-color');
      if (direction === 'down') {
        dot.style.order = dot.style.order + 1 > 1 ? 0 : 2;
      } else {
        dot.style.order = dot.style.order - 1 < 1 ? 2 : 0;
      }
    }
  });
}