export const Query = {
  helloWorld: () => `Hello World!`,
  users: (_: unknown, __: unknown, context: any) =>
    context.prisma.user.findMany(),
  user: (_: unknown, args: {userId: string}, context: any) =>
    context.prisma.user.findUnique({
      where: {id: parseInt(args.userId)},
    }),
  todos: (_: unknown, args: any, context: any) => {
    const whereConditions: any = [
      {userId: parseInt(args.userId)},
      {name: {contains: args.filter}},
    ];

    args.takeStatus === 'complete'
      ? whereConditions.push({isComplete: true})
      : null;

    args.takeStatus === 'incomplete'
      ? whereConditions.push({isComplete: false})
      : null;

    return context.prisma.todo.findMany({
      where: {
        AND: whereConditions,
      },
    });
  },
  me: (_: unknown, __: unknown, context: any) => {
    context.getUser();
  },
};
