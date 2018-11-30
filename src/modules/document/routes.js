import { LAYOUT_APP } from '../../shared/layout';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Documents',
    path: '/documents',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'documentsDocuments'  */ './view/documents'),
    resolvers: [],
  },

];
