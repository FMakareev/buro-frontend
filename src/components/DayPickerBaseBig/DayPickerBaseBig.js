import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import '../../assets/style/react-datepicker-big.css';

import { color } from 'styled-system';
// import { Text } from '../Text/Text';
import { Flex } from '../Flex/Flex';

import { BorderColorProperty } from '../../styles/styleProperty/BorderColorProperty';
import { BoxShadowProperty } from '../../styles/styleProperty/BoxShadowProperty';
import { BorderRadiusProperty } from '../../styles/styleProperty/BorderRadiusProperty';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../styles/styleProperty/LineHeightProperty';
import { FillSvgProperty } from '../../styles/styleProperty/FillSvgProperty';
import { StrokeSvgProperty } from '../../styles/styleProperty/StrokeSvgProperty';

const StyledFlex = styled(Flex)`
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

 & input::placeholder {
    ${props => {
      if (props.meta.touched && props.meta.error) {
        return color({ ...props, color: 'color9' });
      }
      return color({ ...props, color: 'color5' });
    }}
  }

  & input:focus {
    ${props => BorderColorProperty({ ...props, borderColor: 'color1' })};
    ${props => BoxShadowProperty({ ...props, boxShadow: 2 })};
  }
`;

// const Label = styled(Text)`
//   margin-bottom: 8px;
//   ${props => FontFamilyProperty({ ...props, fontFamily: 'regular' })};
//   ${props => FontSizeProperty({ ...props, fontSize: 5 })};
//   ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
//   ${props => color({ ...props, color: 'color1' })};
// `;

const Error = styled.span`
  position: absolute;
  top: -16px;

  ${props => FontFamilyProperty({ ...props, fontFamily: 'medium' })};
  ${props => FontSizeProperty({ ...props, fontSize: '12px' })};
  ${props => LineHeightProperty({ ...props, lineHeight: '16px' })};
  ${props => color({ ...props, color: 'color9' })};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  ${props => FillSvgProperty({ ...props, fill: 'color9' })};
  ${props => {
    if (props.meta.touched && props.meta.error) {
      return FillSvgProperty({ ...props, fill: 'color9' });
    }
    if (props.meta.dirty) {
      return FillSvgProperty({ ...props, fill: 'color1' });
    }
    return FillSvgProperty({ ...props, fill: 'color5' });
  }}
  ${props => {
    if (props.meta.touched && props.meta.error) {
      return StrokeSvgProperty({ ...props, stroke: 'color9' });
    }
    if (props.meta.dirty) {
      return StrokeSvgProperty({ ...props, stroke: 'color1' });
    }
    return StrokeSvgProperty({ ...props, stroke: 'color5' });
  }}
`;

export class DayPickerBaseBig extends Component {
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
    return { startDate: null };
  }

  handleChange(date) {
    this.setState({ startDate: date });

    const {
      input: { onChange },
    } = this.props;
    onChange(date.toISOString());
  }

  render() {
    const { placeholder, label, meta, icon, ...rest } = this.props;

    return (
      <StyledFlex flexDirection="column" meta={meta}>
        {meta.touched && meta.error && <Error>{meta.error}</Error>}
        <DatePicker
          autocomplete="off"
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
        <IconWrapper meta={meta}>{icon}</IconWrapper>
      </StyledFlex>
    );
  }
}

export default DayPickerBaseBig;
