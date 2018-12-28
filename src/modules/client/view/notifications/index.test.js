import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import faker from 'faker';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ROLE_BANK } from '@lib/shared/roles';
import mocksClient from '../../../../apollo/mocksClient';

import { ClientsNotificationsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import NotificationListQuery from './NotificationListQuery.graphql';

const mockStore = configureStore();

test('ClientsNotificationsPage: пользователь не авторизован', () => {
  const store = mockStore({});

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <ClientsNotificationsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output.root.findByType(Redirect).props.to).toBe('/logout');
});

test('ClientsNotificationsPage: загрузка пользовательских данных', () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: ROLE_BANK,
      id: faker.random.uuid(),
    },
  });

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <ClientsNotificationsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});

test('ClientsNotificationsPage: ошибка во время загрузки пользовательских данных', async () => {
  const initialValue = {
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: ROLE_BANK,
      id: faker.random.uuid(),
    },
  };
  const store = mockStore(initialValue);
  const dogMock = {
    request: {
      query: NotificationListQuery,
      variables: {
        id: initialValue.user.id,
      },
    },
    result: {
      errors: [{ message: 'Error!' }],
    },
  };
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[dogMock]} addTypename>
            <ClientsNotificationsPage />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(0); // небольшая задержка

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ClientsNotificationsPage: загруженный список нотификаций', async () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: ROLE_BANK,
      id: faker.random.uuid(),
    },
  });

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <ClientsNotificationsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(5); // небольшая задержка

  expect(output).toMatchSnapshot();
});
