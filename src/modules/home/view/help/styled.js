import styled from 'styled-components';

import { color } from 'styled-system';
import { Container } from '@lib/ui/Container/Container';
import { Box } from '@lib/ui/Box/Box';
import { Flex } from '@lib/ui/Flex/Flex';
import { TextFieldBase } from '@lib/ui/TextFieldBase/TextFieldBase';
import { ButtonWithImageError } from '../../../user/components/ButtonWithImageError/ButtonWithImageError';

import { FontSizeProperty } from '../../../../styles/styleProperty/FontSizeProperty';
import { FontFamilyProperty } from '../../../../styles/styleProperty/FontFamilyProperty';
import { LineHeightProperty } from '../../../../styles/styleProperty/LineHeightProperty';
import { BoxShadowProperty } from '../../../../styles/styleProperty/BoxShadowProperty';
import { BackgroundColorProperty } from '../../../../styles/styleProperty/BackgroundColorProperty';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 51px - 18px - 36px);

  @media (min-width: 768px) {
    min-height: calc(100vh - 66px - 18px - 36px);
  }
`;

export const Title = styled(Box)`
  width: 100%;
  text-align: center;
  ${props => FontSizeProperty({ ...props, fontSize: 9 })};
  ${props => FontFamilyProperty({ ...props, fontFamily: 'bold' })};
  ${props => LineHeightProperty({ ...props, lineHeight: 11 })};
  ${props => color({ ...props, color: 'color1' })};
`;

export const Wrapper = styled(Flex)`
  align-items: center;
  padding-left: 30px;
  padding-top: 4px;
  padding-right: 11px;
  padding-bottom: 4px;
  border: 1px solid ${props => color({ ...props, color: 'color13' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  border-radius: 4px;
  ${props => BoxShadowProperty({ ...props, boxShadow: 1 })};
`;

export const StyledTextField = styled(TextFieldBase)`
  ${props => FontFamilyProperty({ ...props, fontFamily: 'bold' })};
  ${props => FontSizeProperty({ ...props, fontSize: 6 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 9 })};
  ${props => color({ ...props, color: 'color1' })};
  border-style: none !important;
`;

export const HiddenButton = styled(ButtonWithImageError)`
  :disabled {
    display: none !important;
  }
`;
