import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import {FileLoader} from "../../../../components/FileLoader/FileLoader";

export class FormDocumentUpload extends Component {

  static propTypes = {};
  static defaultProps = {
    id: 'asdafsasfa wr 24f23wbeuhg'
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
    console.log(value);
    const formData = new FormData();
    formData.append('document', value[0]);
    formData.append('id', this.props.id);
    const options = {
      method: 'post',
      body: formData,
    };
    this.setState(() => ({isLoading: true, reject: null}));

    fetch('/doc/upload', options).then(response => {
      console.log(response);
      this.setState(() => ({isLoading: false}));

    }).catch(error => {
      this.setState(() => ({isLoading: false, submitFailed : true}));

      console.log(error);
    })
  }

  onDropRejected = (error) => {
    console.log('onDropRejected: ', error);
    this.setState(() => ({reject: error}));

  };

  render() {
    const {isLoading, reject, submitFailed ,submitSucceeded} = this.state;
    return (<form>
      <FileLoader
        reject={reject || submitFailed}
        isLoading={isLoading}
        accept={['text/xml']}
        onDropRejected={this.onDropRejected}
        onDropAccepted={this.submit}
      />
    </form>)
  }
}
