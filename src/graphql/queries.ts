import { gql } from '@apollo/client/core';

export const POSTS_QUERY = gql`
  query Posts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
    }
  }
`;
