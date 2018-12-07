import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, display, space, variant } from 'styled-system';

import BorderRadiusProperty from '../../styles/styleProperty/BorderRadiusProperty';
import BorderColorProperty from '../../styles/styleProperty/BorderColorProperty';
import FontSizeProperty from '../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../styles/styleProperty/LineHeightProperty';

const TextField = styled.input`
  width: 100%;
  border: 1px solid;
  ${props => {
    if ((props.meta && props.meta.active) || props.meta.dirty) {
      return BorderRadiusProperty({...props, borderColor: 'color7'})
    }
    return BorderRadiusProperty({...props, borderColor: 'color5'});
  }};
  background-color: transparent;
  box-sizing: border-box;
  padding: 6px 10px 6px 10px;
  ${(props) => color({...props, color: 'color1'})};
  ${(props) => BorderColorProperty({...props, backgroundColor: 'color0'})};
  cursor: 'text';
  ${FontSizeProperty};
  ${LineHeightProperty};
  ${BorderRadiusProperty};
  ${BorderColorProperty};
  ${display};
  ${space};

  &::placeholder {
   ${(props) => color({...props, color: 'color5'})};
  }

  :focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

/**
 * Text Field Base
 * @example ./TextFieldBase.example.md
 */
export class TextFieldBase extends Component {
  static propTypes = {
    /** Description of prop "px: padding-left and padding-right". */
    px: PropTypes.number,
    /** Description of prop "px: padding-top and padding-bottom". */
    py: PropTypes.number,
    lineHeight: PropTypes.number,
    fontSize: PropTypes.number,
    /** input */
    input: PropTypes.object,
    /** input */
    type: PropTypes.string,
    /** class */
    className: PropTypes.string,
    /** input */
    placeholder: PropTypes.string,
    /** input */
    required: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const {
      input,
      type,
      placeholder,
      className,
      required,
      py,
      px,
      disabled,
      meta,
    } = this.props;

    return (
      <TextField
        px={px}
        py={py}
        placeholder={placeholder}
        className={className}
        type={type}
        {...this.props}
        {...input}
        aria-required={required || false}
        disabled={disabled}
        meta={meta}
      />
    );
  }
}

export default TextFieldBase;
