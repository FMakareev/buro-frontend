import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';
import { CheckAuthorization } from '../../../../components/CheckAuthorization/CheckAuthorization';
import { ROLE_CLIENT } from '../../../../shared/roles';

import { STATUS_PENDING, STATUS_APPROVAL } from '../../../../shared/statuses';
import NotificationListQuery from './NotificationListQuery.graphql';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { Box } from '../../../../components/Box/Box';

import { UpdateNotificationButtons } from '../../components/UpdateNotificationButtons/UpdateNotificationButtons';

const columns = () => [
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
      return <UpdateNotificationButtons id={props.original.id} />;
    },
    accessor: props => props.status,
  },
];


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
          <Query query={NotificationListQuery} variables={{ clientid: user.id }}>
            {({ error, data, loading }) => {
              console.log(error, data, loading);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  data={loading ? [] : data.notificationlist}
                  error={error}
                  filterable
                  columns={columns()}
                />
              );
            }}
          </Query>
        </Box>
      </Container>
    );
  }
}

ClientsPage = CheckAuthorization([ROLE_CLIENT])(ClientsPage);
ClientsPage = connect(state => ({
  user: getUserFromStore(state),
}))(ClientsPage);

export default ClientsPage;
