import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import fetch from 'isomorphic-fetch';
import {EXCEL_DOWNLOAD} from '@lib/shared/endpoints';

import {Text} from '@lib/ui/Text/Text';
import {Flex} from '@lib/ui/Flex/Flex';
import {Box} from '@lib/ui/Box/Box';
import {ButtonBase} from '@lib/ui/ButtonBase/ButtonBase';
import {FileUploader} from '@lib/ui/FileUploader/FileUploader';

import {SvgCancelRequest} from '@lib/ui/Icons/SvgCancelRequest';
import {formPropTypes} from '../../../../propTypes/Forms/FormPropTypes';
import {
  MessageContentStyled,
  WrapperMessage,
  StyledForm,
  CancelWrapper,
  TextFieldBaseStyled,
} from './FormDocumentUploadStyled';

import {required} from '../../../../utils/validation/required';
import {jsonToUrlEncoded} from "@lib/utils/jsontools/jsonToUrlEncoded";

const download = require('./download.js');

export class FormDocumentDownload extends Component {
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
    const {id} = this.props;
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

  /** @desc метод для определения пользовательской OS для получения коректной кодировки файла */
  getUserPlatformCharset = () => {
    try{
      const platform = window.navigator.platform;

      if(platform === 'Windows' || platform === 'Win16'|| platform === 'Win32'|| platform === 'WinCE'){
        return 'cp1251';
      } else {
        return 'utf-8';
      }
    } catch(error){
      return 'cp1251';
    }
  };

  submit(value) {
    const {id} = this.state;
    const querys = Object.assign({}, value, {id});

    const Charset = this.getUserPlatformCharset();
    const options = {
      method: 'post',
      body: jsonToUrlEncoded({
        documentid: querys.id,
        key: querys.code,
      }),
      headers: {
        'Accept-Charset': Charset,
        'Content-Type': `application/x-www-form-urlencoded;charset=${Charset}`,
      }
    };
    this.setState(() => ({isLoading: true, reject: null}));

    fetch(`${EXCEL_DOWNLOAD}`, options)
      .then(response => {
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
        console.error(error);
      });
  }

  render() {
    const {toggleModal, pristine, submitting, invalid, handleSubmit} = this.props;
    const {isLoading, reject, submitFailed, submitSucceeded} = this.state;
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

FormDocumentDownload = reduxForm({
  form: 'FormDocumentDownload',
})(FormDocumentDownload);

export default FormDocumentDownload;
