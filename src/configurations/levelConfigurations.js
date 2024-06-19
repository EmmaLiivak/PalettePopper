import { paddleConfig, ballConfig } from "./entityConfigurations.js";

const colors = {
  lemonYellow: '#FFF80A',
  ceruleanBlue: '#3EAFE9',
  green: '#ACDA78',
  cadmiumYellow: '#FDC50C',
  permanentRose: '#FE0789',
  orange: '#FF8043',
  frenchUltramarine: '#142AD6',
  alizarinCrimson: '#C7113A',
  purple: '#6E218B',
};

const levels = [
  {
    level: 1,
    ball: ballConfig,
    paddle: paddleConfig,
    bricks: [
      colors.cadmiumYellow, colors.cadmiumYellow, colors.cadmiumYellow,
      colors.orange, colors.orange, colors.orange,
      colors.permanentRose, colors.permanentRose, colors.permanentRose,
    ],
    gridColumns: 3,
    gridRows: 3,
    gridGap: 5,
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
    gridGap: 5,
  },
];

export default levels;