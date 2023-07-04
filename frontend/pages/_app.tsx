import React from "react"
import { AppProps } from "next/dist/shared/lib/router/router"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { getMainDefinition } from "@apollo/client/utilities"

import { AnimatePresence } from "framer-motion"
import SidebarProvider from "context/SidebarContext"
import ChatProvider from "context/ChatContext"
import "styles/globals.css"
import "styles/scrollbar.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `https://nextjs-whatsapp-clone-six.vercel.app`,
          })
        )
      : null

  const httplink = new HttpLink({
    uri: "https://nextjs-whatsapp-clone-six.vercel.app",
    credentials: "include",
  })

  const splitLink =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query)

            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            )
          },
          wsLink,
          httplink
        )
      : httplink

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: "include",
  })

  return (
    <ApolloProvider client={client}>
      <ChatProvider>
        <SidebarProvider>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </SidebarProvider>
      </ChatProvider>
    </ApolloProvider>
  )
}
