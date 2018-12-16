import React from 'react';
import styled from 'styled-components';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import {FontFamilyProperty} from "../../../../styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "../../../../styles/styleProperty/FontSizeProperty";
import {color} from 'styled-system';
import {LineHeightProperty} from "../../../../styles/styleProperty/LineHeightProperty";

const ButtonWithImageStyled = styled(ButtonWithImage)`
  width: 100%;
  padding-right: 12px;
  position: relative;
`;

const ErrorHandler = styled.span`
  position: absolute;
  top: -16px;
  left: 0;
  ${(props) => FontFamilyProperty({...props, fontFamily: 'medium'})};
  ${(props) => FontSizeProperty({...props, fontSize: '12px'})};
  ${(props) => LineHeightProperty({...props, lineHeight:  '16px'})};
  ${(props) => color({...props, color: 'color9'})};
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
