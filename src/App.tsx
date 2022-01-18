import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {AppNavigator} from './navigation/AppNavigator';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const httpLink = createHttpLink({
  uri: 'http://192.168.170.68:4000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </NavigationContainer>
  );
};
