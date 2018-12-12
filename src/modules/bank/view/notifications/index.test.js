import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import faker from 'faker';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import configureStore from 'redux-mock-store';
import mocksClient from '../../../../apollo/mocksClient';

import { NotificationsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ROLE_BANK } from '../../../../shared/roles';
import NotificationListQuery from './NotificationListQuery.graphql';

const mockStore = configureStore();

test('NotificationsPage: пользователь не авторизован', () => {
  const store = mockStore({});

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <NotificationsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output.root.findByType(Redirect).props.to).toBe('/logout');
});
