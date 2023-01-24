import { makeVar, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { getVarPersisted } from 'shared/utils';

export const isFirstTimePermissionVar = makeVar<boolean>(true);

const useFirstTimePermission = () => {
  const isFirstTimePermission = useReactiveVar(isFirstTimePermissionVar);

  useEffect(() => {
    getVarPersisted(isFirstTimePermissionVar, 'isFirstTimePermission');
  }, []);

  const toggleFirstTimePermission = () => {
    isFirstTimePermissionVar(!isFirstTimePermission);
  };

  return { isFirstTimePermission, toggleFirstTimePermission };
};

export default useFirstTimePermission;
