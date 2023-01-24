import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DeleteIcon } from 'shared/assets/svgs';
import { AppButton } from 'shared/ui';

type RemoveButtonProps = {
  onDelete: () => void;
  style: StyleProp<ViewStyle>;
};

const RemoveButton: FC<RemoveButtonProps> = ({ onDelete, style }) => {
  return <AppButton.IconButton style={style} variant="secondary" Icon={DeleteIcon} onPress={onDelete} />;
};

export default RemoveButton;
