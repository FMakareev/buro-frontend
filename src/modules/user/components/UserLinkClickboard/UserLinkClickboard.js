import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserFromStore} from "../../../../store/reducers/user/selectors";
import {withRouter} from "react-router-dom";
import {Flex} from "@lib/ui/Flex/Flex";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ROLE_CLIENT} from "@lib/shared/roles";
import {ic_content_copy} from 'react-icons-kit/md/ic_content_copy';
import {Icon} from 'react-icons-kit';
import {Label} from "@lib/ui/Label/Label";
import {Box} from "@lib/ui/Box/Box";
import styled from "styled-components";
import {FontFamilyProperty} from "@lib/styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "@lib/styles/styleProperty/FontSizeProperty";
import {TextFieldBase} from "@lib/ui/TextFieldBase/TextFieldBase";
import {LineHeightProperty} from "@lib/styles/styleProperty/LineHeightProperty";
import {BoxShadowProperty} from "@lib/styles/styleProperty/BoxShadowProperty";
import md5 from 'md5';


const TextField = styled(TextFieldBase)`
  ${props => FontFamilyProperty({ ...props, fontFamily: 'regular' })};
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 0 })};
  border-radius: 4px 0 0 4px;
`;


const ButtonStyled = styled.button`
  height: 34px;
  width: 34px;
  padding: 0;
  background-color: #fff;
  border: 1px solid;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'regular' })};
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 0 })};
`;

export class UserLinkClickboard extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    const {user} = this.props;
    if (!isBrowser) {
      return {};
    }
    return {
      value: `${window.location.origin}/app/bank/clients?client=${md5(user.id)}`,
      copied: false
    }
  }

  render() {
    const {user} = this.props;
    if (user.role !== ROLE_CLIENT) {
      return null;
    }
    return (
      <Flex flexDirection={'column'}>
        <Label>
          You are token for bank
        </Label>
        <Flex flexDirection={'row'}>
          <Box width={'calc(100% - 34px)'}>
            <TextField
              input={{
                value: this.state.value
              }}
              disabled
            />
          </Box>
          <ButtonStyled type={'button'}>
            <CopyToClipboard
              text={this.state.value}
              onCopy={() => this.setState({copied: true})}
            >
              <Icon icon={ic_content_copy} size={24}/>
            </CopyToClipboard>
          </ButtonStyled>
        </Flex>
      </Flex>
    )
  }
}

UserLinkClickboard = withRouter(UserLinkClickboard);
UserLinkClickboard = connect(state => ({
  user: getUserFromStore(state),
}))(UserLinkClickboard);
export default UserLinkClickboard;
