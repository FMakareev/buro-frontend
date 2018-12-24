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

import { NotificationsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import NotificationListQuery from './NotificationListQuery.graphql';

import { fullNotifList } from '../../../../apollo/graphql/query/staticData';

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

test('NotificationsPage: загрузка пользовательских данных', () => {
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
            <NotificationsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});

test('NotificationsPage: ошибка во время загрузки пользовательских данных', async () => {
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
    error: new Error(
      JSON.stringify({
        error: [
          {
            message: 'Error!',
          },
        ],
      }),
    ),
  };
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[dogMock]} addTypename>
            <NotificationsPage />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(0); // небольшая задержка

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NotificationsPage: загруженный список нотификаций', async () => {
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
        bankid: initialValue.user.id,
      },
    },
    result: {
      data: {
        notificationlist: fullNotifList,
      },
    },
  };
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[dogMock]} addTypename={false}>
            <NotificationsPage />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(5); // небольшая задержка

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
