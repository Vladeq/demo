import React, { FC } from 'react';
import { View } from 'react-native';
import { Skeleton } from 'shared/ui';

import styles from './profileSkeleton.styles';

const ProfileSkeleton: FC = () => {
  return (
    <View style={styles.root}>
      <Skeleton.Container>
        <View style={styles.skeletonTitle} />
      </Skeleton.Container>
      <Skeleton.Container>
        <View style={styles.container}>
          <View style={styles.skeletonImg} />
          <View style={styles.skeletonName} />
        </View>
      </Skeleton.Container>
      <Skeleton.Container>
        <View style={styles.containerSmall}>
          <Skeleton.Item width={79} height={32} borderRadius={24} marginRight={12} />
          <Skeleton.Item width={121} height={32} borderRadius={24} marginRight={12} />
          <Skeleton.Item width={77} height={32} borderRadius={24} marginRight={0} />
        </View>
        <View style={styles.containerSmall}>
          <Skeleton.Item width={60} height={32} borderRadius={24} marginRight={12} />
          <Skeleton.Item width={103} height={32} borderRadius={24} marginRight={0} />
        </View>
      </Skeleton.Container>
    </View>
  );
};

export default ProfileSkeleton;
