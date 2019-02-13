import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {graphql} from 'react-apollo';

import {TextFieldWithIcon} from '@lib/ui/TextFieldWithIcon/TextFieldWithIcon';
// @lib/ui/
import {SvgEmailIcon} from '@lib/ui/Icons/SvgEmailIcon';
import {SvgArrowRight} from '@lib/ui/Icons/SvgArrowRight';
import {SvgArrowLeft} from '@lib/ui/Icons/SvgArrowLeft';
import {SvgReloadIcon} from '@lib/ui/Icons/SvgReloadIcon';

import {Text} from '@lib/ui/Text/Text';
import {Box} from '@lib/ui/Box/Box';
import {Flex} from '@lib/ui/Flex/Flex';

import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';

import {SpeedingWheel} from '@lib/ui/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '@lib/ui/PreloaderWrapper/PreloaderWrapper';

import isEmail from '../../../../utils/validation/isEmail';
import {required} from '../../../../utils/validation/required';

import ActivateBankMutation from './ActivateBankMutation.graphql';
import {SvgPasswordIcon} from "@lib/ui/Icons/SvgPasswordIcon";


const validate = values => {
// email
// password
// confirmpassword
// masterpassword
// confirmmasterpassword
  const errors = {};
  const {
    email,
    password,
    confirmpassword,
    masterpassword,
    confirmmasterpassword
  } = values;


  if (!email) {
    errors.email = 'Required';
  } else if (email && isEmail(email)) {
    errors.email = isEmail(email);
  }
  if (!password) {
    errors.password = 'Required';
  } else if (password && password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!confirmpassword) {
    errors.confirmpassword = 'Required';
  } else if (confirmpassword && confirmpassword.length < 8) {
    errors.confirmpassword = 'Must be 8 characters or more';
  } else if (confirmpassword && password && confirmpassword !== password) {
    errors.confirmpassword = 'Passwords do not match';
  }

  if (!masterpassword) {
    errors.masterpassword = 'Required';
  } else if (masterpassword && masterpassword.length < 12) {
    errors.masterpassword = 'Must be 12 characters or more';
  }


  if (!confirmmasterpassword) {
    errors.confirmmasterpassword = 'Required';
  } else if (confirmmasterpassword && confirmmasterpassword.length < 12) {
    errors.confirmmasterpassword = 'Must be 12 characters or more';
  }
  // token
  return errors;
};

export class FormActivateBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }


  getNetworkError = errors => {
    try {
      let errorList = {};
      errors.forEach(item => {
        if (item.message.indexOf('bank not found') >= 0) {
          errorList.email = 'Bank with the email not found'
        }
      });
      return errorList;
    } catch (error) {
      console.error(error);
      return {
        _error: 'Unexpected error.'
      }
    }
  };

  activateBank = value => {
    const {reset, history} = this.props;
    return this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then(response => {
        reset();
        history.push('/login');
        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.error('graphQLErrors: ', graphQLErrors);
        console.error('message: ', message);
        console.error('networkError: ', networkError);
        console.error('rest: ', rest);
        if (graphQLErrors) {
          throw new SubmissionError({
            ...this.getNetworkError(graphQLErrors),
          });
        } else {
          throw new SubmissionError({
            _error: message
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
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.activateBank)}>
        {(submitFailed || (!submitSucceeded && !submitFailed)) && (
          <Flex justifyContent={'center'} width={'100%'} flexDirection={'column'}>
            <Box width={'100%'} mb={7}>
              <Field
                name={'email'}
                component={TextFieldWithIcon}
                placeholder={'Email address'}
                type={'email'}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgEmailIcon/></Text>}
              />
            </Box>

            <Box width={'100%'} mb={7}>
              <Field
                name={'password'}
                component={TextFieldWithIcon}
                placeholder={'Password'}
                type={'password'}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
              />
            </Box>
            <Box width={'100%'} mb={7}>
              <Field
                name={'confirmpassword'}
                component={TextFieldWithIcon}
                placeholder={'Password retype'}
                type={'password'}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
              />
            </Box>

            <Box width={'100%'} mb={7}>
              <Field
                name={'masterpassword'}
                component={TextFieldWithIcon}
                placeholder={'Master password'}
                type={'password'}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
              />
            </Box>
            <Box width={'100%'} mb={7}>
              <Field
                name={'confirmmasterpassword'}
                component={TextFieldWithIcon}
                placeholder={'Master password retype'}
                type={'password'}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
              />
            </Box>


            {!submitFailed && (
              <Box width={'100%'}>
                <ButtonWithImageError
                  type={'submit'}
                  variant={'primary'}
                  size={'medium'}
                  fontSize={6}
                  error={error}
                  width={'100%'}
                  iconRight={
                    <Text fontSize={12} lineHeight={0}>
                      <SvgArrowRight/>
                    </Text>
                  }
                  disabled={pristine || submitting || invalid}>
                  Activate account
                </ButtonWithImageError>
              </Box>
            )}

            {submitFailed && (
              <Box width={'100%'}>
                <ButtonWithImageError
                  type={'submit'}
                  variant={'error'}
                  size={'medium'}
                  error={error}
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
        )}

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

FormActivateBank = withRouter(FormActivateBank);

FormActivateBank = graphql(ActivateBankMutation, {
  name: '@apollo/update',
})(FormActivateBank);
FormActivateBank = reduxForm({
  form: 'FormActivateBank',
  validate,
})(FormActivateBank);
export default FormActivateBank
