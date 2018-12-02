import styled from "styled-components";
import {Text} from "../Text/Text";


export const Label = styled(Text)`
  margin-bottom: 8px;
`;

Label.defaultProps = {
  fontFamily: 'regular',
  fontSize: 5,
  lineHeight: 8,
  color: 'color1',
  mb: 3,
};

export default Label;
