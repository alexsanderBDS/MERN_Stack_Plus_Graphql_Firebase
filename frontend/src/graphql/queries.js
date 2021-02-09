import { gql } from "@apollo/client";

export const cardsQuery = {
  GET_CARDS_GRAPHQL: gql`
    query {
      getPosts {
        _id
        title
        text
      }
    }
  `,
};
