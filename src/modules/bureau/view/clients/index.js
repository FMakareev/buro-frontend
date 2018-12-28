import React, {Component} from 'react';
import dayjs from 'dayjs';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';
import {SvgUpload} from '@lib/ui/Icons/SvgUpload';
import {ButtonWithImage} from '@lib/ui/ButtonWithImage/ButtonWithImage';
import ReactTableStyled from '@lib/ui/ReactTableStyled/ReactTableStyled';
import {FormDocumentUpload} from '../../components/FormDocumentUpload/FormDocumentUpload';
import Modal from '@lib/ui/Modal/Modal';
import UserListQuery from './UserListQuery.graphql';
import {ROLE_BUREAU, ROLE_CLIENT} from '@lib/shared/roles';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import {Box} from '@lib/ui/Box/Box';
import {CheckAuthorization} from "@lib/ui/CheckAuthorization/CheckAuthorization";
import UserDocumentItemQuery from './UserDocumentItemQuery.graphql';
import {userdocumentitem} from "../../../../apollo/graphql/query/userdocumentitem";

const has = Object.prototype.hasOwnProperty;


/**
 * @params {object} props
 * @params {func} props.onOpenFormUpdateDoc
 * @params {object} props.user
 * */
const columns = ({onOpenFormUpdateDoc, user}) => [
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
          return `${props.firstName || ''} ${props.lastName || ''} ${props.patronymic || ''}`;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  },
  {
    id: 'birthdate',
    Header: 'Date of birth',
    Cell: props => (
      <Text fontFamily="medium" fontSize={6} lineHeight={9} color="color1">
        {props.value}
      </Text>
    ),
    accessor: props => {
      try {
        if (has.call(props, 'birthdate')) {
          return dayjs(props.birthdate).format('DD.MM.YYYY') || '';
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'DocumentUploadDate',
    Header: 'Upload date',
    filterable: false,
    Cell: (props) => {
      const {original} = props;
      return <Query
        query={UserDocumentItemQuery}
        variables={{
          client: original.id,
          owner: user.id,
        }}
      >
        {({error, data, loading}) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return 'Error.';
          }
          if (has.call(data, 'userdocumentitem') && data.userdocumentitem && has.call(data.userdocumentitem, 'date')) {
            return dayjs(data.userdocumentitem.date).format('DD.MM.YYYY') || 'Not loaded';
          } else {
            return 'Not loaded';
          }
        }}
      </Query>
    },
    accessor: (props) => props.id,
  },
  {
    id: 'DocumentAction',
    Header: '',
    filterable: false,
    Cell: (props) => {
      const {value, original} = props;
      return (<Query
          query={UserDocumentItemQuery}
          variables={{
            client: original.id,
            owner: user.id,
          }}
        >
          {({error, data, loading, refetch, ...rest}) => {
            return (
              <ButtonWithImage
                onClick={() => onOpenFormUpdateDoc(value)}
                display={"inline-block"}
                disabled={loading}
                iconRight={
                  <Text fontSize={5} lineHeight={0} fill="inherit">
                    <SvgUpload/>
                  </Text>
                }
                size="xsmall"
                variant="transparent">
                {
                  has.call(data, 'userdocumentitem') && data.userdocumentitem ? 'Update' : 'Upload'
                }
              </ButtonWithImage>)
          }}
        </Query>
      );

    },
    accessor: props => props.id,
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
      // id пользователя к которому крепится документ
      id: null,
      userDocumentList: {},
    };
  }

  onOpenFormUpdateDoc = id => this.setState(() => ({id, isOpen: true}));

  toggleModal = () => {
    this.setState(state => ({isOpen: !state.isOpen, id: null}));
  };

  render() {
    const {user} = this.props;
    const {isOpen, id} = this.state;
    return (
      <Container backgroundColor="transparent" px={6}>
        <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
          Documents
        </Text>
        <Box backgroundColor="color0">
          <Query
            query={UserListQuery}
            variables={{
              role: ROLE_CLIENT
            }}
            onError={() => { }}
          >
            {({error, data, loading, refetch, ...rest}) => {
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
                    user: user,
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
