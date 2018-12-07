import React from 'react';

import { Flex } from '../../../../components/Flex/Flex';
import { Box } from '../../../../components/Box/Box';

import { SvgLogo } from '../../../../components/Icons/SvgLogo';
import {Text} from "../../../../components/Text/Text";


export const Title = ({ children, mb }) => (
  <Flex mb={mb}>
    <Box>
      <SvgLogo />
    </Box>
    <Text fontFamily={'bold'} color={'color1'} m={'auto'} ml={6} as="h2" fontSize="24px" lineHeight="32px">
      {children}
    </Text>
  </Flex>
);

export default Title;
