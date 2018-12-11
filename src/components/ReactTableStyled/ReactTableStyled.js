import React, { Component } from 'react';
import ReactTable from 'react-table';

import { TablePaginationComponent } from './TablePaginationComponent';
import { LoadingComponent } from './LoadingComponent';

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
        {...this.props}
      />
    );
  }
}

export default ReactTableStyled;
