/** global ENDPOINT_CLIENT */
import React, { Component } from 'react';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { HelpText } from '../HelpText/HelpText';
import { ButtonWithImageError } from '../ButtonWithImageError/ButtonWithImageError';

import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';
import { SvgEmailIcon } from '../../../../components/Icons/SvgEmailIcon';
import { SvgPasswordIcon } from '../../../../components/Icons/SvgPasswordIcon';
import { SvgReloadIcon } from '../../../../components/Icons/SvgReloadIcon';

import { Text } from '../../../../components/Text/Text';

import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';

import { required } from '../../../../utils/validation/required';
import { isEmail } from '../../../../utils/validation/isEmail';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';
import { USER_ADD } from '../../../../store/reducers/user/actionTypes';


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

  // getNetworkError = errors => {
  //   try {
  //     let errorList = {};
  //     errors.forEach(item => {
  //       switch (item.message) {
  //         case 'user not found': {
  //           errorList.email = 'Wrong email or password';
  //           errorList.password = 'Wrong email or password';
  //         }
  //       }
  //     });
  //     return errorList;
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       _error: 'Unexpected error.',
  //     };
  //   }
  // };

  submit = value => {
    this.setState(() => ({
      submitting: true,
    }));
    return fetch(`${ENDPOINT_CLIENT}/user/login`, {
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
        if (response.status >= 400) {
          throw response;
        } else {
          return this.getUser(value.uname);
        }
      })
      .catch(({ status, statusText }) => {
        console.log('statusText', statusText);
        console.log('status', status);

        this.setState(() => ({
          submitting: false,
          apolloError: null,
        }));

        if (status === 401) {
          throw new SubmissionError({ _error: 'Wrong email or password' });
        } else {
          throw new SubmissionError({
            _error: message,
          });
        }
      });
  };

  setUser = props => {
    console.log('setUser: ', props);
    const {
      data: { useremailitem },
    } = props;
    const { addUser } = this.props;

    addUser(useremailitem);
    localStorage.setItem('user', JSON.stringify(useremailitem));
  };

  getUser = uname => {
    const { client, history } = this.props;

    return client
      .query({
        query: UserEmailItemQuery,
        variables: {
          email: uname,
        },
      })
      .then(result => {
        console.log(result);
        if (result.errors) {
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

      .catch(error => {
        console.log('getUser error:', error);

        this.setState(() => ({
          submitting: false,
          apolloError: 'Unexpected error',
        }));
      });
  };

  mockSubmit = value => {
    this.setState(({ submitting }) => ({ submitting: !submitting }));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getUser(value.email);
        resolve(true);
      }, 2000);
    });
  };

  render() {
    const { handleSubmit, pristine, invalid, submitFailed, error } = this.props;
    const { apolloError, submitting } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.mockSubmit)}>
        <Flex justifyContent="center" width="100%" flexDirection="column">
          <Box width="100%" mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={
                <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                  <SvgEmailIcon />
                </Text>
              }
              validate={[required, isEmail]}
            />
          </Box>
          <Box width="100%" mb={4}>
            <Field
              name={'password'}
              component={TextFieldWithIcon}
              placeholder="Password"
              type={'password'}
              icon={
                <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                  <SvgPasswordIcon />
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
                    <SvgArrowRight />
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Sign in
              </ButtonWithImageError>
            </Box>
          )}
          {submitFailed ||
            (apolloError && (
              <Box width="100%">
                <ButtonWithImageError
                  type="submit"
                  variant="error"
                  size="medium"
                  error={error || apolloError}
                  iconRight={
                    <Text fontSize={12} lineHeight={0}>
                      <SvgReloadIcon />
                    </Text>
                  }>
                  Try again
                </ButtonWithImageError>
              </Box>
            ))}
        </Flex>

        {submitting && (
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel />
            </Text>
          </PreloaderWrapper>
        )}
      </Form>
    );
  }
}

FormUserLogin = withRouter(FormUserLogin);
FormUserLogin = withApollo(FormUserLogin);
FormUserLogin = reduxForm({
  form: 'FormUserLogin',
})(FormUserLogin);

FormUserLogin =connect(
  null,
  dispatch => ({
    addUser: user => dispatch({ type: USER_ADD, user: user }),
  }),
)(FormUserLogin);
export default FormUserLogin;
