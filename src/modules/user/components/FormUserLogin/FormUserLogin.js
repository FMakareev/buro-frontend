/** global ENDPOINT_CLIENT */
import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {withApollo} from 'react-apollo';

import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';

import {TextFieldWithIcon} from '@lib/ui/TextFieldWithIcon/TextFieldWithIcon';

import {Box} from '@lib/ui/Box/Box';
import {Flex} from '@lib/ui/Flex/Flex';

import {SvgArrowRight} from '@lib/ui/Icons/SvgArrowRight';
import {SvgEmailIcon} from '@lib/ui/Icons/SvgEmailIcon';
import {SvgPasswordIcon} from '@lib/ui/Icons/SvgPasswordIcon';
import {SvgReloadIcon} from '@lib/ui/Icons/SvgReloadIcon';

import {Text} from '@lib/ui/Text/Text';

import {SpeedingWheel} from '@lib/ui/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '@lib/ui/PreloaderWrapper/PreloaderWrapper';

import {required} from '@lib/utils/validation/required';
import {isEmail} from '@lib/utils/validation/isEmail';
import {jsonToUrlEncoded} from '@lib/utils/jsontools/jsonToUrlEncoded';

import {USER_ADD} from '../../../../store/reducers/user/actionTypes';
import {HelpText} from '../HelpText/HelpText';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';
import {USER_AUTH} from "@lib/shared/endpoints";

export class FormUserLogin extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      submitting: false,
      apolloError: null,
    };
  }

  getNetworkError = errors => {
    try {
      let errorList = {};
      errors.forEach(item => {
        switch (item.message) {
          case 'user not found': {
            errorList.email = 'Wrong email or password';
            errorList.password = 'Wrong email or password';
          }
          case 'Cannot load user session. Error: User not logged':{
            errorList.graphQLErrors = 'User not logged.'
          }
        }
      });
      return errorList;
    } catch (error) {
      console.error(error);
      return {
        _error: 'Unexpected error.',
      };
    }
  };

  submit = value => {
    this.setState(() => ({
      submitting: true,
    }));
    return fetch(`${ENDPOINT_CLIENT+USER_AUTH}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonToUrlEncoded(value),
    })
      .then(response => {
        if (response.status >= 400 || !document.cookie) {
          throw response;
        } else {
          return this.getUser(value.email);
        }
      })
      .catch(({status, statusText}) => {
        this.setState(() => ({
          submitting: false,
          apolloError: null,
        }));

        if (status === 401 || status === 403) {
          throw new SubmissionError({_error: 'Wrong email or password'});
        } else {
          throw new SubmissionError({
            _error: 'User not logged',
          });
        }
      });
  };

  setUser = props => {
    const {
      data: {useremailitem},
    } = props;
    const {addUser} = this.props;

    addUser(useremailitem);
    localStorage.setItem('user', JSON.stringify(useremailitem));
  };

  getUser = email => {
    const {client, history} = this.props;
    return client
      .query({
        query: UserEmailItemQuery,
        variables: {
          email: email,
        },
      })
      .then(result => {
        if (result.errors || result.data.useremailitem === null) {
          // TO DO change this
          throw result;
        } else {
          this.setState(() => ({
            submitting: false,
            apolloError: null,
          }));
          this.setUser(result);
          history.push(`app/profile`);
          return Promise.resolve(result);
        }
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.error('graphQLErrors: ', graphQLErrors);
        console.error('message: ', message);
        console.error('networkError: ', networkError);
        console.error('rest: ', rest);
        this.setState(() => ({
          submitting: false,
          apolloError: graphQLErrors[0].message,
        }));
      });
  };

  mockSubmit = value => {
    this.setState(({submitting}) => ({submitting: !submitting}));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getUser(value.email);
        resolve(true);
      }, 2000);
    });
  };

  render() {
    const {handleSubmit, pristine, invalid, submitFailed, error} = this.props;
    const {apolloError, submitting} = this.state;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex justifyContent="center" width="100%" flexDirection="column">
          <Box width="100%" mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={
                <Text fontSize={11} lineHeight={0} fill="inherit">
                  <SvgEmailIcon/>
                </Text>
              }
              validate={[required, isEmail]}
            />
          </Box>
          <Box width="100%" mb={4}>
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
              icon={
                <Text fontSize={11} lineHeight={0} fill="inherit">
                  <SvgPasswordIcon/>
                </Text>
              }
              validate={[required]}
            />
          </Box>
          <Box width="100%" mb={8}>
            <Flex width="100%" justifyContent="space-between">
              <HelpText>
                Forgot your <Link to="/password-reset">password</Link>?
              </HelpText>
              <HelpText>
                <Link to="registration">Create at account</Link>
              </HelpText>
            </Flex>
          </Box>

          {!submitFailed && !apolloError && (
            <Box width="100%">
              <ButtonWithImageError
                type="submit"
                variant="primary"
                size="medium"
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgArrowRight/>
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Sign in
              </ButtonWithImageError>
            </Box>
          )}
          {(submitFailed ||
          apolloError || error) && (
            <Box width="100%">
              <ButtonWithImageError
                type="submit"
                variant="error"
                size="medium"
                error={error || apolloError}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgReloadIcon/>
                  </Text>
                }>
                Try again
              </ButtonWithImageError>
            </Box>
          )}
        </Flex>

        {submitting && (
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel/>
            </Text>
          </PreloaderWrapper>
        )}
      </Form>
    );
  }
}

FormUserLogin = withRouter(FormUserLogin);
FormUserLogin = withApollo(FormUserLogin);
FormUserLogin = connect(
  null,
  dispatch => ({
    addUser: user => dispatch({type: USER_ADD, user}),
  }),
)(FormUserLogin);
FormUserLogin = reduxForm({
  form: 'FormUserLogin',
})(FormUserLogin);

export default FormUserLogin;
