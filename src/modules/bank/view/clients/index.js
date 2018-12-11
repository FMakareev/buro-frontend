import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';

import UserListQuery from './UserListQuery.graphql';

import { STATUS_PENDING, STATUS_APPROVAL } from '../../../../shared/statuses';
import { CheckAuthorization } from '../../../../components/CheckAuthorization/CheckAuthorization';
import { ROLE_BANK } from '../../../../shared/roles';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { CreateNotificationButton } from '../../components/CreateNotificationButton/CreateNotificationButton';
import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';
import { Box } from '../../../../components/Box/Box';

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
        if (props.user) {
          return `${props.user.firstName} ${props.user.lastName} ${props.user.patronymic}`;
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
        if (props.user) {
          return dayjs(props.user.birthdate).format('DD.MM.YYYY');
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
      try {
        if (!props.original.document || !props.original.document.length) {
          return <Text>Not provide document</Text>;
        }
        if (props.original.document) {
          if (props.original.document[0].status === STATUS_PENDING) {
            return (
              <Text fontSize={6} color={'color1'}>
                Pending approval
              </Text>
            );
          }
          if (props.original.document[0].status === STATUS_APPROVAL) {
            return (
              <ButtonBase
                as={'a'}
                display={'inline-block'}
                href={props.original.document[0].file}
                size={'xsmall'}
                variant={'transparent'}
                pl={'3px'}
                pr={'5px'}
                id={user.id}>
                Download
              </ButtonBase>
            );
          } else {
            return <CreateNotificationButton id={user.id}>Request</CreateNotificationButton>;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    accessor: props => {
      if (props.document && props.document.length) {
        return props.document;
      }
      return null;
    },
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
    console.log(this.props);
    return (
      <Container backgroundColor={'transparent'} px={6}>
        <Text fontFamily={'bold'} fontWeight={'bold'} fontSize={9} lineHeight={9} mb={7}>
          Clients
        </Text>

        <Box backgroundColor={'color0'}>
          <Query
            query={UserListQuery}
            variables={{
              id: user.id,
            }}>
            {({ error, data, loading }) => {
              console.log('UserListQuery: ', error, data, loading);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  data={loading ? [] : data && data.userDocumentList}
                  // loadingText={loading ? 'Loading...' : error ? 'Error...' : 'Loading...'}
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

export default ClientsPage;
