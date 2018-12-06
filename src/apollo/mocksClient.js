import setupClient from './helpers/apolloClientMock'
import schema from './schema.graphqls';
import {userDocumentList} from "./graphql/query/userDocumentList";
import {userList} from "./graphql/query/userList";
import {userItem} from "./graphql/query/userItem";

const defaultMocks = {
  Query: () => ({
    userList: userList,
    userItem: userItem,
    userEmailItem: userItem,
    userDocumentList: userDocumentList,
  }),
  Mutation: () => ({
    /**
     * @params {func} mutation - этот же запрос
     * @params {object} props - аргументы которые были переданы
     * */
    createUser: (mutation, props) => props,
    updateUser: (mutation, props) => props,
    userResetPassword: (mutation, props) => props,
    userPasswordRecovery: (mutation, props) => {
      // throw Error(JSON.stringify({
      //   userPasswordRecovery: null,
      //   errors: [
      //     {
      //       message:'Error!'
      //     }
      //   ]
      // }))
      return props;
    },
  })
}

export const mocksClient = setupClient(defaultMocks, schema)();

export default mocksClient
