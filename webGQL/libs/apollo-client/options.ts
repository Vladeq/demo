import { InMemoryCacheConfig } from '@apollo/client';

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        apartmentAd__find_longTermRentAds: {
          keyArgs: [],
          merge(data, incoming, { variables }) {
            console.log(data, 'data');
            console.log(incoming, 'incoming');
            console.log(variables, 'var');
          },
        },
      },
    },
  },
};
