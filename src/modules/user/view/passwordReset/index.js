import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper/Wrapper';
import { Title } from '../../components/Title/Title';
import FormResetPassword  from '../../components/FormResetPassword/FormResetPassword';

export class PasswordResetPage extends Component {
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
      <Wrapper ml={['auto', 20, 100]} mt={[10, 120]} maxWidth={360}>
        <Title mb={6}>Reset your password</Title>
        <FormResetPassword />
      </Wrapper>
    );
  }
}

export default PasswordResetPage;
