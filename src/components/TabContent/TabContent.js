import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The content of the TabContent
 * @example ./TabContent.example.md
 */

export class TabContent extends Component {
  static propTypes = {
    /** Current active tab index */
    activeTab: PropTypes.number,
    /** Array children element */
    children: PropTypes.any,
    /** toggle function */
    toggleTab: PropTypes.func,
  };

  static defaultProps = {};

  /**
   * @returns
   * @memberof Tabs
   */
  render() {
    const { children, activeTab, toggleTab, ClickContentCloseTab } = this.props;
    if (!children) {
      return null;
    }
    if (activeTab >= 0 && activeTab !== null) {
      if (Array.isArray(children)) {
        return (
          <div
            onClick={() => {
              if (ClickContentCloseTab) {
                toggleTab(activeTab);
              }
            }}>
            {children[activeTab]}
          </div>
        );
      }
      return (
        <div
          onClick={() => {
            if (ClickContentCloseTab) {
              toggleTab(activeTab);
            }
          }}>
          {children}
        </div>
      );
    }
    return null;
  }
}

export default TabContent;
