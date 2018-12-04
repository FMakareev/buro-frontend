import React, { Component } from 'react';
// import styled from 'styled-components';
import { Field, reduxForm, Form, SubmissionError } from 'redux-form';

// import { TextFieldBase } from '../../../../components/TextFieldBase/TextFieldBase';

import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

import { Box } from '../../../../components/Box/Box';
// import { Flex } from '../../../../components/Flex/Flex';

import { Text } from '../../../../components/Text/Text';

import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { PreloaderWrapper } from '../../../../components/PreloaderWrapper/PreloaderWrapper';

// import { ButtonWithImageError } from '../../../user/components/ButtonWithImageError/ButtonWithImageError';

import { Title, Wrapper, HiddenButton, StyledTextField } from './styled';

export class FormSendQuestion extends Component {
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
        <Title mb={9}>Ask the question</Title>
        <Wrapper justifyContent="center" width="100%" mb={10}>
          <Box width="100%">
            <Field name="question" component={StyledTextField} type="text" />
          </Box>

          {!submitFailed && (
            <Box width="20%">
              <HiddenButton
                type="submit"
                variant="primary"
                size="small"
                error={error}
                disabled={pristine || submitting || invalid}>
                Send
              </HiddenButton>
            </Box>
          )}
          {submitFailed && (
            <Box width="20%">
              <HiddenButton type="submit" variant="error" size="small" error={error}>
                Try again
              </HiddenButton>
            </Box>
          )}
        </Wrapper>
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

FormSendQuestion = reduxForm({
  form: 'FormUserLogin',
})(FormSendQuestion);

export default FormSendQuestion;
