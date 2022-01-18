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

export const DELTE_TODO = gql`
  mutation deleteTodoItem($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      name
      isComplete
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      firstName
      email
      age
      id
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp(
    $firstName: String!
    $email: String!
    $password: String!
    $age: Int
  ) {
    signUp(
      firstName: $firstName
      email: $email
      password: $password
      age: $age
    ) {
      firstName
      email
      password
      age
      id
    }
  }
`;
