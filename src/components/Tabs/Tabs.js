import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabsStyled = styled.div`
  border: 0;
  width: 100%;
  display: flex;

  flex-wrap: wrap;

  @media (min-width: 576px) {
    flex-wrap: nowrap;
  }
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
  @media (min-width: 992px) {
    flex-wrap: nowrap;
  }
  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
`;

/**
 * Component Tabs
 * @example ./Tabs.example.md
 */

export class Tabs extends Component {
  static propTypes = {
    /** toggleTab function */
    toggleTab: PropTypes.func,
    /** index tab */
    activeTab: PropTypes.number,
    /**  children React element  */
    children: PropTypes.any,
    /**  реакт элемент обертка для табов  */
    Wrapper: PropTypes.any,
    /** CSS : border-bottom */
    borderBottom: PropTypes.number,
    /** CSS : border-color */
    borderColor: PropTypes.string,
    /** CSS : flex-wrap */
    flexWrap: PropTypes.string,
  };

  static defaultProps = {};

  /**
   * @returns
   * @memberof Tabs
   */
  render() {
    const { children, activeTab, toggleTab, Wrapper = TabsStyled } = this.props;
    if (!children) {
      return null;
    }
    const childrenWithProps = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        onClick: event => {
          event.stopPropagation();
          toggleTab(index);
        },
        active: activeTab !== index,
      }),
    );

    return <Wrapper>{childrenWithProps}</Wrapper>;
  }
}

export default Tabs;
