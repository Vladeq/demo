import * as byApple from './by-apple';
import * as byFacebook from './by-facebook';
import * as byGoogle from './by-google';
import * as byPhone from './by-phone';
import { ID_TOKEN_KEY, StorageClient } from './lib';
import * as logout from './logout';
import {
  AuthProvider,
  refreshToken,
  urlOpener,
  useAuthContext,
  useCognitoHub,
  useNavigateAfterAuth,
} from './models';
import { useCustomerSignOut as useCustomerSignOutGQL } from './models/__generated__/customerSignOut.mutation';

export {
  byApple,
  byFacebook,
  byGoogle,
  byPhone,
  logout,
  ID_TOKEN_KEY,
  StorageClient,
  useCognitoHub,
  urlOpener,
  AuthProvider,
  useAuthContext,
  useNavigateAfterAuth,
  refreshToken,
  useCustomerSignOutGQL,
};
