import { useFocusEffect } from '@react-navigation/native';
import { History } from 'entities';
import React, { FC, useCallback } from 'react';
import { SectionList } from 'react-native';
import { ArrayElem } from 'shared/types';
import { AppText } from 'shared/ui';

import { useGetHistory } from '../../../models';
import { GetInitiatesHistory } from '../../../models/__generated__/getInitiatesHistory.query';
import { useSetItemViewed } from '../../../models/__generated__/setItemViewed.mutation';
import { EmptyState, HistorySkeleton } from '../../components';
import styles from './historyList.styles';

const renderItem = ({
  item,
}: {
  item: ArrayElem<GetInitiatesHistory['getInitiatesHistory']['items']>;
  index: number;
}) => {
  return <History.UI key={item.id} item={item} />;
};

const keyExtractor = (item: ArrayElem<GetInitiatesHistory['getInitiatesHistory']['items']>) => item.id!;

const HistoryList: FC = () => {
  const { history, loading, ids } = useGetHistory();
  const isEmpty = history[0].data.length === 0 && history[1].data.length === 0;
  const [setItemViewed] = useSetItemViewed({ variables: { ids } });

  useFocusEffect(
    useCallback(() => {
      const onBlur = async () => {
        try {
          await setItemViewed();
        } catch (e) {
          //TODO: remove console.log
          console.log('not set viewed', e);
        }
      };
      return () => onBlur();
    }, [setItemViewed]),
  );

  return loading ? (
    <HistorySkeleton />
  ) : isEmpty ? (
    <EmptyState />
  ) : (
    <SectionList
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.root}
      sections={history}
      renderSectionHeader={({ section }) => <AppText style={styles.text}>{section.title}</AppText>}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default HistoryList;
