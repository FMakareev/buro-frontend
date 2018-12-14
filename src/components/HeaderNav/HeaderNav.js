import React, {Component} from 'react';
import TabController from "../TabController/TabController";
import {Tabs} from "../Tabs/Tabs";
import {TabContent} from "../TabContent/TabContent";
import SvgBurgerMenu from "../Icons/SvgBurgerMenu";
import {SvgRequests} from "../Icons/SvgRequests";
import SvgProfile from "../Icons/SvgProfile";
import {SvgUsers} from "../Icons/SvgUsers";
import {ButtonStyled, HeaderNavWrapper, NavItem, NavList} from "./HeaderNavStyled";
import {ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT} from "../../shared/roles";

export class HeaderNav extends Component {

  render() {
    const {user} = this.props;
    return (<HeaderNavWrapper>
      <TabController
        defaultActiveTab={null}
        hideWhenReClicking
        backdrop
        ClickContentCloseTab>
        <Tabs>
          <ButtonStyled as={'button'} fontSize={'40px'}>
            <SvgBurgerMenu/>
          </ButtonStyled>
        </Tabs>
        <TabContent>
          <NavList>
            {/** этот путь есть у всех */}
            <NavItem to={'/app/profile'} icon={<SvgProfile/>}>
              Profile
            </NavItem>
            {/** этот путь только для банка */}
            {
              user && !user.error && user.role === ROLE_BANK &&
              <NavItem to={'/app/bank/notifications'} icon={<SvgRequests/>}>
                Notifications
              </NavItem>
            }

            {/** этот путь есть только у банка, это список клиентов */}
            {
              user && !user.error && user.role === ROLE_BANK &&
              <NavItem to={'/app/bank/clients'} icon={<SvgUsers/>}>
                Clients
              </NavItem>
            }
            {/** этот путь есть только у банка, это список клиентов */}
            {
              user && !user.error && user.role === ROLE_BANK &&
              <NavItem to={'/app/bank/documents'} icon={<SvgUsers/>}>
                Documents
              </NavItem>
            }

            {/** этот путь только для клиента */}
            {
              user && !user.error && user.role === ROLE_CLIENT &&
              <NavItem to={'/app/client/notifications'} icon={<SvgRequests/>}>
                Notifications
              </NavItem>
            }

            {/** этот путь доступен только бюро */}
            {
              user && !user.error && user.role === ROLE_BUREAU &&
              <NavItem to={'/app/bureau/clients'} icon={<SvgUsers/>}>
                Clients
              </NavItem>
            }
            <NavItem to={'/logout'}>
              Logout
            </NavItem>
          </NavList>
        </TabContent>
      </TabController>
    </HeaderNavWrapper>)
  }
}

export default HeaderNav;
