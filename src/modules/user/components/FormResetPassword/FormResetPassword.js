import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';

import {TextFieldWithIcon} from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import {SvgEmailIcon} from '../../../../components/Icons/SvgEmailIcon';
import {SvgArrowRight} from '../../../../components/Icons/SvgArrowRight';
import {SvgArrowLeft} from '../../../../components/Icons/SvgArrowLeft';
import {SvgReloadIcon} from '../../../../components/Icons/SvgReloadIcon';

import {Text} from '../../../../components/Text/Text';
import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';

import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';

import {SpeedingWheel} from '../../../../components/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '../../../../components/PreloaderWrapper/PreloaderWrapper';

import isEmail from '../../../../utils/validation/isEmail';
import {required} from '../../../../utils/validation/required';

import ResetPasswordMutation from './ResetPasswordMutation.graphql';

@graphql(ResetPasswordMutation, {
  name: '@apollo/update',
})
@reduxForm({
  form: 'FormResetPassword',
})
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
    console.log(value);
    return this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then(response => {

        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
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
