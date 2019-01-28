import faker from 'faker';
import {GraphQLError} from 'graphql';
import setupClient from './helpers/apolloClientMock';
import schema from './schema.graphqls';
import {userdocumentlist} from './graphql/query/userdocumentlist';
import {userlist} from './graphql/query/userlist';
import {useritem} from './graphql/query/userItem';
import {ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT} from '../shared/roles';
import {notificationitem} from './graphql/query/notificationitem';
import {STATUS_PENDING} from '../shared/statuses';
import {notificationlist} from './graphql/query/notificationlist';
import {userdocumentitem} from "./graphql/query/userdocumentitem";

const defaultMocks = {
  Query: () => ({
    userlist,
    useritem,
    useremailitem: (query, {email}) => {
      switch (email) {
        case 'client@test.com': {
          return {
            ...useritem(),
            email: 'client@test.com',
            role: ROLE_CLIENT,
          };
        }
        case 'bank@test.com': {
          return {
            ...useritem(),
            email: 'bank@test.com',
            role: ROLE_BANK,
          };
        }
        case 'bureau@test.com': {
          return {
            ...useritem(),
            email: 'bureau@test.com',
            role: ROLE_BUREAU,
          };
        }
        default: {
          // throw new GraphQLError('user not found');
          throw Error(
            JSON.stringify({
              useremailitem: null,
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
    userdocumentitem: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return faker.random.number(1) ? resolve(userdocumentitem()) : resolve(null);
        }, faker.random.number(2000))
      })

    },
    userdocumentlist: () => {
      return userdocumentlist();
    },
    notificationlist,
    checkuserdocument: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(null);
        }, faker.random.number(5000))
      })
    }
  }),
  Mutation: () => ({
    /**
     * @params {func} mutation - этот же запрос
     * @params {object} props - аргументы которые были переданы
     * */
    createuser: (mutation, props) => {
      if (props.email === 'error@test.com') {
        throw new GraphQLError('already registered');
      } else if (props.bankName && props.bankName !== 'KnownBank') {
        throw new GraphQLError('unknown bank');
      } else {
        return props;
      }
    },
    updateuser: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve({...useritem()})
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
    resetpass: (mutation, props) => {
      if (props.email === 'error@test.com') {
        throw new GraphQLError('user not found');
      } else {
        return props;
      }
    },
    createnotification: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) =>
        setTimeout(
          () =>
            faker.random.number(1)
              ? resolve({
                ...notificationitem(),
                status: STATUS_PENDING,
              })
              : reject(
              JSON.stringify({
                errors: [
                  {
                    message: 'error!',
                  },
                ],
              }),
              ),
          faker.random.number(2000),
        ),
      ),
    updatenotification: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(
          () =>
            faker.random.number(1)
              ? resolve({...notificationitem(), status: props.status})
              : reject(
              JSON.stringify({
                data: {
                  updatenotification: null,
                },
                errors: [
                  {
                    message: 'error!',
                  },
                ],
              }),
              ),
          faker.random.number(2000),
        );
      }),
    recoverypass: (mutation, props) =>
      // throw Error(JSON.stringify({
      //   recoverypass: null,
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
