import PropTypes from 'prop-types';
import styled from 'styled-components';
import { display, fontWeight, textAlign, letterSpacing, variant } from 'styled-system';

import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';

import { Box } from '../Box/Box';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import {FontSizeProperty} from "../../styles/styleProperty/FontSizeProperty";
import {LineHeightProperty} from "../../styles/styleProperty/LineHeightProperty";
import {TextOverflow} from "../../styles/styleProperty/TextOverflowProperty";
import {Overflow} from "../../styles/styleProperty/OverflowProperty";
import {WhiteSpace} from "../../styles/styleProperty/WhiteSpaceProperty";
import {StrokeSvgProperty} from "../../styles/styleProperty/StrokeSvgProperty";

const textVariant = variant({
  key: 'variant.text',
  prop: 'variant',
});

/**
 * Компонент текста
 * @example ./Text.example.md
 */
export const Text = styled(Box)`
  font-family: inherit;
  text-decoration: none;
  ${textVariant};
  ${display};
  ${letterSpacing};
  ${textAlign};
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${FontFamilyProperty};
  ${fontWeight};
  ${BackgroundColorProperty};
  ${StrokeSvgProperty};
  ${FillSvgProperty};
  ${WhiteSpace};
  ${Overflow};
  ${TextOverflow};
`;

Text.propTypes = {
  /** CSS: mb - margin - bottom */
  mb: PropTypes.any,
  /** CSS : color */
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  whiteSpace: PropTypes.string,
  textOverflow: PropTypes.string,
  overflow: PropTypes.string,
  /** CSS : fontSize */
  fontSize: PropTypes.any,
  /** CSS : fontSize */
  fz: PropTypes.any,
  /** CSS : lineHeight */
  lineHeight: PropTypes.any,
  /** CSS : lineHeight */
  lh: PropTypes.any,

  ...display.propTypes,
  ...fontWeight.propTypes,
  ...textAlign.propTypes,
  ...letterSpacing.propTypes,
};
// TODO review:nik-z: забыл прописать пропсы по умолчанию
Text.defaultProps = {
  color: 'color1',
};

export default Text;
