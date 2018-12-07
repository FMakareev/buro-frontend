import React from 'react';
import styled from 'styled-components';

import { Flex } from '../../../../components/Flex/Flex';
import { Box } from '../../../../components/Box/Box';

import { SvgLogo } from '../../../../components/Icons/SvgLogo';
import {Text} from "../../../../components/Text/Text";

// const StyledBox = styled(Box)`
//   margin: auto;
//   margin-left: 17px;
//   font-family: ${({theme}) => theme && theme.fontFamily && theme.fontFamily.bold};
//   color: ${({theme}) => theme && theme.colors && theme.colors.color1};
// `;

export const Title = ({ children, mb }) => (
  <Flex mb={mb}>
    <Box>
      <SvgLogo />
    </Box>
    <Text fontFamily={'bold'} color={'color1'} ml={6} as="h2" fontSize="24px" lineHeight="32px">
      {children}
    </Text>
  </Flex>
);

export default Title;
