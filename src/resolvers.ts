import {TodoUpdate} from './types';

export const resolvers = {
  Query: {
    helloWorld: () => `Hello World!`,
    users: (_: unknown, __: unknown, context: any) =>
      context.prisma.user.findMany(),
    user: (_: unknown, args: {userId: string}, context: any) =>
      context.prisma.user.findUnique({
        where: {id: parseInt(args.userId)},
      }),
    todos: (_: unknown, __: unknown, context: any) =>
      context.prisma.todo.findMany(),
  },
  Mutation: {
    createUser: (_: unknown, args: {[key: string]: any}, context: any) =>
      context.prisma.user.create({
        data: {
          firstName: args.firstName,
          email: args.email,
          age: args.age,
        },
      }),
    deleteUser: async (_: unknown, args: {userId: string}, context: any) => {
      await context.prisma.todo.deleteMany({
        where: {userId: parseInt(args.userId)},
      });

      return context.prisma.user.delete({
        where: {id: parseInt(args.userId)},
      });
    },
    updateUser: (_: unknown, args: any, context: any) =>
      context.prisma.user.update({
        where: {
          id: parseInt(args.userId),
        },
        data: {
          firstName: args.input.firstName,
          email: args.input.email,
          age: args.input.age,
        },
      }),
    createTodo: (_: unknown, args: any, context: any) =>
      context.prisma.todo.create({
        data: {
          name: args.name,
          isComplete: args.isComplete,
          user: {connect: {id: parseInt(args.userId)}},
        },
      }),
    deleteTodo: (_: unknown, args: {todoId: string}, context: any) =>
      context.prisma.todo.delete({
        where: {
          id: parseInt(args.todoId),
        },
      }),
    updateTodo: (_: unknown, args: TodoUpdate, context: any) =>
      context.prisma.todo.update({
        where: {
          id: parseInt(args.todoId),
        },
        data: {
          name: args.name,
          isComplete: args.isComplete,
        },
      }),
    deleteTodos: (_: unknown, args: {todoIds: [string]}, context: any) => {
      const newIds = args.todoIds.map(id => parseInt(id));

      return context.prisma.todo.deleteMany({
        where: {
          id: {
            in: newIds,
          },
        },
      });
    },
    resetTodos: (_: unknown, args: {todoIds: [string]}, context: any) => {
      const todosToReset = args.todoIds.map(id => parseInt(id));

      return context.prisma.todo.updateMany({
        where: {
          id: {
            in: todosToReset,
          },
        },
        data: {
          isComplete: false,
        },
      });
    },
  },
  User: {
    id: (parent: {id: string}) => parent.id,
    firstName: (parent: {firstName: string}) => parent.firstName,
    email: (parent: {email: string}) => parent.email,
    age: (parent: {age: number}) => parent.age,
    todos: (parent: any, _: unknown, context: any) =>
      context.prisma.todo.findMany({
        where: {
          userId: parent.id,
        },
      }),
  },
  Todo: {
    user: (parent: any, _: unknown, context: any) =>
      context.prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
  },
};
