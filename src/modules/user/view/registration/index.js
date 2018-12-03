import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '../../../../components/Box/Box';

import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Title } from '../../components/Title/Title';
import { HelpText } from '../../components/HelpText/HelpText';

import { FormUserRegistration } from '../../components/FormUserRegistration/FormUserRegistration';

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
      <Wrapper position="relative" ml={['auto', 20, 100]} mt={[10, 120]} maxWidth={360}>
        <Title mb={6}>Sign up</Title>
        <Box mb={6}>
          <FormUserRegistration />
        </Box>
        <Box>
          <HelpText>
            Already have an account? <Link to="/login">Sign in</Link>
          </HelpText>
        </Box>
      </Wrapper>
    );
  }
}

export default RegistrationPage;
