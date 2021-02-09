const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type Query {
    me: User!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: DateTime
    updateAt: DateTime
  }

  type Mutation {
    createUser: UserOutput!
  }

  type UserOutput {
    username: String!
    email: String!
  }
`;
