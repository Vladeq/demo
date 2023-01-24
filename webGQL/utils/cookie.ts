import { isClientSide } from 'constains';
import { IncomingMessage } from 'http';
import cookie from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  if (isClientSide) {
    cookie.set(key, value, {
      expires: 7,
      path: '/',
    });
  }
};

export const removeCookie = (key: string) =>
  cookie.remove(key, {
    expires: 7,
  });
export const getCookie = (key: string, req?: IncomingMessage) => {
  return !req ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: IncomingMessage) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find((c: any) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
