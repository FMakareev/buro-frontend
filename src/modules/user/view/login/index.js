import React, { Component } from 'react';

import { Wrapper } from '../../components/Wrapper';
import { Title } from '../../components/Title';

import { FormUserLogin } from './FormUserLogin';
import {Box} from "../../../../components/Box/Box";

export class LoginPage extends Component {
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
      <Wrapper position={'relative'} ml={['auto', 20, 100]} mt={[10, 120]} maxWidth={360}>
        <Box mb={6}>
          <Title>Sign in</Title>
        </Box>
        <FormUserLogin />
      </Wrapper>
    );
  }
}

export default LoginPage;
