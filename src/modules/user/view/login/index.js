import React, {Component, Fragment} from 'react';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {Title} from '../../components/Title/Title';

import FormUserLogin from '../../components/FormUserLogin/FormUserLogin';
import {Box} from '@lib/ui/Box/Box';

import {PopUp} from "./PopUp";

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
      <Fragment>
        <Wrapper position="relative" ml={['auto', 20, 100]} mt={[10, 120]} maxWidth={'360px'}>
          <Box mb={6}>
            <Title>Sign in</Title>
          </Box>
          <FormUserLogin/>
        </Wrapper>
        <PopUp/>
      </Fragment>
    );
  }
}

export default LoginPage;
