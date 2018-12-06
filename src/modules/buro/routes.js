import { LAYOUT_APP } from '../../shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Clients',
    path: '/buro/clients',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'clientsBureau'  */ './view/clients'),
    resolvers: [],
  },
];
