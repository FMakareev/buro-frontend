import React from 'react';
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';
import wait from 'waait';
import mocksClient from "../../../../apollo/mocksClient";

import {MemoryRouter, Redirect} from 'react-router-dom';
import {ProfilePage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";
import {Provider as ProviderRedux} from 'react-redux';
import configureStore from 'redux-mock-store'


const mockStore = configureStore();


test('ProfilePage: пользователь не авторизован', () => {

  const store = mockStore({});

  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={store}>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <ProfilePage/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  expect(output.root.findByType(Redirect).props.to).toBe('/logout');
});


test('ProfilePage: загрузка пользовательских данных', () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: [],
      email: 'client@test.com',
    }
  });

  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={store}>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <ProfilePage/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

test('ProfilePage: ошибка во время загрузки пользовательских данных', async () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: [],
      email: 'null',
    }
  });

  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={store}>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <ProfilePage/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);

  await wait(2); // небольшая задержка

  expect(output).toMatchSnapshot();
});

test('ProfilePage: загруженный профиль', async () => {
  const store = mockStore({
    user: {
      error: null,
      initLoading: false,
      updateLoading: false,
      role: [],
      email: 'client@test.com',
    }
  });

  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={store}>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <ProfilePage/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  await wait(2); // небольшая задержка

  expect(output).toMatchSnapshot();
});
