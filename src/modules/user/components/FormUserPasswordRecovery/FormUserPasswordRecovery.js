import React, {Component, Fragment} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {graphql} from "react-apollo";

import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';

import {TextFieldWithIcon} from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';
import {SvgArrowRight} from '../../../../components/Icons/SvgArrowRight';

import {SvgPasswordIcon} from '../../../../components/Icons/SvgPasswordIcon';

import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';
import {Text} from '../../../../components/Text/Text';

import {required} from '../../../../utils/validation/required';

import {SpeedingWheel} from '../../../../components/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '../../../../components/PreloaderWrapper/PreloaderWrapper';
import {SvgReloadIcon} from "../../../../components/Icons/SvgReloadIcon";
import UserPasswordRecoveryMutation from './UserPasswordRecoveryMutation.graphql'
import {Link} from "react-router-dom";
import {SvgArrowLeft} from "../../../../components/Icons/SvgArrowLeft";

const validate = values => {
  const error = {};
  if (values.password1 !== values.password2) {
    error.password2 = 'Fields does not match!';
  }
  return error;
};

@graphql(UserPasswordRecoveryMutation, {
  name: '@apollo/update'
})
export class FormUserPasswordRecovery extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  submit = value => {
    console.log(value);
    return this.props['@apollo/update']({
      variables: Object.assign({}, value),
    })
      .then((response) => {
        console.log(response);
      }).catch(error => {
        console.log(error);
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
                name={"password"}
                component={TextFieldWithIcon}
                placeholder={"Password"}
                type={"password"}
                icon={<Text fontSize={11} lineHeight={0} fill={'inherit'}><SvgPasswordIcon/></Text>}
                validate={[required]}
              />
            </Box>
            <Box width="100%" mb="16px">
              <Field
                name={"retype_password"}
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

FormUserPasswordRecovery = reduxForm({
  form: 'FormUserPasswordRecovery',
  validate,
})(FormUserPasswordRecovery);

export default FormUserPasswordRecovery;
