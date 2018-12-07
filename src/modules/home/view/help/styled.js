import styled from 'styled-components';

import { Container } from '../../../../components/Container/Container';
import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { TextFieldBase } from '../../../../components/TextFieldBase/TextFieldBase';
import { ButtonWithImageError } from '../../../user/components/ButtonWithImageError/ButtonWithImageError';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 51px - 18px - 36px);

  @media (min-width: 768px) {
    min-height: calc(100vh - 63px - 18px - 36px);
  }
`;

export const Title = styled(Box)`
  width: 100%;
  text-align: center;
  font-size: ${({theme}) => theme && theme.fontSizes && theme.fontSizes[9]}px;
  font-family: ${({theme}) => theme && theme.fontFamily && theme.fontFamily.bold};
  line-height: ${({theme}) => theme && theme.lineHeight && theme.lineHeight[11]}px;
  color: ${({theme}) => theme && theme.colors && theme.colors.color1};
`;

export const Wrapper = styled(Flex)`
  align-items: center;
  padding-left: 30px;
  padding-top: 4px;
  padding-right: 11px;
  padding-bottom: 4px;
  border: 1px solid ${({theme}) => theme && theme.colors && theme.colors.color13};
  background-color: ${({theme}) => theme && theme.colors && theme.colors.color0};
  border-radius: 4px;
  box-shadow: ${({theme}) => theme && theme.boxShadow && theme.boxShadow[1]};
`;

export const StyledTextField = styled(TextFieldBase)`
  font-family: ${({theme}) => theme && theme.fontFamily && theme.fontFamily.bold};
  font-size: ${({theme}) => theme && theme.fontSizes && theme.fontSizes[6]}px;
  line-height: ${({theme}) => theme && theme.lineHeight && theme.lineHeight[9]}px;
  color: ${({theme}) => theme && theme.colors && theme.colors.color1};
  border-style: none !important;
`;

export const HiddenButton = styled(ButtonWithImageError)`
  :disabled {
    display: none !important;
  }
`;
