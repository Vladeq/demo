import NetInfo from '@react-native-community/netinfo';
import { Toaster } from 'entities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NetInfoUpdate = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();
  const { t } = useTranslation();
  const { showToast } = Toaster.useCallToast();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isConnected));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    isConnected === false && showToast(t('errors.networkError'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return null;
};

export default NetInfoUpdate;
