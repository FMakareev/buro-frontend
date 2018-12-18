import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@lib/ui/Box/Box';

import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Title } from '../../components/Title/Title';
import { HelpText } from '../../components/HelpText/HelpText';

import FormUserRegistration from '../../components/FormUserRegistration/FormUserRegistration';

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
    return <FormUserRegistration />;
  }
}

export default RegistrationPage;
