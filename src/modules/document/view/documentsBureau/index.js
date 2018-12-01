import React, {Component} from 'react';
import ReactTable from "react-table";
import '../../../../assets/style/react-table.css';
import {Container} from "../../../../components/Container/Container";
import {Text} from "../../../../components/Text/Text";
import {data} from './mock';
import {TablePaginationComponent} from "./TablePaginationComponent";



const columns = [
  {
  id: 'Client',
  Header: 'Client',
  accessor: props => {
    try {
      if (props.user) {
        return `${props.user.firstName} ${props.user.lastName} ${props.user.sureName}`
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
}, {
  id: 'updateDate',
  Header: 'Date of download',
  accessor: props => {
    if (props.updateDate) {
      return props.updateDate
    }
    return '-';
  }
}, {
  id: 'Document',
  Header: 'Document',
  accessor: props => {
    if (props.document) {
      return props.document.name
    }
    return '-';
  }
}
];









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
      <Container>
        <Text fontFamily={'bold'} fontSize={8} lineHeight={8} mb={7}>
          Documents
        </Text>
        <ReactTable
          defaultPageSize={10}
          data={data}
          columns={columns}
          PaginationComponent={TablePaginationComponent}

        />
      </Container>
    );
  }
}

export default DocumentsBureauPage;
