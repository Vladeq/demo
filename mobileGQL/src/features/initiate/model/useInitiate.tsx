import { Subscribe, Toaster } from 'entities';
import { Location } from 'features';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from 'shared/hooks';
import { useInitiateOrSuperLikeCustomer } from 'shared/qraphql/mututions/__generated__/InitiateOrSuperLikeCustomer.mutation';
import {
  GetFreeInitiatesLeftDocument,
  useGetFreeInitiatesLeft,
} from 'shared/qraphql/queries/__generated__/getFreeInitiatesLeft.query';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { useGetIsInitiateMeCustomerLazyQuery } from './__generated__/getIsInitiateMeCustomer.query';

const TIME_DELAY = 300;

const useInitiate = (customerId: string) => {
  const { showToast } = Toaster.useCallToast();
  const { t } = useTranslation();
  const { hasPremiumSubscribe, isVisibleModalSubscribe, onCloseModalSubscribe, onOpenModalSubscribe } =
    Subscribe.useCheckPremium();
  const { isNotCanBeInitiatedUserIds, setInitiateByCustomerId } = useContext(Location.LocationSdkContext);

  const { data: initiatesData } = useGetFreeInitiatesLeft();
  const freeInitiates = initiatesData?.getFreeInitiatesLeft;

  const [getIsMeInitiateCustomer] = useGetIsInitiateMeCustomerLazyQuery({
    variables: { customerIds: [customerId] },
  });
  const [isInitiateLoading, setIsInitiateLoading] = useState(false);

  const [initiateCustomer] = useInitiateOrSuperLikeCustomer({
    onError({ message }) {
      setIsInitiateLoading(false);
      if (message === 'initiates time limit') {
        showToast(t('features.initiate.error'));
      }
    },
    onCompleted() {
      setInitiateByCustomerId(customerId);
      getIsMeInitiateCustomer()
        .then((res) => {
          if (res.data?.customerGetByIds[0].isMeInitiatedBy) {
            NavigationService.navigate(AppRoutes.MatchScreen, { userId: customerId });
          } else {
            showToast(t('features.initiate.success'), 'info');
            freeInitiates === 1 && !hasPremiumSubscribe && onOpenModalSubscribe();
          }
        })
        .catch(() => {
          showToast(t('features.initiate.success'), 'info');
          freeInitiates === 1 && !hasPremiumSubscribe && onOpenModalSubscribe();
        })
        .finally(() => {
          setIsInitiateLoading(false);
        });
    },
    refetchQueries: [{ query: GetFreeInitiatesLeftDocument }],
  });

  const { timer, setTimer } = useTimer();

  const onPressInitiate = () => {
    if (hasPremiumSubscribe || freeInitiates) {
      setIsInitiateLoading(true);
      initiateCustomer({ variables: { customerId } });
      setTimer(TIME_DELAY);
    } else {
      onOpenModalSubscribe();
    }
  };

  // this logic is for saving the timer after opening and then displaying the app
  useEffect(() => {
    setIsInitiateLoading(true);
    getIsMeInitiateCustomer()
      .then(({ data }) => {
        const lastDate = new Date(data?.customerGetByIds[0].lastInitiatedAt).getTime();
        const currentDate = new Date().getTime();
        const dateHasPassed = new Date(currentDate - lastDate);
        const secondsHasPassed = dateHasPassed.getMinutes() * 60 + dateHasPassed.getSeconds();
        lastDate && secondsHasPassed < TIME_DELAY && setTimer(TIME_DELAY - secondsHasPassed);
      })
      .finally(() => setIsInitiateLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onPressInitiate,
    timer,
    isInitiateLoading,
    isVisibleModalSubscribe,
    onCloseModalSubscribe,
    isDisabled: Boolean(timer) || isNotCanBeInitiatedUserIds.includes(customerId),
  };
};

export default useInitiate;
