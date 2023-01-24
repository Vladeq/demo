import { useReactiveVar } from '@apollo/client';
import { useGetLightMeLazyQuery } from 'graphql/queries/User/__generated__/getLightMe.query';
import { tokenVar } from 'libs';
import { FC, ReactNode, useEffect } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const token = useReactiveVar(tokenVar);
  const [getLightMe] = useGetLightMeLazyQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    if (token) {
      getLightMe();
    }
  }, [token]);

  return <>{children}</>;
};

export default UserProvider;
