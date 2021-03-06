import React, {Component, Fragment} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {graphql} from "react-apollo";

import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';

import {TextFieldWithIcon} from '@lib/ui/TextFieldWithIcon/TextFieldWithIcon';

import {Box} from '@lib/ui/Box/Box';
import {Flex} from '@lib/ui/Flex/Flex';
import {SvgArrowRight} from '@lib/ui/Icons/SvgArrowRight';

import {SvgPasswordIcon} from '@lib/ui/Icons/SvgPasswordIcon';

import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';
import {Text} from '@lib/ui/Text/Text';

import {required} from '../../../../utils/validation/required';

import {SpeedingWheel} from '@lib/ui/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '@lib/ui/PreloaderWrapper/PreloaderWrapper';
import {SvgReloadIcon} from "@lib/ui/Icons/SvgReloadIcon";
import UserPasswordRecoveryMutation from './UserPasswordRecoveryMutation.graphql'
import {Link} from "react-router-dom";
import {SvgArrowLeft} from "@lib/ui/Icons/SvgArrowLeft";

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

  submit = value => {
    return this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then((response) => {
        return response;
      }).catch(error => {
        console.error(error);
        throw new SubmissionError({
          _error: 'Connection error!',
        });
      })
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
        <Flex justifyContent="center" width="100%" flexDirection="column">
          {/** Поля для ввода отображаются только если запрос запрос на сервер небыл выполнен или в процессе произошла ошибка*/}
          {(submitFailed || (!submitSucceeded && !submitFailed)) && (<Fragment>
            <Box width="100%" mb="16px">
              <Field
                name={"newPassword"}
                component={TextFieldWithIcon}
                placeholder={"Password"}
                type={"password"}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
                validate={[required]}
              />
            </Box>
            <Box width="100%" mb="16px">
              <Field
                name={"confirmPassword"}
                component={TextFieldWithIcon}
                placeholder={"Retype password"}
                type={"password"}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
                validate={[required]}
              />
            </Box>
          </Fragment>)}
          {/** Кнопка первичной отправки данных отображается до первого запроса и скрывается если запрос прошел или возникла ошибка */}
          {
            (!submitSucceeded && !submitFailed) &&
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
                Create new password
              </ButtonWithImageError>
            </Box>
          }

          {/** Кнопка повторного запроса, отображается в случае ошибки во время запроса */}
          {submitFailed && (
            <Box width={"100%"}>
              <ButtonWithImageError
                type={"submit"}
                variant={"error"}
                size={"medium"}
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgReloadIcon/>
                  </Text>
                }
              >
                Try again
              </ButtonWithImageError>
            </Box>
          )}

          {/** Уедомление о упешно выполненном запросе */}
          {submitSucceeded && !submitFailed && (
            <Box width="100%">
              <Box width={'100%'} mb={6}>
                <Text fontSize={6} lineHeight={12} color={'color1'} fontFamily={'medium'}>
                  Password successfully changed. Go to the login page to log into the application.
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
                  Go to login
                </ButtonWithImageError>
              </Link>
            </Box>
          )}
        {/**  */}
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

FormUserPasswordRecovery = graphql(UserPasswordRecoveryMutation, {
  name: '@apollo/update'
})(FormUserPasswordRecovery)
FormUserPasswordRecovery = reduxForm({
  form: 'FormUserPasswordRecovery',
  validate,
})(FormUserPasswordRecovery);

export default FormUserPasswordRecovery;
