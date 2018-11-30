import React, { Component } from 'react';


export class RequestsClientPage extends Component {
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
        RequestsClientPage
      </div>
    );
  }
}

export default RequestsClientPage;
