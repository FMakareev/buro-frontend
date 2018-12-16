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
      request: {
        CreateNotificationMutation,
        variables: {
          bankid: faker.random.uuid(),
          // clientid: faker.random.uuid(),
        },
      },
      result: {
        data: [{ status: 'requested' }],
      },
    },
  ];

  const props = { id: faker.random.uuid() };

  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <MockedProvider mocks={mocks}>
          <ApolloProvider client={mocksClient}>
            <CreateNotificationButton {...props}>Request</CreateNotificationButton>
          </ApolloProvider>
        </MockedProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(1);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CreateNotificationButton: запрос завершен ошибкой', async () => {
  const mocks = [
    {
      request: {
        CreateNotificationMutation,
        variables: {
          bankid: faker.random.uuid(),
          // clientid: faker.random.uuid(),
        },
      },
      error: new Error('Network Error!'),
      result: {
        errors: [{ message: 'GraphQLError!' }],
      },
    },
  ];

  const props = { id: faker.random.uuid() };

  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename>
          <ApolloProvider client={mocksClient}>
            <CreateNotificationButton {...props}>Request</CreateNotificationButton>
          </ApolloProvider>
        </MockedProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(1);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
