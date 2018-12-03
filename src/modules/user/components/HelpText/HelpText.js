import React from 'react';
import styled from 'styled-components';

import { Text } from '../../../../components/Text/Text';

const StyledText = styled(Text)`
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes[4]}px;
  line-height: ${props => props.theme.fontSizes[6]}px;
  color: ${props => props.theme.colors.color5};

  & > a {
    color: ${props => props.theme.colors.color8};
    text-decoration: none;
  }
`;

export const HelpText = ({ children }) => <StyledText>{children}</StyledText>;

export default HelpText;
