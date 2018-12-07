import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import '../../assets/style/react-datepicker.css';

import { color } from 'styled-system';
import { Text } from '../Text/Text';
import { Flex } from '../Flex/Flex';

import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';

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

  handleChange(date) {
    this.setState({ startDate: date });

    const {
      input: { onChange },
    } = this.props;

    onChange(date.toString());
  }

  render() {
    const { placeholder, label, meta, ...rest } = this.props;

    return (
      <Flex flexDirection="column">
        <Label>
          {label}
          {meta.error && meta.touched && <Error>{meta.error}</Error>}
        </Label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          {...rest}
        />
      </Flex>
    );
  }
}

export default DayPickerBase;
