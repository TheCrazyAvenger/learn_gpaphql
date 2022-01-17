export const Query = {
  helloWorld: () => `Hello World!`,
  users: (_: unknown, __: unknown, context: any) =>
    context.prisma.user.findMany(),
  user: (_: unknown, args: {userId: string}, context: any) =>
    context.prisma.user.findUnique({
      where: {id: parseInt(args.userId)},
    }),
  todos: (_: unknown, __: unknown, context: any) =>
    context.prisma.todo.findMany(),
  me: (_: unknown, __: unknown, context: any) => {
    console.log(context.isAuthenticated());
    context.getUser();
  },
};
