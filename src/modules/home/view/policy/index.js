import React, { Component } from 'react';


export class PolicyPage extends Component {
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
        PolicyPage
      </div>
    );
  }
}

export default PolicyPage;
