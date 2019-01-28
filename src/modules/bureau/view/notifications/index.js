import React, {Component} from 'react';
import dayjs from 'dayjs';
import {connect} from 'react-redux';

import {Query} from 'react-apollo';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {ReactTableStyled} from '@lib/ui/ReactTableStyled/ReactTableStyled';
import {CheckAuthorization} from '@lib/ui/CheckAuthorization/CheckAuthorization';
import {ROLE_BUREAU} from '@lib/shared/roles';

import {STATUS_APPROVAL, STATUS_NOT_APPROVAL, STATUS_PENDING} from '@lib/shared/statuses';
import {Box} from '@lib/ui/Box/Box';
import NotificationListQuery from './NotificationListQuery.graphql';

import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import md5 from "md5";
import {Link} from "react-router-dom";

const has = Object.prototype.hasOwnProperty;

  //
const columns = () => [
  {
    id: 'Client',
    Header: 'Client',
    Cell: props => {
      console.log(props);
      return (
        <Link to={`/app/bureau/clients?client=${md5(props.original.id)}`}>
          <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
            {props.value}
          </Text>
        </Link>
      )
    },
    accessor: props => {
      try {
        if (has.call(props, 'client')) {
          return props.client
            ? `${props.client.firstName || ''} ${props.client.lastName || ''} ${props.client.patronymic || ''}`
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
      try{
        if (has.call(props, 'date')) {
          const date = dayjs(props.date).format('DD.MM.YYYY HH:mm:ss');
          if (date.indexOf('NaN') === -1) {
            return date
          }
        }
        return '';
      } catch(error){
        console.error(error);
        return '';
      }
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'message',
    Header: 'Message',
    Cell: props => (
      <Text     whiteSpace={'normal'} fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try{
        if (has.call(props, 'message')) {
          return props.message
        }
        return '';
      } catch(error){
        console.error(error);
        return '';
      }
    },
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
    const {user} = this.props;
    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Notifications
        </Text>
        <Box backgroundColor="color0">
          <Query
            query={NotificationListQuery}
            variables={{
              bureau: user.id,
            }}>
            {({error, data, loading}) => {
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

NotificationsPage = CheckAuthorization([ROLE_BUREAU])(NotificationsPage);
NotificationsPage = connect(state => ({
  user: getUserFromStore(state),
}))(NotificationsPage);
export default NotificationsPage;
