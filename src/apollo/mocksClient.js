import faker from 'faker';
import setupClient from './helpers/apolloClientMock';
import schema from './schema.graphqls';
import { userDocumentList } from './graphql/query/userDocumentList';
import { userList } from './graphql/query/userList';
import { userItem } from './graphql/query/userItem';
import { notificationList } from './graphql/query/notificationList';
import { ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT } from '../shared/roles';

const defaultMocks = {
  Query: () => ({
    userList,
    userItem,
    userEmailItem: (query, { email }) => {
      console.log(query, email);
      switch (email) {
        case 'client@test.com': {
          return {
            ...userItem(),
            email: 'client@test.com',
            role: ROLE_CLIENT,
          };
        }
        case 'bank@test.com': {
          return {
            ...userItem(),
            email: 'bank@test.com',
            role: ROLE_BANK,
          };
        }
        case 'bureau@test.com': {
          return {
            ...userItem(),
            email: 'bureau@test.com',
            role: ROLE_BUREAU,
          };
        }
        default: {
          throw Error(
            JSON.stringify({
              userEmailItem: null,
              errors: [
                {
                  message: 'GraphQL error: user not found',
                },
              ],
            }),
          );
        }
      }
    },
    userDocumentList,
    notificationList,
  }),
  Mutation: () => ({
    /**
     * @params {func} mutation - этот же запрос
     * @params {object} props - аргументы которые были переданы
     * */
    createUser: (mutation, props) => props,
    updateUser: (mutation, props) => props,
    userResetPassword: (mutation, props) => props,
    createNotification: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve(JSON.stringify({ data: { createNotification: props } }))
            : reject(
                JSON.stringify({
                  errors: [
                    {
                      message: 'error!',
                    },
                  ],
                }),
              );
        }, faker.random.number(2000));
      }),
    updateNotification: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve(JSON.stringify({ data: { updateNotification: props } }))
            : reject(
                JSON.stringify({
                  errors: [
                    {
                      message: 'error!',
                    },
                  ],
                }),
              );
        }, faker.random.number(2000));
      }),
    userPasswordRecovery: (mutation, props) =>
      // throw Error(JSON.stringify({
      //   userPasswordRecovery: null,
      //   errors: [
      //     {
      //       message:'Error!'
      //     }
      //   ]
      // }))
      props,
  }),
};

export const mocksClient = setupClient(defaultMocks, schema)();

export default mocksClient;
