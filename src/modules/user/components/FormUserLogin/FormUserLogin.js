import React, { Component } from 'react';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';


import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

<<<<<<< HEAD:src/modules/user/view/login/FormUserLogin.js
import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { HelpText } from '../../components/HelpText';
import { ButtonWithImageError } from '../../components/ButtonWithImageError';
import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';

import { EmailIcon } from '../../components/EmailIIcon';
import { PasswordIcon } from '../../components/PasswordIcon';
=======
import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';
import {HelpText} from '../HelpText/HelpText';
import {ButtonWithImageError} from '../ButtonWithImageError/ButtonWithImageError';
import {SvgArrowRight} from '../../../../components/Icons/SvgArrowRight';

import {SvgEmailIcon} from '../../../../components/Icons/SVGEmailIcon';
import {SvgPasswordIcon} from '../../../../components/Icons/SvgPasswordIcon';
>>>>>>> c58302aa4a12d5a66b27b61418ecbca59cb83dc0:src/modules/user/components/FormUserLogin/FormUserLogin.js

import { Text } from '../../../../components/Text/Text';

<<<<<<< HEAD:src/modules/user/view/login/FormUserLogin.js
import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';
=======
import {SpeedingWheel} from '../../../../components/SmallPreloader/SmallPreloader';
import {PreloaderWrapper} from '../../../../components/PreloaderWrapper/PreloaderWrapper';

import {required} from '../../../../utils/validation/required';
import isEmail from "../../../../utils/validation/isEmail";
import {SvgReloadIcon} from "../../../../components/Icons/SvgReloadIcon";
>>>>>>> c58302aa4a12d5a66b27b61418ecbca59cb83dc0:src/modules/user/components/FormUserLogin/FormUserLogin.js

import { required } from '../../../../utils/validation/required';
import isEmail from '../../../../utils/validation/isEmail';
import { ReloadIcon } from '../../components/ReloadIcon';

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
          <Box width="100%" mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
<<<<<<< HEAD:src/modules/user/view/login/FormUserLogin.js
              icon={<EmailIcon />}
=======
              icon={<SvgEmailIcon/>}
>>>>>>> c58302aa4a12d5a66b27b61418ecbca59cb83dc0:src/modules/user/components/FormUserLogin/FormUserLogin.js
              validate={[required, isEmail]}
            />
          </Box>
          <Box width="100%" mb={4}>
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
<<<<<<< HEAD:src/modules/user/view/login/FormUserLogin.js
              icon={<PasswordIcon />}
=======
              icon={<SvgPasswordIcon/>}
>>>>>>> c58302aa4a12d5a66b27b61418ecbca59cb83dc0:src/modules/user/components/FormUserLogin/FormUserLogin.js
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
                    <SvgArrowRight />
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Sign in
              </ButtonWithImageError>
            </Box>
          )}
          {submitFailed && (
            <Box width="100%">
              <ButtonWithImageError
                type="submit"
                variant="error"
                size="medium"
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
<<<<<<< HEAD:src/modules/user/view/login/FormUserLogin.js
                    <ReloadIcon />
=======
                    <SvgReloadIcon/>
>>>>>>> c58302aa4a12d5a66b27b61418ecbca59cb83dc0:src/modules/user/components/FormUserLogin/FormUserLogin.js
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

FormUserLogin = reduxForm({
  form: 'FormUserLogin',
})(FormUserLogin);

export default FormUserLogin;
