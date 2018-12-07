import styled from 'styled-components';
import { Container } from '../../../../components/Container/Container';
import {BorderRadiusProperty} from "../../../../styles/styleProperty/BorderRadiusProperty";
import {BoxShadowProperty} from "../../../../styles/styleProperty/BoxShadowProperty";

export const Wrapper = styled(Container)`
  max-width: 360px;
  padding-left: 20px;
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 15px;
  ${(props) => BorderRadiusProperty({...props, borderRadius: 3})};
  ${(props) => BoxShadowProperty({...props, boxShadow: 0})};    
`;

export default Wrapper;
