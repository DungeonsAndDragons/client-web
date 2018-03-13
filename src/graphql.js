import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';

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

export const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
});
