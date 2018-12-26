import styled from 'styled-components';
import { Text } from '../Text/Text';

import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';

export const CircleCount = styled(Text)`
  display: ${props => (props.children ? 'block' : 'none')};
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
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color1' })};
  color: #ffffff;
`;
export const ButtonStyled = styled(Text)`
  display: flex;
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
