/* global ENDPOINT_CLIENT */
import { ApolloLink, from } from 'apollo-link';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'unfetch';
import {GRAPHQL} from "@lib/shared/endpoints";


const httpLink = createHttpLink({
  uri: `${ENDPOINT_CLIENT}${GRAPHQL}`,
  credentials: 'same-origin',
  fetch
});

const logTimeLink = new ApolloLink((operation, forward, props) => {
  return forward(operation).map((data) => {
    // data from a previous link
    // const time = new Date() - operation.getContext().start;
    // console.log(`Apollo: operation ${operation.operationName} took ${time} to complete`);
    return data;
  })
});



export const client = () => {

  return new ApolloClient({
    cache: new InMemoryCache().restore(isBrowser && window.APOLLO_STATE),
    link: from([logTimeLink,httpLink]),
    ssrForceFetchDelay: 100,
  });
}

export default client;
