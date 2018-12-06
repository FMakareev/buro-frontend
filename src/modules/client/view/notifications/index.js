import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { makeData } from '../../../bureau/helpers/utils';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';
import { ROLE_CLIENT } from "../../../../shared/roles";
import {CheckAuthorization} from "../../../../components/CheckAuthorization/CheckAuthorization";

const columns = () => [
  {
    id: 'Bank',
    Header: 'Bank',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => props.bank,
  },
  {
    id: 'reqDate',
    Header: 'Request date',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => dayjs(props.reqDate).format('DD.MM.YYYY HH:mm:ss'),
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'Request Status',
    Header: 'Status',
    // filterable: true,
    Cell: props => {
      if (props.original.reqStatus !== 0) {
        return <Text>{props.original.reqStatus === 1 ? 'Approved' : 'Not approved'}</Text>;
      }
      console.log(props);
      return (
        <>
          <ButtonWithImage
            // onClick={() => onOpenFormUpdateDoc(props.original.id)}
            display="inline-block"
            size="xsmall"
            variant="transparent"
            mr="5px"
            ml="5px"
            pl="3px"
            pr="5px">
            Approve
          </ButtonWithImage>
          <ButtonWithImage
            // onClick={() => onOpenFormUpdateDoc(props.original.id)}
            display="inline-block"
            size="xsmall"
            variant="transparent"
            mr="5px"
            ml="5px"
            pl="3px"
            pr="5px">
            Not approve
          </ButtonWithImage>
        </>
      );
    },
    accessor: props => props.reqStatus,
  },
];

@CheckAuthorization([ROLE_CLIENT])
export class ClientsPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      data: makeData(25),
    };
  }

  onOpenFormUpdateDoc = id => this.setState(() => ({ id, isOpen: true }));

  toggleModal = () => {
    console.log('toggleModal');
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { isOpen, id } = this.state;
    return (
      <Container px={6}>
        <Text fontFamily="bold" fontSize={9} lineHeight={9} mb={7}>
          Requests
        </Text>
        <ReactTableStyled
          defaultFilterMethod={(filter, row) => String(row[filter.id]).indexOf(filter.value) >= 0}
          data={this.state.data}
          filterable
          columns={columns()}
        />

      </Container>
    );
  }
}

export default ClientsPage;
