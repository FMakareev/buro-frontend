import React, {Component} from 'react';
import dayjs from 'dayjs';
import {Query} from 'react-apollo';
import QueryString from 'query-string';
import md5 from 'md5';

import {connect} from 'react-redux';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {ReactTableStyled} from '@lib/ui/ReactTableStyled/ReactTableStyled';

import {CheckAuthorization} from '@lib/ui/CheckAuthorization/CheckAuthorization';
import {ROLE_BANK} from '@lib/shared/roles';
import {Box} from '@lib/ui/Box/Box';
import {STATUS_NEED_UPDATE} from '@lib/shared/statuses';
import {ButtonWithImage} from '@lib/ui/ButtonWithImage/ButtonWithImage';

import Modal from '@lib/ui/Modal/Modal';
import {CreateNotificationButton} from '../../components/CreateNotificationButton/CreateNotificationButton';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import FormDocumentDownload from '../../components/FormDocumentDownload/FormDocumentDownload';

const has = Object.prototype.hasOwnProperty;

const columns = ({onFiltered, state, onOpenFormUploadDoc}) => [
  {
    id: 'DocumentID',
    Header: 'Document token',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try {
        return md5(props.id);
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  },
  {
    id: 'Client',
    Header: 'Client',
    Cell: props => (
      <Text
        onClick={() => onFiltered({id: 'Client', value: props.value})}
        fontFamily="medium"
        fontSize={6}
        lineHeight={9}
        color="color1">
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
    id: 'UploadDate',
    Header: 'Upload date',
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
      } catch (error) {
        console.error(error);
      }
      return '';
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'Request Status',
    Header: 'Status',
    Cell: props => {
      try {
        /** TODO: если статус `need update` значит документ был обновлен и его нужно перезапросить */
        if (props.original.status === STATUS_NEED_UPDATE) {
          return (
            <CreateNotificationButton
              clientid={props.original.client ? props.original.client.id : null}
              bankid={props.original.owner.id}>
              Update
            </CreateNotificationButton>
          );
        }
        /** TODO: тут будет ссылка или запрос на скачивание документа */
        return (
          <ButtonWithImage
            onClick={() => onOpenFormUploadDoc(props.original.id)}
            download
            as="button"
            display="inline-block"
            size="xsmall"
            variant="transparent"
            pl="3px"
            pr="5px">
            Download
          </ButtonWithImage>
        );
      } catch (error) {
        console.error(error);
      }
      return null;
    },
    accessor: props => {
      if (has.call(props, 'client')) {
        /** @desc если окно закрыто и хеш id равен хешу id в state то открываем окно */
        /** @desc нужно для того чтобы передавать коректный id в форму т.к. из querystring нам приходит хеш md5 */
        if (!state.isOpen && md5(props.id) === state.id) {
          onOpenFormUploadDoc(props.id);
        }
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
    try {
      const {location} = this.props;
      const query = QueryString.parse(location.search);
      const id = query.document ? query.document.substring(0, query.document.indexOf('?')) : null;
      return {
        // статус открытия модального окна
        isOpen: false,
        // id пользователя документ которого качаем
        id: id,
        filtered: [
          (query.document ? {
            id: "DocumentID",
            value: id,
          } : {}),

        ],
      };
    } catch (error) {
      console.error(error);
      return {
        // статус открытия модального окна
        isOpen: false,
        // id пользователя документ которого качаем
        id: null,
        filtered: [],
      };
    }
  }

  onOpenFormUploadDoc = id => {
    console.log('onOpenFormUploadDoc: ', id);
    return this.setState(() => ({id, isOpen: true}));
  };

  toggleModal = () => {
    this.setState(state => ({isOpen: !state.isOpen, id: null}));
  };

  render() {
    const {isOpen, id} = this.state;
    const {user} = this.props;
    console.log(this.state);
    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Documents
        </Text>

        <Box backgroundColor="color0">
          <Query
            query={UserDocumentListQuery}
            variables={{
              bankid: user.id,
            }}>
            {({error, data, loading}) => {
              return (
                <ReactTableStyled
                  SubComponent={({original, ...rest}) => {

                    if (original.transactionlist) {
                      return (
                        <div style={{padding: "20px"}}>
                          <Text fontFamily="bold" fontWeight="bold" fontSize={7} lineHeight={7} mb={5}>
                            Transaction list
                          </Text>
                          {
                            original.transactionlist.map((item, index) => {
                              let href = null;
                              try {
                                href = new URL(item.name, new URL(`https://explorer.emercoin.com/nvs//`)).href;
                                console.log(href);
                              } catch (error) {
                                console.log(error);
                              }
                              return (<Box
                                mb={3}>
                                <Text
                                  target={'_blank'}
                                  href={href}
                                  as={'a'}>
                                  {index + 1}. {item.name}
                                </Text>
                              </Box>)
                            })
                          }
                        </div>
                      );
                    }
                  }}
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
                  filtered={this.state.filtered}
                  filterable
                  onFilteredChange={(filtered, column) => {
                    this.setState(() => ({
                      filtered,
                    }));
                  }}
                  columns={columns({
                    onOpenFormUploadDoc: this.onOpenFormUploadDoc,
                    state: this.state,
                    onFiltered: props => {
                      this.setState(() => ({
                        filtered: [props],
                      }));
                    },
                  })}
                />
              );
            }}
          </Query>
        </Box>
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <FormDocumentDownload toggleModal={this.toggleModal} id={id}/>
          </Modal>
        )}
      </Container>
    );
  }
}

DocumentsPage = CheckAuthorization([ROLE_BANK])(DocumentsPage);

DocumentsPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentsPage);

export default DocumentsPage;
