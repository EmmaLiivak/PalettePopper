import { paddleConfig, ballConfig } from "./entityConfigurations.js";
import colors from "./colorConfigurations.js";

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
    colorPickerColors: [
      colors.permanentRose, colors.cadmiumYellow, colors.ceruleanBlue,
    ],
  },
  {
    level: 2,
    ball: ballConfig,
    paddle: paddleConfig,
    bricks: [
      colors.transparent, colors.transparent, colors.lemonYellow, colors.transparent, colors.transparent,
      colors.transparent, colors.lemonYellow, colors.green, colors.lemonYellow, colors.transparent,
      colors.lemonYellow, colors.green, colors.ceruleanBlue, colors.green, colors.lemonYellow,
      colors.transparent, colors.lemonYellow, colors.green, colors.lemonYellow, colors.transparent,
      colors.transparent, colors.transparent, colors.lemonYellow, colors.transparent, colors.transparent,
    ],
    gridColumns: 5,
    gridRows: 5,
    gridGap: 5,
    colorPickerColors: [
      colors.permanentRose, colors.lemonYellow, colors.ceruleanBlue,
    ],
  },
];

export default levels;