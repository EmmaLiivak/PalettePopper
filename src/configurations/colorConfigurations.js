class Color {
  constructor(name, hexCode, isPrimary = true, requiredHits = [], isTransparent = false) {
    this.name = name;
    this.hexCode = hexCode;
    this.isPrimary = isPrimary;
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
  frenchUltramarine: new Color('French Ultramarine', '#142AD6'),
  alizarinCrimson: new Color('Alizarin Crimson', '#C7113A'),
  transparent: new Color('Transparent', 'transparent', false, [], true),
};

// Define secondary colors
colors.green = new Color('Green', '#ACDA78', false, [colors.lemonYellow, colors.ceruleanBlue]);
colors.purple = new Color('Purple', '#6E218B', false, [colors.frenchUltramarine, colors.alizarinCrimson]),
colors.orange = new Color('Orange', '#FF8043', false, [colors.cadmiumYellow, colors.permanentRose]);

export default colors;