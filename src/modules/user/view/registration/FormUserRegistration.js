import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

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

import { StyledButtonWithImage } from '../../components/StyledButtonWithImage';
import { Text } from '../../../../components/Text/Text';

import { required } from '../../../../utils/validation/required';

export class FormUserRegistration extends Component {
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
              name="role"
              component={Select}
              placeholder="Role"
              labelKey="label"
              valueKey="value"
              options={[{ value: 'bank', label: 'Bank' }, { value: 'client', label: 'Client' }]}
              validate={[required]}
            />
          </Box>
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
          <Box width="100%" mt="15px" mb="20px">
            <Flex>
              <Box mr="10px">
                <Field
                  name="privacy"
                  checked={false}
                  component={Checkbox}
                  type="text"
                  validate={[required]}
                />
              </Box>
              <Box>
                <HelpText width="90%">
                  I accept the <Link to="/">terms of service</Link> and
                  <Link to="/"> privacy policy</Link>.
                </HelpText>
              </Box>
            </Flex>
          </Box>

          <Box width="100%">
            <StyledButtonWithImage
              type="submit"
              variant="primary"
              size="medium"
              py={2}
              iconRight={
                <Text fontSize={12} lineHeight={0}>
                  <SvgArrowRight />
                </Text>
              }
              disabled={pristine || submitting || invalid}>
              Get started
            </StyledButtonWithImage>
          </Box>
        </Flex>
      </Form>
    );
  }
}

FormUserRegistration = reduxForm({
  form: 'FormUserRegistration',
})(FormUserRegistration);

export default FormUserRegistration;
