import styled from 'styled-components';
import {Flex} from "../Flex/Flex";

export const HeaderWrapper = styled(Flex)`
  border-bottom: 1px solid ${({theme}) => theme.colors.color5}; 
  background-color: #fff;
`;
