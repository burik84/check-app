import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import NextNprogress from "nextjs-progressbar";

import "antd/dist/antd.css";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `token ac15fe6efb59746dcba0136e2ad60ed93a650d9d` || null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <NextNprogress color="#1890ff" />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default wrapper.withRedux(MyApp);
