import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import checkboxOn from '../../assets/icons/multicolor/checkboxOn.multicolor.svg';
import checkboxOff from '../../assets/icons/multicolor/checkboxOff.multicolor.svg';
import {BackgroundColorProperty} from "../../styles/styleProperty/BackgroundColorProperty";

const Wrapper = styled.div`
  ${space};
`;

const Input = styled.input`
  position: absolute; // take it out of document flow
  opacity: 0; // hide it
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    display: inline-block;
    vertical-align: text-top;
    width: 28px;
    height: 28px;
    ${props => BackgroundColorProperty({...props, backgroundColor: 'color0'})}
    box-sizing: border-box;
    background: url(${checkboxOff});
    background-repeat: no-repeat;
  }

  /* // Box hover
  &:hover + label:before {
    ${props => BackgroundColorProperty({...props, backgroundColor: 'color2'})}
  } */

  /* // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  } */

   // Box checked
  &:checked + label:before {
   display: hidden;
   border: none;
   opacity: 0.0;
  }

  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background-color: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 0px;
    top: -1px;
    width: 28px;
    height: 28px;
    background-image: url(${checkboxOn}) !important;
    background-repeat: no-repeat;
  }
`;

/**
 * Компонент чекбокса базового
 * @example ./CheckboxBase.example.md
 */
export class CheckboxBase extends Component {
  static propTypes = {
    // input: inputPropTypes,
    /** The name attribute specifies the name of an <input> element. */
    name: PropTypes.string,
    /** The disabled attribute specifies that the input field is disabled. */
    disabled: PropTypes.bool,
    /** Text field form with a pre-selected checkbox. */
    checked: PropTypes.bool,
    /** Children = label. */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /** Event callback */
    onChange: PropTypes.func,
    /** . */
    index: PropTypes.number,
    /** CSS: margin-bottom */
    mb: PropTypes.string,
    /** CSS: padding left and right */
    py: PropTypes.string,
    /** CSS: padding top and bottom */
    px: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { children, input, index, mb, py, px, checked, disabled, meta } = this.props;

    return (
      <Wrapper mb={mb} px={px} py={py}>
        <Input
          id={`styled-checkbox-${index || input.name}`}
          type="checkbox"
          checked={input.value}
          disabled={disabled}
          {...input}
        />
        <label htmlFor={`styled-checkbox-${index || input.name}`}>{children}</label>
      </Wrapper>
    );
  }
}

export default CheckboxBase;
