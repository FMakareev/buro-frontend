import React, {Component} from 'react';
import styled from 'styled-components';
import {Text} from "../Text/Text";
import {SvgBell} from "../Icons/SvgBell";

export const CircleCount = styled(Text)`
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 16px;
  min-height: 16px;
  text-align: center;
  border-radius: 500px;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 16px;
  padding: 0 4px;
  background-color: ${({theme}) => theme.colors.color1};
  color: #ffffff;
`;
const ButtonStyled = styled(Text)`
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0;
  height: 40px;
  width: 40px;
  line-height: 0;
  cursor: pointer;
  outline: none;
`;

export class HeaderNotification extends Component {
  render() {
    return (<ButtonStyled as={'button'} fontSize={'40px'}>
      <CircleCount>
        6
      </CircleCount>
      <SvgBell/>
    </ButtonStyled>)
  }
}

export default HeaderNotification;
