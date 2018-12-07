import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color } from 'styled-system';
import { Flex } from '../Flex/Flex';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import { Label } from '../Label/Label';

import { BackgroundColorProperty } from '../../styles/styleProperty/BackgroundColorProperty';

const ButtonBaseStyled = styled(ButtonBase)`
  flex-grow: 1;
  &.isActive,
  :hover {
    ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color10' })};
    ${props => color({ ...props, color: 'color1' })};
  }
`;

/**
 * GenderToggle
 * @example ./GenderToggle.example.md
 */
export class ButtonTriggerGroup extends Component {
  static propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
  };

  static defaultProps = {
    options: [],
    input: {
      onChange: () => null,
      value: null,
    },
  };

  render() {
    const {
      input: { onChange, value },
      options,
      label,
    } = this.props;
    return (
      <Flex flexDirection="column">
        {label && <Label>{label}</Label>}
        <Flex justifyContent="space-between">
          {options &&
            options.map((item, index) => (
              <ButtonBaseStyled
                key={`ButtonBaseStyled-${index}`}
                onClick={() => onChange(item.value)}
                className={value === item.value ? 'isActive' : null}
                variant="transparent"
                size="small">
                {item.label}
              </ButtonBaseStyled>
            ))}
        </Flex>
      </Flex>
    );
  }
}

export default ButtonTriggerGroup;
