import {TodoUpdate} from '../types';
import bcrypt from 'bcryptjs';

export const Mutation = {
  signUp: async (_: unknown, args: {[key: string]: any}, context: any) => {
    const password = await bcrypt.hash(args.password, 10);

    await context.prisma.user.create({
      data: {
        firstName: args.firstName,
        email: args.email,
        password,
        age: args.age,
      },
    });

    const {user} = await context.authenticate('graphql-local', {
      email: args.email,
      password: args.password,
    });

    context.login(user);

    return user;
  },
  login: async (
    _: unknown,
    {email, password}: {email: string; password: string},
    context: any,
  ) => {
    const {user} = await context.authenticate('graphql-local', {
      email,
      password,
    });

    await context.login(user);

    return user;
  },
  logout: (_: unknown, __: unknown, context: any) => {
    context.logout();
  },
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
};
