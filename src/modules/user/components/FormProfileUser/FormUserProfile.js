import React, { Component } from 'react';
import {Field, reduxForm, Form, SubmissionError} from 'redux-form';

import styled from 'styled-components';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithLabel } from '../../../../components/TextFieldWithLabel/TextFieldWithLabel';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Text/Text';
import { ButtonBase } from '../../../../components/ButtonBase/ButtonBase';
import { DayPickerBase } from '../../../../components/DayPickerBase/DayPickerBase';
import { ButtonTriggerGroup } from '../../../../components/ButtonTriggerGroup/ButtonTriggerGroup';

import { required } from '../../../../utils/validation/required';
import { phoneNumber } from '../../../../utils/validation/phoneNumber';
import {graphql} from "react-apollo/index";
import UpdateUserMutation from './UpdateUserMutation.graphql';

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

@graphql(UpdateUserMutation, {
  name: '@apollo/update',
})
@reduxForm({
  form: 'FormProfileUser',
})
export class FormProfileUser extends Component {
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
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Header as="h2" fontSize="24px" lineHeight="32px" mb="24px">
          Main data:
        </Header>
        <Flex mx={-6} justifyContent="space-between" />
        <Flex mx={-6} justifyContent="space-between" flexWrap="wrap" mb="30px">
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[1, 0]}>
            <Field
              name="firstName"
              component={TextFieldWithLabel}
              label="First Name:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[4, 0]}>
            <Field
              name="birthdate"
              component={DayPickerBase}
              label="Date of Birth:"
              type="date"
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[2, 0]}>
            <Field
              name="lastName"
              component={TextFieldWithLabel}
              label="Last Name:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[5, 0]}>
            <Field
              name="phone"
              component={TextFieldWithLabel}
              label="Telephone:"
              type="text"
              validate={[required, phoneNumber]}
              normalize={normalizePhoneNumber}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[3, 0]}>
            <Field
              name="patronymic"
              component={TextFieldWithLabel}
              label="Patronymic:"
              type="text"
              validate={[required]}
            />
          </Box>
          <Box width={['100%', '100%', '50%']} px={6} mb={7} order={[6, 0]}>
            <Field
              name="gender"
              component={ButtonTriggerGroup}
              label="Gender:"
              type="text"
              options={[
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
              ]}
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
            disable={pristine || submitting || invalid}>
            Save
          </ButtonBase>
        </Flex>
      </Form>
    );
  }
}


export default FormProfileUser;
