import { paddleConfig, ballConfig } from "./entityConfigurations";

const levels = [
  {
    level: 1,
    entities: [
      { type: "paddle", config: paddleConfig },
      { type: "ball", config: ballConfig },
      ...brickEntitiesFromColors([
        'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow', 'red', 'yellow',
        'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow', 'red',
        'red', 'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow',
        'yellow', 'red', 'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue',
      ])
    ],
    gridColumns: 10,
    gridRows: 4,
  },
  {
    level: 2,
    entities: [
      { type: "paddle", config: paddleConfig },
      { type: "ball", config: ballConfig },
      ...brickEntitiesFromColors([
        'red', 'red', 'red', 'red', 'red',
        'orange', 'orange', 'orange', 'orange', 'orange',
        'yellow', 'yellow', 'yellow', 'yellow', 'yellow',
      ])
    ],
    gridColumns: 5,
    gridRows: 3,
  },
];

function brickEntitiesFromColors(colors) {
  return colors.map((color) => ({ type: "brick", config: { color } }));
}

export default levels;