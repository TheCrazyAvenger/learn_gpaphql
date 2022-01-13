import {GraphQLServer} from 'graphql-yoga';
import {resolvers} from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log('Server running on localhost:4000'));
