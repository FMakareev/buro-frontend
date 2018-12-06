import React, { Component } from 'react';
import {Field, reduxForm, Form, SubmissionError, getFormValues} from 'redux-form';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import {connect} from 'react-redux';
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { Select } from '../../../../components/Select/Select';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { HelpText } from '../HelpText/HelpText';

import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';
import { SvgEmailIcon } from '../../../../components/Icons/SvgEmailIcon';
import { SvgPasswordIcon } from '../../../../components/Icons/SvgPasswordIcon';
import { SvgReloadIcon } from '../../../../components/Icons/SvgReloadIcon';

import { ButtonWithImageError } from '../ButtonWithImageError/ButtonWithImageError';
import { Text } from '../../../../components/Text/Text';

import { required } from '../../../../utils/validation/required';

import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';
import isEmail from '../../../../utils/validation/isEmail';
import minLength from '../../../../utils/validation/minLength';

import CreateUserMutation from './CreateUserMutation.graphql';
import {ROLE_BANK, ROLE_CLIENT} from "../../../../shared/roles";
import {SvgBank} from "../../../../components/Icons/SvgBank";

const minLength8 = minLength(8);
const minLength12 = minLength(12);

@graphql(CreateUserMutation, {
  name: '@apollo/create',
})
@reduxForm({
  form: 'FormUserRegistration',
})
@connect(state => ({
  values: getFormValues('FormUserRegistration')(state),
}))
export class FormUserRegistration extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  submit = value => {
    return this.props['@apollo/create']({
      variables: Object.assign({}, value, { retype_password: value.password }),
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        throw new SubmissionError({
          _error: 'Connection error!',
        });
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
          <Box width={'100%'} mb={6}>
            <Field
              name="role"
              component={Select}
              placeholder="Role"
              labelKey="label"
              valueKey="value"
              options={[{ value: ROLE_BANK, label: 'Bank' }, { value: ROLE_CLIENT, label: 'Client' }]}
              validate={[required]}
            />
          </Box>
          {
            (values && values.role === ROLE_BANK) &&
            <Box width={'100%'} mb={6}>
              <Field
                name={'bankName'}
                component={TextFieldWithIcon}
                placeholder="Bank name"
                type={'text'}
                icon={<Text fontSize={12}><SvgBank /></Text>}
                validate={[required]}
              />
            </Box>
          }

          <Box width={'100%'} mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={<SvgEmailIcon />}
              validate={[required, isEmail]}
            />
          </Box>
          <Box width={'100%'} mb={6}>
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
              icon={<SvgPasswordIcon />}
              validate={[required, minLength8]}
            />
          </Box>
          {
            (values && values.role === ROLE_CLIENT) &&
            <Box width={'100%'} mb={6}>
              <Field
                name="masterpassword"
                component={TextFieldWithIcon}
                placeholder="Master Password"
                type="password"
                icon={<SvgPasswordIcon/>}
                validate={[required, minLength12]}
              />
            </Box>
          }
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
              validate={[required]}
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
                  <Text fontSize={12} lineHeight={0}>
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
                type={'submit'}
                variant={'error'}
                size={'medium'}
                py={2}
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgReloadIcon />
                  </Text>
                }>
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

export default FormUserRegistration;
