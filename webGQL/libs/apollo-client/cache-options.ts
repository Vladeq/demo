import { InMemoryCacheConfig } from '@apollo/client';
import { messagesPagination, relayStylePagination } from 'utils';

import { setMarkersInCache } from '../../utils/map';

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        chat__messages: messagesPagination(['input', ['chatId']]),
        chat__myChats: relayStylePagination([]),
        contract__tenant_shortTermRents: relayStylePagination(['input', ['type']]),
        contract__tenant_longTermRents: relayStylePagination(['input', ['type']]),
        contractRequest__forLandlord: relayStylePagination(['input', ['type']]),
        apartmentAd__find_longTermRentAdsCluster: setMarkersInCache(),
        apartmentAd__find_shortTermRentAdsCluster: setMarkersInCache(),
      },
    },
  },
};
