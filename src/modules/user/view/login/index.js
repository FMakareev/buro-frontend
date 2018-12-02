import React, { Component } from 'react';

import { Wrapper } from '../../components/Wrapper';
import { Title } from '../../components/Title';

import { FormUserLogin } from './FormUserLogin';

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
      <Wrapper ml={100} mt={120} maxWidth={360}>
        <Title>Sign in</Title>
        <FormUserLogin />
      </Wrapper>
    );
  }
}

export default LoginPage;
