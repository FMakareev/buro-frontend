import React from 'react';
import styled from 'styled-components';

import { Text } from '../Text/Text';
import { SpeedingWheel } from '../SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../PreloaderWrapper/PreloaderWrapper';

const StyledPreloaderWrapper = styled(PreloaderWrapper)`
  opacity: ${props => (props.loading ? 1 : 0)};
  z-index: ${props => (props.loading ? 2 : -2)};
`;

export const LoadingComponent = ({ className, loading, loadingText, ...rest }) => (
  <StyledPreloaderWrapper loading={loading} {...rest}>
    <Text fontSize={12}>
      <SpeedingWheel />
    </Text>
  </StyledPreloaderWrapper>
);

export default LoadingComponent;
