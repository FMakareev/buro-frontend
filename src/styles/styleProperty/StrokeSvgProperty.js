import { style } from 'styled-system';

export const StrokeSvgProperty = style({
  // React prop name
  prop: 'stroke',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'stroke',
  // key for theme values
  key: 'colors',
  // convert number values to pixels
  numberToPx: false,
  // shorthand alias React prop name
  alias: 'stroke',
});

export default StrokeSvgProperty;
