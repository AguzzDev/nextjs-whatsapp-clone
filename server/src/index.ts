import "reflect-metadata"
import * as bodyParser from "body-parser"
import * as express from "express"
import * as session from "express-session"
import * as connectRedis from "connect-redis"
import * as cors from "cors"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { createServer } from "http"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"

import { UserResolver } from "./resolvers/user"
import { ChatResolver } from "./resolvers/chat"
import { redisClient } from "./redis"
import { prisma } from "./prisma"

;(async () => {
  const app = express()
  const httpServer = createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
  })
  const RedisStore = connectRedis(session)

  const schema = await buildSchema({
    resolvers: [UserResolver, ChatResolver],
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, prisma }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  app.set("trust proxy", 1)
  app.use(bodyParser.text({ type: "application/graphql" }))

  app.use(bodyParser.json({ limit: "50mb" }))
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "*",
      ],
    })
  )
  app.use(
    session({
      name: "userCookie",
      store: new RedisStore({
        client: redisClient,
      }),
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  )

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  
  const PORT = process.env.PORT || 4000
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})()
