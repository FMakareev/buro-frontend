import React, { Component } from 'react';
import { matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

export class LayoutAuth extends Component {
  static propTypes = {};

  renderRoutes = (routes, pathname) => {
    try {
      const result = matchRoutes(routes, pathname).reverse();
      const Component = result[0].route.component;
      return (
        <Component location={this.props.location} route={result[0].route} match={result[0].match} />
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      route: { routes },
      location,
    } = this.props;
    return this.renderRoutes(routes, location.pathname)
  }
}

LayoutAuth.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }),
};
LayoutAuth.defaultProps = {
  route: null,
};

export default LayoutAuth;
