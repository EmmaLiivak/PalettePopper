class Color {
  constructor(name, hexCode, isSecondary = false, requiredHits = [], isTransparent = false) {
    this.name = name;
    this.hexCode = hexCode;
    this.isSecondary = isSecondary;
    this.requiredHits = requiredHits;
    this.isTransparent = isTransparent;
  }
}

// Define primary colors
const colors = {
  lemonYellow: new Color('Lemon Yellow', '#FFF80A'),
  ceruleanBlue: new Color('Cerulean Blue', '#3EAFE9'),
  cadmiumYellow: new Color('Cadmium Yellow', '#FDC50C'),
  permanentRose: new Color('Permanent Rose', '#FE0789'),
  transparent: new Color('Transparent', 'transparent', false, [], true),
};

// Define secondary colors
colors.green = new Color('Green', '#ACDA78', true, [colors.lemonYellow, colors.ceruleanBlue]);
colors.purple = new Color('Purple', '#6E218B', true, [colors.ceruleanBlue, colors.permanentRose]),
colors.orange = new Color('Orange', '#FF8043', true, [colors.cadmiumYellow, colors.permanentRose]);

export default colors;