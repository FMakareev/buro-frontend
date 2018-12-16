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
import { DayPickerBase } from '@lib/ui/DayPickerBase/DayPickerBase';
import { ButtonTriggerGroup } from '@lib/ui/ButtonTriggerGroup/ButtonTriggerGroup';

import { SvgReloadIcon } from '@lib/ui/Icons/SvgReloadIcon';

import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '@lib/ui/PreloaderWrapper/PreloaderWrapper';

import { required } from '../../../../utils/validation/required';
import { phoneNumber } from '../../../../utils/validation/phoneNumber';
import UpdateUserMutation from './UpdateUserMutation.graphql';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { ROLE_BANK, ROLE_CLIENT } from '../../../../shared/roles';
import { userUpdate } from '../../../../store/reducers/user/actions';

const StyledBox = styled(Box)`
  text-align: center;
`;

/**
 * @param {string} value - вводимое пользователем значение
 * @desc приведение вводимого значения телефона к формату только цифры */
const normalizePhoneNumber = value => {
  // if (value.length > 17) {
  //   return value.slice(0, 17);
  // }

  // if (value.length === 1) return `+ 7 ${value.replace(/[^\d]/g, '')}`;

  const onlyNums = value.replace(/[^\d]/g, '');

  // if (onlyNums.length <= 4) {
  //   return `+ 7 ${onlyNums.slice(1, 4)}`;
  // }

  // if (onlyNums.length <= 7) {
  //   return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4)}`;
  // }

  // if (onlyNums.length <= 9) {
  //   return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4, 7)} ${onlyNums.slice(7)}`;
  // }

  // if (onlyNums.length <= 11) {
  //   return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4, 7)} ${onlyNums.slice(
  //     7,
  //     9,
  //   )} ${onlyNums.slice(9)}`;
  // }

  if (onlyNums.length > 25) {
    return `${onlyNums.slice(0, 25)}`;
  }

  return onlyNums;
};

export class FormProfileUser extends Component {
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
          case 'too young': {
            errorList.birthdate = 'You too young!';
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

  // TODO: добавить вызов метода обновления данных пользователя в редакcе, это экшен userUpdate
  submit = value =>
    this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then(response => {
        console.log(response);
        this.props.userUpdate();
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
      user,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text fontFamily="bold" as="h2" fontSize={9} lineHeight={11} mb={9}>
          Main data:
        </Text>
        <Flex mx={-6} justifyContent="space-between" flexWrap="wrap" mb="30px">
          {user.role === ROLE_CLIENT && (
            <Fragment>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[1, 0]}>
                <Field
                  name="firstName"
                  component={TextFieldWithLabel}
                  label="First Name:"
                  type="text"
                  validate={[required]}
                />
              </Box>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[4, 0]}>
                <Field
                  name="birthdate"
                  component={DayPickerBase}
                  label="Date of Birth:"
                  type="date"
                />
              </Box>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[2, 0]}>
                <Field
                  name="lastName"
                  component={TextFieldWithLabel}
                  label="Last Name:"
                  type="text"
                  validate={[required]}
                />
              </Box>
            </Fragment>
          )}
          {user.role === ROLE_BANK && (
            <Fragment>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[1, 0]}>
                <Field
                  name="bankName"
                  component={TextFieldWithLabel}
                  label="Bank name"
                  type="text"
                  disabled
                />
              </Box>
            </Fragment>
          )}
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[5, 0]}>
            <Field
              name="phone"
              component={TextFieldWithLabel}
              label="Telephone:"
              type="text"
              validate={[required, phoneNumber]}
              normalize={normalizePhoneNumber}
            />
          </Box>
          {user.role === ROLE_CLIENT && (
            <Fragment>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[3, 0]}>
                <Field
                  name="patronymic"
                  component={TextFieldWithLabel}
                  label="Patronymic:"
                  type="text"
                />
              </Box>
              <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[6, 0]}>
                <Field
                  name="gender"
                  component={ButtonTriggerGroup}
                  label="Gender:"
                  type="text"
                  options={[
                    {
                      label: 'Male',
                      value: 'male',
                    },
                    {
                      label: 'Female',
                      value: 'female',
                    },
                  ]}
                />
              </Box>
            </Fragment>
          )}
        </Flex>
        <Flex justifyContent="center">
          <StyledBox>
            {!submitFailed && (
              <ButtonBase
                type="submit"
                variant="primary"
                size="medium"
                px={122}
                py={2}
                disabled={pristine || submitting || invalid}>
                Save
              </ButtonBase>
            )}

            {submitFailed && (
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
            )}

            {submitSucceeded && !submitting && (
              <Text fontSize={6} lineHeight={12} color="color1" fontFamily="medium">
                Changes was successfully saved.
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

FormProfileUser = graphql(UpdateUserMutation, {
  name: '@apollo/update',
})(FormProfileUser);
FormProfileUser = connect(
  state => ({
    user: getUserFromStore(state),
  }),
  dispatch => ({
    userUpdate: () => dispatch(userUpdate()),
  }),
)(FormProfileUser);
FormProfileUser = reduxForm({
  form: 'FormProfileUser',
})(FormProfileUser);
export default FormProfileUser;
