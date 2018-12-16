import { LAYOUT_APP } from '@lib/shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Notifications: client',
    path: '/client/notifications',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'notificationsClient'  */ './view/notifications'),
    resolvers: [],
  },
];
