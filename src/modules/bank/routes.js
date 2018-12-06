import { LAYOUT_APP } from '../../shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Clients',
    path: '/bank/clients',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'clientClientsPage'  */ './view/clients'),
    resolvers: [],
  },

  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Notifications: bank',
    path: '/bank/notifications',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'requestsRequestsBank'  */ './view/notifications'),
    resolvers: [],
  },
];
