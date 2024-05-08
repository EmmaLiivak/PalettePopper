import { paddleConfig, ballConfig } from "./entityConfigurations.js";


const levels = [
  {
    level: 1,
    ball: ballConfig,
    paddle: paddleConfig,
    bricks: [
      'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow', 'red', 'yellow',
      'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow', 'red',
      'red', 'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue', 'yellow',
      'yellow', 'red', 'yellow', 'blue', 'red', 'red', 'yellow', 'red', 'blue', 'blue',
    ],
    gridColumns: 10,
    gridRows: 4,
  },
  {
    level: 2,
    ball: ballConfig,
    paddle: paddleConfig,
    bricks: [
      'red', 'red', 'red', 'red', 'red',
      'orange', 'orange', 'orange', 'orange', 'orange',
      'yellow', 'yellow', 'yellow', 'yellow', 'yellow',
    ],
    gridColumns: 5,
    gridRows: 3,
  },
];

export default levels;