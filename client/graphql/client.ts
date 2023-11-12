import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url:
            process.env.NODE_ENV === "development"
              ? "ws://wsp-elb-782460765.us-east-1.elb.amazonaws.com"
              : "ws://localhost:4000/graphql",
        })
      )
    : null;

const httplink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://wsp-elb-782460765.us-east-1.elb.amazonaws.com/graphql"
      : "http://localhost:4000/graphql",
  credentials: "include",
});

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);

          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        httplink
      )
    : httplink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
