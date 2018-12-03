import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithIcon } from '../../../../components/TextFieldWithIcon/TextFieldWithIcon';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { HelpText } from '../../components/HelpText';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgArrowRight } from '../../../../components/Icons/SvgArrowRight';

import { EmailIcon } from '../../components/EmailIIcon';
import { PasswordIcon } from '../../components/PasswordIcon';

import { Text } from '../../../../components/Text/Text';

import { required } from '../../../../utils/validation/required';

const StyledButtonWithImage = styled(ButtonWithImage)`
  width: 100%;
  padding-left: 88px;
  padding-right: 12px;
`;

export class FormUserLogin extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  submit = value => {
    console.log(value);
  };

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex justifyContent="center" width="100%" flexDirection="column">
          <Box width="100%" mt="17px">
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={<EmailIcon />}
              validate={[required]}
            />
          </Box>
          <Box width="100%" mt="17px" mb="11px">
            <Field
              name="password"
              component={TextFieldWithIcon}
              placeholder="Password"
              type="password"
              icon={<PasswordIcon />}
              validate={[required]}
            />
          </Box>
          <Box width="100%" mb="20px">
            <Flex width="100%" justifyContent="space-between">
              <HelpText>
                Forgot your <Link to="/password-reset">password</Link>?
              </HelpText>
              <HelpText>
                <Link to="registration">Create at account</Link>
              </HelpText>
            </Flex>
          </Box>

          <Box width="100%">
            <StyledButtonWithImage
              type="submit"
              variant="primary"
              size="medium"
              py={2}
              // fontSize="32px"
              iconRight={
                <Text fontSize={12} lineHeight={0}>
                  <SvgArrowRight />
                </Text>
              }
              disabled={pristine || submitting || invalid}>
              Sigh in
            </StyledButtonWithImage>
          </Box>
        </Flex>
      </Form>
    );
  }
}

FormUserLogin = reduxForm({
  form: 'FormUserLogin',
})(FormUserLogin);

export default FormUserLogin;
