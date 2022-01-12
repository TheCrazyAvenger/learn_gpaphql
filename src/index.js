const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
type Query {
    helloWorld: String!
    users(text: String): [User!]!
    user(userId: ID!): User
}

type Mutation {
    createUser(id: ID!, firstName: String!, email: String!, age: Int): User
}

type User {
    id: ID!
    firstName: String!
    email: String!
    age: Int
}
`;

let users = [
  {
    id: '123',
    firstName: 'Ilya',
    email: 'ilya@mail.ru',
    age: 32,
  },
  {
    id: '456',
    firstName: 'Dan',
    email: 'dan@mail.ru',
    age: 19,
  },
];

const resolvers = {
  Query: {
    helloWorld: () => `Hello World!`,
    users: (parent, args, context, info) =>
      args.text
        ? users.filter(user =>
            user.firstName.toLowerCase().includes(args.text.toLowerCase()),
          )
        : users,
    user: (parent, args, context, info) => {
      console.log(args);
      return users.find(user => user.id === args.userId);
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const newUser = {
        id: args.id,
        firstName: args.firstName,
        email: args.email,
        age: args.age,
      };

      users.push(newUser);
      return newUser;
    },
  },
  User: {
    id: parent => parent.id,
    firstName: parent => parent.firstName,
    email: parent => parent.email,
    age: parent => parent.age,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server running on localhost:4000'));
