import React, {Component} from 'react';
import dayjs from 'dayjs';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';

import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {ReactTableStyled} from '@lib/ui/ReactTableStyled/ReactTableStyled';
import {CheckAuthorization} from '@lib/ui/CheckAuthorization/CheckAuthorization';
import {ROLE_CLIENT} from '@lib/shared/roles';

import {STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL} from '@lib/shared/statuses';
import {Box} from '@lib/ui/Box/Box';
import NotificationListQuery from './NotificationListQuery.graphql';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

import {UpdateNotificationButtons} from '../../components/UpdateNotificationButtons/UpdateNotificationButtons';

const has = Object.prototype.hasOwnProperty;
const columns = () => [
  {
    id: 'Bank',
    Header: 'Bank',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => (props.bank ? `${props.bank.bankName}` : null),
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
            return date
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
    id: 'Request Status',
    Header: 'Status',
    Cell: props => {
      if (props.original.status !== STATUS_PENDING) {
        return (
          <Text>{props.original.status === STATUS_APPROVAL ? 'Approved' : 'Not approved'}</Text>
        );
      }
      return <UpdateNotificationButtons id={props.original ? props.original.id : null}/>;
    },
    accessor: props => {
      switch (props.status) {
        case(STATUS_NOT_APPROVAL): {
          return 'Not approval';
        }
        case(STATUS_APPROVAL): {
          return 'Approval';
        }
        case(STATUS_PENDING): {
          return 'Pending';
        }
      }
    },
    filterMethod: (filter, row) => {
      switch (filter.value) {
        case(STATUS_NOT_APPROVAL): {
          return row._original.status === STATUS_NOT_APPROVAL;
        }
        case(STATUS_APPROVAL): {
          return row._original.status === STATUS_APPROVAL;
        }
        case(STATUS_PENDING): {
          return row._original.status === STATUS_PENDING;
        }
        case('all'): {
          return true;
        }
      }
    },
    Filter: ({filter, onChange}) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{width: "100%"}}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Show All</option>
        <option value={STATUS_NOT_APPROVAL}>Not approval</option>
        <option value={STATUS_APPROVAL}>Approval</option>
        <option value={STATUS_PENDING}>Pending</option>
      </select>,
  },
];

export class ClientsNotificationsPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }


  filterDate = (data) => {
    try {
      return data.filter(item => item.bureau ? false : item);
    } catch (error) {
      console.log(error);
      return data;
    }
  };

  render() {
    const {user} = this.props;
    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Notifications
        </Text>
        <Box backgroundColor="color0">
          <Query query={NotificationListQuery} variables={{clientid: user.id}}>
            {({error, data, loading}) => {
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
                      ? this.filterDate(data.notificationlist)
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

ClientsNotificationsPage = CheckAuthorization([ROLE_CLIENT])(ClientsNotificationsPage);
ClientsNotificationsPage = connect(state => ({
  user: getUserFromStore(state),
}))(ClientsNotificationsPage);

export default ClientsNotificationsPage;
