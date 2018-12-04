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
  font-family: ${props => props.theme.fontFamily.medium};
  font-size: ${props => props.theme.fontSizes[4] - 2}px;
  line-height: ${props => props.theme.fontSizes[4] - 2}px;
  color: ${props => props.theme.colors.color9};
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
