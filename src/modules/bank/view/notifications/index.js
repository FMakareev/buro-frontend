import React, { Component } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { Query } from 'react-apollo';
import { Container } from '@lib/ui/Container/Container';
import { Text } from '@lib/ui/Text/Text';
import { ReactTableStyled } from '@lib/ui/ReactTableStyled/ReactTableStyled';
import { CheckAuthorization } from '@lib/ui/CheckAuthorization/CheckAuthorization';
import { ROLE_BANK } from '@lib/shared/roles';

import { STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '@lib/shared/statuses';
import { Box } from '@lib/ui/Box/Box';
import NotificationListQuery from './NotificationListQuery.graphql';

import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const has = Object.prototype.hasOwnProperty;

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
      props.client
        ? `${props.client.firstName} ${props.client.lastName} ${props.client.patronymic}`
        : null,
  },
  {
    id: 'reqDate',
    Header: 'Request date',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => props.date ? dayjs(props.date).format('DD.MM.YYYY HH:mm:ss') : null,
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

export class NotificationsPage extends Component {
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
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Notifications
        </Text>
        <Box backgroundColor="color0">
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
                  data={
                    loading
                      ? []
                      : data && has.call(data, 'notificationlist')
                      ? data.notificationlist
                      : []
                  }
                  loadingText={loading ? 'Loading...' : error ? 'Error...' : 'Loading...'}
                  loading={loading}
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

NotificationsPage = CheckAuthorization([ROLE_BANK])(NotificationsPage);
NotificationsPage = connect(state => ({
  user: getUserFromStore(state),
}))(NotificationsPage);
export default NotificationsPage;
