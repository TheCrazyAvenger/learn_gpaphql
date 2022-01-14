import {PrismaClient} from '@prisma/client';
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import {GraphQLLocalStrategy, buildContext} from 'graphql-passport';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';

const PORT = 4000;
const SESSION_SECRET = '85493j0jfj0g8sadfhHSAD';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  console.log(id);
  const user = prisma.user.findUnique({
    where: {id},
  });

  done(null, user);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    console.log('Second login');
    const matchingUser = await prisma.user.findUnique({
      //@ts-ignore
      where: {email: email},
    });

    let error = matchingUser ? '' : new Error('User not found');

    if (matchingUser) {
      //@ts-ignore
      const valid = await bcrypt.compare(password, matchingUser.password);

      error = valid ? '' : new Error('Invalid password');
    }
    console.log('Third login');
    done(error, matchingUser);
  }),
);

const prisma = new PrismaClient();

const app = express();

app.use(
  session({
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => {
    //@ts-ignore
    return buildContext({req, res, prisma});
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startApolloServer = async () => {
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: 'https://studio.apollographql.com',
      credentials: true,
    },
  });

  app.listen({port: PORT}, () => {
    console.log(`Server running on localhost:${PORT}`);
  });
};

startApolloServer();
