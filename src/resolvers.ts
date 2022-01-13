import {users} from './data/users';
import {todos} from './data/todos';

import {User} from './types';
import {createUserId} from './utils';
import {usersOnTodos} from './data/usersOnTodos';

const newUserIdInc = createUserId();
const newTodoId = createUserId();

export const resolvers = {
  Query: {
    helloWorld: () => `Hello World!`,
    users: (_: unknown, args: {text: string}) =>
      args.text
        ? users.filter(user =>
            user.firstName.toLowerCase().includes(args.text.toLowerCase()),
          )
        : users,
    user: (_: unknown, args: {userId: string}) => {
      console.log(args);
      return users.find(user => user.id === args.userId);
    },
    todos: () => {
      return todos;
    },
  },
  Mutation: {
    createUser: (_: unknown, args: {[key: string]: any}) => {
      const userAlreadyExist = users.some(user => user.email === args.email);

      if (userAlreadyExist) {
        throw new Error('User already exist.');
      } else {
        const newUser = {
          id: newUserIdInc().toString(),
          firstName: args.firstName,
          email: args.email,
          age: args.age,
        };

        users.push(newUser);
        return newUser;
      }
    },
    deleteUser: (_: unknown, args: {userId: string}) => {
      let user;
      const userToRemove: any = users.findIndex(elem => {
        if (elem.id === args.userId) {
          user = elem;
          return true;
        } else {
          return false;
        }
      });

      user ? users.splice(userToRemove, 1) : '';
      return user;
    },
    updateUser: (_: unknown, args: User) => {
      const userIndex = users.findIndex(elem => elem.id === args.userId);

      users[userIndex] = {...users[userIndex], ...args.input};
      return users[userIndex];
    },
    createTodo: (_: unknown, args: any) => {
      const newTodo = {
        id: newTodoId().toString(),
        name: args.name,
        isComplete: args.isComplete,
        userId: args.userId,
      };

      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_: unknown, args: {todoId: string}) => {
      let todo;
      const todoToRemove = todos.findIndex(elem => {
        if (elem.id === args.todoId) {
          todo = elem;
          return true;
        } else {
          return false;
        }
      });

      todo ? todos.splice(todoToRemove, 1) : '';
      return todo;
    },
  },
  User: {
    id: (parent: {id: string}) => parent.id,
    firstName: (parent: {firstName: string}) => parent.firstName,
    email: (parent: {email: string}) => parent.email,
    age: (parent: {age: number}) => parent.age,
    todos: (parent: any) => {
      const todoIds: any = [];

      usersOnTodos.map(elem => {
        if (elem.userId === parent.id) {
          todoIds.push(elem.todoId);
        }
      });

      return todos.filter(elem => todoIds.includes(elem.id));
    },
  },
  Todo: {
    user: (parent: any) => {
      const userIds: any = [];

      usersOnTodos.map(elem => {
        if (elem.todoId === parent.id) {
          userIds.push(elem.userId);
        }
      });

      return users.filter(elem => userIds.includes(elem.id));
    },
  },
};
