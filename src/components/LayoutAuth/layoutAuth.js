import React, { Component, Fragment } from 'react';
import { matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from "../Header";

export class LayoutAuth extends Component {
  static propTypes = {};

  renderRoutes = (routes, pathname) => {
    try {
      let result = matchRoutes(routes, pathname).reverse();
      let Component = result[0].route.component;
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
    return (
      <Fragment>
        <Header/>
        {this.renderRoutes(routes, location.pathname)}
      </Fragment>
    );
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
