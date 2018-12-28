import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export const ButtonWithImage = ({ iconLeft, iconRight, children, ...rest }) => (
  <ButtonBase {...rest}>
    <Flex justifyContent="space-between" alignItems="space-around" width="100%">
      {iconLeft && (
        <Flex justifyContent="center" alignItems="center">
          {iconLeft}
        </Flex>
      )}
      {!iconLeft && <div />}
      <Flex justifyContent="center" alignItems="center">
        {children}
      </Flex>
      {iconRight && (
        <Flex justifyContent="center" alignItems="center">
          {iconRight}
        </Flex>
      )}
      {!iconRight && <div />}
    </Flex>
  </ButtonBase>
);

ButtonWithImage.propTypes = {
  /** name button */
  name: PropTypes.string,
  /** left icon */
  iconLeft: PropTypes.any,
  /** right icon */
  iconRight: PropTypes.any,
  /** variant button */
  variant: PropTypes.oneOf(['primary', 'secondary', 'transparent', 'error' ]),
  /** size button */
  size: PropTypes.string,
  /** css value - margin-right */
  mr: PropTypes.any,
  /** css value - margin-left */
  ml: PropTypes.any,
};

export default ButtonWithImage;
