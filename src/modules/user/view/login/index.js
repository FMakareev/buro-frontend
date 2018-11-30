import React, { Component } from 'react';

import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';

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
      </div>
    );
  }
}

export default LoginPage;
