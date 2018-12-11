import React, { Component } from 'react';
import ReactTable from 'react-table';

import { TablePaginationComponent } from './TablePaginationComponent';
import { LoadingComponent } from './LoadingComponent';
import { NoDataComponent } from './NoDataComponent';
import { ErrorComponent } from './ErrorComponent';

import '../../assets/style/react-table.css';

export class ReactTableStyled extends Component {
  static defaultProps = {
    filterable: true,
  };

  render() {
    return (
      <ReactTable
        defaultPageSize={10}
        PaginationComponent={TablePaginationComponent}
        LoadingComponent={LoadingComponent}
        NoDataComponent={this.props.error ? ErrorComponent : NoDataComponent}
        {...this.props}
      />
    );
  }
}

export default ReactTableStyled;
