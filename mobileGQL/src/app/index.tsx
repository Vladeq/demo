import 'entities/i18n';

import { ApolloProvider } from '@apollo/client';
import { Amplify } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react-native';
import { Toaster } from 'entities';
import { Auth } from 'features';
import { MainStackNavigator } from 'processes/navigation';
import React from 'react';
import { StatusBar } from 'react-native';
import { withIAPContext } from 'react-native-iap';
import { enableFreeze } from 'react-native-screens';

import awsconfig from '../aws-exports';
import { useSetupApolloClient } from './apollo';

enableFreeze(true);

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener: Auth.urlOpener,
  },
});

const App = () => {
  const client = useSetupApolloClient();

  // TODO: remove all console.logs
  console.log('RERENDER APP');

  if (!client) {
    return null;
  }

  return (
    <Toaster.ToastProvider>
      <ApolloProvider client={client}>
        <Auth.AuthProvider>
          <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
          <MainStackNavigator />
        </Auth.AuthProvider>
      </ApolloProvider>
    </Toaster.ToastProvider>
  );
};

export default withOAuth(withIAPContext(App));
