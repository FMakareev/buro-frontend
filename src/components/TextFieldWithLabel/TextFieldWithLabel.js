import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { color } from 'styled-system';
import { TextFieldBase } from '../TextFieldBase/TextFieldBase';
import { Label } from '../Label/Label';

import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { BoxShadowProperty } from '../../styles/styleProperty/BoxShadowProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextField = styled(TextFieldBase)`
  ${props => FontFamilyProperty({ ...props, fontFamily: 'regular' })};
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 0 })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: 2 })};
`;

const Error = styled.span`
  margin-left: 10px;
  ${props => color({ ...props, color: 'color9' })};
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

  static defaultProps = {
    meta: null,
  };

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
          {meta && meta.error && meta.touched && <Error>{meta.error}</Error>}
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
