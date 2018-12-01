import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';

import styled from 'styled-components';

import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithLabel } from '../../../../../components/TextFieldWithLabel/TextFieldWithLabel';

import { Box } from '../../../../../components/Box/Box';
import { Flex } from '../../../../../components/Flex/Flex';
import { Text } from '../../../../../components/Text/Text';
import { ButtonBase } from '../../../../../components/ButtonBase/ButtonBase';
import { DayPickerBase } from '../../../../../components/DayPickerBase/DayPickerBase';
import { GenderToggle } from '../../../../../components/GenderToggle/GenderToggle';

import { required } from '../../../../../utils/validation/required';

const Header = styled(Text)`
  font-family: ${props => props.theme.fontFamily.bold};
`;

export class FormProfileUser extends Component {
  static propTypes = {
    ...formPropTypes,
  };

  constructor(props) {
    super(props);
  }

  submit(value) {
    console.log(value);
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Header as="h2" fontSize="24px" lineHeight="32px" mb="24px">
          Main data:
        </Header>
        <Flex width="100%" justifyContent="space-between" mb="20px">
          <Box width="100%" mr={30}>
            <Field
              name="firstname"
              component={TextFieldWithLabel}
              label="First Name:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width="100%">
            <Field
              name="dateofbirth"
              component={DayPickerBase}
              label="Date of Birth:"
              type="date"
              validate={[required]}
            />
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="space-between" mb="20px">
          <Box width="100%" mr={30}>
            <Field
              name="lastname"
              component={TextFieldWithLabel}
              label="Last Name:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width="100%">
            <Field
              name="telephone"
              component={TextFieldWithLabel}
              label="Telephone:"
              type="text"
              validate={[required]}
            />
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="space-between" mb="50px">
          <Box width="100%" mr={30}>
            <Field
              name="middlename"
              component={TextFieldWithLabel}
              label="Middle Name:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width="100%">
            <Field
              name="gender"
              component={GenderToggle}
              label="Gender:"
              type="checkbox"
              validate={[required]}
            />
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <ButtonBase
            type="submit"
            variant="primary"
            size="medium"
            px={122}
            py={2}
            fontSize="32px"
            disable={pristine || submitting || invalid}>
            Save
          </ButtonBase>
        </Flex>
      </Form>
    );
  }
}

FormProfileUser = reduxForm({
  form: 'FormProfileUser',
})(FormProfileUser);

export default FormProfileUser;
