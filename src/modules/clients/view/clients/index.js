import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';
import { SvgCancelRequest } from '../../../../components/Icons/SvgCancelRequest';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { makeData } from '../../../document/helpers/utils';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';
import { FormDocumentUpload } from '../../../document/components/FormDocumentUpload/FormDocumentUpload';
import { Modal } from '../../../../components/Modal/Modal';

const columns = ({ onOpenFormUpdateDoc }) => [
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
          return `${props.firstName} ${props.lastName} ${props.sureName}`;
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

    accessor: props => dayjs(props.dateBirth).format('DD.MM.YYYY HH:mm:ss'),
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value),
  },
  {
    id: 'Request Status',
    Header: 'Status',
    // filterable: true,
    Cell: props => {
      if (props.original.reqStatus !== 0) {
        return (
          <ButtonBase
            // onClick={() => onOpenFormUpdateDoc(props.original.id)}
            display="inline-block"
            size="xsmall"
            variant="transparent">
            {props.original.reqStatus === 1 ? 'Download' : 'Request'}
          </ButtonBase>
        );
      }
      return (
        <ButtonWithImage
          // onClick={() => onOpenFormUpdateDoc(props.original.id)}
          display="inline-block"
          iconRight={
            <Text fontSize={5} lineHeight={0} fill="inherit">
              <SvgCancelRequest />
            </Text>
          }
          size="xsmall"
          variant="transparent"
          pl="3px"
          pr="5px">
          Requested
        </ButtonWithImage>
      );
    },
    accessor: props => props.reqStatus,
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
    return {
      // статус открытия модального окна
      isOpen: false,
      // id пользователя к которому крепится окумент
      id: null,
      data: makeData(100),
    };
  }

  onOpenFormUpdateDoc = id => this.setState(() => ({ id, isOpen: true }));

  toggleModal = () => {
    console.log('toggleModal');
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { isOpen, id } = this.state;
    return (
      <Container px={6}>
        <Text fontFamily="bold" fontSize={8} lineHeight={8} mb={7}>
          Clients
        </Text>
        <ReactTableStyled
          defaultFilterMethod={(filter, row) => String(row[filter.id]).indexOf(filter.value) >= 0}
          data={this.state.data}
          filterable
          columns={columns({
            onOpenFormUpdateDoc: this.onOpenFormUpdateDoc,
          })}
        />
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <FormDocumentUpload toggleModal={this.toggleModal} id={id} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default ClientsPage;
