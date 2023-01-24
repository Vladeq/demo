import { Auth } from 'features';
import { useEffect } from 'react';
import { useGetMyNameLazyQuery } from 'shared/qraphql/queries/__generated__/getMyName.query';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

export const useNavigateAfterAuth = () => {
  const { isAuthenticated } = Auth.useAuthContext();
  const [getMe, { client }] = useGetMyNameLazyQuery();

  useEffect(() => {
    const initFunc = async () => {
      try {
        const { data } = await getMe();
        // TODO: remove console.log
        console.log('data on useNavigateByAuth', data);
        if (data?.me.name) {
          NavigationService.reset([{ name: AppRoutes.MainBottomTab }]);
        } else {
          NavigationService.reset([{ name: AppRoutes.CreateAccountScreen }]);
        }
      } catch (e) {
        // TODO: remove console.log
        console.log('error on app/hooks/useNavigateByAuth :==> ', e);
      }
    };

    if (isAuthenticated) {
      console.log('CALL_ROUTE');
      initFunc();
    }
  }, [client.cache, getMe, isAuthenticated]);
};
