const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    text: String!
    author: String!
  }

  type Mutation {
    createPost(title: String!, text: String!): Post!
    updatePost(_id: ID!, title: String!, text: String!): Post!
    deletePost(_id: ID!): Post!
  }

  type Query {
    getPosts: [Post!]!
  }
`;
