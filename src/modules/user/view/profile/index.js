import React, { Component } from 'react';

import { Container } from '../../../../components/Container/Container';
import FormUserProfile from './components/FormUserProfile';

export class ProfilePage extends Component {
  state = {};

  render() {
    return (
      <Container mt={100}>
        <FormUserProfile />
      </Container>
    );
  }
}

export default ProfilePage;
