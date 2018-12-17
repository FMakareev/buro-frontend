import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithLabel } from '@lib/ui/TextFieldWithLabel/TextFieldWithLabel';

import { Box } from '@lib/ui/Box/Box';
import { Flex } from '@lib/ui/Flex/Flex';
import { Text } from '@lib/ui/Text/Text';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { ButtonWithImageError } from '../ButtonWithImageError/ButtonWithImageError';
// import { DayPickerBase } from '@lib/ui/DayPickerBase/DayPickerBase';
// import { ButtonTriggerGroup } from '@lib/ui/ButtonTriggerGroup/ButtonTriggerGroup';

import { SvgReloadIcon } from '@lib/ui/Icons/SvgReloadIcon';

import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '@lib/ui/PreloaderWrapper/PreloaderWrapper';

import { required } from '../../../../utils/validation/required';
import ChangePassMutation from './ChangePassMutation.graphql';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const StyledBox = styled(Box)`
  text-align: center;
`;

const validate = values => {
  const error = {};
  if (values.newPassword !== values.confirmPassword) {
    error.confirmPassword = 'Fields does not match!';
  }
  return error;
};

export class FormChangePassword extends Component {
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
        switch (item.message) {
          case 'old pass': {
            errorList.oldPassword = 'Wrong old password!';
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

  submit = value =>
    this.props['@apollo/update']({
      variables: Object.assign({}, value, { id: this.props.user.id }),
    })
      .then(response => {
        console.log(response);
        this.props.reset();
      })
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

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      submitSucceeded,
      submitFailed,
      invalid,
      error,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text fontFamily="bold" as="h2" fontSize={9} lineHeight={11} mb={4}>
          Change password:
        </Text>
        <Flex
          mx={-6}
          justifyContent="space-between"
          flexDirection="column"
          flexWrap="wrap"
          mb="30px">
          <Box width={['100%', '100%', '50%']} px={6} mb={4}>
            <Field
              name="password"
              component={TextFieldWithLabel}
              label="Old Password:"
              type="password"
              validate={[required]}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={4}>
            <Field
              name="newPassword"
              component={TextFieldWithLabel}
              label="New password:"
              type="password"
              validate={[required]}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={2}>
            <Field
              name="confirmPassword"
              component={TextFieldWithLabel}
              label="Confirm new password:"
              type="password"
              validate={[required]}
            />
          </Box>
        </Flex>
        <Flex justifyContent="start">
          <StyledBox mb={9} width={['100%', '100%', '50%']}>
            {!submitFailed && (
              <ButtonBase
                display={'inline-block'}
                type="submit"
                variant="primary"
                size="medium"
                px={102}
                py={2}
                disabled={pristine || submitting || invalid}>
                Confirm
              </ButtonBase>
            )}

            {submitFailed && (
              <ButtonWithImageError
                display={'inline-block'}
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
            )}

            {submitSucceeded && !submitting && (
              <Text fontSize={6} lineHeight={12} color="color1" fontFamily="medium">
                Password was successfully changed.
              </Text>
            )}
          </StyledBox>
        </Flex>

        {submitting && (
          <PreloaderWrapper>
            <Text fontSize={13}>
              <SpeedingWheel />
            </Text>
          </PreloaderWrapper>
        )}
      </Form>
    );
  }
}

FormChangePassword = graphql(ChangePassMutation, {
  name: '@apollo/update',
})(FormChangePassword);

FormChangePassword = connect(state => ({
  user: getUserFromStore(state),
}))(FormChangePassword);

FormChangePassword = reduxForm({
  form: 'FormChangePassword',
  validate,
})(FormChangePassword);
export default FormChangePassword;
