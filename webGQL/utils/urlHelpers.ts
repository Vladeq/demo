import { ImageLoader } from 'next/image';
import { NextRouter } from 'next/router';

export const getQueryFromUrl = (path: string) => {
  const pathQuery = path.split('?')[1];
  const urlSearchParams = new URLSearchParams(pathQuery);
  const query = Object.fromEntries(urlSearchParams.entries());

  return query;
};

export const getFilenameFromUrl = (url: string) => {
  const splicedMediaUrl = url.split('/') || [];
  const filename = splicedMediaUrl[splicedMediaUrl.length - 1].split('?')[0] || '';

  return filename;
};

export const parseFileKeyFromUrl = (url: string): string => {
  const retrieveFileKeyFromUrlRegexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)|((\/{1,})?\?.*)$/g;

  return `https://livin-staging-public-files.s3.ap-south-1.amazonaws.com${url.replace(
    retrieveFileKeyFromUrlRegexp,
    '',
  )}`;
};

export const removeQueryParam = (param: string, router: NextRouter) => {
  const { pathname, query } = router;
  const params = new URLSearchParams(query as unknown as URLSearchParams);
  params.delete(param);
  router.replace({ pathname, query: params.toString() }, undefined, { shallow: true });
};

export const privateImageLoader: ImageLoader = ({ src }) => src;
