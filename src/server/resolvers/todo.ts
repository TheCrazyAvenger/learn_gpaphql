export const Todo = {
  user: (parent: any, _: unknown, context: any) =>
    context.prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    }),
};
