import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import mocksClient from '../../../../apollo/mocksClient';

import { UpdateNotificationButtons } from './UpdateNotificationButtons';
import UpdateNotificationMutation from './UpdateNotificationMutation.graphql';

import { STATUS_NOT_APPROVAL, STATUS_APPROVAL } from '../../../../shared/statuses';

test('UpdateNotificationButtons: обычное состояние', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <UpdateNotificationButtons />
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  expect(output).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса подтверждения', async () => {
  const props = {
    id: '5c110dda9add292473c000c6',
    status: STATUS_APPROVAL,
  };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          updatenotification: {
            notification: {
              status: STATUS_APPROVAL,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[0].props.onClick();

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса запрета', async () => {
  const props = {
    id: '5c110dda9adb492473c000c6',
    status: STATUS_NOT_APPROVAL,
  };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          updatenotification: {
            notification: {
              status: STATUS_NOT_APPROVAL,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[1].props.onClick();

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса подтверждения завершен', async () => {
  const props = { id: '5c110dda9adb492473c414c6', status: STATUS_APPROVAL };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          updatenotification: {
            notification: {
              status: STATUS_APPROVAL,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[0].props.onClick();
  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса запрета завершен', async () => {
  const props = { id: '5c110dda9adb492473c500c6', status: STATUS_NOT_APPROVAL };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          updatenotification: {
            notification: {
              status: STATUS_NOT_APPROVAL,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[1].props.onClick();

  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса подтверждения с ошибкой', async () => {
  const props = { id: '5c110dda9adb492473c414c6', status: STATUS_APPROVAL };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      error: new Error('Connection Error!'),
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[0].props.onClick();
  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса запрета с ошибкой', async () => {
  const props = { id: '5c110dda9adb492473c500c6', status: STATUS_NOT_APPROVAL };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      error: new Error('Connection Error!'),
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButtons {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[1].props.onClick();

  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
