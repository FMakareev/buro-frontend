import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
// import { ru } from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';

import { Text } from '../Text/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & .react-datepicker-wrapper,
  & .react-datepicker__input-container {
    width: 100% !important;
  }

  & .react-datepicker__header {
    background-color: ${props => props.theme.colors.color5} !important;
  }

  ::placeholder {
    color: ${props => props.theme.colors.color4};
  }
`;

const Label = styled(Text)`
  margin-bottom: 8px;
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes[5]}px;
  line-height: ${props => props.theme.fontSizes[8]}px;
  color: ${props => props.theme.colors.color1};
`;

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  border: 1px solid
    ${props => {
      if ((props.meta && props.meta.active) || props.meta.dirty) {
        return props.theme.colors.color7;
      }
      return props.theme.colors.color5;
    }}!important;
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes[5]}px;
  line-height: ${props => props.theme.fontSizes[8]}px;
  box-shadow: ${props => props.theme.boxShadow[0]};
  border-radius: ${props => props.theme.fontSizes[2]}px;
  background-color: transparent;
  box-sizing: border-box;
  padding: 6px 10px 6px 10px;
  color: ${props => props.theme.colors.color1} !important;
  background-color: ${props => props.theme.colors.color0};
  cursor: 'text';
`;

const Error = styled.span`
  margin-left: 10px;
  color: ${props => props.theme.colors.color9};
`;

export class DayPickerBase extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ startDate: date });

    // const {
    //   input: { onChange },
    // } = this.props;
    // const dateString = date && date.format('YYYY.MM.DD');
    // console.log(dateString);
    // onChange(dateString);
  }

  render() {
    const { placeholder, input, label, meta } = this.props;

    return (
      <Wrapper>
        <Label>
          {label}
          {meta.error && meta.touched && <Error>{meta.error}</Error>}
        </Label>
        <DatePickerStyled
          {...this.props}
          selected={this.state.startDate}
          onChange={this.handleChange}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          input={input}
        />
      </Wrapper>
    );
  }
}

export default DayPickerBase;
