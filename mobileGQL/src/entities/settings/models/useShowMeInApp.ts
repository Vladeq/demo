import { makeVar, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { getVarPersisted } from 'shared/utils';

export const isShowMeInAppVar = makeVar<boolean>(true);

export const useShowMeInApp = () => {
  const isShowMeInApp = useReactiveVar(isShowMeInAppVar);

  useEffect(() => {
    getVarPersisted(isShowMeInAppVar, 'isShowMeInApp');
  }, []);

  const toggleShowMeInApp = () => {
    isShowMeInAppVar(!isShowMeInApp);
  };

  return { isShowMeInApp, toggleShowMeInApp };
};
