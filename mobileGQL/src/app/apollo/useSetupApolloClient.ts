import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useState } from 'react';

import Apollo from './apollo-setup';

export const useSetupApolloClient = (): ApolloClient<NormalizedCacheObject> | undefined => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const initClient = async () => {
      const persistedClient = await Apollo.onInitClient();
      setClient(persistedClient);
    };

    initClient();
  }, []);

  return client;
};
