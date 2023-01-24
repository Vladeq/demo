import { Platform } from 'react-native';
import { Config } from 'react-native-config';

export const {
  ENVIRONMENT,
  PACKAGE_NAME,
  GQL_API_URL,
  CRYPTO_1,
  CRYPTO_2,
  AWS_PROJECT_REGION,
  AWS_COGNITO_IDENTIFY_POOL_ID,
  AWS_COGNITO_REGION,
  AWS_USER_POOLS_ID,
  AWS_USER_POOLS_WEB_CLIENT_ID,
  AWS_OAUTH_DOMAIN,
  AWS_OAUTH_SCOPE,
  AWS_OAUTH_REDIRECT_SIGN_IN,
  AWS_OAUTH_REDIRECT_SIGN_OUT,
  AWS_OAUTH_RESPONSE_TYPE,
  AWS_FEDERATION_TARGET,
} = Config;

export const IS_PLATFORM_IOS = Platform.OS === 'ios';

export enum APP_LANGUAGES {
  EN = 'en',
}
export const DEFAULT_APP_LANGUAGE = APP_LANGUAGES.EN;

export const TAB_BAR_HEIGHT = 56;
export const TAB_BAR_BORDER_RADIUS = 24;
export const PADDING_LAYOUT = 16;

export const TERMS_URL = 'https://nowinitiate.com/terms.html';
export const LANDING_URL = 'https://nowinitiate.com';
