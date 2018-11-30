import React, { Component } from 'react';


export class PasswordRecoveryPage extends Component {
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
        PasswordRecoveryPage
      </div>
    );
  }
}

export default PasswordRecoveryPage;
