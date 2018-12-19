import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import faker from 'faker';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import configureStore from 'redux-mock-store';
import mocksClient from '../../apollo/mocksClient';

import { HeaderNotification } from './HeaderNotification';
import { Header } from '../Header/Header';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { ROLE_BANK } from '../../shared/roles';

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

test('HeaderNotification: загрузилось', async () => {
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
