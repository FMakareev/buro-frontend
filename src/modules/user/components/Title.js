import React from 'react';
import styled from 'styled-components';

import { Flex } from '../../../components/Flex/Flex';
import { Box } from '../../../components/Box/Box';

import { SvgLogo } from '../../../components/Icons/SvgLogo';

const StyledBox = styled(Box)`
  margin: auto;
  margin-left: 17px;
  font-family: ${props => props.theme.fontFamily.bold};
  color: ${props => props.theme.colors.color1};
`;

export const Title = ({ children, mb }) => (
  <Flex mb={mb}>
    <Box>
      <SvgLogo />
    </Box>
    <StyledBox as="h2" fontSize="24px" lineHeight="32px">
      {children}
    </StyledBox>
  </Flex>
);

export default Title;
