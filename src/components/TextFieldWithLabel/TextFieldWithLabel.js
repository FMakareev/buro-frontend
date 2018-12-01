import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { TextFieldBase } from '../TextFieldBase/TextFieldBase';
import { Text } from '../Text/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled(Text)`
  color: red;
`;

const TextField = styled(TextFieldBase)`
  font-size: ${props => props.theme.fontSizes[5]};
  box-shadow: ${props => props.theme.boxShadow[0]};
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
        <Label>{label}</Label>
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
