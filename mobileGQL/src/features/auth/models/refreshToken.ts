import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

import { StorageClient } from '../lib';

export const refreshToken = async () => {
  try {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();

        cognitoUser.refreshSession(currentSession.getRefreshToken(), async (err, session) => {
          if (err) {
            reject(err);
          } else {
            await StorageClient.setIdToken(session.idToken.jwtToken);
            resolve(session.idToken.jwtToken);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  } catch (e) {
    console.log('Unable to refresh Token', e);
  }
};
