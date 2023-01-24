import { Auth } from 'features';
import { MainStackNavigatorParams } from 'processes/navigation';
import { useEffect, useRef, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { useGetMyNameLazyQuery } from 'shared/qraphql/queries/__generated__/getMyName.query';
import AppRoutes from 'shared/routes';

const useInitApp = () => {
  const [isInitSuccess, setIsInitSuccess] = useState(false);
  const [initRouteName, setInitRouteName] = useState<keyof MainStackNavigatorParams>();
  const [getMe, { client }] = useGetMyNameLazyQuery();
  const { isCheckingAuth, isAuthenticated } = Auth.useAuthContext();
  const isAuthenticatedRef = useRef(isAuthenticated);

  isAuthenticatedRef.current = isAuthenticated;

  useEffect(() => {
    const initFunc = async () => {
      try {
        // TODO: remove console.log()
        console.log('isAuthenticated', isAuthenticatedRef.current);
        if (isAuthenticatedRef.current) {
          const { data } = await getMe();
          // TODO: remove console.log
          console.log('data on useInitApp', data);
          if (data?.me.name) {
            setInitRouteName(AppRoutes.MainBottomTab);
          } else {
            setInitRouteName(AppRoutes.CreateAccountScreen);
          }
        } else {
          client.cache.reset();
          setInitRouteName(AppRoutes.SignInScreen);
        }
      } catch (e) {
        // TODO: remove console.log
        console.log('error on app/hooks/useInitApp :==> ', e);
        setInitRouteName(AppRoutes.SignInScreen);
      } finally {
        setIsInitSuccess(true);
        setTimeout(() => {
          console.log('SPLASH_HIDE');
          RNBootSplash.hide({ fade: true });
        });
      }
    };

    if (!isCheckingAuth) {
      console.log('CALL_INIT');
      initFunc();
    }
  }, [client.cache, getMe, isCheckingAuth]);

  return { isInitSuccess, initRouteName: initRouteName as keyof MainStackNavigatorParams | undefined };
};

export default useInitApp;
