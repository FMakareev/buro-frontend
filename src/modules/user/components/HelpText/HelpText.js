import React from 'react';
import styled from 'styled-components';
import {color} from 'styled-system';

import { Text } from '../../../../components/Text/Text';
import {FontFamilyProperty} from "../../../../styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "../../../../styles/styleProperty/FontSizeProperty";
import {LineHeightProperty} from "../../../../styles/styleProperty/LineHeightProperty";

const StyledText = styled(Text)`
  ${(props) => FontFamilyProperty({...props, fontFamily: 'regular'})};
  ${(props) => FontSizeProperty({...props, fontSize: 4})};

  ${(props) => LineHeightProperty({...props, lineHeight: 6})};

  ${(props) => color({...props, color: 'color5'})};

  & > a {
    ${(props) => color({...props, color: 'color8'})};
    text-decoration: none;
  }
`;

export const HelpText = ({ children }) => <StyledText>{children}</StyledText>;

export default HelpText;
