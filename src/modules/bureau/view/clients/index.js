import React, {Component} from 'react';
import dayjs from 'dayjs';
import {connect} from 'react-redux';

import {Query} from 'react-apollo';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {ButtonBase} from '@lib/ui/ButtonBase/ButtonBase';
import {SvgUpload} from '@lib/ui/Icons/SvgUpload';
import {ButtonWithImage} from '@lib/ui/ButtonWithImage/ButtonWithImage';
import ReactTableStyled from '@lib/ui/ReactTableStyled/ReactTableStyled';
import {FormDocumentUpload} from '../../components/FormDocumentUpload/FormDocumentUpload';
import Modal from '@lib/ui/Modal/Modal';
import UserListQuery from './UserListQuery.graphql';
import {ROLE_BUREAU} from '@lib/shared/roles';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import {Box} from '@lib/ui/Box/Box';
import {CheckAuthorization} from "@lib/ui/CheckAuthorization/CheckAuthorization";

const has = Object.prototype.hasOwnProperty;

const columns = ({onOpenFormUpdateDoc}) => [
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
        if (props) {
          return `${props.firstName} ${props.lastName} ${props.patronymic}`;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  },
  {
    id: 'dob',
    Header: 'Date of birth',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      if (props && props.birthdate) {
        console.log(props.birthdate);
        return dayjs(props.birthdate).format('DD.MM.YYYY');
      }
      return null;
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  // {
  //   id: 'updateDate',
  //   Header: 'Date of download',
  //   Cell: props => (
  //     <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
  //       {props.value}
  //     </Text>
  //   ),
  //   accessor: props => {
  //     if (Array.isArray(props.document) && props.document.length) {
  //       return dayjs(props.document[props.document.length - 1].date).format('DD.MM.YYYY HH:mm:ss');
  //     }
  //     return null;
  //   },
  //   filterMethod: (filter, row) =>
  //     row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  // },
  {
    id: 'Document',
    Header: 'Document',
    filterable: false,
    Cell: props => {
      if (props.value) {
        return (
          <ButtonBase
            onClick={() => onOpenFormUpdateDoc(props.original.id)}
            display="inline-block"
            size="xsmall"
            variant="transparent">
            Update
          </ButtonBase>
        );
      }
      return (
        <ButtonWithImage
          onClick={() => onOpenFormUpdateDoc(props.original.id)}
          display="inline-block"
          iconRight={
            <Text fontSize={5} lineHeight={0} fill="inherit">
              <SvgUpload/>
            </Text>
          }
          size="xsmall"
          variant="transparent">
          Upload
        </ButtonWithImage>
      );
    },
    accessor: props => {
      if (props.document && props.document.length) {
        return props.document;
      }
      return null;
    },
  },
];

export class DocumentsBureauPage extends Component {
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
      // id пользователя к которому крепится окумент
      id: null,
    };
  }

  onOpenFormUpdateDoc = id => this.setState(() => ({id, isOpen: true}));

  toggleModal = () => {
    console.log('toggleModal');
    this.setState(state => ({isOpen: !state.isOpen}));
  };

  render() {
    const {isOpen, id} = this.state;
    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Documents
        </Text>
        <Box backgroundColor="color0">
          <Query query={UserListQuery}>
            {({error, data, loading, refetch, ...rest}) => {
              console.log(error, data, loading,rest);
              return (
                <ReactTableStyled
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).indexOf(filter.value) >= 0
                  }
                  data={loading ? [] : data && has.call(data, 'userlist') ? data.userlist : []}
                  error={error}
                  filterable
                  loading={loading}
                  columns={columns({
                    onOpenFormUpdateDoc: this.onOpenFormUpdateDoc,
                  })}
                />
              );
            }}
          </Query>
        </Box>
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <FormDocumentUpload toggleModal={this.toggleModal} id={id}/>
          </Modal>
        )}
      </Container>
    );
  }
}

DocumentsBureauPage = CheckAuthorization([ROLE_BUREAU])(DocumentsBureauPage);

DocumentsBureauPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentsBureauPage);

export default DocumentsBureauPage;
