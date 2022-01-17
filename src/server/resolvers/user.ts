export const User = {
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
};
