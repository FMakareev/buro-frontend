import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Flex} from "../Flex/Flex";
import {SvgLogo} from "../Icons/SvgLogo";
import {Text} from "../Text/Text";
import {HeaderWrapper} from "./HeaderStyled";
import {Link} from "react-router-dom";



export class Header extends Component {
  static propTypes = {
    /** route name */
    name: PropTypes.string,
  };

  static defaultProps = {
    name: 'Title not found',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const {children} = this.props;
    return (
      <HeaderWrapper justifyContent={'space-between'} px={[5,5,7,7,7]} py={[3,3,4,4,4]} flexDirection={'row'} width={'100%'}>
        <Link to={'/'}>
          <Flex alignItems={'center'} flexDirection={'row'}>
            <Text
              mr={[5,8,8,10,12]}
              lineHeight={5}
              fontSize={[4,4,5,5,5]}>
              <SvgLogo/>
            </Text>
            <Text textDecoration={'none'} color={'color1'} fontSize={[5,7,8,10,10]} lineHeight={[7,9,10,12,12]} fontWeight={'bold'}>
              The Bureau
            </Text>
          </Flex>
        </Link>
        {
          children &&
          <Flex alignItems={'center'} flexDirection={'row'}>
            {children}
          </Flex>
        }
      </HeaderWrapper>
    );
  }
}

export default Header;
