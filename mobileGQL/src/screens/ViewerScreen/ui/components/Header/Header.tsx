import React, { FC } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LikeIcon, StarIcon } from 'shared/assets/svgs';
import { colors } from 'shared/styles';
import { AppText, Skeleton, SubscribeStatusBadge } from 'shared/ui';

import styles from './header.styles';

type HeaderProps = {
  initiateCount: number | string | undefined;
  superLikeCount: number | string | undefined;
  isPremium: boolean | undefined;
  isLoadingData: boolean;
};

const START_GRADIENT = { x: 0, y: 0 };
const END_GRADIENT = { x: 1, y: 0 };
const COLORS_GRADIENT = [colors.primary.gradient1, colors.primary.gradient2];

const Header: FC<HeaderProps> = ({ initiateCount, superLikeCount, isPremium, isLoadingData }) => {
  return (
    <View style={styles.header}>
      {isLoadingData ? (
        <>
          <Skeleton.Container>
            <Skeleton.Item width={109} height={32} borderRadius={12} />
          </Skeleton.Container>
          <Skeleton.Container>
            <View style={styles.rightBlock}>
              <Skeleton.Item width={37} height={20} borderRadius={8} />
              <Skeleton.Item width={37} height={20} borderRadius={8} marginLeft={16} />
            </View>
          </Skeleton.Container>
        </>
      ) : (
        <>
          <SubscribeStatusBadge isPremium={isPremium} />
          <View style={styles.rightBlock}>
            <LinearGradient
              colors={COLORS_GRADIENT}
              start={START_GRADIENT}
              end={END_GRADIENT}
              style={styles.headerIcon}>
              <StarIcon width={9} height={9} fill={colors.grayscale[0]} />
            </LinearGradient>
            <AppText style={[styles.headerText, isPremium && styles.infinitySymbol]}>
              {isPremium ? '∞' : initiateCount}
            </AppText>
            <View style={[styles.headerIcon, styles.superLikeIcon]}>
              <LikeIcon width={9} height={9} fill={colors.grayscale[0]} />
            </View>
            <AppText style={styles.headerText}>{superLikeCount}</AppText>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;
