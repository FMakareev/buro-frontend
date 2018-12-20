import { color } from 'styled-system';
import styled from 'styled-components';
import { BorderColorProperty } from '../../../../styles/styleProperty/BorderColorProperty';

export const WrapperMessage = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  width: 650px;
  height: 396px;
  padding: 3%;
  box-shadow: 4px 8px 16px rgba(28, 65, 84, 0.08);

  ${props => {
    if (props.reject) {
      return color({ ...props, color: 'color9' });
    }
    return color({ ...props, color: 'color1' });
  }};
  border: 0.5px solid;
  ${(reject, props) => {
    if (reject) {
      return BorderColorProperty({ ...props, borderColor: 'color9' });
    }
    return BorderColorProperty({ ...props, borderColor: 'color14' });
  }};
`;

export const MessageContentStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
