import React, {Component} from 'react';
import {Field, reduxForm, Form} from 'redux-form';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {required} from "../../../../utils/validation/required";
import {TextFieldWithIcon} from "../../../../components/TextFieldWithIcon/TextFieldWithIcon";
import {Flex} from "../../../../components/Flex/Flex";
import {EmailIcon} from "../../components/EmailIIcon";
import {Box} from "../../../../components/Box/Box";
import {ButtonWithImage} from "../../../../components/ButtonWithImage/ButtonWithImage";
import {SvgArrowRight} from "../../../../components/Icons/SvgArrowRight";
import {Text} from "../../../../components/Text/Text";
import {SvgArrowLeft} from "../../../../components/Icons/SvgArrowLeft";
import {SpeedingWheel} from "../../../../components/SmallPreloader/SmallPreloader";
import {PreloaderWrapper} from "../../../../components/PreloaderWrapper/PreloaderWrapper";

const FormStyled = styled(Form)`
  position: relative;
`;

@reduxForm({
  form: 'FormResetPassword',
})
export class FormResetPassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

    }
  }

  submit(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, invalid, submitFailed, submitSucceeded} = this.props;
    return (<FormStyled onSubmit={handleSubmit(this.submit)}>

      {

        !submitSucceeded &&
        !submitFailed
        &&
        <Flex justifyContent={"center"} width={"100%"} flexDirection={"column"}>
          <Box width={"100%"} mb={6}>
            <Field
              name={"email"}
              component={TextFieldWithIcon}
              placeholder={"Email address"}
              type={"email"}
              icon={<EmailIcon/>}
            />
          </Box>
          <Box width={"100%"}>
            <ButtonWithImage
              type={"submit"}
              variant={"primary"}
              size={"medium"}
              pl={12}
              pr={4}
              fontSize={6}
              width={"100%"}
              iconRight={<Text fontSize={12} lineHeight={0}><SvgArrowRight/></Text>}
              disabled={pristine || submitting || invalid}>
              Send password reset mail
            </ButtonWithImage>
          </Box>
        </Flex>
      }

      {
        submitting &&
        <PreloaderWrapper>
          <Text fontSize={12}>
            <SpeedingWheel/>
          </Text>
        </PreloaderWrapper>
      }

      {
        (
          submitSucceeded ||
          submitFailed
        ) &&
        <Flex justifyContent={"center"} width={"100%"} flexDirection={"column"}>
          <Box width={"100%"} mb={6}>
            <Text fontSize={6} lineHeight={12} color={'color1'} fontFamily={'medium'}>
              Password change link was has been sent to your email adress. Click the link in the email to reset your
              password.
            </Text>
          </Box>
          <Box width={"100%"}>
            <Link to={'/login'}>
              <ButtonWithImage
                variant={"primary"}
                size={"medium"}
                pr={12}
                pl={4}
                fontSize={6}
                width={"100%"}
                iconLeft={<Text fontSize={12} lineHeight={0}><SvgArrowLeft/></Text>}
              >
                Send password reset mail
              </ButtonWithImage>
            </Link>
          </Box>
        </Flex>
      }

    </FormStyled>)
  }

}