import React, { FC } from 'react';
import { View } from 'react-native';
import { PADDING_LAYOUT } from 'shared/constants';
import { sizes } from 'shared/styles';
import { Skeleton } from 'shared/ui';

import styles from './match-skeleton.style';

const WIDTH = sizes.screen.width - PADDING_LAYOUT * 2;
const CONTENT_HEIGHT = sizes.screen.height / 2;

const MatchSkeleton: FC = () => {
  return (
    <Skeleton.Container>
      <View style={styles.top}>
        <Skeleton.Item width={40} height={40} borderRadius={12} />
        <Skeleton.Item width={40} height={40} borderRadius={12} />
      </View>

      <Skeleton.Item width={WIDTH} height={CONTENT_HEIGHT} borderRadius={16} marginBottom={12} />

      <View style={styles.content}>
        <Skeleton.Item width={302} height={28} borderRadius={24} />
      </View>

      <View style={styles.desc}>
        <Skeleton.Item width={79} height={32} borderRadius={24} marginRight={12} />
        <Skeleton.Item width={121} height={32} borderRadius={24} marginRight={12} />
        <Skeleton.Item width={77} height={32} borderRadius={24} />
      </View>

      <View style={styles.bottom}>
        <Skeleton.Item width={60} height={32} borderRadius={24} marginRight={12} />
        <Skeleton.Item width={103} height={32} borderRadius={24} />
      </View>
    </Skeleton.Container>
  );
};

export default MatchSkeleton;
