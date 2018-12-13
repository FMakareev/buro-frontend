import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import PropTypes from 'prop-types';
import {getUserFromStore} from "../../store/reducers/user/selectors";
import {connect} from "react-redux";


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

  componentDidMount() {
    try {
      const {location, user, history} = this.props;
      /** редиректим пользователя в профиль если он авторизован и текущий маршрут не выход */
      // TODO: эту порнографию переделать
      if (
        location.pathname !== '/logout' &&
        location.pathname !== '/help' &&
        location.pathname !== '/policy' &&
        location.pathname !== '/terms' &&
        user.isAuth
      ) {
        history.push('/app/profile');
      }
    } catch (error) {
      console.error(error);
    }
  }


  componentWillReceiveProps(nextProps) {
    try {
      const {location} = this.props;
      if (nextProps.location.pathname !== location.pathname) {
        const {
          route: {routes},
          location,
        } = nextProps;
        this.setState(() => ({...this.renderRoutes(routes, location.pathname)}))
      }
    } catch (e) {
      console.error(e);
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

LayoutAuth = connect(state => ({
  user: getUserFromStore(state),
}))(LayoutAuth);

export default LayoutAuth;
