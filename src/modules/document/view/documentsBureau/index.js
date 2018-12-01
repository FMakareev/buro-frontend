import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import {Container} from "../../../../components/Container/Container";
import {Text} from "../../../../components/Text/Text";


const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }
}];

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Age',
  accessor: 'age',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

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
        <Text fontSize={8} lineHeight={8} mb={7}>
          Documents
        </Text>
        <ReactTable
          defaultPageSize={10}
          data={data}
          columns={columns}
        />
      </Container>
    );
  }
}

export default DocumentsBureauPage;
