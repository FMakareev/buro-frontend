import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import fetch from 'isomorphic-fetch';
import { EXCEL_DOWNLOAD } from '@lib/shared/endpoints';

import { Text } from '@lib/ui/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import { Box } from '@lib/ui/Box/Box';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { FileUploader } from '@lib/ui/FileUploader/FileUploader';

import { SvgCancelRequest } from '@lib/ui/Icons/SvgCancelRequest';
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';
import {
  MessageContentStyled,
  WrapperMessage,
  StyledForm,
  CancelWrapper,
  TextFieldBaseStyled,
} from './FormDocumentUploadStyled';

import { required } from '../../../../utils/validation/required';

const download = require('./download.js');

export class FormDocumentUpload extends Component {
  static propTypes = {
    ...formPropTypes,
    id: PropTypes.string,
  };

  static defaultProps = {
    id: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submit = this.submit.bind(this);
  }

  get initialState() {
    const { id } = this.props;
    return {
      /** загрузка */
      isLoading: false,
      /** успешная отправка данных */
      submitSucceeded: false,
      /** ошибка при отправке данных */
      submitFailed: false,
      /** ошибка валидации файла */
      reject: null,
      /** id документа */
      id,
    };
  }

  submit(value) {
    const {id} = this.state;
    const querys = Object.assign({}, value, {id});


    const formData = new FormData();
    formData.append('documentid',querys.id);
    formData.append('key',querys.code);
    const options = {
      method: 'post',
      body: formData,
    };
    this.setState(() => ({isLoading: true, reject: null}));

    fetch(`${EXCEL_DOWNLOAD}`, options)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState(() => ({isLoading: false, submitSucceeded: true}));
          return response.blob();
        }
        if (response.status === 500) {
          throw Error(response.statusText);
        }
        throw response;
      })
      .then(blob => {
        download(blob);
      })
      .catch(error => {
        this.setState(() => ({isLoading: false, submitFailed: true}));
        console.log(error);
      });
  }

  render() {
    const {toggleModal, pristine, submitting, invalid, handleSubmit} = this.props;
    const {isLoading, reject, submitFailed, submitSucceeded} = this.state;
    console.log('this:', this);
    return (
      <StyledForm onSubmit={handleSubmit(this.submit)}>
        {!submitSucceeded && !submitFailed && (
          <FileUploader
            reject={reject || submitFailed}
            isLoading={isLoading}
            onDropAccepted={this.submit}>
            <Flex flexDirection="column" alignItems="center">
              <Box width="100%" mb={6}>
                <Field
                  name="code"
                  component={TextFieldBaseStyled}
                  label="code"
                  placeholder="code"
                  type="text"
                  validate={[required]}
                />
              </Box>
              <Box width="70%">
                <ButtonBase
                  type="submit"
                  display="inline-block"
                  size="small"
                  disabled={pristine || submitting || invalid}>
                  Download the file
                </ButtonBase>
              </Box>
            </Flex>
          </FileUploader>
        )}
        {(submitSucceeded || submitFailed) && (
          <WrapperMessage reject={submitFailed}>
            <MessageContentStyled>
              {submitSucceeded && (
                <Text fontSize={8} fontFamily="regular" color="inherit" mb={12}>
                  File downloaded successfully.
                </Text>
              )}
              {submitFailed && (
                <Text fontSize={8} fontFamily="regular" color="inherit" mb={12}>
                  An error occurred during the download.
                </Text>
              )}
              <ButtonBase onClick={toggleModal} display="inline-block" size="small">
                Close
              </ButtonBase>
            </MessageContentStyled>
          </WrapperMessage>
        )}
        <CancelWrapper onClick={toggleModal}>
          <SvgCancelRequest/>
        </CancelWrapper>
      </StyledForm>
    );
  }
}

FormDocumentUpload = reduxForm({
  form: 'FormDocumentUpload',
})(FormDocumentUpload);

export default FormDocumentUpload;
