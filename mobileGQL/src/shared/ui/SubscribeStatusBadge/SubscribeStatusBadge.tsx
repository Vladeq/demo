import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ViewProps } from 'react-native';

import AppText from '../AppText';
import TextGradient from '../TextGradient';
import styles from './subscribe-status-badge.styles';

type SubscribeStatusBadgeProps = ViewProps & {
  isPremium: boolean | undefined;
};

const SubscribeStatusBadge: FC<SubscribeStatusBadgeProps> = ({ isPremium, ...props }) => {
  const { t } = useTranslation();
  return (
    <View {...props} style={styles.root}>
      {isPremium ? (
        <TextGradient style={styles.text}>{t('ui.subscribeStatusBadge.premium')}</TextGradient>
      ) : (
        <AppText style={styles.text}>{t('ui.subscribeStatusBadge.free')}</AppText>
      )}
    </View>
  );
};

export default SubscribeStatusBadge;
