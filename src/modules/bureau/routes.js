import { LAYOUT_APP } from '@lib/shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Clients',
    path: '/bureau/clients',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'clientsBureau'  */ './view/clients'),
    resolvers: [],
  },
];
