import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import { Title } from '../../components/Title';
import { FormResetPassword } from './FormResetPassword';
import { Box } from '../../../../components/Box/Box';

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
        <Box mb={6}>
          <Title>Reset your password</Title>
        </Box>

        <FormResetPassword />
      </Wrapper>
    );
  }
}

export default PasswordResetPage;
