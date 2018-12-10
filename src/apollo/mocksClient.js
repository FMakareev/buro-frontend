import faker from 'faker';
import {GraphQLError} from 'graphql';
import setupClient from './helpers/apolloClientMock';
import schema from './schema.graphqls';
import {userDocumentList} from './graphql/query/userDocumentList';
import {userList} from './graphql/query/userList';
import {userItem} from './graphql/query/userItem';
import {notificationList} from './graphql/query/notificationList';
import {ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT} from '../shared/roles';
import {notificationItem} from "./graphql/query/notificationItem";
import {STATUS_PENDING} from "../shared/statuses";

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid.');
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}

const defaultMocks = {
  Query: () => ({
    userList,
    userItem,
    userEmailItem: (query, {email}) => {
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
    userResetPassword: (mutation, props) => {
      if (props.email === 'error@test.com') {
        throw new GraphQLError('user not found');
      } else {
        return props;
      }
    },
    createNotification: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve({...notificationItem(), status: STATUS_PENDING,})
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
          return faker.random.number(1)
            ? resolve({...notificationItem(), status: props.status,})
            : reject(
              JSON.stringify({
                data: {
                  updateNotification: null,
                },
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
