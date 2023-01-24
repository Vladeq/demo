import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'shared/styles';
import { AppText } from 'shared/ui';

import styles from './action-sheet.style';
import { ActionList } from './components';
import { ActionSheetItem } from './types';

type ActionSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  list: ActionSheetItem[];
};

const ActionSheet: FC<ActionSheetProps> = ({ isVisible, onClose, list }) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [pressedIndex, setPressedIndex] = useState<number>();

  const onItemPress = (index: number) => {
    setPressedIndex(index);
    onClose();
  };

  const onModalHide = () => {
    if (pressedIndex !== undefined) {
      list[pressedIndex].onPress();
      setPressedIndex(undefined);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropColor={colors.black}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      useNativeDriver
      onModalHide={onModalHide}>
      <View style={[styles.root, { paddingBottom: insets.bottom + 16 }]}>
        <ActionList list={list} onItemPress={onItemPress} />
        <TouchableOpacity onPress={onClose} style={styles.cancelButton} activeOpacity={0.8}>
          <AppText style={styles.cancelText}>{t('entities.actionSheet.cancel')}</AppText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default memo(ActionSheet);
