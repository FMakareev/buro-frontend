/* global ENDPOINT_SERVER */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { GRAPHQL } from '@lib/shared/endpoints';

export const client = req =>
  new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: `${ENDPOINT_SERVER}${GRAPHQL}`,
      credentials: 'same-origin',
      fetch,
      headers: {
        Cookie: req.header('Cookie'),
      },
    }),
    queryDeduplication: true,
    connectToDevTools: true,
    cache: new InMemoryCache(),
  });

export default client;
