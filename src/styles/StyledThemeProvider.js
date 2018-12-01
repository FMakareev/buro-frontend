import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'rebass';
import { ButtonVariant } from './variants/buttonVariant';
import { ButtonSize } from './variants/buttonSize';
import { TextVariant } from './variants/textVariant';

export const ColorPallet = {
  color0: '#FFFFFF',
  color1: '#093971',
  color2: '#EFF9FC',
  color3: '#E7EDF8',
  color4: '#61C3E2',
  color5: '#A2A2A2',
  color6: '#0F60BD',
  color7: '#072C57',
  color8: '#61C3E2',
  color9: '#EB5757',
  color10: '#E7EDF8',
  color11: '',
};

const Space = [
  0,
  2,
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  64,
  68,
  72,
  76,
  80,
];

const Weight = [300, 500, 700];

const Breakpoints = ['576px', '768px', '992px', '1200px'];

const boxShadow = ['4px 8px 16px rgba(28, 65, 84, 0.08)'];

export const StyledThemeProvider = ({ children }) => (
  <Provider
    theme={{
      space: Space,
      fontSizes: Space,
      fontWeight: Weight,
      lineHeight: Space,
      boxShadow,
      borderRadius: Space,
      borderColor: ColorPallet,
      breakpoints: Breakpoints,
      colors: ColorPallet,
      variant: {
        buttons: ButtonVariant,
        buttonSize: ButtonSize,
        text: TextVariant,
      },
      fontFamily: {
        regular: 'Montserrat Regular',
        medium: 'Montserrat Medium',
        bold: 'Montserrat Bold',
      },
    }}>
    {children}
  </Provider>
);

StyledThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

StyledThemeProvider.defaultProps = {
  children: 'children is empty',
};

export default StyledThemeProvider;
