import React, {Component} from 'react';

import {Box} from '@lib/ui/Box/Box';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {Title} from '../../components/Title/Title';

import FormUserPasswordRecovery from '../../components/FormUserPasswordRecovery/FormUserPasswordRecovery';
import {Redirect} from "react-router-dom";

export class PasswordRecovery extends Component {
  static propTypes = {};

  static defaultProps = {
    match: {
      params: null,
    }
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const {match: {params}} = this.props;
    console.log(this.props);
    console.log(params);
    if (!params || !params.token) {
      return <Redirect to={'/'}/>
    }
    console.log(params);
    const initialValues = {
      token: params.token,
    }
    console.log(initialValues);
    return (
      <Wrapper position={'relative'} ml={['auto', 20, 100]} mt={[10, 120]} maxWidth={360}>
        <Box mb={6}>
          <Title>New password</Title>
        </Box>
        <FormUserPasswordRecovery initialValues={initialValues}/>
      </Wrapper>
    );
  }
}

export default PasswordRecovery;
