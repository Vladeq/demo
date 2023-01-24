import { Subscribe } from 'entities';
import { useCheckPremium, useSubscribe } from 'entities/subscribe/models';
import { SubscriptionsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { AppButton, TextGradient } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import styles from './subscriptions-screen.styles';

const SubscriptionsScreen: FC<SubscriptionsScreenProps> = () => {
  const { t } = useTranslation();
  const { handleSubscriptionPayment, isSubscriptionLoading, subscriptions, handleUnsubscribe } =
    useSubscribe();
  const { hasPremiumSubscribe } = useCheckPremium();

  return (
    <DefaultLayout>
      <DefaultLayout.Header defaultBack title={t('screens.Subscriptions.title')} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {hasPremiumSubscribe ? (
          <View style={styles.unsubscribeContainer}>
            <View>
              <TextGradient style={styles.premiumStatusText}>
                {t('screens.Subscriptions.premiumStatusText')}
              </TextGradient>
              <View style={styles.priceBlock}>
                <Text style={styles.price}>{subscriptions[0]?.localizedPrice}</Text>
                <Text style={styles.grayText}>{t('screens.Subscriptions.perMonth')}</Text>
              </View>
              <View style={styles.dateBlock}>
                <Text style={styles.grayText}>{t('screens.Subscriptions.dateEndSubscriptions')}</Text>
                {/* <Text style={styles.grayText}>{}</Text> */}
              </View>
            </View>

            <AppButton.SimpleButton
              onPress={handleUnsubscribe}
              variant="text"
              style={styles.unsubscribeButton}>
              {t('screens.Subscriptions.unsubscribe')}
            </AppButton.SimpleButton>
          </View>
        ) : (
          <>
            <Text style={styles.freeStatusText}>{t('screens.Subscriptions.freeStatusText')}</Text>
            <Subscribe.SubscribeContent
              handleSubscriptionPayment={handleSubscriptionPayment}
              isSubscriptionLoading={isSubscriptionLoading}
              price={subscriptions[0]?.localizedPrice}
              isFromSettings
            />
          </>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

export default SubscriptionsScreen;
