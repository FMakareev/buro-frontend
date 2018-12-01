import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export const ButtonWithImage = ({
                                  iconLeft,
                                  iconRight,
                                  children,
                                  ...rest
                                }) => {
  return (
    <ButtonBase {...rest}>
      <Flex justifyContent={'space-around'} alignItems={'space-around'} width={'100%'}>
        {iconLeft && (
          <Flex justifyContent={'center'} alignItems={'center'}>
            {iconLeft}
          </Flex>
        )}

        <Flex justifyContent={'center'} alignItems={'center'}>
          {children}
        </Flex>

        {iconRight && (
          <Flex justifyContent={'center'} alignItems={'center'}>
            {iconRight}
          </Flex>
        )}
      </Flex>
    </ButtonBase>
  );
};

ButtonWithImage.propTypes = {
  /**name button */
  name: PropTypes.string,
  /**left icon */
  iconLeft: PropTypes.any,
  /**right icon */
  iconRight: PropTypes.any,
  /**variant button */
  variant: PropTypes.string,
  /**size button */
  size: PropTypes.string,
  /**css value - margin-right */
  mr: PropTypes.number,
  /**css value - margin-left */
  ml: PropTypes.number,
};

export default ButtonWithImage;
