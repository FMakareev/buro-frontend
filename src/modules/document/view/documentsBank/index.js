import React, { Component } from 'react';


export class DocumentsBankPage extends Component {
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
        DocumentsBankPage
      </div>
    );
  }
}

export default DocumentsBankPage;
