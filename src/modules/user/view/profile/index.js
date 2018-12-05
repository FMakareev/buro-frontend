import React, {Component} from 'react';

import {Container} from '../../../../components/Container/Container';
import FormUserProfile from '../../components/FormProfileUser/FormUserProfile';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
import {Query} from "react-apollo";
import ErrorCatch from "../../../../components/ErrorCatch/ErrorCatch";


export class ProfilePage extends Component {
  state = {};

  render() {
    const {
      match: {params},
    } = this.props;
    return (
      <ErrorCatch>
        <Container px={6} mt={[10, 100]} backgroundColor="transparent">
          <Query query={UserEmailItemQuery} variables={{email: params.email}}>
            {
              ({data, loading, error}) => {
                console.log(data, loading, error);
                if (error) {
                  throw error;
                }
                if (loading) {
                  return 'Loading..,';
                }
                return <FormUserProfile initialValues={data && data.userEmailItem}/>
              }
            }
          </Query>
        </Container>
      </ErrorCatch>
    );
  }
}

export default ProfilePage;
