import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {LAYOUT_ADMIN, LAYOUT_APP} from '../../shared/layout';
import {Footer} from "../Footer/Footer";
import styled from 'styled-components';
import {Box} from "../Box/Box";
import {getUserFromStore} from "../../store/reducers/user/selectors";
import {PreloaderWrapper} from "../PreloaderWrapper/PreloaderWrapper";
import {SpeedingWheel} from "../SmallPreloader/SmallPreloader";
import {Text} from "../Text/Text";

const MainStyled = styled(Box)`
  width: 100%;
  min-height: 100vh;
  
  &:after {
    content: '';
    display: block;
    height: 36px;
  }
`;

@connect((state) => ({
  user: getUserFromStore(state),
}))
export class LayoutBase extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      Layout: null,
      routes: null,
      loading: true,
      indexRoute: null,
    };
  }

  componentDidMount() {
    const {
      route: {routes},
      location,
    } = this.props;
    this.updateLayout(location, routes);
  }

  componentWillReceiveProps(nextProps) {
    const pathname = {...this.state};

    if (nextProps.location.pathname !== pathname) {
      const {
        route: {routes},
        location,
      } = nextProps;
      this.updateLayout(location, routes);
    }
  }

  findLayoutInPathname = pathname => {
    if (pathname.indexOf(`${LAYOUT_APP}`) === 1) {
      return 1;
    } else if (pathname.indexOf(`${LAYOUT_ADMIN}`) === 1) {
      return 2;
    } else {
      return 0;
    }
  };

  updateLayout = (location, routes) => {
    const indexRoute = this.findLayoutInPathname(location.pathname);

    this.setState(
      () => ({
        indexRoute,
        pathname: location.pathname,
        Layout: routes[indexRoute] ? routes[indexRoute].component : null,
        routes: routes[indexRoute],
        loading: false,
      }),
      () => console.log(`Run: layout - (${indexRoute}), path - ${location.pathname} `),
    );
  };

  render() {
    const {Layout, routes} = this.state;
    const {user} = this.props;
    return <Fragment>
      <MainStyled>
        {
          user && user.initLoading &&
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel/>
            </Text>
          </PreloaderWrapper>
        }
        {
          (user &&
            !user.initLoading) &&
          Layout &&
          <Layout {...this.props} route={routes}/>
        }
      </MainStyled>
      <Footer/>
    </Fragment>;
  }
}

export default LayoutBase;
