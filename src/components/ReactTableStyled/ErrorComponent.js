import React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';

import { PreloaderWrapper } from '../PreloaderWrapper/PreloaderWrapper';

import { SvgCancelRequest } from '../Icons/SvgCancelRequest';

import { Text } from '../Text/Text';
import { Flex } from '../Flex/Flex';

const Wrapper = styled(PreloaderWrapper)`
  ${props => color({ ...props, color: 'color9' })};
  background-color: rgba(239, 234, 234, 0.44);
`;

const StyledFlex = styled(Flex)`
  align-items: baseline;
  ${props => FillSvgProperty({ ...props, fill: 'color9' })};

  & > svg {
    width: 12px;
    height: 12px;
  }

  & > div {
    ${props => color({ ...props, color: 'color9' })};
  }
`;

export const ErrorComponent = () => (
  <Wrapper>
    <StyledFlex>
      <SvgCancelRequest />
      <Text fontSize={8} ml={2}>
        loading error
      </Text>
    </StyledFlex>
  </Wrapper>
);

export default ErrorComponent;
