import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import configureStore from 'redux-mock-store';
import mocksClient from '../../apollo/mocksClient';

import { HeaderNotification } from './HeaderNotification';
import { Header } from '../Header/Header';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { ROLE_BANK } from '../../shared/roles';

import NotificationListQuery from './NotificationListQuery.graphql';

import { fullNotifList } from '../../apollo/graphql/query/staticData';

const mockStore = configureStore();

test('HeaderNotification: пользователь не авторизован', async () => {
  const store = mockStore({});

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <HeaderNotification />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );

  await wait(0);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HeaderNotification: Загрузка', async () => {
  const store = mockStore({
    user: {
      error: false,
      initLoading: true,
      updateLoading: false,
      role: null,
      id: null,
    },
  });

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <HeaderNotification />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );

  await wait(3);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HeaderNotification: ошибка', async () => {
  const store = mockStore({
    user: {
      error: true,
      initLoading: false,
      updateLoading: false,
      role: null,
      id: null,
    },
  });

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <HeaderNotification />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );

  await wait(3);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HeaderNotification: загрузилось нотификации есть', async () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: ROLE_BANK,
      id: 'full08bd-ac3c-4a97-bfd6-5bd8b042b336',
    },
  });

  const dogMock = {
    request: {
      query: NotificationListQuery,
      variables: {
        bankid: 'full08bd-ac3c-4a97-bfd6-5bd8b042b336',
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
            <HeaderNotification />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );

  await wait(5);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('HeaderNotification: загрузилось нотификаций нет', async () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: ROLE_BANK,
      id: 'full08bd-ac3c-4a97-bfd6-5bd8b042b336',
    },
  });

  const dogMock = {
    request: {
      query: NotificationListQuery,
      variables: {
        bankid: 'full08bd-ac3c-4a97-bfd6-5bd8b042b336',
      },
    },
    result: {
      data: {
        notificationlist: [],
      },
    },
  };

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[dogMock]} addTypename={false}>
            <HeaderNotification />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );

  await wait(5);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
