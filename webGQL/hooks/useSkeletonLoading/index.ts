import { LOADING_PAGE } from 'constains';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setCookie } from 'utils';

const useSkeletonLoading = () => {
  const { pathname, replace, query } = useRouter();

  const routeToOriginalPage = () => {
    const isLoading = pathname.includes(LOADING_PAGE);

    if (isLoading) {
      const originalPath = pathname.replace(LOADING_PAGE, '');

      setCookie('fromSkeleton', '1');
      replace({ pathname: originalPath, query });
    }
  };

  useEffect(() => {
    routeToOriginalPage();
  }, [pathname]);
};

export default useSkeletonLoading;
