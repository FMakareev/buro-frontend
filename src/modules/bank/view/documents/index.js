import React, {Component} from 'react';
import dayjs from 'dayjs';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import {Container} from '../../../../components/Container/Container';
import {Text} from '../../../../components/Text/Text';
import {ReactTableStyled} from '../../../../components/ReactTableStyled/ReactTableStyled';

import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import {CheckAuthorization} from '../../../../components/CheckAuthorization/CheckAuthorization';
import {ROLE_BANK} from '../../../../shared/roles';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import {CreateNotificationButton} from '../../components/CreateNotificationButton/CreateNotificationButton';
import {Box} from '../../../../components/Box/Box';
import {STATUS_NEED_UPDATE} from "../../../../shared/statuses";

const has = Object.prototype.hasOwnProperty;


const columns = ({onFiltered}) => [
  {
    id: 'Client',
    Header: 'Client',
    Cell: props => (
      <Text onClick={()=>onFiltered({id:'Client',value:props.value})} fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try {
        if (has.call(props, 'client')) {
          return `${props.client.firstName} ${props.client.lastName} ${props.client.patronymic}`;
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
          return dayjs(props.client.birthdate).format('DD.MM.YYYY');
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
    Cell: (props) => {
      try {
        /** TODO: если статус `need update` значит документ был обновлен и его нужно перезапросить */
        if (props.original.status === STATUS_NEED_UPDATE) {
          return <CreateNotificationButton
            clientid={props.original.client.id}
            bankid={props.original.owner.id}>
            Update
          </CreateNotificationButton>;
        } else {
          /** TODO: тут будет ссылка или запрос на скачивание документа */
          return <Text>Upload</Text>
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    accessor: props => {
      if (has.call(props, 'client')) {
        return props;
      }
      return null;
    },
  },
];


export class DocumentsPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      filtered: []
    };
  }

  render() {
    const {user} = this.props;
    console.log(this.props);
    return (
      <Container backgroundColor={'transparent'} px={6}>
        <Text fontFamily={'bold'} fontWeight={'bold'} fontSize={9} lineHeight={9} mb={7}>
          Documents
        </Text>

        <Box backgroundColor={'color0'}>
          <Query
            query={UserDocumentListQuery}
            variables={{
              bankid: user.id,
            }}>
            {({error, data, loading}) => {
              console.log('UserListQuery: ', error, data, loading);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  data={loading ? [] : has.call(data, 'userdocumentlist') ? data.userdocumentlist : []}
                  loadingText={loading ? 'Loading...' : error ? 'Error...' : 'Loading...'}
                  loading={loading}
                  error={error}
                  filtered={this.state.filtered}
                  filterable
                  onFilteredChange={(filtered, column) =>{
                    this.setState(() => ({
                      filtered: filtered
                    }))
                  }}
                  columns={columns({
                    onFiltered: (props) => {
                      this.setState(() => ({
                        filtered: [props]
                      }))
                    }
                  })}
                />
              );
            }}
          </Query>
        </Box>
      </Container>
    );
  }
}

DocumentsPage = CheckAuthorization([ROLE_BANK])(DocumentsPage);

DocumentsPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentsPage);

export default DocumentsPage;
