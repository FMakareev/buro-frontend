import React, { Component } from 'react';


export class PasswordResetPage extends Component {
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
        PasswordResetPage
      </div>
    );
  }
}

export default PasswordResetPage;
