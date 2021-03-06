import React from 'react';
import { asyncComponent } from 'react-async-component';
import * as modules from '../modules/index';
import LayoutBase from '../components/LayoutBase/LayoutBase';
import LayoutApp from '../components/LayoutApp/LayoutApp';
import LayoutAuth  from '../components/LayoutAuth/layoutAuth';

import ErrorCatch from '../components/ErrorCatch/ErrorCatch';
import { CreateStore } from '../store';
import { GetPageTitle } from '../components/GetPageTitle/GetPageTitle';
import { LAYOUT_APP, LAYOUT_AUTH } from '../shared/layout';
import {SpeedingWheel} from "../components/SmallPreloader/SmallPreloader";
import {Text} from "../components/Text/Text";
import {PreloaderWrapper} from "../components/PreloaderWrapper/PreloaderWrapper";

const has = Object.prototype.hasOwnProperty;

/**
 * @param {array} modulesRoutes - array routes
 * @param {array} newRoutes - empty array
 * @param {string} moduleName - name current module
 * @description - recursive generator of an array of application routing objects
 * */
const createRoutes = (modulesRoutes, newRoutes, moduleName) => {
  const Store = CreateStore();
  const routes = newRoutes;

  if (!modulesRoutes) return null;

  for (let i = 0; i < modulesRoutes.length; i += 1) {
    if (has.call(modulesRoutes[i], 'load')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }

      routes.push({
        moduleName: moduleName,
        exact: modulesRoutes[i].exact,
        layout: modulesRoutes[i].layout,
        order: modulesRoutes[i].order,
        name: modulesRoutes[i].name || modulesRoutes[i].title,
        // path: `/${moduleName}${modulesRoutes[i].path}`,
        path: modulesRoutes[i].path,
        component: GetPageTitle({ Store })(
          asyncComponent({
            resolve: modulesRoutes[i].load,
            LoadingComponent: () => (<PreloaderWrapper>
              <Text fontSize={12}>
                <SpeedingWheel/>
              </Text>
            </PreloaderWrapper>),
            ErrorComponent: (error) => {
              console.error('ErrorComponent: ',error);
              return <ErrorCatch>{error.message}</ErrorCatch>
            },
          }),
        ),
        resolvers: modulesRoutes[i].resolvers || [],
        exactResolvers:
          modulesRoutes[i].exactResolvers !== undefined ? modulesRoutes[i].exactResolvers : true,
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
      });
    } else if (has.call(modulesRoutes[i], 'component')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }
      routes.push({
        moduleName: moduleName,
        exact: modulesRoutes[i].exact,
        layout: modulesRoutes[i].layout,
        order: modulesRoutes[i].order,
        name: modulesRoutes[i].name || modulesRoutes[i].title,
        path: modulesRoutes[i].path,
        component: modulesRoutes[i].component,
        resolvers: modulesRoutes[i].resolvers || [],
        exactResolvers:
          modulesRoutes[i].exactResolvers !== undefined ? modulesRoutes[i].exactResolvers : true,
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
      });
    } else if (has.call(modulesRoutes[i], 'routes')) {
      routes.push({
        moduleName: moduleName,
        layout: modulesRoutes[i].layout,
        exact: modulesRoutes[i].exact,
        name: modulesRoutes[i].name || modulesRoutes[i].title,
        path: modulesRoutes[i].path,
        routes: [...createRoutes(modulesRoutes[i].routes, [], moduleName)],
        resolvers: modulesRoutes[i].resolvers || [],
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
      });
    } else {
      console.error(
        `Error: in the module ${moduleName} there is no component at
            the address ${
              modulesRoutes[i].path
            }. Make sure that you added the "load: () => import('...')"
            property with the component import or React component. `,
      );
    }
  }
  return routes;
};

let routes = [];

Object.entries(modules).map(([moduleName, value]) => {
  if (has.call(value, 'routes')) {
    routes = [...routes, ...createRoutes(value.routes, [], moduleName)];
    return null;
  }
  console.error(
    `ERROR:in the module "${moduleName}" there is no property "routes".
        Add the property "routes" to the module "${moduleName}" and determine at least
        one route otherwise the module will be inaccessible to users.`,
  );
  return null;
});

const Page404 = {
  path: '*',
  hidden: true,
  name: 'Page not found',
  component: asyncComponent({
    resolve: () => import('./errors/404'),
    LoadingComponent: () => <PreloaderWrapper>
      <Text fontSize={12}>
        <SpeedingWheel/>
      </Text>
    </PreloaderWrapper>,
    ErrorComponent: ({ error }) => <ErrorCatch>{error.message}</ErrorCatch>,
  }),
};

const layoutSorting = routes => {
  let newRoutes = [
    {
      layout: LAYOUT_AUTH,
      path: '/',
      component: LayoutAuth,
      routes: [],
    },
    {
      layout: LAYOUT_APP,
      path: '/app',
      component: LayoutApp,
      routes: [],
    },
  ];
  routes.forEach(item => {
    switch (item.layout) {
      case LAYOUT_AUTH: {
        newRoutes[0].routes.push(item);
        return item;
      }
      case LAYOUT_APP: {
        newRoutes[1].routes.push({ ...item, path: `${newRoutes[1].path}${item.path}` });
        return item;
      }
      default: {
        console.error(`Warning: для маршрута ${item.path} не задан layout либо задан неверно.`);
        break;
      }
    }
  });
  newRoutes = newRoutes.map(item => {
    item.routes.push(Page404);
    return item;
  });
  return newRoutes;
};

export const ConfigRouter = [
  {
    component: LayoutBase,
    exact: true,
    // path: '/',
    routes: layoutSorting(routes),
  },
];

export default ConfigRouter;
