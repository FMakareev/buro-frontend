import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {TextFieldBase} from '../TextFieldBase/TextFieldBase';
import {Flex} from '../Flex/Flex';
import {Box} from '../Box/Box';
import {FontFamilyProperty} from "../../styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "../../styles/styleProperty/FontSizeProperty";
import {LineHeightProperty} from "../../styles/styleProperty/LineHeightProperty";
import {BorderRadiusProperty} from "../../styles/styleProperty/BorderRadiusProperty";
import {BorderColorProperty} from "../../styles/styleProperty/BorderColorProperty";
import {BoxShadowProperty} from "../../styles/styleProperty/BoxShadowProperty";
import {FillSvgProperty} from "../../styles/styleProperty/FillSvgProperty";
import {StrokeSvgProperty} from "../../styles/styleProperty/StrokeSvgProperty";
import {color} from 'styled-system';

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
  ${(props) => FontFamilyProperty({...props, fontFamily: 'medium'})};
  ${(props) => FontSizeProperty({...props, fontSize: 6})};
  ${(props) => LineHeightProperty({...props, lineHeight: 11})};
  ${(props) => BorderRadiusProperty({...props, borderRadius: 2})};

  ${props => {
    if (props.meta.touched && props.meta.error) {
      return  BorderColorProperty({...props, borderColor: 'color9'});
    }
    if (props.meta.dirty) {
      return  BorderColorProperty({...props, borderColor: 'color1'});
    }
    return  BorderColorProperty({...props, borderColor: 'color5'});
  }}
  
  ${props => {
    if (props.meta.touched && props.meta.error) {
      return color({...props, color: 'color9'});
    }
    if (props.meta.dirty) {
      return color({...props, color: 'color1'});
    }
    return color({...props, color: 'color5'});
  }}

  ::placeholder {
     ${props => {
      if (props.meta.touched && props.meta.error) {
        return color({...props, color: 'color9'});
      }
      if (props.meta.dirty) {
        return color({...props, color: 'color1'});
      }
      return color({...props, color: 'color5'});
    }}

  }

  :focus {
    ${(props) => BorderColorProperty({...props, borderColor: 'color1'})};
    ${(props) => BoxShadowProperty({...props, boxShadow: 2})};    
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  ${(props) => FillSvgProperty({...props, fill: 'color9'})};
  ${props => {
    if (props.meta.touched && props.meta.error) {
      return FillSvgProperty({...props, fill: 'color9'});
    }
    if (props.meta.dirty) {
      return FillSvgProperty({...props, fill: 'color1'});
    }
    return FillSvgProperty({...props, fill: 'color5'});
  }}
  ${props => {
    if (props.meta.touched && props.meta.error) {
      return StrokeSvgProperty({...props, stroke: 'color9'});
    }
    if (props.meta.dirty) {
      return StrokeSvgProperty({...props, stroke: 'color1'});
    }
    return StrokeSvgProperty({...props, stroke: 'color5'});
  }}

`;
const Error = styled.span`
  position: absolute;
  top: -16px;
  
  ${(props) => FontFamilyProperty({...props, fontFamily: 'medium'})};
  ${(props) => FontSizeProperty({...props, fontSize: '12px'})};
  ${(props) => LineHeightProperty({...props, lineHeight: '16px'})};
  ${(props) => color({...props, color: 'color9'})};

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
            <IconWrapper meta={meta}>
              {icon}
            </IconWrapper>
          </FieldIconWrapper>

          {/* <Text fill={meta.touched && meta.error ? 'red' : 'black'} fontSize={6} /> */}
        </Flex>
      </Wrapper>
    );
  }
}

export default TextFieldWithIcon;
