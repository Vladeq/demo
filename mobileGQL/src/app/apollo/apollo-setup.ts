import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { Auth } from 'features';
import { GQL_API_URL } from 'shared/constants';

import { customFetch } from './custom-fetch';
import tokenVar from './tokenVar';

const httpLink = createHttpLink({
  uri: GQL_API_URL,
  fetch: customFetch,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await Auth.StorageClient.getIdToken();
  tokenVar(token); //TODO refactor
  // TODO: remove console.log
  // console.log('token', token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let client: ApolloClient<NormalizedCacheObject> = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
});

const onInitClient = async () => {
  const cache = new InMemoryCache({});
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return client;
};

const apollo = { onInitClient, client };

export default apollo;
