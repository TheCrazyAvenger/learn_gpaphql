import {useMutation, useQuery} from '@apollo/client';
import {CREATE_TODO, DELTE_TODO, TODOS_QUERY, UPDATE_TODO} from '../graphql';

export const useCreateTodoItem = () => {
  const [createTodo] = useMutation(CREATE_TODO, {
    update(cache, {data: {createTodo}}) {
      const {todos}: any = cache.readQuery({
        query: TODOS_QUERY,
      });

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: [createTodo, ...todos],
        },
      });
    },
  });
  return {createTodo};
};

export const useUpdateTodoItem = () => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  return {updateTodo};
};

export const useTodoItems = () => {
  const {data, loading, error} = useQuery(TODOS_QUERY);

  return {data, loading, error};
};

export const useDeleteTodoItem = () => {
  const [deleteTodo] = useMutation(DELTE_TODO, {
    update(cache, {data: {deleteTodo}}) {
      const {todos}: any = cache.readQuery({
        query: TODOS_QUERY,
      });

      const updatedTodosList = todos.filter(
        (elem: any) => elem.id !== deleteTodo.id,
      );

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: updatedTodosList,
        },
      });
    },
  });
  return {deleteTodo};
};
