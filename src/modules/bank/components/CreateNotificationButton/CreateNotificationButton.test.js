import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import faker from 'faker';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import configureStore from 'redux-mock-store';
import mocksClient from '../../../../apollo/mocksClient';

import { CreateNotificationButton } from './CreateNotificationButton';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

import CreateNotificationMutation from './CreateNotificationMutation.graphql';

test('CreateNotificationButton: обычное состояние', () => {
  // const store = mockStore({});

  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <CreateNotificationButton>Request</CreateNotificationButton>
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  expect(output).toMatchSnapshot();
});

test('CreateNotificationButton: вызов запроса', () => {
  const output = mount(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <CreateNotificationButton>Request</CreateNotificationButton>
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  output.find('button').simulate('click');

  wait(0);
  expect(output.find('button').props().disabled).toBe(true);
});

test('CreateNotificationButton: запрос завершен', async () => {
  const mocks = [
    {
      request: { CreateNotificationMutation },
      result: { data: { hello: 'world' } },
    },
  ];

  const props = { id: faker.random.uuid() };

  const output = mount(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <CreateNotificationButton {...props}>Request</CreateNotificationButton>
          </ApolloProvider>
        </MemoryRouter>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  output.find('button').simulate('click');

  await wait(1);

  expect(output.html()).toMatchSnapshot();
});

test('CreateNotificationButton: запрос завершен ошибкой', async () => {
  const mocks = [
    {
      request: { CreateNotificationMutation },
      error: new Error('Something went wrong'),
    },
  ];

  const props = { id: faker.random.uuid() };

  const output = mount(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <ApolloProvider client={mocksClient}>
            <CreateNotificationButton {...props}>Request</CreateNotificationButton>
          </ApolloProvider>
        </MemoryRouter>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  output.find('button').simulate('click');

  await wait(1);

  expect(output.html()).toMatchSnapshot();
});
