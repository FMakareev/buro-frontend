import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../../assets/style/react-datepicker.css';

import { color } from 'styled-system';
import { Text } from '../Text/Text';
import { Flex } from '../Flex/Flex';

import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import {BorderRadiusProperty} from "@lib/styles/styleProperty/BorderRadiusProperty";
import {BorderColorProperty} from "@lib/styles/styleProperty/BorderColorProperty";
import {BoxShadowProperty} from "@lib/styles/styleProperty/BoxShadowProperty";
import {asyncComponent} from "react-async-component";


const DatePicker = asyncComponent({
  resolve: () => import('react-datepicker'),
  LoadingComponent: () => <div style={{height: '34px'}}/>,
  serverMode: 'defer',
});

const DatePickerStyled = styled(DatePicker)`
  
    width: 100%;
    border: 1px solid;
    position: relative;
    box-sizing: border-box;
  
    ${props => FontFamilyProperty({ ...props, fontFamily: 'medium' })};
    ${props => FontSizeProperty({ ...props, fontSize: 6 })};
    ${props => LineHeightProperty({ ...props, lineHeight: 11 })};
    ${props => BorderRadiusProperty({ ...props, borderRadius: 2 })};
  
    ${props => {
      if (props.meta.touched && props.meta.error) {
        return BorderColorProperty({ ...props, borderColor: 'color9' });
      }
      if (props.meta.dirty) {
        return BorderColorProperty({ ...props, borderColor: 'color1' });
      }
      return BorderColorProperty({ ...props, borderColor: 'color5' });
    }}

    ${props => {
      if (props.meta.touched && props.meta.error) {
        return color({ ...props, color: 'color9' });
      }
      if (props.meta.dirty) {
        return color({ ...props, color: 'color1' });
      }
      return color({ ...props, color: 'color5' });
    }}

    &::placeholder {
      ${props => {
        if (props.meta.touched && props.meta.error) {
          return color({ ...props, color: 'color9' });
        }
        return color({ ...props, color: 'color5' });
      }}
    }

    &:focus {
      ${props => BorderColorProperty({ ...props, borderColor: 'color1' })};
      ${props => BoxShadowProperty({ ...props, boxShadow: 2 })};
    }
  
`;
const Label = styled(Text)`
  margin-bottom: 8px;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'regular' })};
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  ${props => color({ ...props, color: 'color1' })};
`;

const Error = styled.span`
  margin-left: 10px;
  color: ${props => props.theme.colors.color9};
`;




export class DayPickerBase extends Component {
  static propTypes = {
    label: PropTypes.string,
  };

  static defaultProps = {
    input: {
      onChange: () => null,
      value: null,
    },
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  get initialState() {
    return { startDate: this.props.input.value ? new Date(this.props.input.value) : new Date() };
  }

  componentDidCatch(error){
    console.error(error);
    if(error){
      this.setState({ startDate: null });
      const {
        input: { onChange },
      } = this.props;

      onChange(null);
    }
  }

  handleChange(date) {
    this.setState({ startDate: date });

    const {
      input: { onChange },
    } = this.props;

    onChange(date.toISOString());
  }

  render() {
    const { placeholder, label, meta, ...rest } = this.props;

    return (
      <Flex flexDirection="column">
        <Label>
          {label}
          {meta.error && meta.touched && <Error>{meta.error}</Error>}
        </Label>
        <DatePickerStyled
          selected={this.state.startDate}
          onChange={this.handleChange}
          {...this.props}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
        />
      </Flex>
    );
  }
}

export default DayPickerBase;
