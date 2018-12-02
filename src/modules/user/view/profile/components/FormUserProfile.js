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
import { phoneNumber } from '../../../../../utils/validation/phoneNumber';

const Header = styled(Text)`
  font-family: ${props => props.theme.fontFamily.bold};
`;

/**
 * @param {string} value - вводимое пользователем значение
 * @desc приведение вводимого значения телефона к формату "+ 7 911 111 11 11" */
const normalizePhoneNumber = value => {
  if (value.length > 17) {
    return value.slice(0, 17);
  }

  if (value.length === 1) return `+ 7 ${value.replace(/[^\d]/g, '')}`;

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 4) {
    return `+ 7 ${onlyNums.slice(1, 4)}`;
  }

  if (onlyNums.length <= 7) {
    return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4)}`;
  }

  if (onlyNums.length <= 9) {
    return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4, 7)} ${onlyNums.slice(7)}`;
  }

  if (onlyNums.length <= 11) {
    return `+ 7 ${onlyNums.slice(1, 4)} ${onlyNums.slice(4, 7)} ${onlyNums.slice(
      7,
      9,
    )} ${onlyNums.slice(9)}`;
  }

  return onlyNums;
};

export class FormProfileUser extends Component {
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
              validate={[required, phoneNumber]}
              normalize={normalizePhoneNumber}
            />
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="space-between" mb="50px">
          <Box width="100%" mr={30}>
            <Field
              name="patronymic"
              component={TextFieldWithLabel}
              label="Patronymic:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width="100%">
            <Field name="gender" component={GenderToggle} label="Gender:" type="radio" />
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
