import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { RetryLink } from "apollo-link-retry";

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = sessionStorage.getItem('auth_token');
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ""
        }
    });

    return forward(operation);
});

const retryMiddleware = new RetryLink({
    delay: { initial: 1000 },
    attempts: { max: 10 }
});

const middlewares = concat(authMiddleware, retryMiddleware);

export const client = new ApolloClient({
    link: concat(middlewares, httpLink),
    cache: new InMemoryCache()
});
