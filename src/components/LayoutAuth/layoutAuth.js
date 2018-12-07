import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import PropTypes from 'prop-types';

export class LayoutAuth extends Component {
  static propTypes = {};


  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    const {
      route: {routes},
      location,
    } = this.props;
    try {
      return this.renderRoutes(routes, location.pathname)
    } catch (e) {

      return {
        Component: null,
        route: null,
        match: null,
        location: null,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const {location} = this.props;
    if (nextProps.location.pathname !== location.pathname) {
      const {
        route: {routes},
        location,
      } = nextProps;
      this.setState(()=>({...this.renderRoutes(routes, location.pathname)}))
    }
  }

  renderRoutes = (routes, pathname) => {
    try {
      const result = matchRoutes(routes, pathname).reverse();
      const Component = result[0].route.component;

      return {
        Component: Component,
        route: result[0].route,
        location: this.props.location,
        match: result[0].match,
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {Component, ...rest} = this.state;

    return Component && <Component {...rest}/>
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
