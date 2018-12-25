import React, { Component } from 'react';

import { Box } from '@lib/ui/Box/Box';

import { Redirect } from 'react-router-dom';
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Title } from '../../components/Title/Title';

import FormUserPasswordRecovery from '../../components/FormUserPasswordRecovery/FormUserPasswordRecovery';

export class PasswordRecovery extends Component {
  static propTypes = {};

  static defaultProps = {
    match: {
      params: null,
    },
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const {
      match: { params },
    } = this.props;
    if (!params || !params.token) {
      return <Redirect to="/" />;
    }
    const initialValues = {
      token: params.token,
    };
    return (
      <Wrapper position="relative" ml={['auto', 20, 100]} mt={[10, 120]} maxWidth="360px">
        <Box mb={6}>
          <Title>New password</Title>
        </Box>
        <FormUserPasswordRecovery initialValues={initialValues} />
      </Wrapper>
    );
  }
}

export default PasswordRecovery;
