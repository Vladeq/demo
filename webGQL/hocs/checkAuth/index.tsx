import { useReactiveVar } from '@apollo/client';
import { Routes } from 'constains';
import { tokenVar } from 'libs';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from 'utils';

const checkAuth = (Component: NextComponentType<NextPageContext>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [cookieToken, setCookieToken] = useState(getCookie('token') || '');
    const token = useReactiveVar(tokenVar);

    useEffect(() => {
      const newCookieToken = getCookie('token') || '';
      setCookieToken(newCookieToken);

      if (!newCookieToken) {
        router.push(Routes.home);
      }
    }, [token]);

    return cookieToken ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default checkAuth;
