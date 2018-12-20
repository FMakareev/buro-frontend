import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { FileUploader } from '@lib/ui/FileUploader/FileUploader';

import { TextFieldBase } from '@lib/ui/TextFieldBase/TextFieldBase';

import { Text } from '@lib/ui/Text/Text';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { EXCEL_DOWNLOAD } from '@lib/shared/endpoints';
import { SvgCancelRequest } from '@lib/ui/Icons/SvgCancelRequest';
import { MessageContentStyled, WrapperMessage } from './FormDocumentUploadStyled';

import { required } from '../../../../utils/validation/required';

const download = require('./download.js');

const StyledForm = styled(Form)`
  position: relative;
`;
const CancelWrapper = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

export class FormDocumentUpload extends Component {
  static propTypes = {};

  static defaultProps = {
    id: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submit = this.submit.bind(this);
  }

  get initialState() {
    return {
      /** загрузка */
      isLoading: false,
      /** успешная отправка данных */
      submitSucceeded: false,
      /** ошибка при отправке данных */
      submitFailed: false,
      /** ошибка валидации файла */
      reject: null,
      id: this.props.id,
    };
  }

   submit(value) {
    const { id } = this.state;
    const querys = Object.assign({}, value, { id });

    const options = {
      method: 'get',
    };
    this.setState(() => ({ isLoading: true, reject: null }));

    fetch(`/node${EXCEL_DOWNLOAD}?document_id=${querys.id}&keys=${querys.code}`, options)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState(() => ({ isLoading: false, submitSucceeded: true }));
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
        this.setState(() => ({ isLoading: false, submitFailed: true }));
        console.log(error);
      });
  }

  render() {
    const { toggleModal, pristine, submitting, invalid, handleSubmit } = this.props;
    const { isLoading, reject, submitFailed, submitSucceeded } = this.state;
    console.log('this:', this);
    return (
      <StyledForm onSubmit={handleSubmit(this.submit)}>
        {!submitSucceeded && !submitFailed && (
          <FileUploader
            reject={reject || submitFailed}
            isLoading={isLoading}
            onDropAccepted={this.submit}>
            <div>
              <Field
                name="code"
                component={TextFieldBase}
                label="Code"
                placeholder="Code"
                type="text"
                validate={[required]}
              />
              <ButtonBase
                type="submit"
                display="inline-block"
                size="small"
                disabled={pristine || submitting || invalid}>
                Download the file
              </ButtonBase>
            </div>
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
          <SvgCancelRequest />
        </CancelWrapper>
      </StyledForm>
    );
  }
}

FormDocumentUpload = reduxForm({
  form: 'FormDocumentUpload',
})(FormDocumentUpload);

export default FormDocumentUpload;
