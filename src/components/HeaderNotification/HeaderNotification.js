import React, {Component} from 'react';
import {SvgBell} from "../Icons/SvgBell";
import {ROLE_BUREAU} from "../../shared/roles";
import {CircleCount} from "./HeaderNotificationStyled";
import {ButtonStyled} from "./HeaderNotificationStyled";



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
