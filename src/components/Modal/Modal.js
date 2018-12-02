import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BackDropDefault = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:100;
  background-color: rgba(0,0,0,0.5);
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index:101;
`;




export class Modal extends Component {

  static propTypes = {
    /** компонент для фона */
    BackDrop: PropTypes.element,
    /** состояние окна*/
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.bool,
  };

  static defaultProps = {
    BackDrop: BackDropDefault,
    isOpen: false,
    toggleModal: null,
  };


  constructor(props) {
    super(props);
    this.state = this.initialState;
    if (isBrowser) {
      this.root = document.createElement('div');
      document.body.appendChild(this.root);
    }
  }

  get initialState() {
    return {
      isOpen: this.props.isOpen,
    }
  }


  componentWillUnmount() {
    if (!isBrowser) {
      return null;
    }
    document.body.removeChild(this.root)
  }


  render() {
    const {
      BackDrop,
      children,
      toggleModal,
    } = this.props;
    if (!isBrowser) {
      return null;
    }

    return ReactDOM.createPortal(
      <BackDrop onClick={toggleModal}>
        <ContentWrapper onClick={(event) => event.stopPropagation()}>
          {children}
        </ContentWrapper>
      </BackDrop>, this.root)
  }
}

export default Modal;
