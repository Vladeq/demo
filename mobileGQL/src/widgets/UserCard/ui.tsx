import { Initiate, SuperLike } from 'features';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { UserIcon } from 'shared/assets/svgs';
import { colors } from 'shared/styles';

import styles from './ui.styles';

type UserCardVariant = 'large' | 'small';

type UserCardProps = ViewProps & {
  avatarUrl?: string;
  variant?: UserCardVariant;
  customerId: string;
};

const UserCard: FC<UserCardProps> = ({ avatarUrl, variant = 'large', customerId, ...props }) => {
  const aspectRatio = variant === 'small' ? 1 : 164 / 200;
  return (
    <View {...props} style={[styles.root, { aspectRatio }, props.style]}>
      {avatarUrl ? (
        <FastImage style={styles.image} source={{ uri: avatarUrl }} />
      ) : (
        <UserIcon width={50} height={50} fill={colors.grayscale[50]} />
      )}

      <SuperLike.UI style={styles.likeButton} customerId={customerId} />
      <View style={styles.bottomContainer}>
        <Initiate.UI style={styles.initiateButton} customerId={customerId} />
      </View>
    </View>
  );
};

export default UserCard;
