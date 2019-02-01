import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {ButtonWithImageError} from "../../components/ButtonWithImageError/ButtonWithImageError";
import {Text} from "@lib/ui/Text/Text";
import {SvgArrowRight} from "@lib/ui/Icons/SvgArrowRight";
import {Wrapper} from '../../components/Wrapper/Wrapper';
import styled, {keyframes} from 'styled-components';


const bounceAnimation = keyframes`
    0% {
      animation-timing-function: cubic-bezier(0.215,0.61,0.355,1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-50%,3000px,0);
    }
    60% {
      animation-timing-function: cubic-bezier(0.215,0.61,0.355,1);
      opacity: 1;
      transform: translate3d(-50%,-20px,0);
    } 
    75% {
      animation-timing-function: cubic-bezier(0.215,0.61,0.355,1);
      transform: translate3d(-50%,10px,0);
    }   
    90% {
      animation-timing-function: cubic-bezier(0.215,0.61,0.355,1);
      transform: translate3d(-50%,-5px,0);
    }
    100% {
      animation-timing-function: cubic-bezier(0.215,0.61,0.355,1);
      transform: translate3d(-50%,0,0);
    }
    `;

const BouncyDiv = styled.div`
  transform: translate3d(-50%,-5px,0);
  position: fixed;
  bottom: 50px;
  left: 50%;
  animation: 1s ${bounceAnimation};
`;


export class PopUp extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      active: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        active: true,
      })
    }, 1000)
  }

  render() {
    const {active} = this.state;
    if (!active) {
      return null;
    }
    return (<BouncyDiv>
      <Wrapper maxWidth={'360px'}>
        <Link to="/help">
          <ButtonWithImageError
            type="submit"
            variant="primary"
            size="small"
            iconRight={
              <Text ml={3} fontSize={12} lineHeight={0}>
                <SvgArrowRight/>
              </Text>
            }>
            How does this work?
          </ButtonWithImageError>
        </Link>
      </Wrapper>
    </BouncyDiv>)
  }
}
