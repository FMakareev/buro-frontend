import React, {Component} from 'react';
import {graphql} from 'react-apollo';

import {TextFieldWithIcon} from "@lib/ui/TextFieldWithIcon/TextFieldWithIcon";
import {isEmail} from "@lib/utils/validation/isEmail";
import {required} from "@lib/utils/validation/required";
import {Field, Form, reduxForm, SubmissionError} from "redux-form";
import {Flex} from "@lib/ui/Flex/Flex";
import {Box} from "@lib/ui/Box/Box";
import {Text} from "@lib/ui/Text/Text";
import {SvgEmailIcon} from "@lib/ui/Icons/SvgEmailIcon";

import {ButtonWithImageError} from "../../../user/components/ButtonWithImageError/ButtonWithImageError";
import {SvgArrowRight} from "@lib/ui/Icons/SvgArrowRight";
import {SvgReloadIcon} from "@lib/ui/Icons/SvgReloadIcon";
import {PreloaderWrapper} from "@lib/ui/PreloaderWrapper/PreloaderWrapper";
import {SpeedingWheel} from "@lib/ui/SmallPreloader/SmallPreloader";
import {SvgUserField} from "@lib/ui/Icons/SvgUserField";

import CreateBankMutation from './CreateBankMutation.graphql';

export class FormCreateBank extends Component {


  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      submitting: false,
      apolloError: null,
    };
  }

  getNetworkError = errors => {
    try {
      const errorList = {};
      errors.forEach(item => {
        console.log(item.message);
        console.log(item.message.indexOf('Email already exists'));
        if(item.message.indexOf('Email already exists') >= 0){
          errorList.email = 'Bank with this email already registered.';
        }
        if(item.message.indexOf('Bank name already exists')>= 0){
          errorList.bankName = 'Bank name already exists'
        }
      });
      console.log(errorList);
      return errorList;
    } catch (error) {
      console.error(error);
      return {
        _error: 'Unexpected error.',
      };
    }
  };

  createBank = value => {
    const {reset} = this.props;
    return this.props['@apollo/create']({
      variables: Object.assign({}, value),
    })
      .then(response => {
        console.log(response);
        reset();
        return response;
      })
      .catch(({graphQLErrors, message, networkError, ...rest}) => {
        console.error('graphQLErrors: ', graphQLErrors);
        console.error('message: ', message);
        console.error('networkError: ', networkError);
        console.error('rest: ', rest);
        if (graphQLErrors) {
          throw new SubmissionError({
            ...this.getNetworkError(graphQLErrors),
          });
        } else {
          throw new SubmissionError({
            _error: message,
          });
        }
      });
  };

  render() {
    const {handleSubmit, pristine, invalid, submitFailed, error} = this.props;
    const {apolloError, submitting} = this.state;

    return (
      <Form onSubmit={handleSubmit(this.createBank)}>
        <Flex justifyContent="center" width="100%" flexDirection="column">
          <Box width="100%" mb={6}>
            <Field
              name="email"
              component={TextFieldWithIcon}
              placeholder="Email address"
              type="email"
              icon={
                <Text fontSize={11} lineHeight={0} fill="inherit">
                  <SvgEmailIcon/>
                </Text>
              }
              validate={[required, isEmail]}
            />
          </Box>
          <Box width="100%" mb={4}>
            <Field
              name="bankName"
              component={TextFieldWithIcon}
              placeholder="Bank name"
              type="text"
              icon={
                <Text fontSize={11} lineHeight={0} fill="inherit">
                  <SvgUserField/>
                </Text>
              }
              validate={[required]}
            />
          </Box>
          {!submitFailed && !apolloError && (
            <Box width="100%" mb={8}>
              <ButtonWithImageError
                type="submit"
                variant="primary"
                size="medium"
                error={error}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgArrowRight/>
                  </Text>
                }
                disabled={pristine || submitting || invalid}>
                Create
              </ButtonWithImageError>
            </Box>
          )}
          {(submitFailed ||
            apolloError || error) && (
            <Box width="100%" mb={8}>
              <ButtonWithImageError
                type="submit"
                variant="error"
                size="medium"
                error={error || apolloError}
                iconRight={
                  <Text fontSize={12} lineHeight={0}>
                    <SvgReloadIcon/>
                  </Text>
                }>
                Try again
              </ButtonWithImageError>
            </Box>
          )}
        </Flex>

        {submitting && (
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel/>
            </Text>
          </PreloaderWrapper>
        )}

      </Form>
    );
  }
}

FormCreateBank = reduxForm({
  form: 'FormCreateBank',
})(FormCreateBank);
FormCreateBank = graphql(CreateBankMutation, {
  name: '@apollo/create',
})(FormCreateBank);
export default FormCreateBank;
