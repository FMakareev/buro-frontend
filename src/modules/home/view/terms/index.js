import React, { Component } from 'react';


export class TermsPage extends Component {
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
        TermsPage
      </div>
    );
  }
}

export default TermsPage;
