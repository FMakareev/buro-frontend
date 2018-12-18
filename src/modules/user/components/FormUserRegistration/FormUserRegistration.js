import React, { Component } from 'react';

import { Field, reduxForm, Form, SubmissionError, getFormValues } from 'redux-form';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { Select } from '@lib/ui/Select/Select';
import { Checkbox } from '@lib/ui/Checkbox/Checkbox';

import { TextFieldWithIcon } from '@lib/ui/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '@lib/ui/Box/Box';
import { Flex } from '@lib/ui/Flex/Flex';

import { SvgArrowRight } from '@lib/ui/Icons/SvgArrowRight';
import { SvgEmailIcon } from '@lib/ui/Icons/SvgEmailIcon';
import { SvgPasswordIcon } from '@lib/ui/Icons/SvgPasswordIcon';
import { SvgReloadIcon } from '@lib/ui/Icons/SvgReloadIcon';
import { SvgUserField } from '@lib/ui/Icons/SvgUserField';
import { SvgCircleCalendar } from '@lib/ui/Icons/SvgCircleCalendar';

import { Text } from '@lib/ui/Text/Text';
import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '@lib/ui/PreloaderWrapper/PreloaderWrapper';
import { ROLE_BANK, ROLE_CLIENT } from '@lib/shared/roles';
import { SvgBank } from '@lib/ui/Icons/SvgBank';
import { DayPickerBaseBig } from '@lib/ui/DayPickerBaseBig/DayPickerBaseBig';
import { ButtonWithImageError } from '../ButtonWithImageError/ButtonWithImageError';

import { required } from '../../../../utils/validation/required';

import isEmail from '../../../../utils/validation/isEmail';
import minLength from '../../../../utils/validation/minLength';

import CreateUserMutation from './CreateUserMutation.graphql';
import { HelpText } from '../HelpText/HelpText';
import { Wrapper } from '../Wrapper/Wrapper';
import { Title } from '../Title/Title';
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

const minLength8 = minLength(8);
const minLength12 = minLength(12);

