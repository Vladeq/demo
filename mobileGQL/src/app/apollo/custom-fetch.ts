import { Auth } from 'features';

const getResult = (json: any, response: Response) => {
  return {
    ...response,
    ok: true,
    json: () => new Promise((resolve) => resolve(json)),
    text: () => new Promise<string>((resolve) => resolve(JSON.stringify(json) as string)),
  };
};

export const customFetch = async (uri: string, options?: any) => {
  const token = await Auth.StorageClient.getIdToken();
  options.headers.authorization = `Bearer ${token}`;
  const initialRequest = fetch(uri, options);

  return initialRequest.then(async (response) => {
    const json = await response.json();
    const error = json?.errors?.[0];

    if (error && error.extensions.code === 'UNAUTHENTICATED') {
      // TODO: remove console.log
      console.log('TRY_REFETCH');
      try {
        const newToken = await Auth.refreshToken();

        if (newToken) {
          options.headers.authorization = `Bearer ${token}`;
          const refreshResponse = await fetch(uri, options);
          const refreshJson = await refreshResponse.json();

          return getResult(refreshJson, refreshResponse);
        } else {
          await Auth.logout.logoutWithNavigation();
        }
      } catch (e) {
        await Auth.logout.logoutWithNavigation();
      }
    }

    return getResult(json, response);
  });
};
