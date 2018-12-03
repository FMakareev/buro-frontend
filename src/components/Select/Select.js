import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';

import { SelectBase } from '../SelectBase/SelectBase';
import Label from '../Label/Label';
import Message from '../Message/Message';

const CustomStyles = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    height: '32px',
    width: '32px',
    border: state.hasValue ? '1px solid #093971' : '1px solid #A2A2A2',
    borderRadius: '100%',
    marginRight: '10px',
  }),

  valueContainer: () => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '13px',
  }),

  menuList: provided => ({
    ...provided,
    paddingTop: '0px',
    paddingBottom: '0px',
    borderRadius: '4px',
    overflow: 'hidden',
  }),

  control: (provided, state) => ({
    ...provided,
    border: state.hasValue ? '1px solid #093971' : '1px solid #A2A2A2',
  }),

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
  singleValue: () => ({ paddingLeft: '13px' }),

  placeholder: () => ({
    paddingLeft: '13px',
  }),
};

const Wrapper = styled.div`
  text-align: left;
  font-family: ${props => props.theme.fontFamily.medium};
  font-size: ${props => props.theme.fontSizes[6]}px;
  line-height: ${props => props.theme.fontSizes[11]}px;
  box-shadow: ${props => props.theme.boxShadow[0]};
  border-radius: ${props => props.theme.fontSizes[2]}px;
  border-color: ${props => {
    if (props.meta.dirty) {
      return props.theme.colors.color1;
    }
    if (props.meta.touched && props.meta.error) {
      return props.theme.colors.color9;
    }
    return props.theme.colors.color5;
  }} !important;
  color: ${props => {
    if (props.meta.dirty) {
      return props.theme.colors.color1;
    }
    if (props.meta.touched && props.meta.error) {
      return props.theme.colors.color9;
    }
    return props.theme.colors.color5;
  }} !important;

  & + svg {
    position: absolute;
    top: 10px;
    right: 10px;

    fill: ${props => {
      if (props.meta.dirty) {
        return props.theme.colors.color1;
      }
      if (props.meta.touched && props.meta.error) {
        return props.theme.colors.color9;
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

    return (
      <Wrapper mb={mb} className={className} meta={meta}>
        <StyledLabel mb={3}>{label}</StyledLabel>

        <SelectBase
          input={input}
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
        {meta && <Message meta={meta} />}
      </Wrapper>
    );
  }
}

export default Select;
