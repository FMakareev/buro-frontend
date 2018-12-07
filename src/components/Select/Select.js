import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {color} from 'styled-system';

import {SelectBase} from '../SelectBase/SelectBase';
import Label from '../Label/Label';
import Message from '../Message/Message';
import {FontFamilyProperty} from "../../styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "../../styles/styleProperty/FontSizeProperty";
import {LineHeightProperty} from "../../styles/styleProperty/LineHeightProperty";
import {BorderRadiusProperty} from "../../styles/styleProperty/BorderRadiusProperty";
import {BorderColorProperty} from "../../styles/styleProperty/BorderColorProperty";
import {FillSvgProperty} from "../../styles/styleProperty/FillSvgProperty";
import {BoxShadowProperty} from "../../styles/styleProperty/BoxShadowProperty";

const CustomStyles = {
  dropdownIndicator: (provided, state) => ({
    height: '32px',
    width: '32px',
    marginRight: '9px',
  }),

  valueContainer: () => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '7px',
  }),

  menuList: provided => ({
    ...provided,
    paddingTop: '0px',
    paddingBottom: '0px',
    borderRadius: '4px',
    overflow: 'hidden',
  }),

  control: (provided, state) => {

    return ({
      ...provided,
      border: state.hasValue ? '1px solid inherit' : '1px solid inherit',
      borderColor: 'inherit',
      boxShadow: 'none',
      ':hover': {
        borderColor: 'initial',
        outline: 'none !important',
        boxShadow: '0 0 0 5px #E7EDF8',
      },
      ':focus': {
        borderColor: 'initial',
        outline: 'none !important',
        boxShadow: '0 0 0 5px #E7EDF8',
      },
      ':active': {
        borderColor: 'initial',
        outline: 'none !important',
        boxShadow: '0 0 0 5px #E7EDF8',
      }
    })
  },

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),

  input: provided => ({
    ...provided,
    display: 'hidden',
    opacity: '0.0',
    position: 'absolute',
  }),
  option: (provided, state) => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '22px',
    backgroundColor: state.isFocused ? '#E7EDF8' : '#FFFFFF',
  }),
  singleValue: () => ({paddingLeft: '13px'}),

  placeholder: () => ({
    paddingLeft: '13px',
  }),
};

const Wrapper = styled.div`
  position: relative;
  text-align: left;
  ${(props) => FontFamilyProperty({...props, fontFamily: 'medium'})};
  ${(props) => FontSizeProperty({...props, fontSize: 6})};
  ${(props) => LineHeightProperty({...props, lineHeight: 11})};
  ${(props) => BorderRadiusProperty({...props, borderRadius: 11})};


  ${props => {
    if (props.meta.dirty) {
      return BorderColorProperty({...props, borderColor: 'color1'});
    }
    if (props.meta.touched && props.meta.error) {
      return BorderColorProperty({...props, borderColor: 'color9'});
    }
    return BorderColorProperty({...props, borderColor: 'color5'});  
  }}
    ${(props) => color({...props, color: 'color12'})};

  ${props => {
    if (props.meta.dirty) {
      return color({...props, color: 'color1'});
    }
    if (props.meta.touched && props.meta.error) {
      return color({...props, color: 'color9'});
  
    }
    return color({...props, color: 'color5'});
  }}

  & svg {
    position: absolute;
    top: 10px;
    right: 10px;

  ${props => {
    if (props.meta.touched && props.meta.error) {
      return FillSvgProperty({...props, fill: 'color9'});
    }
    if (props.meta.dirty) {
      return FillSvgProperty({...props, fill: 'color1'});
    }
    return FillSvgProperty({...props, fill: 'color5'});
  }}
  }

  :focus {
    ${props => BorderColorProperty({...props, borderColor: 'color1'})}
    ${(props) => BoxShadowProperty({...props, boxShadow: 2})};    

    & + svg {
      ${props => FillSvgProperty({...props, fill: 'color1'})};
    }
  }
`;

const StyledLabel = styled(Label)`
  padding-left: 50px;
  padding-top: 2px;
  color: blue;
`;


/**
 * Component Select
 * @example ./Select.example.md
 */

export class Select extends Component {
  static propTypes = {
    /** Description of prop "mb". */
    mb: PropTypes.number,
    /** CSS: padding-right */
    pr: PropTypes.number,
    /** class */
    className: PropTypes.string,
    /** input */
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** input */
    input: PropTypes.object,
    /** input */
    selectValue: PropTypes.string,
    /** input */
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    /** input */
    labelKey: PropTypes.string,
    /** input */
    valueKey: PropTypes.string,
    /** funcion change */
    onChange: PropTypes.func,
    /** input */
    value: PropTypes.string,
    /** input */
    type: PropTypes.string,
    /** input */
    meta: PropTypes.object,
    /** input */
    required: PropTypes.string,

    defaultOptions: PropTypes.object,
  };

  static defaultProps = {
    mb: 0,
  };

  render() {
    const {
      className,
      mb,
      label,
      input,
      selectValue,
      options,
      labelKey,
      valueKey,
      onChange,
      value,
      type,
      meta,
      loading,
      disabled,
      defaultOptions,
      placeholder,
    } = this.props;

    console.log(this.props);
    return (
      <Wrapper mb={mb} className={className} meta={meta}>
        {
          label && <StyledLabel mb={3}>{label}</StyledLabel>
        }
        {meta && <Message fontSize={'10px'} lineHeight={'12px'} fontFamily={'medium'} style={{
          position: 'absolute',
          top: '-12px',
        }} meta={meta}/>}

        <SelectBase
          input={input}
          meta={meta}
          selectValue={selectValue}
          loading={loading}
          disabled={disabled}
          options={options}
          labelKey={labelKey}
          valueKey={valueKey}
          defaultOptions={defaultOptions}
          placeholder={placeholder}
          onChange={onChange}
          styles={CustomStyles}
        />
      </Wrapper>
    );
  }
}

export default Select;
