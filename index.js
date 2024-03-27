const grid = document.querySelector('.grid');

function addBrickToGrid() {
  const brick = document.createElement('div');
  brick.classList.add('brick');
  grid.appendChild(brick);
}

addBrickToGrid();