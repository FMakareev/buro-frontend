import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '../../../../components/Box/Box';

import { Wrapper } from '../../components/Wrapper';
import { Title } from '../../components/Title';
import { HelpText } from '../../components/HelpText';

import { FormUserRegistration } from './FormUserRegistration';

export class RegistrationPage extends Component {
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
        <Title>Sign up</Title>
        <FormUserRegistration />
        <Box mt="16px">
          <HelpText>
            Already have an account? <Link to="/login">Sign in</Link>
          </HelpText>
        </Box>
      </Wrapper>
    );
  }
}

export default RegistrationPage;
