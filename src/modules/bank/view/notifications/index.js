import React, { Component } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { Query } from 'react-apollo';
import { Container } from '@lib/ui/Container/Container';
import { Text } from '@lib/ui/Text/Text';
import { ReactTableStyled } from '@lib/ui/ReactTableStyled/ReactTableStyled';
import { CheckAuthorization } from '@lib/ui/CheckAuthorization/CheckAuthorization';
import { ROLE_BANK } from '@lib/shared/roles';

import { STATUS_APPROVAL, STATUS_NOT_APPROVAL, STATUS_PENDING } from '@lib/shared/statuses';
import { Box } from '@lib/ui/Box/Box';
import NotificationListQuery from './NotificationListQuery.graphql';

import { getUserFromStore } from '../../../../store/reducers/user/selectors';

import { UpdateNotificationButton } from '../../components/UpdateNotificationButton/UpdateNotificationButton';

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
    accessor: props => {
      try {
        if (has.call(props, 'client')) {
          return props.client
            ? `${props.client.firstName || ''} ${props.client.lastName || ''} ${props.client
                .patronymic || ''}`
            : null;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  },
  {
    id: 'reqDate',
    Header: 'Request date',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try {
        if (has.call(props, 'date')) {
          const date = dayjs(props.date).format('DD.MM.YYYY HH:mm:ss');
          if (date.indexOf('NaN') === -1) {
            return date;
          }
        }
        return '';
      } catch (error) {
        console.error(error);
        return '';
      }
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'RequestStatus',
    Header: 'Status',
    Cell: props => <Text>{props.value}</Text>,
    accessor: props => {
      switch (props.status) {
        case STATUS_NOT_APPROVAL: {
          return 'Not approval';
        }
        case STATUS_APPROVAL: {
          return 'Approval';
        }
        case STATUS_PENDING: {
          return 'Pending';
        }
      }
    },
    filterMethod: (filter, row) => {
      switch (filter.value) {
        case STATUS_NOT_APPROVAL: {
          return row._original.status === STATUS_NOT_APPROVAL;
        }
        case STATUS_APPROVAL: {
          return row._original.status === STATUS_APPROVAL;
        }
        case STATUS_PENDING: {
          return row._original.status === STATUS_PENDING;
        }
        case 'all': {
          return true;
        }
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}>
        <option value="all">Show All</option>
        <option value={STATUS_NOT_APPROVAL}>Not approval</option>
        <option value={STATUS_APPROVAL}>Approval</option>
        <option value={STATUS_PENDING}>Pending</option>
      </select>
    ),
  },
  {
    id: 'Readed',
    Header: 'Readed Status',
    Cell: props => {
      if (props.original.readed) {
        return <Text>Readed</Text>;
      }
      return (
        <UpdateNotificationButton
          id={props.original ? props.original.id : null}
          readed={props.original.readed}
          status={props.original.status}
        />
      );
    },
    // accessor: props => {
    //   switch (props.original.readed) {
    //     case true: {
    //       return <Text>Readed</Text>;
    //     }
    //     case false: {
    //       return (
    //         <UpdateNotificationButton
    //           id={props.original ? props.original.id : null}
    //           readed={props.original.readed}
    //           status={props.original.status}
    //         />
    //       );
    //     }
    //   }
    // },
    filterMethod: (filter, row) => {
      switch (filter.value) {
        case 'Readed': {
          return row._original.readed === true;
        }
        case 'Unread': {
          return row._original.readed === false;
        }
        case 'all': {
          return true;
        }
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}>
        <option value="all">Show All</option>
        <option value="Readed">Readed</option>
        <option value="Unread">Unread</option>
      </select>
    ),
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
            }}
            onError={() => {}}>
            {({ error, data, loading }) => {
              console.log('DATA______', data);
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
