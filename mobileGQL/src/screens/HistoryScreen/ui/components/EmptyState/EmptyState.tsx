import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StarBig } from 'shared/assets/svgs';
import { AppText } from 'shared/ui';

import styles from './emptyState.styles';

const EmptyState: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.root}>
      <StarBig />
      <AppText style={styles.title}>{t('screens.History.EmptyState.title')}</AppText>
    </View>
  );
};

export default EmptyState;
