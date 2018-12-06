import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';
import {CheckAuthorization} from "../../../../components/CheckAuthorization/CheckAuthorization";
import { ROLE_CLIENT } from "../../../../shared/roles";

import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../../shared/statuses';
import NotificationListQuery from './NotificationListQuery.graphql';

const columns = ({ onOpenFormUpdateDoc }) => [
  {
    id: 'Bank',
    Header: 'Bank',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => `${props.bank.firstName} ${props.bank.lastName}`,
  },
  {
    id: 'reqDate',
    Header: 'Request date',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => dayjs(props.date).format('DD.MM.YYYY HH:mm:ss'),
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'Request Status',
    Header: 'Status',
    // filterable: true,
    Cell: props => {
      if (props.original.status !== STATUS_PENDING) {
        return (
          <Text>{props.original.status === STATUS_APPROVAL ? 'Approved' : 'Not approved'}</Text>
        );
      }
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
      clientid: null,
    };
  }

  onOpenFormUpdateDoc = id => this.setState(() => ({ id, isOpen: true }));

  toggleModal = () => {
    console.log('toggleModal');
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { clientid } = this.state;
    return (
      <Container px={6}>
        <Text fontFamily="bold" fontSize={9} lineHeight={9} mb={7}>
          Notifications
        </Text>
        <Query query={NotificationListQuery} variables={{ clientid }}>
          {({ error, data, loading }) => {
            console.log(error, data, loading);
            return (
              <ReactTableStyled
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]).indexOf(filter.value) >= 0
                }
                data={loading ? [] : data.notificationList}
                filterable
                columns={columns({
                  onOpenFormUpdateDoc: this.onOpenFormUpdateDoc,
                })}
              />
            );
          }}
        </Query>

      </Container>
    );
  }
}

export default ClientsPage;
