import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Text} from "../Text/Text";


export const ButtonStyled = styled(Text)`
  background-color: transparent;
  border: none;
  padding: 0;
  height: 40px;
  width: 40px;
  line-height: 0;
  cursor: pointer;
  outline: none;
`;

export const NavLinkStyled = styled(NavLink)`
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

export const NavItem = ({to, children, icon}) => (<NavLinkStyled to={to} activeClassName="selected">
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

export const NavList = styled.div`
  position: absolute;
  right: 56px;
  top: 0;
  z-index: 2;
`;

export const HeaderNavWrapper = styled.div`
  position: relative;  
`;
