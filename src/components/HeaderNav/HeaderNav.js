import React, {Component} from 'react';
import TabController from "../TabController/TabController";
import {Tabs} from "../Tabs/Tabs";
import {TabContent} from "../TabContent/TabContent";
import SvgBurgerMenu from "../Icons/SvgBurgerMenu";
import {SvgRequests} from "../Icons/SvgRequests";
import SvgProfile from "../Icons/SvgProfile";
import {SvgUsers} from "../Icons/SvgUsers";
import {ButtonStyled, HeaderNavWrapper, NavItem, NavList} from "./HeaderNavStyled";

export class HeaderNav extends Component {

  render() {
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
            {/* TODO doc: этот путь есть у всех */}
            <NavItem to={'/app/profile'} icon={<SvgProfile/>}>
              Profile
            </NavItem>
            {/* TODO doc: этот путь только для банка и клиента */}
            {/* TODO doc: это временно чтобы был доступ к марр=шрутам */}
            <NavItem to={'/app/requests/bank'} icon={<SvgRequests/>}>
              Requests
            </NavItem>
            {/* TODO doc: этот путь только для банка и клиента */}
            <NavItem to={'/app/requests/client'} icon={<SvgRequests/>}>
              Requests
            </NavItem>
            {/* TODO doc: этот путь есть только у банка, это список клиентов */}
            <NavItem to={'/app/clients'} icon={<SvgUsers/>}>
              Clients
            </NavItem>
            {/* TODO doc: этот путь доступен только бюро */}
            <NavItem to={'/app/documents'} icon={<SvgUsers/>}>
              Documents
            </NavItem>
          </NavList>
        </TabContent>
      </TabController>
    </HeaderNavWrapper>)
  }
}

export default HeaderNav;
