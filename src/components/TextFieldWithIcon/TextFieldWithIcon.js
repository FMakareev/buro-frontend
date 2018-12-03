import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {TextFieldBase} from '../TextFieldBase/TextFieldBase';
import {Text} from '../Text/Text';
import {Flex} from '../Flex/Flex';
import {Box} from '../Box/Box';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldIconWrapper = styled(Box)`
  position: relative;
  max-width: 320px;
`;

const TextField = styled(TextFieldBase)`
  position: relative;
  padding-left: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: ${props => props.theme.fontFamily.medium};
  font-size: ${props => props.theme.fontSizes[6]}px;
  line-height: ${props => props.theme.fontSizes[11]}px;
  border-radius: ${props => props.theme.fontSizes[2]}px;
  border-color: ${props => {
    if (props.meta.touched && props.meta.error) {
      return props.theme.colors.color9;
    }
  
    if (props.meta.dirty) {
      return props.theme.colors.color1;
    }
    return props.theme.colors.color5;
  }} !important;
  color: ${props => {
    if (props.meta.touched && props.meta.error) {
      return props.theme.colors.color9;
    }
    if (props.meta.dirty) {
      return props.theme.colors.color1;
    }
    return props.theme.colors.color5;
  }} !important;

  ::placeholder {
    color: ${props => props.theme.colors.color5};
  }

  & + svg {
    position: absolute;
    top: 10px;
    right: 10px;

    fill: ${props => {
      if (props.meta.touched && props.meta.error) {
        return props.theme.colors.color9;
      }
      if (props.meta.dirty) {
        return props.theme.colors.color1;
      }
      return props.theme.colors.color5;
    }} !important;
  }

  :focus {
    border-color: ${props => props.theme.colors.color1};
    box-shadow: 0 0 0 5px ${props => props.theme.colors.color10};
    & + svg {
      fill: ${props => props.theme.colors.color1};
    }
  }
`;

const Error = styled.span`
  position: absolute;
  top: -12px;
  font-family: ${props => props.theme.fontFamily.medium};
  font-size: ${props => props.theme.fontSizes[4] - 2}px;
  line-height: ${props => props.theme.fontSizes[4] - 2}px;
  color: ${props => props.theme.colors.color9};
`;

/**
 * Компонент инпута с лейблом (Text Field WithIcon)
 * @example ./TextFieldWithLabel.example.md
 */
export class TextFieldWithIcon extends PureComponent {
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
      icon,
    } = this.props;

    return (
      <Wrapper>
        <Flex alignItems="left" flexDirection="column" position="relative">
          {meta.touched && meta.error && <Error>{meta.error}</Error>}
          <FieldIconWrapper width="100%">
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
            {icon}
          </FieldIconWrapper>

          {/* <Text fill={meta.touched && meta.error ? 'red' : 'black'} fontSize={6} /> */}
        </Flex>
      </Wrapper>
    );
  }
}

export default TextFieldWithIcon;
