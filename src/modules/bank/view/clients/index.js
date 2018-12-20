import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Container } from '@lib/ui/Container/Container';
import { Text } from '@lib/ui/Text/Text';
import { ReactTableStyled } from '@lib/ui/ReactTableStyled/ReactTableStyled';

import { CheckAuthorization } from '@lib/ui/CheckAuthorization/CheckAuthorization';
import { ROLE_BANK } from '@lib/shared/roles';
import { Box } from '@lib/ui/Box/Box';
import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { CreateNotificationButton } from '../../components/CreateNotificationButton/CreateNotificationButton';

const has = Object.prototype.hasOwnProperty;

const columns = user => [
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
            ? `${props.client.firstName} ${props.client.lastName} ${props.client.patronymic}`
            : null;
        }
      } catch (error) {
        console.log(error);
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
        if (has.call(props, 'client')) {
          return props.client && props.client.birthdate ? dayjs(props.client.birthdate).format('DD.MM.YYYY') : null;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'Request Status',
    Header: 'Status',
    // filterable: true,
    Cell: props => {
      console.log('Status', props);
      try {
        return (
          <CreateNotificationButton bankid={user.id} clientid={props.value}>
            Request
          </CreateNotificationButton>
        );
      } catch (error) {
        console.log(error);
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
    return {};
  }

  render() {
    const { user } = this.props;

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
            {({ error, data, loading }) => {
              console.log('UserListQuery: ', error, data, loading);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
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
