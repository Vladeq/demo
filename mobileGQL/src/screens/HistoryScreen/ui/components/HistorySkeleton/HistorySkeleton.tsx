import React, { FC } from 'react';
import { View } from 'react-native';
import { PADDING_LAYOUT } from 'shared/constants';
import { sizes } from 'shared/styles';
import { Skeleton } from 'shared/ui';

import styles from './historySkeleton.styles';

const WIDTH = sizes.screen.width - PADDING_LAYOUT * 2;

const HistorySkeleton: FC = () => {
  return (
    <View>
      <Skeleton.Container>
        <View style={styles.skeletonTitle} />
      </Skeleton.Container>
      <Skeleton.Container>
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
        <Skeleton.Item width={WIDTH} height={80} borderRadius={20} marginBottom={8} />
      </Skeleton.Container>
    </View>
  );
};

export default HistorySkeleton;
