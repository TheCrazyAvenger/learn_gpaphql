const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
type Query {
    helloWorld: String!
}
`;

const resolvers = {
  Query: {
    helloWorld: () => `Hello World!`,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server running on localhost:4000'));
