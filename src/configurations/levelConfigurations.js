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
      colors.transparent, colors.transparent, colors.cadmiumYellow, colors.transparent, colors.transparent,
      colors.transparent, colors.cadmiumYellow, colors.green, colors.cadmiumYellow, colors.transparent,
      colors.cadmiumYellow, colors.green, colors.ceruleanBlue, colors.green, colors.cadmiumYellow,
      colors.transparent, colors.cadmiumYellow, colors.green, colors.cadmiumYellow, colors.transparent,
      colors.transparent, colors.transparent, colors.cadmiumYellow, colors.transparent, colors.transparent,
    ],
    gridColumns: 5,
    gridRows: 5,
    gridGap: 5,
    colorPickerColors: [
      colors.permanentRose, colors.cadmiumYellow, colors.ceruleanBlue,
    ],
  },
  {
    level: 3,
    ball: ballConfig,
    paddle: paddleConfig,
    bricks: [
      colors.transparent, colors.transparent, colors.transparent, colors.transparent, colors.transparent, colors.permanentRose,
      colors.transparent, colors.transparent, colors.transparent, colors.transparent, colors.orange, colors.orange,
      colors.transparent, colors.transparent, colors.transparent, colors.cadmiumYellow, colors.cadmiumYellow, colors.cadmiumYellow,
      colors.transparent, colors.transparent, colors.green, colors.green, colors.green, colors.transparent,
      colors.transparent, colors.ceruleanBlue, colors.ceruleanBlue, colors.ceruleanBlue, colors.transparent, colors.transparent,
      colors.purple, colors.purple, colors.purple, colors.transparent, colors.transparent, colors.transparent,
    ],
    gridColumns: 6,
    gridRows: 6,
    gridGap: 5,
    colorPickerColors: [
      colors.permanentRose, colors.cadmiumYellow, colors.ceruleanBlue,
    ],
  },
];

export default levels;