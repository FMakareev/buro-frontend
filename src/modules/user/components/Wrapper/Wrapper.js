import styled from 'styled-components';
import { Container } from '@lib/ui/Container/Container';
import { BorderRadiusProperty } from '../../../../styles/styleProperty/BorderRadiusProperty';
import { BoxShadowProperty } from '../../../../styles/styleProperty/BoxShadowProperty';

export const Wrapper = styled(Container)`
  padding-left: 20px;
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 15px;
  ${props => BorderRadiusProperty({ ...props, borderRadius: 3 })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 0 })};

  @media (max-width: 576px) {
    max-width: 320px;
  }

  @media (min-width: 576px) {
    ${props => (props.regClient ? 'max-width: 700px' : 'max-width: 320px')}
  }
`;

export default Wrapper;
