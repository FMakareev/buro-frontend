import React, { Component } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { Query } from 'react-apollo';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';
import { CheckAuthorization } from '../../../../components/CheckAuthorization/CheckAuthorization';
import { ROLE_BANK } from '../../../../shared/roles';

import NotificationListQuery from './NotificationListQuery.graphql';

import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../../shared/statuses';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { Box } from '../../../../components/Box/Box';

const columns = () => [
  {
    id: 'Client',
    Header: 'Client',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props =>
      `${props.client.firstName} ${props.client.lastName} ${props.client.patronymic}`,
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
      if (props.original.status !== STATUS_APPROVAL) {
        return (
          <Text>{props.original.status === STATUS_NOT_APPROVAL ? 'Not answered' : 'Pending'}</Text>
        );
      }
      return (
        // TO DO link to table of clients with init state table with this client

        <Text>Answered</Text>
        // <ButtonWithImage
        //   // onClick={() => onOpenFormUpdateDoc(props.original.id)}
        //   display="inline-block"
        //   size="xsmall"
        //   variant="transparent"
        //   pl="3px"
        //   pr="5px">
        //   Download
        // </ButtonWithImage>
      );
    },
    accessor: props => props.reqStatus,
  },
];

@connect(state => ({
  user: getUserFromStore(state),
}))
@CheckAuthorization([ROLE_BANK])
export class ClientsPage extends Component {
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
    const { user } = this.props;
    return (
      <Container backgroundColor={'transparent'} px={6}>
        <Text fontFamily={'bold'} fontWeight={'bold'} fontSize={9} lineHeight={9} mb={7}>
          Notifications
        </Text>
        <Box backgroundColor={'color0'}>
          <Query
            query={NotificationListQuery}
            variables={{
              bankid: user.id,
            }}>
            {({ error, data, loading }) => {
              console.log(error, data, loading);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  data={loading ? [] : data.notificationList}
                  filterable
                  columns={columns()}
                  error={error}
                />
              );
            }}
          </Query>
        </Box>
      </Container>
    );
  }
}

export default ClientsPage;
