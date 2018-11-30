import { LAYOUT_APP } from '../../shared/layout';
import {RequestsPage} from "./view/requestsClient";

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Requests: client',
    path: '/requests/client',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'requestsRequestsClient'  */ './view/requestsClient'),
    resolvers: [],
  },

  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Requests: bank',
    path: '/requests/bank',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'requestsRequestsBank'  */ './view/requestsBank'),
    resolvers: [],
  },

];
