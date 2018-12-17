import { LAYOUT_AUTH } from '@lib/shared/layout';

export const routes = [
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'Term of use',
    path: '/terms',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'terms'  */ './view/terms'),
    resolvers: [],
  },
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'Privacy Policy',
    path: '/policy',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'policy'  */ './view/policy'),
    resolvers: [],
  },
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'F.A.Q.',
    path: '/help',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'help'  */ './view/help'),
    resolvers: [],
  },

];
