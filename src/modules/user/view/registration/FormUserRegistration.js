import React, { Component } from 'react';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { Select } from '../../../../components/Select/Select';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { HelpText } from '../../components/HelpText';

import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';
import { EmailIcon } from '../../components/EmailIIcon';
import { PasswordIcon } from '../../components/PasswordIcon';
import { ReloadIcon } from '../../components/ReloadIcon';

import { ButtonWithImageError } from '../../components/ButtonWithImageError';
import { Text } from '../../../../components/Text/Text';

import { required } from '../../../../utils/validation/required';

import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';
import isEmail from "../../../../utils/validation/isEmail";
import minLength from "../../../../utils/validation/minLength";

const minLength8 = minLength(8);

export class FormUserRegistration extends Component {
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
      }, 10000);
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
          <Box width={"100%"} mb={6}>
            <Field
              name="role"
              component={Select}
              placeholder="Role"
              labelKey="label"
              valueKey="value"
              options={[{ value: 'bank', label: 'Bank' }, { value: 'client', label: 'Client' }]}
              validate={[required]}
            />
          </Box>
          <Box width={"100%"} mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={<EmailIcon />}
              validate={[required, isEmail]}
            />
          </Box>
          <Box width={"100%"} mb={6}>
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
              icon={<PasswordIcon />}
              validate={[required, minLength8]}
            />
          </Box>
          <Box width={"100%"} mb={8}>
            <Field
              name={"privacy"}
              checked={false}
              label={<HelpText width={"90%"}>
                I accept the <Link to="/">terms of service</Link> and
                <Link to="/"> privacy policy</Link>.
              </HelpText>}
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
                type={"submit"}
                variant={"error"}
                size={"medium"}
                py={2}
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <ReloadIcon />
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

FormUserRegistration = reduxForm({
  form: 'FormUserRegistration',
})(FormUserRegistration);

export default FormUserRegistration;
