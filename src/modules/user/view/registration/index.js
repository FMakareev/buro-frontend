import React, { Component } from 'react';


export class RegistrationPage extends Component {
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
        RegistrationPage
      </div>
    );
  }
}

export default RegistrationPage;
