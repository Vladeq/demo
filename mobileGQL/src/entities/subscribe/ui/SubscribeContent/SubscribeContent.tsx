import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import { TERMS_URL } from 'shared/constants';
import { AppButton, AppText, TextGradient } from 'shared/ui';

import styles from './subscribe-content.style';

const openTerms = () => {
  Linking.openURL(TERMS_URL);
};

type SubscribeContentProps = {
  onClose?: () => void;
  price: string;
  handleSubscriptionPayment: () => void;
  isSubscriptionLoading: boolean;
  isFromSettings?: boolean;
};

const SubscribeContent: FC<SubscribeContentProps> = ({
  onClose,
  handleSubscriptionPayment,
  isSubscriptionLoading,
  price,
  isFromSettings = false,
}) => {
  // @ts-ignore
  const { t } = useTranslation('translation', {
    keyPrefix: 'features.subscribe.subscribeContent',
  });

  return (
    <View style={styles.root}>
      <AppText style={styles.title}>{t('title')}</AppText>

      <View style={styles.plansRow}>
        <View style={styles.freePlan}>
          <AppText style={styles.planTitle}>{t('freePlan.title')}</AppText>
          <View style={styles.planTextWrapper}>
            <AppText style={styles.planText}>{t('freePlan.item1')}</AppText>
            <AppText style={styles.planText}>{t('freePlan.item2')}</AppText>
            <AppText style={styles.planText}>{t('freePlan.item3')}</AppText>
          </View>
        </View>
        <View style={styles.premiumPlan}>
          <TextGradient style={styles.planPremiumTitle}>{t('premiumPlan.title')}</TextGradient>
          <View>
            <TextGradient style={styles.planText}>{t('premiumPlan.item1')}</TextGradient>
            <TextGradient style={styles.planText}>{t('premiumPlan.item2')}</TextGradient>
            <TextGradient style={styles.planText}>{t('premiumPlan.item3')}</TextGradient>
          </View>
        </View>
      </View>

      <AppText style={styles.cost}>
        {`${price}/`}
        <AppText style={styles.period}>{t('period')}</AppText>
      </AppText>

      <View>
        <AppButton.SimpleButton onPress={handleSubscriptionPayment} isLoading={isSubscriptionLoading}>
          {isFromSettings ? t('upgradeButton') : t('submitButton')}
        </AppButton.SimpleButton>
        {onClose && (
          <AppButton.SimpleButton variant="text" onPress={onClose}>
            {t('cancelButton')}
          </AppButton.SimpleButton>
        )}

        <AppText style={styles.footerText}>
          {t('footer.start')}
          <AppText onPress={openTerms} style={styles.footerTextBold}>
            {t('footer.terms')}
          </AppText>
          {t('footer.and')}{' '}
          <AppText onPress={openTerms} style={styles.footerTextBold}>
            {t('footer.agreements')}
          </AppText>
        </AppText>
      </View>
    </View>
  );
};

export default SubscribeContent;
