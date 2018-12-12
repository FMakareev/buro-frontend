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
console.log('checkboxOff: ',checkboxOn);
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
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNiAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjYwMTMgNi40MjY5NUMyNC4zMTY5IDYuNDI2OTUgMjQuMDc3NSA2LjY0OTE5IDI0LjA3NzUgNi45MzQzNlYxOC4wNTY1QzI0LjA3NzUgMjAuODM4IDIxLjcxNTIgMjMuMTEwMiAxOC44MDA5IDIzLjExMDJINy4yMDAxMkM0LjI4NTgzIDIzLjExMDIgMS45MjM1OSAyMC44MzggMS45MjM1OSAxOC4wNTY1VjYuOTM0MzZDMS45MjM1OSA0LjE1Mjg0IDQuMjg1ODMgMS44ODA2OSA3LjIwMDEyIDEuODgwNjlIMTguODAwOUMxOS4wODUzIDEuODgwNjkgMTkuMzI0OCAxLjY1ODQ0IDE5LjMyNDggMS4zNzMyOEMxOS4zMjQ4IDEuMDg4MDkgMTkuMDg1MyAwLjg2NTkgMTguODAwOSAwLjg2NTlINy4yMDAxMkMzLjcxNzkyIDAuODY1OSAwLjg3NTg4NSAzLjU4MzIyIDAuODc1ODg1IDYuOTM0MzZWMTguMDU2NUMwLjg3NTg4NSAyMS40MDc2IDMuNzE3OTIgMjQuMTI1IDcuMjAwMTIgMjQuMTI1SDE4LjgwMDlDMjIuMjgzMiAyNC4xMjUgMjUuMTI1MiAyMS40MDc2IDI1LjEyNTIgMTguMDU2NVY2LjkzNDM2QzI1LjEyNTIgNi42NDkxOCAyNC44ODU3IDYuNDI2OTUgMjQuNjAxMyA2LjQyNjk1WiIgZmlsbD0iIzA5Mzk3MSIgc3Ryb2tlPSIjMDkzOTcxIiBzdHJva2Utd2lkdGg9IjAuMjUiLz4KPHBhdGggZD0iTTEuMzk4ODcgMTguNTYzOUMxLjY4MzIzIDE4LjU2MzkgMS45MjI3MSAxOC4zNDE3IDEuOTIyNzEgMTguMDU2NUwxLjkyMjcxIDYuOTM0NDFDMS45MjI3IDQuMTUyODkgNC4yODQ5NCAxLjg4MDc0IDcuMTk5MjQgMS44ODA3NEwxOC44MDAxIDEuODgwNzRDMjEuNzE0NCAxLjg4MDc0IDI0LjA3NjYgNC4xNTI4OSAyNC4wNzY2IDYuOTM0NDFMMjQuMDc2NiAxOC4wNTY1QzI0LjA3NjYgMjAuODM4MSAyMS43MTQ0IDIzLjExMDIgMTguODAwMSAyMy4xMTAyTDcuMTk5MjQgMjMuMTEwMkM2LjkxNDg4IDIzLjExMDIgNi42NzU0MSAyMy4zMzI1IDYuNjc1NDEgMjMuNjE3NkM2LjY3NTQxIDIzLjkwMjggNi45MTQ5IDI0LjEyNSA3LjE5OTI0IDI0LjEyNUwxOC44MDAxIDI0LjEyNUMyMi4yODIzIDI0LjEyNSAyNS4xMjQzIDIxLjQwNzcgMjUuMTI0MyAxOC4wNTY1TDI1LjEyNDMgNi45MzQ0MUMyNS4xMjQzIDMuNTgzMjcgMjIuMjgyMyAwLjg2NTkxMiAxOC44MDAxIDAuODY1OTEyTDcuMTk5MjQgMC44NjU5MTNDMy43MTcwMyAwLjg2NTkxMyAwLjg3NTAwMiAzLjU4MzI3IDAuODc1MDAyIDYuOTM0NDFMMC44NzUwMDMgMTguMDU2NUMwLjg3NTAwMyAxOC4zNDE3IDEuMTE0NDggMTguNTYzOSAxLjM5ODg3IDE4LjU2MzlaIiBmaWxsPSIjMDkzOTcxIiBzdHJva2U9IiMwOTM5NzEiIHN0cm9rZS13aWR0aD0iMC4yNSIvPgo8L3N2Zz4K);
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
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjc5NTEgMS4wNDQ0OUwyMy44NTI0IDAuOTMzNDI3QzIzLjYwNjkgMC44MDY2MDEgMjMuMjk1OCAwLjg5MjI1OCAyMy4xNTk2IDEuMTM0MzlMMTMuMjI2NSAxOC43Njk1TDcuODM5MzkgOS4zMTA2M0w3LjgzOTM3IDkuMzEwNTlMNy4yMDM0NiA5LjIyMzQ1TDcuMTQ1OTYgOS4xMTI0NkM3LjE0NTkgOS4xMTI0OSA3LjE0NTgzIDkuMTEyNTMgNy4xNDU3NyA5LjExMjU2QzYuODk2NzYgOS4yNDE2OSA2Ljc5OTQxIDkuNTQ0MjIgNi45Mzg3MSA5Ljc4ODYxTDEyLjc3ODYgMjAuMDQyNkwxMi43Nzg2IDIwLjA0MjZDMTIuODcwMSAyMC4yMDMyIDEzLjA0MzUgMjAuMjk5OCAxMy4yMjkgMjAuMjk5OEgxMy4yMjkzQzEzLjQxNDggMjAuMjk5MyAxMy41ODk3IDIwLjIwMjIgMTMuNjgwNSAyMC4wNDA1TDI0LjA2MjMgMS42MDg1QzI0LjIwMDcgMS4zNjM1MiAyNC4xMDE4IDEuMDYwOTIgMjMuODUyIDAuOTMzMTk1TDIzLjc5NTEgMS4wNDQ0OVpNMjMuNzk1MSAxLjA0NDQ5QzIzLjk4NDQgMS4xNDEzMSAyNC4wNTUzIDEuMzY2NjcgMjMuOTUzNSAxLjU0NzAzTDIzLjI2ODUgMS4xOTU2N0MyMy4zNzA0IDEuMDE0NTkgMjMuNjA2OCAwLjk0NzI3MSAyMy43OTUxIDEuMDQ0NDlaIiBmaWxsPSIjMDkzOTcxIiBzdHJva2U9IiMwOTM5NzEiIHN0cm9rZS13aWR0aD0iMC4yNSIvPgo8cGF0aCBkPSJNMjQuNjAwNiA3LjQyNjg4QzI0LjMxNjMgNy40MjY4OCAyNC4wNzY4IDcuNjQ5MTMgMjQuMDc2OCA3LjkzNDI5VjE5LjA1NjRDMjQuMDc2OCAyMS44Mzc5IDIxLjcxNDYgMjQuMTEwMSAxOC44MDAzIDI0LjExMDFINy4xOTk0NUM0LjI4NTE2IDI0LjExMDEgMS45MjI5MiAyMS44Mzc5IDEuOTIyOTIgMTkuMDU2NFY3LjkzNDI5QzEuOTIyOTIgNS4xNTI3NyA0LjI4NTE2IDIuODgwNjIgNy4xOTk0NSAyLjg4MDYySDE4LjgwMDNDMTkuMDg0NiAyLjg4MDYyIDE5LjMyNDEgMi42NTgzOCAxOS4zMjQxIDIuMzczMjFDMTkuMzI0MSAyLjA4ODAzIDE5LjA4NDYgMS44NjU4NCAxOC44MDAzIDEuODY1ODRINy4xOTk0NUMzLjcxNzI1IDEuODY1ODQgMC44NzUyMTQgNC41ODMxNSAwLjg3NTIxNCA3LjkzNDI5VjE5LjA1NjRDMC44NzUyMTQgMjIuNDA3NiAzLjcxNzI0IDI1LjEyNDkgNy4xOTk0NSAyNS4xMjQ5SDE4LjgwMDNDMjIuMjgyNSAyNS4xMjQ5IDI1LjEyNDUgMjIuNDA3NiAyNS4xMjQ1IDE5LjA1NjRWNy45MzQyOUMyNS4xMjQ1IDcuNjQ5MTIgMjQuODg1IDcuNDI2ODggMjQuNjAwNiA3LjQyNjg4WiIgZmlsbD0iIzA5Mzk3MSIgc3Ryb2tlPSIjMDkzOTcxIiBzdHJva2Utd2lkdGg9IjAuMjUiLz4KPC9zdmc+Cg==) !important;
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
