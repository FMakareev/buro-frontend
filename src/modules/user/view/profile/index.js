import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Container} from '../../../../components/Container/Container';
import FormUserProfile from '../../components/FormProfileUser/FormUserProfile';
import ErrorCatch from "../../../../components/ErrorCatch/ErrorCatch";
import {getUserFromStore} from "../../../../store/reducers/user/selectors";
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
import {CheckAuthorization} from "../../../../components/CheckAuthorization/CheckAuthorization";




@connect((state) => ({
  user: getUserFromStore(state),
}))
@CheckAuthorization()
export class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const {
      user
    } = this.props;
    console.log('ProfilePage: ',this.props);
    return (
      <ErrorCatch>
        <Container px={6} mt={[10, 100]} backgroundColor="transparent">
          <Query query={UserEmailItemQuery} variables={{email: user.email}}>
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
