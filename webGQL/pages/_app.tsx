import '../styles/general/fonts.css';

import { ApolloProvider } from '@apollo/client';
import { UserProvider } from 'hocs';
import { client, tokenVar } from 'libs';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledToastContainer } from 'styles/components/styledToastContainer';
import { GlobalStyle } from 'styles/general/global';
import { theme } from 'styles/themes';
import { getCookie } from 'utils';

import nextI18nConfig from '../../next-i18next.config';

function MyApp({ Component, pageProps }: AppProps) {
  const token = pageProps.token as string;

  useEffect(() => {
    tokenVar(token);
  }, [token]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme.default}>
        <ApolloProvider client={client}>
          <UserProvider>
            <StyledToastContainer />
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
              />
            </Head>
            <Component {...pageProps} />
          </UserProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const appProps = await NextApp.getInitialProps(appContext);

  let accessToken;
  let fromSkeleton;

  if (ctx.req) {
    accessToken = getCookie('token', ctx.req);
    fromSkeleton = getCookie('fromSkeleton', ctx.req);
  }

  return { ...appProps, pageProps: { ...appProps.pageProps, token: accessToken || '', fromSkeleton } };
};

export default appWithTranslation(MyApp, nextI18nConfig);
