import React, {Component} from 'react';
import {SvgBell} from "../Icons/SvgBell";
import {ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT} from "../../shared/roles";
import {CircleCount} from "./HeaderNotificationStyled";
import {ButtonStyled} from "./HeaderNotificationStyled";
import {CheckAuthorization} from "../CheckAuthorization/CheckAuthorization";


@CheckAuthorization([ROLE_CLIENT, ROLE_BANK])
export class HeaderNotification extends Component {
  render() {
    const {user} = this.props;
    if (user && !user.error && user.role === ROLE_BUREAU) {
      return null;
    }
    return (<ButtonStyled as={'button'} fontSize={'40px'}>
      <CircleCount>
        6
      </CircleCount>
      <SvgBell/>
    </ButtonStyled>)
  }
}

export default HeaderNotification;
