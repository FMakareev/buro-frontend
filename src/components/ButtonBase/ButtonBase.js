import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, display, width, space, fontWeight, variant } from 'styled-system';
import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { LineHeightRemProperty } from '../../styles/styleProperty/LineHeightRemProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';

const buttonsVariant = variant({
  key: 'variant.buttons',
  prop: 'variant',
});
const buttonsSize = variant({
  key: 'variant.buttonSize',
  prop: 'size',
});

/**
 * Компонента обычная кнопка
 * @example ./ButtonDefault.example.md
 */
export const ButtonBase = styled.button`
  position: relative;
  outline: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: 0.115s all;
  ${buttonsVariant};
  ${buttonsSize};
  ${space};
  ${width};
  ${color};
  ${display};
  ${fontWeight};
  ${LineHeightRemProperty};
  ${FontSizeProperty};
  ${BackgroundColorProperty};
  ${BorderRadiusProperty};
`;

ButtonBase.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'transparent', 'error' ]),
  /** Background color alias. */
  bgc: PropTypes.string,
  /** Border color alias. */
  bc: PropTypes.string,
  /** Font color. */
  color: PropTypes.string,
  /** Description of prop "px". */
  px: PropTypes.number,
  /** Description of prop "py". */
  py: PropTypes.number,
  /** disabled. */
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

ButtonBase.defaultProps = {
  size: 'medium',
  variant: 'primary',
  type: 'button',
};

export default ButtonBase;
