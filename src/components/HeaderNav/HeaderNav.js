import React, {Component} from 'react';
import styled from 'styled-components';

import TabController from "../TabController/TabController";
import {Tabs} from "../Tabs/Tabs";
import {TabContent} from "../TabContent/TabContent";
import SvgBurgerMenu from "../Icons/SvgBurgerMenu";
import {Text} from "../Text/Text";
import {NavLink} from "react-router-dom";
import {SvgRequests} from "../Icons/SvgRequests";
import SvgProfile from "../Icons/SvgProfile";
import {SvgUsers} from "../Icons/SvgUsers";


const ButtonStyled = styled(Text)`
  background-color: transparent;
  border: none;
  padding: 0;
  height: 40px;
  width: 40px;
  line-height: 0;
  cursor: pointer;
  outline: none;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 8px 40px;
  min-width: 200px;
  border: 1px solid ${({theme}) => theme.colors.color1};
  background-color: ${({theme}) => theme.colors.color0};

  &.selected {
    background-color: ${({theme}) => theme.colors.color3};
  }
  &:hover{
    background-color: ${({theme}) => theme.colors.color3};
  }
`;

const NavItem = ({to, children, icon}) => (<NavLinkStyled to={to} activeClassName="selected">
  <Text fontFamily={'medium'}  fontSize={'14px'} lineHeight={'20px'} color={'color1'}>
    {children}
  </Text>
  {
    icon &&
    <Text lineHeight={'24px'} fontSize={'24px'}>
      {icon}
    </Text>
  }
</NavLinkStyled>);

const NavList = styled.div`
  position: absolute;
  right: 56px;
  top: 0;
  z-index: 2;
`;

const HeaderNavWrapper = styled.div`
  position: relative;  
`;

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
