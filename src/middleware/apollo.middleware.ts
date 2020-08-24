import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import TestResolver from 'src/resolver/test.resolver';
export interface Irequest extends express.Request {
  user: string;
}
export const apolloMiddleware = async (app: express.Express) => {
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver],
    }),
    context: ({req}) => {
      const context = {
        req,
        user: (req as Irequest).user,
      };
      return context;
    },
  });
  apollo.applyMiddleware({
    app: app,
    path: '/api',
  });
};
