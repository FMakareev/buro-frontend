import React, { Component } from 'react';


export class RequestsBankPage extends Component {
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
        RequestsBankPage
      </div>
    );
  }
}

export default RequestsBankPage;