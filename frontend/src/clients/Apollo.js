import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  uri: 'https://us-central1-scout-268717.cloudfunctions.net/GraphQL-Handler'
});

export default apolloClient;
