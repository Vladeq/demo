import { makeVar } from '@apollo/client';

export const loginModalVar = makeVar<{ isAuthModalOpen: boolean }>({
  isAuthModalOpen: false,
});

export const tokenVar = makeVar<string>('');

export const AdvertId = makeVar<string>('');

export const innopayCardCompleteVar = makeVar<boolean>(false);

export const authRoute = makeVar<string>('');
