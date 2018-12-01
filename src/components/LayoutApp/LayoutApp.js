import React, {Component, Fragment} from 'react';
import { matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import HeaderNav from "../HeaderNav/HeaderNav";
import {HeaderNotification} from "../HeaderNotification/HeaderNotification";
import {Box} from "../Box/Box";

export class LayoutApp extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return { name: '' };
  }

  updateName(name) {
    this.setState({ name });
  }

  renderRoutes = (routes, pathname) => {
    try {
      const result = matchRoutes(routes, pathname).reverse();
      const Component = result[0].route.component;
      const { location } = this.props;

      if (this.state.name !== result[0].route.name) {
        this.updateName(result[0].route.name);
      }

      return <Component location={location} route={result[0].route} match={result[0].match} />;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  render() {
    const {
      route: { routes },
      location,
    } = this.props;
    return (
      <Fragment>
        <Header {...this.state} {...this.props} >
          <Box px={2}>
            <HeaderNav/>
          </Box>
          <Box px={2}>
            <HeaderNotification/>
          </Box>
        </Header>
        {this.renderRoutes(routes, location.pathname)}
      </Fragment>
    );
  }
}

LayoutApp.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }),
};
LayoutApp.defaultProps = {
  route: null,
};

export default LayoutApp;
