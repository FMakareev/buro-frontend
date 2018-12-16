import React, { Component } from 'react';
import {EXCEL_DOWNLOAD} from "@lib/shared/endpoints";
import {Text} from "@lib/ui/Text/Text";


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
        <a href={EXCEL_DOWNLOAD} download>
          <Text>Upload</Text>
        </a>
      </div>
    );
  }
}

export default TermsPage;
