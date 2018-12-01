import React, { Component } from 'react';

import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';

// import Arrow from '../../../../assets/icons/monocolor/button_arrow.monocolor.svg';

const Arrow = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M26.8505 16.3415C26.9374 16.2483 26.9808 16.1292 26.9808 16.0101C26.9808 15.8925 26.9384 15.7744 26.8529 15.6812L20.8996 9.15896C20.718 8.95986 20.4094 8.94571 20.2102 9.12771C20.011 9.30931 19.9978 9.61821 20.1789 9.81686L25.3582 15.4913L5.5 15.4913L5.5 16.4782L25.3934 16.4782L20.135 22.1502C19.9514 22.3469 19.9632 22.6558 20.1614 22.8393C20.3586 23.0223 20.6677 23.0106 20.8508 22.813L26.8505 16.3415Z"
      fill="#A2A2A2"
    />
    <path
      d="M16 32C24.8365 32 32 24.8365 32 16C32 7.16345 24.8365 0 16 0C7.1634 0 0 7.16345 0 16C0 24.8366 7.1634 32 16 32ZM16 31C7.72895 31 1 24.271 1 16C1 7.729 7.72895 1 16 1C24.271 1 31 7.729 31 16C31 24.271 24.271 31 16 31Z"
      fill="#A2A2A2"
    />
  </svg>
);

export class LoginPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    return (
      <div>
        <ButtonBase size="small">Text</ButtonBase>
        <ButtonBase size="large">Text</ButtonBase>
        <ButtonWithImage size="large" rightIcon={Arrow()} ml={40} mr={100}>
          Text
        </ButtonWithImage>
      </div>
    );
  }
}

export default LoginPage;
