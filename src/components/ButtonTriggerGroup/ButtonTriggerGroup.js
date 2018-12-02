import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {Flex} from "../Flex/Flex";
import {ButtonBase} from "../ButtonBase/ButtonBase";
import {Label} from "../Label/Label";


const ButtonBaseStyled = styled(ButtonBase)`
  flex-grow: 1;
  &.isActive, :hover {
    background-color: ${props => props.theme.colors.color10};
    color:  ${props => props.theme.colors.color1};
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
      onChange: ()=>null,
      value: null,
    }
  };

  render() {
    const {
      input: {onChange, value},
      options,
      label,
    } = this.props;
    return (
      <Flex flexDirection={'column'}>
        {
          label && <Label>{label}</Label>
        }
        <Flex justifyContent={'space-between'}>
          {
            options && options.map((item, index) => (<ButtonBaseStyled
              key={`ButtonBaseStyled-${index}`}
              onClick={()=>onChange(item.value)}
              className={value === item.value ? 'isActive' : null}
              variant={'transparent'}
              size={'small'}
            >
              {item.label}
            </ButtonBaseStyled>))
          }
        </Flex>
      </Flex>
    );
  }
}

export default ButtonTriggerGroup;
