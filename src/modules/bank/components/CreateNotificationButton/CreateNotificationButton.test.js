import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from 'waait';
import faker from 'faker';
import { MemoryRouter, Redirect } from 'react-router-dom';
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

  expect(output.find('button').props().disabled).toBe(true);
});

test('CreateNotificationButton: запрос завершен', async () => {

  const props = {
    clientid: '7865f87e-9ed8-4bad-aa51-771a0b2ed197',
    bankid: 'ee850dd9-db5a-4d67-a22f-2a516e7d44e7',
  };

  const mocks = [
    {
      request: {
        query: CreateNotificationMutation,
        variables: props,
      },
      result: {
        data: {
          createnotification:{
            notification:{
              status: 'resolve'
            }
          }
        },
      },
    },
  ];

  const output = renderer.create(
    <StyledThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateNotificationButton {...props} />
      </MockedProvider>
    </StyledThemeProvider>,
  );

  const button = output.root.findByType('button');
  button.props.onClick();

  await wait(1);

  const tree = output.toJSON();
  console.log(tree);
  // expect(tree).toMatchSnapshot();
});

// test('CreateNotificationButton: запрос завершен ошибкой', async () => {
//   const mocks = [
//     {
//       request: {
//         CreateNotificationMutation,
//         variables: {
//           bankid: faker.random.uuid(),
//           // clientid: faker.random.uuid(),
//         },
//       },
//       error: new Error('Network Error!'),
//       result: {
//         errors: [{ message: 'GraphQLError!' }],
//       },
//     },
//   ];

//   const props = { id: faker.random.uuid() };

//   const output = renderer.create(
//     <StyledThemeProvider>
//       <MemoryRouter>
//         <MockedProvider mocks={mocks} addTypename>
//           <CreateNotificationButton {...props}>Request</CreateNotificationButton>
//         </MockedProvider>
//       </MemoryRouter>
//     </StyledThemeProvider>,
//   );

//   const button = output.root.findByType('button');
//   button.props.onClick();

//   await wait(1);

//   const tree = output.toJSON();
//   expect(tree).toMatchSnapshot();
// });
