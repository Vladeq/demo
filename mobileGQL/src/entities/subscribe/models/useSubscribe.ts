import { InAppPurchasePlatform } from '__generated__/types';
import { Toaster } from 'entities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform } from 'react-native';
import { Purchase, requestSubscription, useIAP } from 'react-native-iap';
import { PACKAGE_NAME } from 'shared/constants';

import { useSynchronizePurchases } from './__generated__/synchronizePurchases.mutation';
import { useVerifyPurchases } from './__generated__/verifyPurchases.mutation';

const IOS_SUBSCRIPTION_ID = 'ios.month';
const ANDROID_SUBSCRIPTION_ID = 'android.month';

const useSubscribe = () => {
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [androidPurchase, setAndroidPurchase] = useState<Purchase | null>(null);

  const { t } = useTranslation();
  const { showToast } = Toaster.useCallToast();
  const {
    connected,
    getSubscriptions,
    subscriptions,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
  } = useIAP();

  const [verifyPurchases] = useVerifyPurchases();
  const [synchronizePurchases] = useSynchronizePurchases();

  const subscriptionId = Platform.OS === 'ios' ? IOS_SUBSCRIPTION_ID : ANDROID_SUBSCRIPTION_ID;

  const itemSkus = Platform.select({
    ios: [IOS_SUBSCRIPTION_ID],
    android: [ANDROID_SUBSCRIPTION_ID],
  });

  const unsubscribeLink = Platform.select({
    ios: 'https://apps.apple.com/account/subscriptions',
    android: `https://play.google.com/store/account/subscriptions?package=${PACKAGE_NAME}&sku=${subscriptionId}`,
  });

  const handleUnsubscribe = () => {
    Linking.openURL(unsubscribeLink as string);
  };

  const handleSubscriptionPayment = async () => {
    if (connected) {
      setIsSubscriptionLoading(true);
      try {
        const responseRequestSubscription = await requestSubscription({
          sku: subscriptionId,
          purchaseTokenAndroid: androidPurchase?.purchaseToken,
        });

        responseRequestSubscription &&
          console.log('responseRequestSubscription', responseRequestSubscription); //TODO REMOVE
      } catch (error) {
        console.log('error', error); //TODO REMOVE
        showToast(t('features.subscribe.useSubscribe.subscribeError'));
      } finally {
        setIsSubscriptionLoading(false);
      }
    }
  };

  const onGetProducts = async () => {
    if (itemSkus) {
      try {
        await getSubscriptions({ skus: itemSkus });
      } catch (error) {
        console.log('error get subscriptions', error); //TODO change error text
      }
    }
  };

  useEffect(() => {
    console.log('currentPurchase', currentPurchase); //TODO REMOVE
    console.log('currentPurchaseError', currentPurchaseError); //TODO REMOVE

    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const { transactionReceipt: receipt, purchaseToken } = purchase;
        if (receipt) {
          try {
            const ackResult = await finishTransaction({ purchase });
            console.log('ackResult', ackResult); //TODO REMOVE

            const platform =
              Platform.OS === 'ios' ? InAppPurchasePlatform.Apple : InAppPurchasePlatform.Google;
            verifyPurchases({
              variables: {
                input: {
                  platform: platform,
                  google:
                    Platform.OS === 'ios'
                      ? undefined
                      : {
                          productId: purchase.productId as string,
                          purchaseToken: purchaseToken as string,
                          packageName: PACKAGE_NAME,
                        },
                  apple: Platform.OS === 'ios' ? { receipt } : undefined,
                },
              },
              onCompleted(data) {
                console.log('verifyPurchases data', data); //TODO REMOVE
                switch (Platform.OS) {
                  case 'android':
                    setAndroidPurchase(purchase);
                    return;
                }
                synchronizePurchases({
                  onCompleted(dataSyn) {
                    console.log('synchronizePurchases data', dataSyn); //TODO REMOVE
                  },
                  onError(error) {
                    console.log('synchronizePurchases error', error); //TODO REMOVE
                  },
                });
                setIsSubscriptionLoading(false);
              },
              onError(error) {
                console.log('verifyPurchases error', error); //TODO REMOVE
                showToast(error.message);
                setIsSubscriptionLoading(false);
              },
            });
          } catch (ackErr) {
            console.warn('ackErr', ackErr); //TODO REMOVE
          }
        }
      }
    };

    checkCurrentPurchase(currentPurchase);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPurchase, finishTransaction, currentPurchaseError]);

  useEffect(() => {
    connected && onGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return { handleSubscriptionPayment, isSubscriptionLoading, subscriptions, handleUnsubscribe };
};

export default useSubscribe;
