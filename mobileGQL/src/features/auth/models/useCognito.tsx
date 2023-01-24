import { CognitoHostedUIIdentityProvider, CognitoUser } from '@aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import React, { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CRYPTO_1, CRYPTO_2 } from 'shared/constants';

import { StorageClient } from '../lib';

export const passwordlessSignIn = async (phone: string): Promise<CognitoUser | null> => {
  let cognitoUser: CognitoUser | null = null;

  try {
    const signInResult = await Auth.signIn(phone);
    cognitoUser = signInResult;
  } catch (error) {
    if (
      (error as { code: string }).code === 'UserNotFoundException' ||
      (error as { code: string }).code === 'UserLambdaValidationException'
    ) {
      try {
        await Auth.signUp({
          username: phone,
          password: CRYPTO_1 + Math.random().toString(10) + CRYPTO_2,
          attributes: {
            name: phone,
            phone_number: phone,
          },
        });

        const secondSignInResult = await Auth.signIn(phone);
        cognitoUser = secondSignInResult;
      } catch (err) {
        // TODO: remove console.log
        console.log('Sign in something went wrong:', err);
        throw err;
      }
    }
  }

  return cognitoUser;
};

export const passwordlessVerifyOTP = async (
  cognitoUser: CognitoUser | null,
  OTPCode: string,
): Promise<CognitoUser | null> => {
  if (!cognitoUser) {
    return null;
  }

  try {
    const verifiedCognitoUser: CognitoUser | null = await Auth.sendCustomChallengeAnswer(
      cognitoUser,
      OTPCode,
    );

    return verifiedCognitoUser;
  } catch (error) {
    // TODO: remove console.log
    console.log('verified error', error);
    throw error;
  }
};

export const changePhoneNumber = async (phone: string, cognitoUser: CognitoUser | null): Promise<string> => {
  let result: string;
  try {
    result = await Auth.updateUserAttributes(cognitoUser, { phone_number: phone });
  } catch (err) {
    throw err;
  }

  return result;
};

export const getAuthUser = async (): Promise<CognitoUser | null> => {
  try {
    const resp: CognitoUser = await Auth.currentAuthenticatedUser();

    if (!resp) {
      return null;
    }

    return resp;
  } catch (error) {
    // TODO: remove console.log
    console.log('getAuthUser error', error);
    return null;
  }
};

export const logout = (): Promise<any> => Auth.signOut();

export const useCognitoHub = (): IAuthContext => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingByPhone, setIsLoadingByPhone] = useState(false);
  const [isLoadingByGoogle, setIsLoadingByGoogle] = useState(false);
  const [isLoadingByApple, setIsLoadingByApple] = useState(false);
  const [isLoadingByFacebook, setIsLoadingByFacebook] = useState(false);

  const googleSignIn = useCallback(async (): Promise<void> => {
    setIsLoadingByGoogle(true);
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  }, []);

  const appleSignIn = useCallback(async (): Promise<void> => {
    setIsLoadingByApple(true);
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Apple,
    });
  }, []);

  const facebookSignIn = useCallback(async (): Promise<void> => {
    setIsLoadingByFacebook(true);
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  }, []);

  const finallyLoading = () => {
    setIsLoadingByGoogle(false);
    setIsLoadingByApple(false);
    setIsLoadingByFacebook(false);
    setIsLoadingByPhone(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const authUser = await getAuthUser();
        if (!authUser) {
          await StorageClient.removeIdToken();
          return;
        }
        if (authUser.getSignInUserSession()?.getIdToken) {
          console.log(
            'authUser.getSignInUserSession()',
            authUser.getSignInUserSession()!.getIdToken().getJwtToken(),
          );
          setIsAuthenticated(true);
          await StorageClient.setIdToken(authUser.getSignInUserSession()!.getIdToken().getJwtToken());
        }
      } catch (err) {
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const authListener: HubCallback = async ({ payload: { event, data } }) => {
      // TODO: remove console.log
      console.log('HUB_event: ', event);
      console.log('HUB_data', data);
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI': {
          const authUser = await getAuthUser();

          if (!authUser) {
            await StorageClient.removeIdToken();
            setIsAuthenticated(false);
            return;
          }

          await StorageClient.setIdToken(authUser.getSignInUserSession()?.getIdToken().getJwtToken() || '');
          finallyLoading();
          setIsAuthenticated(true);
          break;
        }
        case 'signOut': {
          await setIsAuthenticated(false);
          await StorageClient.removeIdToken();
          break;
        }
        case 'signIn_failure':
        case 'cognitoHostedUI_failure': {
          await StorageClient.removeIdToken();
          setIsAuthenticated(false);
          finallyLoading();

          if (data.code !== 'UserLambdaValidationException' && data.code !== 'UserNotFoundException') {
            // TODO: remove console.log
            console.log('authListener error ', data);
          }

          break;
        }
        case 'cancelled': {
          finallyLoading();
          break;
        }
      }
    };

    Hub.listen('auth', authListener);

    return () => Hub.remove('auth', authListener);
  }, []);

  return {
    isCheckingAuth,
    isAuthenticated,
    isLoadingByGoogle,
    googleSignIn,
    isLoadingByPhone,
    setIsLoadingByPhone,
    isLoadingByApple,
    appleSignIn,
    isLoadingByFacebook,
    facebookSignIn,
  };
};

interface IAuthContext {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLoadingByPhone: boolean;
  setIsLoadingByPhone(value: boolean): void;
  isLoadingByGoogle: boolean;
  googleSignIn(): Promise<void>;
  isLoadingByApple: boolean;
  appleSignIn(): Promise<void>;
  isLoadingByFacebook: boolean;
  facebookSignIn(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoadingByPhone: false,
  setIsLoadingByPhone: () => {},
  isLoadingByGoogle: false,
  googleSignIn: async () => {},
  isLoadingByApple: false,
  appleSignIn: async () => {},
  isLoadingByFacebook: false,
  facebookSignIn: async () => {},
});

export const useAuthContext = (): IAuthContext => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const context = useCognitoHub();
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
