import { Subscribe } from 'entities';
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LikeIcon } from 'shared/assets/svgs';
import { AppButton } from 'shared/ui';

import { useSuperLike } from '../model';

type SuperLikeButtonProps = {
  style: StyleProp<ViewStyle>;
  customerId: string;
};

const SuperLikeButton: FC<SuperLikeButtonProps> = ({ style, customerId }) => {
  const {
    isVisibleModalSubscribe,
    onCloseModalSubscribe,
    isSuperLikeLoading,
    onPressSuperLike,
    freeLikes,
    hasPremiumSubscribe,
  } = useSuperLike(customerId);

  return (
    <>
      <AppButton.IconButton
        style={style}
        Icon={LikeIcon}
        onPress={onPressSuperLike}
        isLoading={isSuperLikeLoading}
        isDisabled={!freeLikes && hasPremiumSubscribe}
      />
      <Subscribe.ModalSubscribe isVisible={isVisibleModalSubscribe} onClose={onCloseModalSubscribe} />
    </>
  );
};

export default SuperLikeButton;
