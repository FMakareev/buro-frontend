import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import mocksClient from '../../../../apollo/mocksClient';

import { UpdateNotificationButton } from './UpdateNotificationButton';
import UpdateNotificationMutation from './UpdateNotificationMutation.graphql';

test('UpdateNotificationButtons: обычное состояние', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <UpdateNotificationButton
            {...{
              id: '5c110dda9add292473c000c6',
              readed: false,
            }}
          />
        </ApolloProvider>
      </MemoryRouter>
    </StyledThemeProvider>,
  );

  expect(output).toMatchSnapshot();
});

test('UpdateNotificationButton: вызов запроса подтверждения', async () => {
  const props = {
    id: '5c110dda9add292473c000c6',
    readed: true,
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
              readed: true,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButton {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );
  // Базовый класс
  const Wrapper = output.root.findByType(UpdateNotificationButton).instance;

  // Кнопка
  const ButtonApprove = output.root.findByProps({ testID: 'ButtonApprove' });

  // Вызов события
  ButtonApprove.props.onClick();

  // проверяем state и props Класса
  expect(Wrapper.props.id).toBe(props.id);
  expect(Wrapper.state.readed).toBe(true);

  // Проверяем пропсы кнопок
  expect(ButtonApprove.props.disabled).toBe(true);
  expect(ButtonApprove.props.disabled).toBe(true);
  expect(ButtonApprove.props.iconRight).not.toBe(null);
});

test('UpdateNotificationButtons: вызов запроса подтверждения завершен', async () => {
  const props = { id: '5c110dda9adb492473c414c6', readed: true };

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
              readed: true,
            },
          },
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButton {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const buttons = output.root.findAllByType('button');

  buttons[0].props.onClick();
  await wait(6);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});

test('UpdateNotificationButtons: вызов запроса подтверждения с ошибкой', async () => {
  const props = { id: '5c110dda9adb492473c414c6', readed: true };

  const mocks = [
    {
      request: {
        query: UpdateNotificationMutation,
        variables: props,
      },
      result: {
        errors: [{ message: 'Error!' }],
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateNotificationButton {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const ButtonApprove = output.root.findByProps({ testID: 'ButtonApprove' });

  ButtonApprove.props.onClick();
  await wait(6);

  const UpdateNotificationError = output.root.findByProps({ testID: 'UpdateNotificationError' });

  expect(UpdateNotificationError).not.toBe(null);

  const tree = output.toJSON();
  expect(tree).toMatchSnapshot();
});
