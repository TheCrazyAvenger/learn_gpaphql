import {useMutation, useQuery} from '@apollo/client';
import {CREATE_TODO, DELTE_TODO, TODOS_QUERY, UPDATE_TODO} from '../graphql';

export const useCreateTodoItem = () => {
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [
      {
        query: TODOS_QUERY,
        variables: {takeStatus: null},
      },
    ],
  });
  return {createTodo};
};

export const useUpdateTodoItem = () => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  return {updateTodo};
};

export const useTodoItems = (args: any) => {
  const {data, loading, error} = useQuery(TODOS_QUERY, {
    variables: {
      filter: args.filter,
      takeStatus: args.takeStatus,
      userId: args.userId,
    },
    fetchPolicy: 'network-only',
  });

  return {data, loading, error};
};

export const useDeleteTodoItem = (args: any) => {
  const [deleteTodo] = useMutation(DELTE_TODO, {
    refetchQueries: [
      {
        query: TODOS_QUERY,
        variables: {takeStatus: args.takeStatus},
      },
    ],
  });
  return {deleteTodo};
};
