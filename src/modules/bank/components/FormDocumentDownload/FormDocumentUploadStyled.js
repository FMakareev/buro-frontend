import { color } from 'styled-system';
import { Form } from 'redux-form';
import styled from 'styled-components';
import { TextFieldBase } from '@lib/ui/TextFieldBase/TextFieldBase';
import { BorderColorProperty } from '../../../../styles/styleProperty/BorderColorProperty';
import { BorderRadiusProperty } from '../../../../styles/styleProperty/BorderRadiusProperty';
import { LineHeightProperty } from '../../../../styles/styleProperty/LineHeightProperty';
import { FillSvgProperty } from '../../../../styles/styleProperty/FillSvgProperty';

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

export const StyledForm = styled(Form)`
  position: relative;
`;
export const CancelWrapper = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  & svg {
    ${props => FillSvgProperty({ ...props, fill: 'color1' })};

    :hover {
      ${props => FillSvgProperty({ ...props, fill: 'color6' })};
    }
  }
`;

export const TextFieldBaseStyled = styled(TextFieldBase)`
  ${props => LineHeightProperty({ ...props, lineHeight: 6 })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: 2 })};
`;
