import React, {Component} from 'react';
import dayjs from 'dayjs';
import {Container} from "../../../../components/Container/Container";
import {Text} from "../../../../components/Text/Text";
import {ButtonBase} from "../../../../components/ButtonBase/ButtonBase";
import {SvgUpload} from "../../../../components/Icons/SvgUpload";
import {ButtonWithImage} from "../../../../components/ButtonWithImage/ButtonWithImage";
import {makeData} from "./utils";
import ReactTableStyled from "../../../../components/ReactTableStyled/ReactTableStyled";
import {FormDocumentUpload} from "../../documents/FormDocumentUpload/FormDocumentUpload";
import Modal from "../../../../components/Modal/Modal";


const columns = ({onOpenFormUpdateDoc}) => {

  return [
    {
      id: 'Client',
      Header: 'Client',
      Cell: props => {
        return <Text fontFamily={'medium'} fontSize={6} lineHeight={9} color={'color1'}>
          {props.value}
        </Text>
      },
      accessor: props => {
        try {
          if (props) {
            return `${props.firstName} ${props.lastName} ${props.sureName}`
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    },
    {
      id: 'updateDate',
      Header: 'Date of download',
      Cell: props => (<Text fontFamily={'medium'} fontSize={6} lineHeight={9} color={'color1'}>
        {props.value}
      </Text>),

      accessor: props => {
        if (props.document) {
          return dayjs(props.document.updateDate).format('DD.MM.YYYY HH:mm:ss')
        }
        return null;
      },
      filterMethod: (filter, row) =>
        row[filter.id].startsWith(filter.value) &&
        row[filter.id].endsWith(filter.value)
    },
    {
      id: 'Document',
      Header: 'Document',
      filterable: false,
      Cell: props => {
        if (props.value) {
          return <ButtonBase onClick={() => onOpenFormUpdateDoc(props.original.id)} display={'inline-block'}
                             size={'xsmall'} variant={'transparent'}>
            Update
          </ButtonBase>
        } else {
          return (<ButtonWithImage
            onClick={() => onOpenFormUpdateDoc(props.original.id)}
            display={'inline-block'}
            iconRight={<Text
              fontSize={5}
              lineHeight={0}
              fill={'inherit'}>
              <SvgUpload/>
            </Text>}
            size={'xsmall'}
            variant={'transparent'}>
            Upload
          </ButtonWithImage>)
        }
      },
      accessor: props => {
        if (props.document) {
          return props.document.id
        }
        return null;
      }
    }
  ];
};


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
      isOpen: true,
      // id пользователя к которому крепится окумент
      id: null,
      data: makeData(100)
    };
  }

  onOpenFormUpdateDoc = (id) => this.setState(() => ({id, isOpen: true}))

  toggleModal = () => {
    console.log('toggleModal');
    this.setState(state => ({isOpen: !state.isOpen}));
  };

  render() {
    const {isOpen, id} = this.state;
    return (
      <Container>
        <Text fontFamily={'bold'} fontSize={8} lineHeight={8} mb={7}>
          Documents
        </Text>
        <ReactTableStyled
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).indexOf(filter.value) >= 0}
          data={this.state.data}
          filterable
          columns={columns({
            onOpenFormUpdateDoc: this.onOpenFormUpdateDoc,
          })}
        />
        {
          isOpen &&
          <Modal toggleModal={this.toggleModal}>
            <FormDocumentUpload toggleModal={this.toggleModal} id={id}/>
          </Modal>
        }
      </Container>
    );
  }
}

export default DocumentsBureauPage;
