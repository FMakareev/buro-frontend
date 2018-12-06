import React from 'react';
import {Flex} from "../Flex/Flex";
import {Link} from "react-router-dom";
import {Text} from "../Text/Text";


export const Footer = () => (<Flex
  mt={'-36px'}
  justifyContent={'space-between'}
  flexDirection={['column','column','row','row','row',]}
  px={[5, 5, 7, 7, 7]}
  py={3}>
  <Text mb={[3,0,0,0,0]} color={'color1'} fontSize={'14px'} lineHeight={'20px'}>
    Copyright © 2018, The Bureau.
  </Text>
  <Flex mx={-3}>
    <Text color={'color1'} px={3} fontSize={'14px'} lineHeight={'20px'}>
      <Link to={'/help'}>
        FAQ
      </Link>
    </Text>
    <Text color={'color1'} px={3} fontSize={'14px'} lineHeight={'20px'}>
      <Link to={'/terms'}>
        Term of use
      </Link>
    </Text>
    <Text color={'color1'} px={3} fontSize={'14px'} lineHeight={'20px'}>
      <Link to={'/policy'}>
        Privacy Policy
      </Link>
    </Text>
  </Flex>
</Flex>);

export default Footer;
