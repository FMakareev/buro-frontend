import {typeDefs} from './typeDefs'
import setupClient from './helpers/apolloClientMock'

const defaultMocks = {
  Query: () => ({
    userList: () => [],
    userItem: () => {},
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

export const mocksClient = setupClient(defaultMocks, typeDefs);

export default mocksClient
