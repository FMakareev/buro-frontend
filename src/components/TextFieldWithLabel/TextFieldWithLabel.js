import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { TextFieldBase } from '../TextFieldBase/TextFieldBase';
import {Label} from "../Label/Label";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;



const TextField = styled(TextFieldBase)`
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes[5]}px;
  line-height: ${props => props.theme.fontSizes[8]}px;
  box-shadow: ${props => props.theme.boxShadow[0]};
  border-radius: ${props => props.theme.fontSizes[2]}px;
`;

const Error = styled.span`
  margin-left: 10px;
  color: ${props => props.theme.colors.color9};
`;

/**
 * Компонент инпута с лейблом (Text Field With Label)
 * @example ./TextFieldWithLabel.example.md
 */
export class TextFieldWithLabel extends PureComponent {
  static propTypes = {
    /** class */
    className: PropTypes.string,
    /** class */
    classNameTextField: PropTypes.string,
    /** input */
    label: PropTypes.string,
    /** input */
    placeholder: PropTypes.string,
    /** input */
    required: PropTypes.string,
    /** input */
    type: PropTypes.string,
    /** input */
    disabled: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const {
      classNameTextField,
      input,
      label,
      type,
      meta,
      placeholder,
      required,
      disabled,
      loading,
    } = this.props;

    return (
      <Wrapper>
        <Label>
          {label}
          {meta.error && meta.touched && <Error>{meta.error}</Error>}
        </Label>

        <TextField
          required={required}
          type={type}
          className={classNameTextField}
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          meta={meta}
          label={label}
        />
      </Wrapper>
    );
  }
}
export default TextFieldWithLabel;
