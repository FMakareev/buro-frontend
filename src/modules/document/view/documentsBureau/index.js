import React, { Component } from 'react';


export class DocumentsBureauPage extends Component {
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
        DocumentsBureauPage
      </div>
    );
  }
}

export default DocumentsBureauPage;
