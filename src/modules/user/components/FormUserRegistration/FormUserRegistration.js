import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError, getFormValues} from 'redux-form';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';

import {Select} from '../../../../components/Select/Select';
import {Checkbox} from '../../../../components/Checkbox/Checkbox';

import {TextFieldWithIcon} from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';
import {HelpText} from '../HelpText/HelpText';

import {SvgArrowRight} from '../../../../components/Icons/SvgArrowRight';
import {SvgEmailIcon} from '../../../../components/Icons/SvgEmailIcon';
import {SvgPasswordIcon} from '../../../../components/Icons/SvgPasswordIcon';
import {SvgReloadIcon} from '../../../../components/Icons/SvgReloadIcon';

import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';
import {Text} from '../../../../components/Text/Text';

import {required} from '../../../../utils/validation/required';

import {SpeedingWheel} from '../../../../components/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '../../../../components/PreloaderWrapper/PreloaderWrapper';
import isEmail from '../../../../utils/validation/isEmail';
import minLength from '../../../../utils/validation/minLength';

import CreateUserMutation from './CreateUserMutation.graphql';
import {ROLE_BANK, ROLE_CLIENT} from '../../../../shared/roles';
import {SvgBank} from '../../../../components/Icons/SvgBank';

const minLength8 = minLength(8);
const minLength12 = minLength(12);




const validate = values => {
  const errors = {};

  const {role,email, bankName,password,confirmPassword,masterpassword,retypemasterpassword, privacy} = values;


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
      let errorList = {};
      errors.forEach(item => {
        switch (item.message) {
          case 'already registered': {
            errorList.email = 'User with this email already registered.';
          }
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
      variables: Object.assign({}, value, {confirmPassword: value.password, phone: '000000000'}),
    })
      .then(response => {
        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
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
        <Flex justifyContent="center" width="100%" flexDirection="column">
          {!submitSucceeded && (
            <>
              <Box width={'100%'} mb={6}>
                <Field
                  name="role"
                  component={Select}
                  placeholder="Role"
                  labelKey="label"
                  valueKey="value"
                  options={[
                    {value: ROLE_BANK, label: 'Bank'},
                    {value: ROLE_CLIENT, label: 'Client'},
                  ]}
                />
              </Box>
              {values && values.role === ROLE_BANK && (
                <Box width={'100%'} mb={6}>
                  <Field
                    name={'bankName'}
                    component={TextFieldWithIcon}
                    placeholder="Bank name"
                    type={'text'}
                    icon={
                      <Text fontSize={11} lineHeight={0} stroke={'inherit'} fill={'inherit'}>
                        <SvgBank/>
                      </Text>
                    }
                  />
                </Box>
              )}

              <Box width={'100%'} mb={6}>
                <Field
                  name="email"
                  component={TextFieldWithIcon}
                  placeholder="Email address"
                  type="email"
                  icon={
                    <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                      <SvgEmailIcon/>
                    </Text>
                  }
                />
              </Box>
              <Box width={'100%'} mb={6}>
                <Field
                  name="password"
                  component={TextFieldWithIcon}
                  placeholder="Password"
                  type="password"
                  icon={
                    <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                      <SvgPasswordIcon/>
                    </Text>
                  }
                  validate={[required, minLength8]}
                />
              </Box>
              <Box width={'100%'} mb={6}>
                <Field
                  name="confirmPassword"
                  component={TextFieldWithIcon}
                  placeholder="Password retype"
                  type="password"
                  icon={
                    <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                      <SvgPasswordIcon/>
                    </Text>
                  }
                />
              </Box>
              <Box width={'100%'} mb={6}>
                <Field
                  name="masterpassword"
                  component={TextFieldWithIcon}
                  placeholder="Master Password"
                  type="password"
                  icon={
                    <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                      <SvgPasswordIcon/>
                    </Text>
                  }
                />
              </Box>
              <Box width={'100%'} mb={6}>
                <Field
                  name="retypemasterpassword"
                  component={TextFieldWithIcon}
                  placeholder="Retype master Password"
                  type="password"
                  icon={
                    <Text fontSize={11} lineHeight={0} fill={'inherit'}>
                      <SvgPasswordIcon/>
                    </Text>
                  }
                />
              </Box>

              <Box width={'100%'} mb={8}>
                <Field
                  name={'privacy'}
                  checked={false}
                  label={
                    <HelpText width={'90%'}>
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
                        <SvgArrowRight/>
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
                    type={'submit'}
                    variant={'error'}
                    size={'medium'}
                    py={2}
                    error={error}
                    iconRight={
                      <Text fontSize={11} lineHeight={0}>
                        <SvgReloadIcon/>
                      </Text>
                    }>
                    Try again
                  </ButtonWithImageError>
                </Box>
              )}
            </>
          )}

          {submitSucceeded && (
            <Box width={'100%'} mb={6}>
              <Text fontSize={6} lineHeight={12} color={'color1'} fontFamily={'medium'}>
                Account successfully registered. <br/>
                Now you can sign in.
              </Text>
            </Box>
          )}
        </Flex>

        {submitting && (
          <PreloaderWrapper>
            <Text fontSize={13}>
              <SpeedingWheel/>
            </Text>
          </PreloaderWrapper>
        )}
      </Form>
    );
  }
}



// TODO: обновить схему в файле mockClients
FormUserRegistration = graphql(CreateUserMutation, {
  name: '@apollo/create',
})(FormUserRegistration);
FormUserRegistration = reduxForm({
  form: 'FormUserRegistration',
  validate
})(FormUserRegistration);
FormUserRegistration = connect(state => ({
  values: getFormValues('FormUserRegistration')(state),
}))(FormUserRegistration);

export default FormUserRegistration;
