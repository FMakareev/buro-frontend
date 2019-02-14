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
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ClientsPage } from './index';
import mocksClient from '../../../../apollo/mocksClient';
// import UserListQuery from './UserListQuery.graphql';
import UserDocumentListQuery from './UserDocumentListQuery.graphql';

import { staticUserDocumentList } from '../../../../apollo/graphql/query/staticData';

const mockStore = configureStore();

test('ClientsPage: пользователь не авторизован', () => {
  const store = mockStore({});

  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <ClientsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output.root.findByType(Redirect).props.to).toBe('/logout');
});

test('ClientsPage: загрузка пользовательских данных', () => {
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
            <ClientsPage />
          </ApolloProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});

test('ClientsPage: ошибка во время загрузки пользовательских данных', async () => {
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
      query: UserDocumentListQuery,
      variables: {
        excludeowner: initialValue.user.id,
        excludeownerrole: initialValue.user.role,
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
          <MockedProvider mocks={[dogMock]} addTypename={false}>
            <ClientsPage />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(0); // небольшая задержка

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ClientsPage: загруженный список клиентов', async () => {
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
      query: UserDocumentListQuery,
      variables: {
        excludeowner: initialValue.user.id,
        excludeownerrole: initialValue.user.role,
      },
    },
    result: {
      data: {
        userdocumentlist: staticUserDocumentList,
      },
    },
  };
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[dogMock]} addTypename={false}>
            <ClientsPage />
          </MockedProvider>
        </MemoryRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  await wait(5); // небольшая задержка

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
