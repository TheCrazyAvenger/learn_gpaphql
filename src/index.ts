import {PrismaClient} from '@prisma/client';
import {GraphQLServer} from 'graphql-yoga';
import {resolvers} from './resolvers';

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log('Server running on localhost:4000'));
