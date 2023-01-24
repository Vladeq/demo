import { hasNotViewedHistoryVar } from 'entities/history';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { globalStyle } from 'shared/styles';
import { AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { HistoryList } from './components';
import styles from './historyScreen.styles';

const HistoryScreen: FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    hasNotViewedHistoryVar(false);
  }, []);
  return (
    <DefaultLayout>
      <View style={styles.root}>
        <AppText style={styles.headerText}>{t('screens.History.title')}</AppText>
        <HistoryList />
      </View>
      <View style={[globalStyle.tabBarShadow, { height: TAB_BAR_HEIGHT + insets.bottom }]} />
    </DefaultLayout>
  );
};

export default React.memo(HistoryScreen);
