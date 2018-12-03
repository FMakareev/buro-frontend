import React, { Component } from 'react';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';

import { PasswordIcon } from '../../components/PasswordIcon';

import { ButtonWithImageError } from '../../components/ButtonWithImageError';
import { Text } from '../../../../components/Text/Text';

import { required } from '../../../../utils/validation/required';

import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';
import {ReloadIcon} from "../../components/ReloadIcon";


const validate = values => {
  const error = {};
  if (values.password1 !== values.password2) {
    error.password2 = 'Fields does not match!';
  }
  return error;
};

export class FormUserPasswordRecovery extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  submit = value =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    }).then(() => {
      throw new SubmissionError({
        _error: 'Connection error!',
      });
    });

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
        <Flex justifyContent="center" width="100%" flexDirection="column">
          <Box width="100%" mt="16px" mb="16px">
            <Field
              name={"password1"}
              component={TextFieldWithIcon}
              placeholder={"Password"}
              type={"password"}
              icon={<PasswordIcon />}
              validate={[required]}
            />
          </Box>
          <Box width="100%" mb="16px">
            <Field
              name={"password2"}
              component={TextFieldWithIcon}
              placeholder={"Password"}
              type={"password"}
              icon={<PasswordIcon />}
              validate={[required]}
            />
          </Box>
          {
            !submitFailed &&
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
                    <SvgArrowRight />
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Create new password
              </ButtonWithImageError>
            </Box>
          }
          {submitFailed && (
            <Box width={"100%"}>
              <ButtonWithImageError
                type={"submit"}
                variant={"error"}
                size={"medium"}
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <ReloadIcon/>
                  </Text>
                }
              >
                Try again
              </ButtonWithImageError>
            </Box>
          )}



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

FormUserPasswordRecovery = reduxForm({
  form: 'FormUserPasswordRecovery',
  validate,
})(FormUserPasswordRecovery);

export default FormUserPasswordRecovery;
