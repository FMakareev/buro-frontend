import React, { Component } from 'react';
import dayjs from 'dayjs';
import { Query } from 'react-apollo';
import { Container } from '../../../../components/Container/Container';
import { Text } from '../../../../components/Text/Text';
import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';
import { SvgCancelRequest } from '../../../../components/Icons/SvgCancelRequest';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { makeData } from '../../../bureau/helpers/utils';
import { ReactTableStyled } from '../../../../components/ReactTableStyled/ReactTableStyled';

import UserListQuery from './UserListQuery.graphql';

import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../../shared/statuses';
import {CheckAuthorization} from "../../../../components/CheckAuthorization/CheckAuthorization";
import {ROLE_BANK} from "../../../../shared/roles";

const columns = () => [
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
          }
          return (
            <ButtonBase
              // onClick={() => onOpenFormUpdateDoc(props.original.id)}
              display="inline-block"
              size="xsmall"
              variant="transparent">
              {props.original.document[0].status === STATUS_APPROVAL ? 'Download' : 'Request'}
            </ButtonBase>
          );
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

@CheckAuthorization([ROLE_BANK])
export class ClientsPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      data: makeData(100),
    };
  }

  render() {
    const { isOpen, id } = this.state;
    return (
      <Container px={6}>
        <Text fontFamily="bold" fontSize={8} lineHeight={8} mb={7}>
          Clients
        </Text>

        <Query query={UserListQuery}>
          {({ error, data, loading }) => {
            console.log(error, data, loading);
            return (
              <ReactTableStyled
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]).indexOf(filter.value) >= 0
                }
                data={loading ? [] : data.userDocumentList}
                filterable
                columns={columns()}
              />
            );
          }}
        </Query>

      </Container>
    );
  }
}

export default ClientsPage;
