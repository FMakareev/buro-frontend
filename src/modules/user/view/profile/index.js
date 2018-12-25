import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Container } from '@lib/ui/Container/Container';
import FormUserProfile from '../../components/FormProfileUser/FormUserProfile';
import FormChangePassword from '../../components/FormChangePassword/FormChangePassword';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
import { CheckAuthorization } from '@lib/ui/CheckAuthorization/CheckAuthorization';

export class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;
    return (
      <ErrorCatch>
        <Container px={6} mt={[10, 100]} backgroundColor="transparent">
          <Query query={UserEmailItemQuery} variables={{ email: user.email }}>
            {({ data, loading, error }) => {
              if (error) {
                throw error;
              }
              if (loading) {
                return 'Loading..,';
              }
              return <FormUserProfile initialValues={data && data.useremailitem} />;
            }}
          </Query>
          <FormChangePassword />
        </Container>
      </ErrorCatch>
    );
  }
}
ProfilePage = CheckAuthorization()(ProfilePage);

ProfilePage = connect(state => ({
  user: getUserFromStore(state),
}))(ProfilePage);

export default ProfilePage;
