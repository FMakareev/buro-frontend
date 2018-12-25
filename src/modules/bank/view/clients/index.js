import React, {Component} from 'react';
import dayjs from 'dayjs';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import QueryString from 'query-string';
import md5 from 'md5';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {ReactTableStyled} from '@lib/ui/ReactTableStyled/ReactTableStyled';

import {CheckAuthorization} from '@lib/ui/CheckAuthorization/CheckAuthorization';
import {ROLE_BANK} from '@lib/shared/roles';
import {Box} from '@lib/ui/Box/Box';
import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import {CreateNotificationButton} from '../../components/CreateNotificationButton/CreateNotificationButton';

const has = Object.prototype.hasOwnProperty;

const columns = user => [
  {
    id: 'ClientID',
    Header: 'Client token',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try {
        if (has.call(props, 'client')) {
          return md5(props.client.id);
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  }, {
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
    id: 'birthDate',
    Header: 'Date of birth',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),

    accessor: props => {
      try {
        if (has.call(props, 'client') && has.call(props.client, 'birthdate')) {
          const date = dayjs(props.client.birthdate).format('DD.MM.YYYY');
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
      try {
        return (
          <CreateNotificationButton bankid={user.id} clientid={props.value}>
            Request
          </CreateNotificationButton>
        );
      } catch (error) {
        console.error(error);
      }
      return null;
    },
    accessor: props => {
      if (has.call(props, 'client')) {
        return props.client ? props.client.id : null;
      }
      return null;
    },
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
    const {location} = this.props;
    console.log('location.search: ', location.search);
    const query = QueryString.parse(location.search);

    return {
      filtered: [
        (query.client ? {
          id: "ClientID",
          value: query.client,
        } : {})
      ]
    };
  }

  render() {
    const {user} = this.props;

    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Clients
        </Text>

        <Box backgroundColor="color0">
          <Query
            query={UserDocumentListQuery}
            variables={{
              excludeowner: user.id,
              excludeownerrole: ROLE_BANK,
            }}>
            {({error, data, loading}) => {
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  filtered={this.state.filtered}
                  onFilteredChange={filtered => this.setState({filtered})}
                  data={
                    loading
                      ? []
                      : data && has.call(data, 'userdocumentlist')
                      ? data.userdocumentlist
                      : []
                  }
                  loadingText={loading ? 'Loading...' : error ? 'Error...' : 'Loading...'}
                  loading={loading}
                  error={error}
                  filterable
                  columns={columns(user)}
                />
              );
            }}
          </Query>
        </Box>
      </Container>
    );
  }
}

ClientsPage = CheckAuthorization([ROLE_BANK])(ClientsPage);

ClientsPage = connect(state => ({
  user: getUserFromStore(state),
}))(ClientsPage);

export default ClientsPage;
