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
  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <CreateNotificationButton {...props}>Request</CreateNotificationButton>
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );
  const button = output.root.findByProps({ testID: 'CreateNotificationButton' });
  button.props.onClick();

  expect(button.props.variant).toBe('transparent');
  expect(button.props.disabled).toBe(true);
  expect(button.props.iconRight).not.toBe(null);
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

test('CreateNotificationButton: запрос завершен с ошибкой сети', async () => {
  const mocks = [
    {
      request: {
        query: CreateNotificationMutation,
        variables: props,
      },
      result: {
        errors: [{ message: "Error!" }],
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateNotificationButton {...props}>
          Request
        </CreateNotificationButton>
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const button = output.root.findByProps({ testID: 'CreateNotificationButton' });
  button.props.onClick();

  await wait(5);

  expect(button.props.variant).toBe('error');
  expect(button.props.disabled).toBe(false);
  expect(button.props.iconRight).toBe(null);
});
