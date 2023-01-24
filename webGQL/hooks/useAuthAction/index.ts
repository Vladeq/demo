import { useGetLightMe } from 'graphql/queries/User/__generated__/getLightMe.query';
import { loginModalVar } from 'libs';

const useAuthAction = (callback: (data?: any) => Promise<any> | void) => {
  const { data } = useGetLightMe({ fetchPolicy: 'cache-only' });
  const user = data?.user__me;
  const isAuthorized = !!user?.id;

  const action = async (data?: any) => {
    if (!isAuthorized) {
      loginModalVar({ isAuthModalOpen: true });
    } else {
      await callback(data);
    }
  };

  return { action };
};

export default useAuthAction;
