import { Toaster } from 'entities';
import { Auth } from 'features';
import { useState } from 'react';
import { getUniqueId } from 'react-native-device-info';

import { useCustomerDeleteAccount } from './__generated__/customerDeleteAccount.mutation';

const useRemoveAccount = () => {
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = Toaster.useCallToast();
  const [removeAccount] = useCustomerDeleteAccount();
  const [customerSignOutGQL] = Auth.useCustomerSignOutGQL();

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      setIsVisibleDeleteModal(false);
      const { data } = await removeAccount();
      if (data?.customerDeleteAccount) {
        const deviceId = await getUniqueId();
        customerSignOutGQL({ variables: { deviceId } });
        await Auth.logout.logoutWithNavigation();
      }
    } catch (err) {
      showToast();
      setIsLoading(false);
    }
  };

  return {
    modal: {
      open: () => setIsVisibleDeleteModal(true),
      close: () => setIsVisibleDeleteModal(false),
      isVisibleDeleteModal,
    },
    isLoading,
    handleRemove,
  };
};

export default useRemoveAccount;
