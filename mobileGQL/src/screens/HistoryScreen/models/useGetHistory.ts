import { useTranslation } from 'react-i18next';

import { paginationNotViewed, paginationViewed } from '../config';
import { useGetInitiatesHistory } from './__generated__/getInitiatesHistory.query';

const useGetHistory = () => {
  const { t } = useTranslation();
  const { data: historyViewed, loading } = useGetInitiatesHistory({
    variables: paginationViewed,
    fetchPolicy: 'network-only',
  });
  const { data: historyNotViewed } = useGetInitiatesHistory({
    variables: paginationNotViewed,
    fetchPolicy: 'network-only',
  });
  const itemsNew = historyNotViewed?.getInitiatesHistory.items;
  const itemsOld = historyViewed?.getInitiatesHistory.items;

  return {
    history: [
      {
        title: `${itemsNew?.length} ${t('screens.History.newNotificationTitle')}`,
        data: itemsNew || [],
      },
      { title: t('screens.History.oldNotificationTitle'), data: itemsOld || [] },
    ],
    loading,
    ids: itemsNew?.map((item) => item.id),
  };
};

export default useGetHistory;
