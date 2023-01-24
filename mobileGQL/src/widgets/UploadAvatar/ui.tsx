import { RemoveAvatarPhoto } from 'features';
import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CameraIcon } from 'shared/assets/svgs';
import { colors } from 'shared/styles';
import { ActionSheet } from 'shared/ui';
import { ActionSheetItemType } from 'shared/ui';

import styles from './ui.styles';

type UploadAvatarVariant = 'large' | 'small';

type UploadAvatarProps = TouchableOpacityProps & {
  variant?: UploadAvatarVariant;
  isLoading?: boolean;
  isError?: boolean;
  actionsModalList: ActionSheetItemType[];
  avatarUrl: string;
  isModalVisible: boolean;
  onToggleModalVisible: () => void;
  onDeleteAvatar: () => void;
};

const UploadAvatar: FC<UploadAvatarProps> = ({
  variant = 'large',
  isLoading,
  isError,
  actionsModalList,
  avatarUrl,
  isModalVisible,
  onToggleModalVisible,
  onDeleteAvatar,
  ...props
}) => {
  const aspectRatio = variant === 'small' ? 1 : 164 / 200;

  const rootStyle = {
    aspectRatio,
    borderColor: isError ? colors.additional.error : colors.grayscale[40],
    borderWidth: avatarUrl ? 0 : 1,
  };

  return (
    <>
      <TouchableOpacity
        {...props}
        disabled={Boolean(avatarUrl) || isLoading}
        onPress={onToggleModalVisible}
        style={[styles.root, rootStyle]}
        activeOpacity={0.5}>
        {avatarUrl ? (
          <FastImage style={styles.image} source={{ uri: avatarUrl }} />
        ) : isLoading ? (
          <ActivityIndicator color={colors.grayscale[50]} size={variant === 'large' ? 'small' : 'large'} />
        ) : (
          <CameraIcon fill={colors.grayscale[40]} />
        )}

        {avatarUrl && <RemoveAvatarPhoto.UI style={styles.removeButton} onDelete={onDeleteAvatar} />}
      </TouchableOpacity>

      <ActionSheet list={actionsModalList} onClose={onToggleModalVisible} isVisible={isModalVisible} />
    </>
  );
};

export default UploadAvatar;
