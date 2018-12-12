import React from 'react';
import styled from 'styled-components';
import { PreloaderWrapper } from '../PreloaderWrapper/PreloaderWrapper';

import { Text } from '../Text/Text';

const Wrapper = styled(PreloaderWrapper)`
  height: calc(100% - 200px);
`;

export const NoDataComponent = () => (
  <Wrapper>
    <Text fontSize={8}>No data</Text>
  </Wrapper>
);

export default NoDataComponent;
