export const typeDefs = `
  type User {
    id: String
    firstName: String
    lastName: String
    patronymic: String
    birthdate: String
    gender: String
    email: String
    phone: String
    password: String
    retype_password: String
    role: String
    token: String
  }
  type Query {
    userList: [User]
    userItem(id: String): User
  }
  type Mutation {
  
    createUser(
    firstName: String,
    lastName: String,
    patronymic: String,
    birthdate: String,
    gender: String,
    email: String!,
    phone: String,
    password: String!,
    retype_password: String!,
    role: String!
    ): User
    
    updateUser(
      id: String,
      firstName: String,
      lastName: String,
      patronymic: String,
      birthdate: String,
      gender: String,
      email: String,
      phone: String,
      password: String,
      retype_password: String,
      role: String
     ): User
     
     userResetPassword(email: String!): User
     userPasswordRecovery(token: String!,password: String!, retype_password: String): User
  }
`;
