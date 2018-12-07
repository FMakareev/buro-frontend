import styled from 'styled-components';
import { Container } from '../../../../components/Container/Container';

export const Wrapper = styled(Container)`
  max-width: 360px;
  padding-left: 20px;
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-radius: ${({theme}) => theme && theme.borderRadius && theme.borderRadius[3]}px;
  box-shadow: ${({theme}) => theme && theme.boxShadow && theme.boxShadow[0]};
`;

export default Wrapper;
