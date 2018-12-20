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
import { STATUS_NEED_UPDATE } from '@lib/shared/statuses';
import { EXCEL_DOWNLOAD } from '@lib/shared/endpoints';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';

import Modal from '@lib/ui/Modal/Modal';
import { CreateNotificationButton } from '../../components/CreateNotificationButton/CreateNotificationButton';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import FormDocumentUpload from '../../components/FormDocumentUpload/FromDocumentUpload';

const has = Object.prototype.hasOwnProperty;

const columns = ({ onFiltered, onOpenFormUploadDoc }) => [
  {
    id: 'Client',
    Header: 'Client',
    Cell: props => (
      <Text
        onClick={() => onFiltered({ id: 'Client', value: props.value })}
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
          return props.client && props.client.birthdate
            ? dayjs(props.client.birthdate).format('DD.MM.YYYY')
            : null;
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
            // href={`${EXCEL_DOWNLOAD}/${props.original.id}`}
            onClick={() => onOpenFormUploadDoc(props.original.id)}
            download
            as="button"
            display="inline-block"
            size="xsmall"
            variant="transparent"
            pl="3px"
            pr="5px">
            Upload
          </ButtonWithImage>
        );
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
      // статус открытия модального окна
      isOpen: false,
      // id пользователя документ которого качаем
      id: null,
      filtered: [],
    };
  }

  onOpenFormUploadDoc = id => this.setState(() => ({ id, isOpen: true }));

  toggleModal = () => {
    console.log('toggleModal');
    console.log(this.state.id);
    this.setState(state => ({ isOpen: !state.isOpen, id: null }));
  };

  render() {
    const { isOpen, id } = this.state;
    const { user } = this.props;
    console.log(this.props);
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
                  filtered={this.state.filtered}
                  filterable
                  onFilteredChange={(filtered, column) => {
                    this.setState(() => ({
                      filtered,
                    }));
                  }}
                  columns={columns({
                    onOpenFormUploadDoc: this.onOpenFormUploadDoc,
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
            <FormDocumentUpload toggleModal={this.toggleModal} id={id} />
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
