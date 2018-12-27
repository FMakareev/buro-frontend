import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import { MemoryRouter } from 'react-router-dom';
import mocksClient from '../../../../apollo/mocksClient';

import { CreateNotificationButton } from './CreateNotificationButton';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

import CreateNotificationMutation from './CreateNotificationMutation.graphql';

const props = {
  client: '7865f87e-9ed8-4bad-aa51-771a0b2ed197',
  bank: 'ee850dd9-db5a-4d67-a22f-2a516e7d44e7',
  status: 'wait',
};

test('CreateNotificationButton: обычное состояние', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <CreateNotificationButton {...props}>Request</CreateNotificationButton>
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
          <CreateNotificationButton {...props}>Request</CreateNotificationButton>
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  output.find('button').simulate('click');

  expect(output.find('button').props().disabled).toBe(true);
});

test('CreateNotificationButton: запрос завершен', async () => {
  const mocks = [
    {
      request: {
        query: CreateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          createnotification: {
            notification: {
              status: 'wait',
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateNotificationButton {...props}>Request</CreateNotificationButton>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CreateNotificationButton: запрос завершен ошибкой сети', async () => {
  const mocks = [
    {
      request: {
        query: CreateNotificationMutation,
        variables: props,
      },
      error: new Error('Connection Error!'),
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateNotificationButton {...props}>Request</CreateNotificationButton>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(5);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
  // expect(output.root.findByProps({ children: 'Request' }).props.variant).toBe('error');
});

test('CreateNotificationButton: запрос завершен ошибкой GraphQL', async () => {
  const mocks = [
    {
      request: {
        query: CreateNotificationMutation,
        variables: props,
      },
      result: {
        error: [{ message: 'GraphQLError!' }],
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateNotificationButton {...props}>Request</CreateNotificationButton>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
