import {gql} from '@apollo/client';

export const TODOS_QUERY = gql`
  query todos($filter: String, $takeStatus: String, $userId: ID!) {
    todos(filter: $filter, takeStatus: $takeStatus, userId: $userId) {
      name
      isComplete
      id
      userId
    }
  }
`;
