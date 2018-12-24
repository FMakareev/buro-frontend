import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import {FileLoader} from "@lib/ui/FileLoader/FileLoader";
import {Text} from "@lib/ui/Text/Text";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import {MessageContentStyled, WrapperMessage} from "./FormDocumentUploadStyled";
import {EXCEL_UPLOAD} from "@lib/shared/endpoints";



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
      /** ошибка при отарпвке данных */
      submitFailed: false,
      /** ошибка валидации файла */
      reject: null,
    }
  }

  submit(value) {
    const formData = new FormData();
    formData.append('excel', value[0]);
    const options = {
      method: 'post',
      body: formData,
    };
    this.setState(() => ({isLoading: true, reject: null}));

    fetch(`${EXCEL_UPLOAD}/${this.props.id}`, options).then(response => {
      if(response.status < 300){
        this.setState(() => ({isLoading: false, submitSucceeded: true}));
        return true;
      } else {
        throw response;
      }

    }).catch(error => {
      this.setState(() => ({isLoading: false, submitFailed: true}));

      console.error(error);
    })
  }

  onDropRejected = (error) => {
    this.setState(() => ({reject: error}));
  };

  render() {
    const {toggleModal} = this.props;
    const {isLoading, reject, submitFailed, submitSucceeded} = this.state;
    return (<form>
      {
        !submitSucceeded && !submitFailed &&
        <FileLoader
          reject={reject || submitFailed}
          isLoading={isLoading}
          accept={['text/xml']}
          onDropRejected={this.onDropRejected}
          onDropAccepted={this.submit}
        />
      }
      {
        (submitSucceeded || submitFailed) && <WrapperMessage reject={submitFailed}>
          <MessageContentStyled>
            {
              submitSucceeded &&
              <Text fontSize={8} fontFamily={'regular'} color={'inherit'} mb={12}>
                File uploaded successfully.
              </Text>

            }
            {
              submitFailed &&
              <Text fontSize={8} fontFamily={'regular'} color={'inherit'} mb={12}>
                An error occurred during the download.
              </Text>
            }
            <ButtonBase onClick={toggleModal} display={'inline-block'} size={'small'}>
              Close
            </ButtonBase>
          </MessageContentStyled>
        </WrapperMessage>
      }
    </form>)
  }
}
