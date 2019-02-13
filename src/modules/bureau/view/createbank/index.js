import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from '@lib/ui/Container/Container';
import {Text} from '@lib/ui/Text/Text';

import FormCreateBank from "../../components/FormCreateBank/FormCreateBank";
import {ROLE_BUREAU} from "@lib/shared/roles";
import {CheckAuthorization} from "@lib/ui/CheckAuthorization/CheckAuthorization";
import {getUserFromStore} from "../../../../store/reducers/user/selectors";


export class CreateBankPage extends Component {
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
      <Container backgroundColor="transparent">
        <Container mx={0} maxWidth={'350px'} backgroundColor="transparent" px={6}>
          <Text fontFamily="bold" fontWeight="bold" fontSize={9} lineHeight={9} mb={7}>
            Create bank
          </Text>
          <FormCreateBank/>
        </Container>
      </Container>
    );
  }
}

CreateBankPage = CheckAuthorization([ROLE_BUREAU])(CreateBankPage);
CreateBankPage = connect(state => ({
  user: getUserFromStore(state),
}))(CreateBankPage);

export default CreateBankPage;
