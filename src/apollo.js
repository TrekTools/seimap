import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'your_hasura_endpoint',
  headers: {
    'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
  }
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default apolloClient; 