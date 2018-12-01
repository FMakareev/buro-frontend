import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';

import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

import { TextFieldWithLabel } from '../../../../../components/TextFieldWithLabel/TextFieldWithLabel';

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
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Field name="firstname" component={TextFieldWithLabel} label="First Name" type="text" />
      </Form>
    );
  }
}

FormProfileUser = reduxForm({
  form: 'FormProfileUser',
})(FormProfileUser);

export default FormProfileUser;
