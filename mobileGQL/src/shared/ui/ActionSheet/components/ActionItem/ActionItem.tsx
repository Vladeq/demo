import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText } from 'shared/ui';

import { ActionSheetItem } from '../../types';
import styles from './action-item.style';

const ActionItem: FC<ActionSheetItem> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress} activeOpacity={0.9}>
      <AppText style={styles.text}>{text}</AppText>
    </TouchableOpacity>
  );
};

export default ActionItem;
