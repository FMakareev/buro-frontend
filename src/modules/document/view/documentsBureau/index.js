import React, {Component} from 'react';
import {Container} from "../../../../components/Container/Container";
import {Text} from "../../../../components/Text/Text";
import {data} from './mock';
import {ButtonBase} from "../../../../components/ButtonBase/ButtonBase";
import {SvgUpload} from "../../../../components/Icons/SvgUpload";
import {ButtonWithImage} from "../../../../components/ButtonWithImage/ButtonWithImage";
import {makeData} from "./utils";
import ReactTableStyled from "../../../../components/ReactTableStyled/ReactTableStyled";


const columns = [
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
        if (props.user) {
          return `${props.user.firstName} ${props.user.lastName} ${props.user.sureName}`
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    filterMethod: (filter, row) =>
      row[filter.id].startsWith(filter.value) &&
      row[filter.id].endsWith(filter.value)
  },
  {
    id: 'updateDate',
    Header: 'Date of download',
    Cell: props => {
      return <Text fontFamily={'medium'} fontSize={6} lineHeight={9} color={'color1'}>
        {props.value}
      </Text>
    },

    accessor: props => {
      if (props.updateDate) {
        return props.updateDate
      }
      return '-';
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
        return <ButtonBase display={'inline-block'} size={'small'} variant={'transparent'}>
          Update
        </ButtonBase>
      } else {
        return (<ButtonWithImage
          display={'inline-block'}
          iconRight={<Text
            fontSize={5}
            lineHeight={0}
            fill={'inherit'}>
            <SvgUpload/>
          </Text>}
          size={'small'}
          variant={'transparent'}>
          Upload
        </ButtonWithImage>)
      }
    },
    accessor: props => {
      if (props.document) {
        return props.document.name
      }
      return null;
    }
  }
];


export class DocumentsBureauPage extends Component {
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
    return (
      <Container>
        <Text fontFamily={'bold'} fontSize={8} lineHeight={8} mb={7}>
          Documents
        </Text>
        <ReactTableStyled
          data={data}
          filterable
          columns={columns}
        />
      </Container>
    );
  }
}

export default DocumentsBureauPage;