const validate = values => {
  const errors = {};

  const {
    role,
    email,
    bankName,
    password,
    confirmPassword,
    masterpassword,
    retypemasterpassword,
    privacy,
    firstName,
    lastName,
    birthdate,
  } = values;

  if (!role) {
    errors.role = 'Required';
  }
  if (!bankName) {
    errors.bankName = 'Required';
  }

  if (!password) {
    errors.password = 'Required';
  }
  if (!email) {
    errors.email = 'Required';
  }
  if (isEmail(email)) {
    errors.email = 'Invalid email';
  }
  if (!privacy) {
    errors.privacy = 'Required';
  }

  if (!birthdate) {
    errors.birthdate = 'Required';
  }

  if (!firstName) {
    errors.firstName = 'Required';
  }

  if (!lastName) {
    errors.lastName = 'Required';
  }

  if (!masterpassword) {
    errors.masterpassword = 'Required';
  }
  if (!retypemasterpassword) {
    errors.retypemasterpassword = 'Required';
  }
  if (masterpassword !== undefined && masterpassword.length < 12) {
    errors.masterpassword = 'Must be 12 characters or more';
  }

  if (masterpassword !== retypemasterpassword) {
    errors.retypemasterpassword = 'Passwords do not match';
  }

  if (!password) {
    errors.password = 'Required';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Required';
  }

  if (password !== undefined && password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export class FormUserRegistration extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  getNetworkError = errors => {
    try {
      const errorList = {};
      errors.forEach(item => {
        if (item.message.includes('Tried to save duplicate unique keys')) {
          errorList.email = 'User with this email already registered.';
        }

        switch (item.message) {
          case 'unknown bank': {
            errorList.bankName = 'No finding any bank with this name';
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
    console.log(value);
    return this.props['@apollo/create']({
      variables: Object.assign({}, value, { confirmPassword: value.password, phone: '000000' }),
    })
      .then(response => response)
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        if (graphQLErrors) {
          throw new SubmissionError({
            ...this.getNetworkError(graphQLErrors),
          });
        } else {
          throw new SubmissionError({
            _error: message,
          });
        }
      });
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      submitFailed,
      submitSucceeded,
      error,
      values,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Wrapper
          position="relative"
          ml={['auto', 20, 100]}
          mt={[10, 120]}
          regClient={!submitSucceeded && values && values.role === ROLE_CLIENT}
        >
          <Title mb={6}>Sign up</Title>
          <Box mb={6}>
            <Flex>
              <Flex justifyContent="center" width="100%" flexDirection="column">
                {!submitSucceeded && (
                  <>
                    <Box width="100%" mb={6}>
                      <Field
                        name="role"
                        component={Select}
                        placeholder="Role"
                        labelKey="label"
                        valueKey="value"
                        options={[
                          { value: ROLE_BANK, label: 'Bank' },
                          { value: ROLE_CLIENT, label: 'Client' },
                        ]}
                      />
                    </Box>

                    {values && values.role === ROLE_BANK && (
                      <Box width="100%" mb={6}>
                        <Field
                          name="bankName"
                          component={TextFieldWithIcon}
                          placeholder="Bank name"
                          type="text"
                          icon={
                            <Text fontSize={11} lineHeight={0} stroke="inherit" fill="inherit">
                              <SvgBank />
                            </Text>
                          }
                        />
                      </Box>
                    )}

                    <Flex flexDirection={['column', 'row']}>
                      <Box width="100%" mb={6}>
                        <Field
                          name="email"
                          component={TextFieldWithIcon}
                          placeholder="Email address"
                          type="email"
                          icon={
                            <Text fontSize={11} lineHeight={0} fill="inherit">
                              <SvgEmailIcon />
                            </Text>
                          }
                        />
                      </Box>

                      {values && values.role === ROLE_CLIENT && (
                        <Box width="100%" mb={6} pl={[0, '15px']}>
                          <Field
                            name="birthdate"
                            component={DayPickerBaseBig}
                            placeholder="Birthdate"
                            type="date"
                            icon={
                              <Text fontSize={11} lineHeight={0} fill="inherit">
                                <SvgCircleCalendar />
                              </Text>
                            }
                          />
                        </Box>
                      )}
                    </Flex>

                    {values && values.role === ROLE_CLIENT && (
                      <Flex width="100%" flexWrap="wrap" flexDirection={['column', 'row']}>
                        <Box width={['100%', '50%']} mb={6}>
                          <Field
                            name="firstName"
                            component={TextFieldWithIcon}
                            placeholder="First Name"
                            type="text"
                            icon={
                              <Text fontSize={11} lineHeight={0} fill="inherit">
                                <SvgUserField />
                              </Text>
                            }
                          />
                        </Box>
                        <Box width={['100%', '50%']} mb={6} pl={[0, '10px']}>
                          <Field
                            name="lastName"
                            component={TextFieldWithIcon}
                            placeholder="Last Name"
                            type="text"
                            icon={
                              <Text fontSize={11} lineHeight={0} fill="inherit">
                                <SvgUserField />
                              </Text>
                            }
                          />
                        </Box>
                        <Box width={['100%', '50%']} mb={6}>
                          <Field
                            name="patronymic"
                            component={TextFieldWithIcon}
                            placeholder="Patronymic"
                            type="text"
                            icon={
                              <Text fontSize={11} lineHeight={0} fill="inherit">
                                <SvgUserField />
                              </Text>
                            }
                          />
                        </Box>
                      </Flex>
                    )}

                    <Flex
                      width="100%"
                      flexWrap="wrap"
                      flexDirection={
                        values && values.role === ROLE_CLIENT ? ['column', 'row'] : 'column'
                      }>
                      <Box
                        width={values && values.role === ROLE_CLIENT ? ['100%', '50%'] : '100%'}
                        mb={6}>
                        <Field
                          name="password"
                          component={TextFieldWithIcon}
                          placeholder="Password"
                          type="password"
                          icon={
                            <Text fontSize={11} lineHeight={0} fill="inherit">
                              <SvgPasswordIcon />
                            </Text>
                          }
                          validate={[required, minLength8]}
                        />
                      </Box>
                      <Box
                        width={values && values.role === ROLE_CLIENT ? ['100%', '50%'] : '100%'}
                        mb={6}
                        pl={values && values.role === ROLE_CLIENT ? [0, '10px'] : 0}>
                        <Field
                          name="confirmPassword"
                          component={TextFieldWithIcon}
                          placeholder="Password retype"
                          type="password"
                          icon={
                            <Text fontSize={11} lineHeight={0} fill="inherit">
                              <SvgPasswordIcon />
                            </Text>
                          }
                        />
                      </Box>
                    </Flex>

                    <Flex
                      width="100%"
                      flexWrap="wrap"
                      flexDirection={
                        values && values.role === ROLE_CLIENT ? ['column', 'row'] : 'column'
                      }>
                      <Box
                        width={values && values.role === ROLE_CLIENT ? ['100%', '50%'] : '100%'}
                        mb={6}>
                        <Field
                          name="masterpassword"
                          component={TextFieldWithIcon}
                          placeholder="Master Password"
                          type="password"
                          icon={
                            <Text fontSize={11} lineHeight={0} fill="inherit">
                              <SvgPasswordIcon />
                            </Text>
                          }
                        />
                      </Box>
                      <Box
                        width={values && values.role === ROLE_CLIENT ? ['100%', '50%'] : '100%'}
                        mb={6}
                        pl={values && values.role === ROLE_CLIENT ? [0, '10px'] : 0}>
                        <Field
                          name="retypemasterpassword"
                          component={TextFieldWithIcon}
                          placeholder="Retype master Password"
                          type="password"
                          icon={
                            <Text fontSize={11} lineHeight={0} fill="inherit">
                              <SvgPasswordIcon />
                            </Text>
                          }
                        />
                      </Box>
                    </Flex>

                    <Box width="100%" mb={8}>
                      <Field
                        name="privacy"
                        checked={false}
                        label={
                          <HelpText width="90%">
                            I accept the <Link to="/">terms of service</Link> and
                            <Link to="/"> privacy policy</Link>.
                          </HelpText>
                        }
                        component={Checkbox}
                        type="text"
                      />
                    </Box>
                    {!submitSucceeded && !submitFailed && (
                      <Box width="100%">
                        <ButtonWithImageError
                          type="submit"
                          variant="primary"
                          size="medium"
                          py={2}
                          error={error}
                          iconRight={
                            <Text fontSize={11} lineHeight={0}>
                              <SvgArrowRight />
                            </Text>
                          }
                          disabled={pristine || submitting || invalid}>
                          Get started
                        </ButtonWithImageError>
                      </Box>
                    )}
                    {submitFailed && (
                      <Box width="100%">
                        <ButtonWithImageError
                          type="submit"
                          variant="error"
                          size="medium"
                          py={2}
                          error={error}
                          iconRight={
                            <Text fontSize={11} lineHeight={0}>
                              <SvgReloadIcon />
                            </Text>
                          }>
                          Try again
                        </ButtonWithImageError>
                      </Box>
                    )}
                  </>
                )}

                {submitSucceeded && (
                  <Box width="100%" mb={6}>
                    <Text fontSize={6} lineHeight={12} color="color1" fontFamily="medium">
                      Account successfully registered. <br />
                      Now you can sign in.
                    </Text>
                  </Box>
                )}
              </Flex>
            </Flex>

            {submitting && (
              <PreloaderWrapper>
                <Text fontSize={13}>
                  <SpeedingWheel />
                </Text>
              </PreloaderWrapper>
            )}
          </Box>
          <Box>
            <HelpText>
              Already have an account? <Link to="/login">Sign in</Link>
            </HelpText>
          </Box>
        </Wrapper>
      </Form>
    );
  }
}

// TODO: обновить схему в файле mockClients
FormUserRegistration = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(FormUserRegistration);

FormUserRegistration = connect(state => ({
  values: getFormValues('FormUserRegistration')(state),
}))(FormUserRegistration);

FormUserRegistration = reduxForm({
  form: 'FormUserRegistration',
  validate,
})(FormUserRegistration);
export default FormUserRegistration;
