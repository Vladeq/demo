import { useCallback, useState } from 'react';

import { useGetMyPremiumStatus } from './__generated__/getMyPremiumStatus.query';

const useCheckPremium = () => {
  const [isVisibleModalSubscribe, setIsVisibleModalSubscribe] = useState(false);

  const { data: premium } = useGetMyPremiumStatus();
  const hasPremiumSubscribe = premium?.me.isPremium;

  const handleCheckSubscribe = useCallback(
    (cb: () => void) => {
      if (!hasPremiumSubscribe) {
        setIsVisibleModalSubscribe(true);
        return;
      }
      cb();
    },
    [hasPremiumSubscribe],
  );

  const onOpenModalSubscribe = useCallback(() => setIsVisibleModalSubscribe(true), []);
  const onCloseModalSubscribe = useCallback(() => setIsVisibleModalSubscribe(false), []);

  return {
    hasPremiumSubscribe,
    isVisibleModalSubscribe,
    handleCheckSubscribe,
    onCloseModalSubscribe,
    onOpenModalSubscribe,
  };
};

export default useCheckPremium;
