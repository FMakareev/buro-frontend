// activateBank

import React, {Component} from 'react';
import Wrapper from '../../components/Wrapper/Wrapper';
import {Title} from '../../components/Title/Title';
import FormActivateBank from '../../components/FormActivateBank/FormActivateBank';

export class ActivateBankPage extends Component {
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
    console.log(this.props);
    const {match: {params: {token}}} = this.props;

    return (
      <Wrapper ml={['auto', 20, 100]} mt={[10, 120]} maxWidth="360px">
        <Title mb={6}>Bank activate</Title>
        <FormActivateBank
          initialValues={{
            token: token
          }}
        />
      </Wrapper>
    );
  }
}

export default ActivateBankPage;
