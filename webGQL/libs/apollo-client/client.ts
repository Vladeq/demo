import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { AppConfig, isClientSide, Routes } from 'constains';
import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import { getCookie, setCookie } from 'utils';

import { GetLightMeDocument } from '../../graphql/queries/User/__generated__/getLightMe.query';
import { cacheOptions } from './cache-options';
import { tokenVar } from './react-variables';

const UNAUTHENTICATED = 'UNAUTHENTICATED';

const customFetch = async (uri: string, options?: any) => {
  const accessToken = await getCookie('token');
  const registerToken = await getCookie('tokenForRegister');
  if (registerToken) {
    options.headers.authorization = `Bearer ${registerToken}`;
  } else {
    options.headers.authorization = `Bearer ${accessToken}`;
  }
  const initialRequest = fetch(uri, options);
  return initialRequest.then(async (response) => {
    const json = await response.json();

    const error = json?.errors?.[0];
    const errorStatus = error?.extensions?.exception?.status;

    console.log(error?.extensions?.code, 'error by UNAUTHENTICATED');

    if (error?.extensions?.code === UNAUTHENTICATED) {
      try {
        const token = await updateTokenByRefreshToken();

        if (token) {
          options.headers.authorization = `Bearer ${token}`;
          const refreshResponse = await fetch(uri, options);
          const refreshJson = await refreshResponse.json();

          return getResult(refreshJson, refreshResponse);
        }
        console.error("Refresh token doesn't exist");
        logout();
      } catch (error) {
        logout();
      }
    } else if (errorStatus === 422) {
      console.error('Something went wrong');
      logout();
    }

    return getResult(json, response);
  });
};

const httpLink = createHttpLink({
  uri: AppConfig.GQL_API_URL,
  fetch: customFetch,
});

export const wsLink = isClientSide
  ? new WebSocketLink({
      uri: `${AppConfig.GQL_API_URL}`.replace('https:', 'wss:').replace('http:', 'ws:'),
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: async () => {
          const token = getCookie('token');

          return {
            Authorization: token ? `Bearer ${token}` : '',
          };
        },
      },
      connectionCallback: (error: Error[]) => {
        if (error?.[0]?.message === 'Authentication Failure!') {
          (wsLink as any)?.subscriptionClient.close(false, false);
        }
      },
    })
  : null;

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  : httpLink;

export const client = new ApolloClient({
  ssrMode: false,
  link: splitLink,
  cache: new InMemoryCache(cacheOptions),
});

const getResult = (json: any, response: any) => ({
  ...response,
  ok: true,
  // eslint-disable-next-line no-promise-executor-return
  json: () => new Promise((resolve) => resolve(json)),
  // eslint-disable-next-line no-promise-executor-return
  text: () => new Promise<string>((resolve) => resolve(JSON.stringify(json) as string)),
});

export const updateTokenByRefreshToken = async () => {
  const refreshToken = await getCookie('refresh-token');

  if (!refreshToken) {
    return null;
  }

  const refreshTokenUrl = 'https://api-staging.livin.kz/v1/user/refresh-token';

  try {
    const initialRequest = await fetch(refreshTokenUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${refreshToken}`, 'access-control-allow-origin': '*' },
    });
    const json = await initialRequest.json();

    if (!json.token || !json.refreshToken) {
      throw new Error('Refresh token was not updated');
    }
    setCookie('token', json?.token);
    setCookie('refreshToken', json?.refreshToken);

    return json?.token;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error('Refresh token was not updated');
  }
};

export const logout = () => {
  setCookie('token', '');
  setCookie('tokenForRegister', '');
  setCookie('refresh-token', '');
  tokenVar('');

  client.writeQuery({
    query: GetLightMeDocument,
    data: {
      user__me: {
        id: '',
        firstName: '',
        avatarKey: null,
      },
    },
  });

  Router.push(Routes.home);
};
