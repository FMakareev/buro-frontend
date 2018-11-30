import { LAYOUT_APP } from '../../shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Clients',
    path: '/clients',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'clientClientsPage'  */ './view/clients'),
    resolvers: [],
  },

];
