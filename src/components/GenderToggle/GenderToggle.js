import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text } from '../Text/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled(Text)`
  margin-bottom: 8px;
  font-family: ${props => props.theme.fontFamily.regular};
  font-size: ${props => props.theme.fontSizes[5]}px;
  line-height: ${props => props.theme.fontSizes[8]}px;
  color: ${props => props.theme.colors.color1};
`;

const Toggle = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  & > input {
    width: 100%;
    width: 0;
    height: 0;
    position: absolute;
    left: -9999px;
  }
  & > input + label {
    width: 100%;
    margin: 0;
    padding-top: 7px;
    padding-bottom: 5px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: 1px solid
      ${props => {
        if ((props.meta && props.meta.active) || props.meta.dirty) {
          return props.theme.colors.color7;
        }
        return props.theme.colors.color5;
      }}!important;
    border-radius: ${props => props.theme.fontSizes[2]}px;
    background-color: ${props => props.theme.colors.color0};
    font-family: ${props => props.theme.fontFamily.regular};
    font-size: ${props => props.theme.fontSizes[5]}px;
    line-height: ${props => props.theme.fontSizes[8]}px;
    text-align: center;
    box-shadow: ${props => props.theme.boxShadow[0]};
    transition: border-color 0.15s ease-out, color 0.25s ease-out, background-color 0.15s ease-out,
      box-shadow 0.15s ease-out;
  }
  & > input:hover + label {
    color: ${props => props.theme.colors.color1};
    cursor: pointer;
  }
  & > input:checked + label {
    background-color: ${props => props.theme.colors.color10};
    color: ${props => props.theme.colors.color1};
    z-index: 1;
  }
  & > input:focus + label {
    outline: dotted 1px #ccc;
    outline-offset: 0.05rem;
  }
`;

/**
 * GenderToggle
 * @example ./GenderToggle.example.md
 */
export class GenderToggle extends PureComponent {
  static propTypes = {};

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
      lineHeight,
      fontSize,
      meta,
      color,
      label,
    } = this.props;

    return (
      <Wrapper>
        <Label>{label}</Label>
        <Toggle {...this.props}>
          <input type="radio" name="sizeBy" value="weight" id="male" checked="checked" />
          <label htmlFor="male">Male</label>
          <input type="radio" name="sizeBy" value="dimensions" id="female" />
          <label htmlFor="female">Female</label>
        </Toggle>
      </Wrapper>
    );
  }
}

export default GenderToggle;
