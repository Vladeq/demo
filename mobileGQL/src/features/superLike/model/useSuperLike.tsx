import { Subscribe, Toaster } from 'entities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInitiateOrSuperLikeCustomer } from 'shared/qraphql/mututions/__generated__/InitiateOrSuperLikeCustomer.mutation';
import {
  GetSuperLikesLeftDocument,
  useGetSuperLikesLeft,
} from 'shared/qraphql/queries/__generated__/getSuperLikesLeft.query';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { useGetIsInitiateMeByLazyQuery } from './__generated__/getIsInitiateMeBy.query';

const useSuperLike = (customerId: string) => {
  const { showToast } = Toaster.useCallToast();
  const { t } = useTranslation();
  const { hasPremiumSubscribe, isVisibleModalSubscribe, onCloseModalSubscribe, onOpenModalSubscribe } =
    Subscribe.useCheckPremium();

  const { data: likesData } = useGetSuperLikesLeft();
  const freeLikes = likesData?.getSuperLikesLeft;

  const [getIsMeInitiateCustomer] = useGetIsInitiateMeByLazyQuery({
    variables: { customerIds: [customerId] },
  });
  const [isSuperLikeLoading, setIsSuperLikeLoading] = useState(false);

  const [superLikeCustomer] = useInitiateOrSuperLikeCustomer({
    onError({ message }) {
      setIsSuperLikeLoading(false);
      switch (message) {
        case 'initiates time limit':
          showToast(t('features.initiate.error'));
          break;
        case 'initiates limit':
          showToast(t('features.superLike.likesLimitError'));
          break;
      }
    },
    onCompleted() {
      getIsMeInitiateCustomer()
        .then((res) => {
          if (res.data?.customerGetByIds[0].isMeInitiatedBy) {
            NavigationService.navigate(AppRoutes.MatchScreen, { userId: customerId });
          } else {
            showToast(t('features.superLike.success'), 'info');
            freeLikes === 1 && !hasPremiumSubscribe && onOpenModalSubscribe();
          }
        })
        .catch(() => {
          showToast(t('features.superLike.success'), 'info');
          freeLikes === 1 && !hasPremiumSubscribe && onOpenModalSubscribe();
        })
        .finally(() => {
          setIsSuperLikeLoading(false);
        });
      // if (isMeInitiatedBy) {
      //   NavigationService.navigate(AppRoutes.MatchScreen, { userId: customerId });
      // } else {
      //   showToast(t('features.superLike.success'), 'info');
      //   freeLikes === 1 && !hasPremiumSubscribe && onOpenModalSubscribe();
      // }
    },
    refetchQueries: [{ query: GetSuperLikesLeftDocument }],
  });

  const onPressSuperLike = () => {
    if (hasPremiumSubscribe || freeLikes) {
      setIsSuperLikeLoading(true);
      superLikeCustomer({ variables: { customerId, isSuperLike: true } });
    } else {
      onOpenModalSubscribe();
    }
  };

  return {
    isSuperLikeLoading,
    onPressSuperLike,
    isVisibleModalSubscribe,
    onCloseModalSubscribe,
    freeLikes,
    hasPremiumSubscribe,
  };
};

export default useSuperLike;
