import { gql } from "@apollo/client";

export const userMutation = {
  CREATE_USER: gql`
    mutation createUser {
      createUser {
        username
        email
      }
    }
  `,
};

export const cardsMutation = {
  CREATECARD: gql`
    mutation createPost($title: String!, $text: String!) {
      createPost(title: $title, text: $text) {
        title
        text
        author
      }
    }
  `,
  DELETECARD: gql`
    mutation deletePost($_id: ID!) {
      deletePost(_id: $_id) {
        _id
        title
        text
        author
      }
    }
  `,
  UPDATECARD: gql`
    mutation updatePost($_id: ID!, $title: String!, $text: String!) {
      updatePost(_id: $_id, title: $title, text: $text) {
        _id
        title
        text
        author
      }
    }
  `,
};
