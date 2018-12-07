import React from 'react';
import styled from 'styled-components';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';

const ButtonWithImageStyled = styled(ButtonWithImage)`
  width: 100%;
  padding-right: 12px;
  position: relative;
`;

const ErrorHandler = styled.span`
  position: absolute;
  top: -12px;
  left: 0;
  font-family: ${({theme}) => theme && theme.fontFamily && theme.fontFamily.medium};
  font-size: ${({theme}) => theme && theme.fontSizes && theme.fontSizes[4] - 2}px;
  line-height: ${({theme}) => theme && theme.fontSizes[4] && theme.fontSizes[4] - 2}px;
  color: ${({theme}) => theme && theme.colors && theme.colors.color9};
`;

export const ButtonWithImageError = ({ children, error, ...props }) => (
  <React.Fragment>
    <ButtonWithImageStyled error={error} {...props}>
      {error && <ErrorHandler>{error}</ErrorHandler>}
      {children}
    </ButtonWithImageStyled>
  </React.Fragment>
);

export default ButtonWithImageError;
