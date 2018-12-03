import React, {Component} from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';

import {TextFieldWithIcon} from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';
import {HelpText} from '../../components/HelpText';
import {ButtonWithImageError} from '../../components/ButtonWithImageError';
import {SvgArrowRight} from '../../../../components/Icons/SvgArrowRight';

import {EmailIcon} from '../../components/EmailIIcon';
import {PasswordIcon} from '../../components/PasswordIcon';

import {Text} from '../../../../components/Text/Text';

import {SpeedingWheel} from '../../../../components/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '../../../../components/PreloaderWrapper/PreloaderWrapper';

import {required} from '../../../../utils/validation/required';
import isEmail from "../../../../utils/validation/isEmail";
import {ReloadIcon} from "../../components/ReloadIcon";


export class FormUserLogin extends Component {
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
      // throw new SubmissionError({
      //   _error: 'Connection error!',
      // });
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
          <Box width="100%" mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={<EmailIcon/>}
              validate={[required, isEmail]}
            />
          </Box>
          <Box width="100%" mb={4}>
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
              icon={<PasswordIcon/>}
              validate={[required]}
            />
          </Box>
          <Box width="100%" mb={8}>
            <Flex width="100%" justifyContent="space-between">
              <HelpText>
                Forgot your <Link to="/password-reset">password</Link>?
              </HelpText>
              <HelpText>
                <Link to="registration">Create at account</Link>
              </HelpText>
            </Flex>
          </Box>

          {!submitFailed && (
            <Box width="100%">
              <ButtonWithImageError
                type="submit"
                variant="primary"
                size="medium"
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgArrowRight/>
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Sigh in
              </ButtonWithImageError>
            </Box>
          )}
          {submitFailed && (
            <Box width="100%">
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
              <SpeedingWheel/>
            </Text>
          </PreloaderWrapper>
        )}
      </Form>
    );
  }
}

FormUserLogin = reduxForm({
  form: 'FormUserLogin',
})(FormUserLogin);

export default FormUserLogin;
