import { AppProps } from "next/dist/shared/lib/router/router";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

import { AnimatePresence } from "framer-motion";
import GlobalStateProvider from "context/GlobalStateContext";
import ChatProvider from "context/ChatContext";
import "styles/globals.css";
import "styles/scrollbar.css";
import client from "graphql/client";

const createCombinedProvider = (
  client: ApolloClient<NormalizedCacheObject>
) => {
  const CombinedProvider = ({ children }: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>
      <GlobalStateProvider>
        <ChatProvider>
          <AnimatePresence>{children}</AnimatePresence>
        </ChatProvider>
      </GlobalStateProvider>
    </ApolloProvider>
  );

  return CombinedProvider;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const CombinedProvider = createCombinedProvider(client);
  return (
    <CombinedProvider>
      <Component {...pageProps} />
    </CombinedProvider>
  );
}
