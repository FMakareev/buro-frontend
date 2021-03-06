import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';
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

import ResetPasswordMutation from './ResetPasswordMutation.graphql';


export class FormResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }


  getNetworkError = errors => {
    try{
      let errorList = {};
      errors.forEach(item => {
        switch (item.message) {
          case('user not found'):{
            errorList.email = 'User with the specified address not found.'
          }
        }
      });
      return errorList;
    } catch(error) {
      console.error(error);
      return {
        _error: 'Unexpected error.'
      }
    }
  };

  submit = value => {
    return this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then(response => {

        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.error('graphQLErrors: ', graphQLErrors);
        console.error('message: ', message);
        console.error('networkError: ', networkError);
        console.error('rest: ', rest);
        if(graphQLErrors){
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
      <Form onSubmit={handleSubmit(this.submit)}>
        {(submitFailed || (!submitSucceeded && !submitFailed)) && (
          <Flex justifyContent={'center'} width={'100%'} flexDirection={'column'}>
            <Box width={'100%'} mb={7}>
              <Field
                name={'email'}
                component={TextFieldWithIcon}
                placeholder={'Email address'}
                type={'email'}
                validate={[required, isEmail]}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgEmailIcon/></Text>}
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
                  Send password reset mail
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

        {submitSucceeded && !submitFailed && (
          <Box width="100%">
            <Box width={'100%'} mb={6}>
              <Text fontSize={6} lineHeight={12} color={'color1'} fontFamily={'medium'}>
                Password change link was has been sent to your email adress. Click the link in the
                email to reset your password.
              </Text>
            </Box>
            <Link to={'/login'}>
              <ButtonWithImageError
                variant={'primary'}
                size={'medium'}
                fontSize={6}
                pl={4}
                width={'100%'}
                error={error}
                iconLeft={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgArrowLeft/>
                  </Text>
                }>
                Go to main screen
              </ButtonWithImageError>
            </Link>
          </Box>
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

FormResetPassword = graphql(ResetPasswordMutation, {
  name: '@apollo/update',
})(FormResetPassword)
FormResetPassword = reduxForm({
  form: 'FormResetPassword',
})(FormResetPassword)
export default FormResetPassword
