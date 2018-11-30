import React, { Component } from 'react';


export class DocumentsPage extends Component {
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
        DocumentsPage
      </div>
    );
  }
}

export default DocumentsPage;
