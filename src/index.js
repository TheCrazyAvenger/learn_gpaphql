const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
type Query {
    helloWorld: String!
    users: [User!]!
}

type User {
    id: ID!
    firstName: String!
    email: String!
    age: Int!
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
    users: (parent, args, context, info) => users,
  },
  User: {
    id: parent => parent.id,
    firstName: parent => parent.firstName,
    email: parent => parent.email,
    age: parent => Math.round(Math.random() * 4 + 1) * parent.age,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server running on localhost:4000'));
