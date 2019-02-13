import React, {Component} from 'react';


import FormUserRegistration from '../../components/FormUserRegistration/FormUserRegistration';
import {ROLE_CLIENT} from "@lib/shared/roles";

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
    return <FormUserRegistration
      initialValues={{
        role: ROLE_CLIENT,
      }}
    />;
  }
}

export default RegistrationPage;
