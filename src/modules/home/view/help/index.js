import React, { Component } from 'react';


export class HelpPage extends Component {
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
        HelpPage
      </div>
    );
  }
}

export default HelpPage;
