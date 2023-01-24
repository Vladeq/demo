import { Toaster } from 'entities';
import { useTranslation } from 'react-i18next';

import { useSetBlockedCustomer } from './__generated__/setBlockedCustomer.mutation';

const useBlockCustomer = (id: string) => {
  const { t } = useTranslation();
  const { showToast } = Toaster.useCallToast();

  const [setBlockedCustomer] = useSetBlockedCustomer({ variables: { id } });

  const blockCustomer = () => {
    try {
      setBlockedCustomer();
      showToast(t('screens.Profile.complaintModal.toasterReport'), 'info');
    } catch (e) {
      showToast(t('screens.Profile.complaintModal.networkError'));
    }
  };

  return { blockCustomer };
};

export default useBlockCustomer;
