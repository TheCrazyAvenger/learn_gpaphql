import {gql} from '@apollo/client';

export const CREATE_TODO = gql`
  mutation createTodo($userId: ID!, $isComplete: Boolean!, $name: String!) {
    createTodo(name: $name, isComplete: $isComplete, userId: $userId) {
      name
      isComplete
      id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($todo: ID!, $isComplete: Boolean!, $name: String!) {
    updateTodo(todoId: $todo, isComplete: $isComplete, name: $name) {
      name
      isComplete
      id
    }
  }
`;
