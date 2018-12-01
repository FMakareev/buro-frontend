import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  ${({ backdrop, isActive }) =>
    backdrop && isActive !== null
      ? 'display:block;'
      : 'display:none;'} background-color: transparent;
`;

/**
 * The component tab controller
 * @example ./TabController.example.md
 */
class TabController extends Component {
  static propTypes = {
    /** The tab is active by default */
    defaultActiveTab: PropTypes.number,
    /**  children React element  */
    children: PropTypes.any,
    /** type */
    type: PropTypes.string,
    /** to === Link page */
    to: PropTypes.string,
    /** CSS: px - paddnig left and right */
    px: PropTypes.any,
    /** CSS: py - paddnig tp and bottom */
    py: PropTypes.any,
    /** Скрывать при повторном клике */
    hideWhenReClicking: PropTypes.bool,
    /** Скрывать при повторном клике */
    backdrop: PropTypes.bool,
    /** Скрывать при клике в область контента открытой табы (полезно при использовании компонена в качестве drop down menu) */
    ClickContentCloseTab: PropTypes.bool,
  };

  static defaultProps = {
    defaultActiveTab: 0,
    hideWhenReClicking: false,
    backdrop: false,
    ClickContentCloseTab: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.toggleTab = this.toggleTab.bind(this);
  }

  get initialState() {
    return {
      activeTab: this.props.defaultActiveTab,
    };
  }

  /**
   * @desc change tab by index
   * @param {number} index
   * @memberof Controller
   */
  toggleTab(index) {
    this.setState(prevState => {
      if (prevState.activeTab !== index) {
        return {
          activeTab: index,
        };
      } else if (this.props.hideWhenReClicking && prevState.activeTab === index) {
        /**
         * @desc need for correct work
         */
        return {
          activeTab: null,
        };
      }
      /**
       * @desc need for correct work
       */
      return prevState.activeTab;
    });
  }

  render() {
    const { children, backdrop, ClickContentCloseTab } = this.props;
    const { activeTab } = this.state;

    if (!children) {
      return null;
    }
    const childrenWithProps = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        activeTab,
        toggleTab: this.toggleTab,
        ClickContentCloseTab,
      }),
    );

    return (
      <Fragment>
        <Backdrop backdrop={backdrop} isActive={activeTab} onClick={() => this.toggleTab(null)} />
        {childrenWithProps}
      </Fragment>
    );
  }
}

export default TabController;
