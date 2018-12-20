import React, { Component } from 'react';


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
