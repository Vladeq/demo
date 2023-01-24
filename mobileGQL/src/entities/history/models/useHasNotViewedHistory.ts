import { useEffect } from 'react';

import { useGetNotViewedInitiatesHistory } from './__generated__/getNotViewedInitiatesHistory.query';
import { hasNotViewedHistoryVar } from './hasNoViewedHistoryVar';

export const useHasNotViewedHistory = () => {
  const { data } = useGetNotViewedInitiatesHistory({ variables: { limit: 10, page: 1, viewed: false } });

  useEffect(() => {
    hasNotViewedHistoryVar(Boolean(data?.getInitiatesHistory.items.length));
  }, [data]);
};
