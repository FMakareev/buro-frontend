import React, { Component } from 'react';

import { Box } from '../../../../components/Box/Box';

import { Wrapper } from '../../components/Wrapper';
import { Title } from '../../components/Title';

import { FormUserPasswordRecovery } from './FormUserPasswordRecovery';

export class PasswordRecovery extends Component {
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
        <Title>New password</Title>
        <FormUserPasswordRecovery />
      </Wrapper>
    );
  }
}

export default PasswordRecovery;
