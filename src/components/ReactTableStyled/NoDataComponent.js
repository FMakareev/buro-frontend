import React from 'react';
import styled from 'styled-components';
import { PreloaderWrapper } from '../PreloaderWrapper/PreloaderWrapper';

import { Text } from '../Text/Text';

const Wrapper = styled(PreloaderWrapper)`
  background-color: rgba(239, 234, 234, 0.44);
`;

export const NoDataComponent = () => (
  <Wrapper>
    <Text fontSize={8}>No data</Text>
  </Wrapper>
);

export default NoDataComponent;
