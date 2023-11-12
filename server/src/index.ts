require("dotenv-safe").config({ allowEmptyValues: true });
import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { Request, Response } from "express";

import { UserResolver } from "./resolvers/user";
import { ChatResolver } from "./resolvers/chat";
import { ResetResolver } from "./resolvers/reset";
import { redisClient } from "./redis";
import { prisma } from "./prisma";
import { __prod__ } from "./constants";

(async () => {
  const app = express();

  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
  });
  const RedisStore = connectRedis(session);

  app.get("/", (req: Request, res: Response) => {
    res.send("status: ok");
  });

  app.set("proxy", 1);
  app.use(bodyParser.text({ type: "application/graphql" }));

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.use(
    session({
      name: "userCookie",
      store: new RedisStore({
        client: redisClient,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, ChatResolver, ResetResolver],
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, prisma }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  httpServer.listen(process.env.PORT!, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
})();
