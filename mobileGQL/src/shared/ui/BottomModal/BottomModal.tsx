import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'shared/styles';

import styles from './bottom-modal.style';

type BottomModalProps = ViewProps & {
  isVisible: boolean;
  onClose: () => void;
  onModalHide?: () => void;
};

const BottomModal: FC<BottomModalProps> = ({ isVisible, onClose, onModalHide, children }) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropColor={colors.black}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      useNativeDriver
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onModalHide}>
      <View style={[styles.root, { paddingBottom: insets.bottom + 16 }]}>{children}</View>
    </Modal>
  );
};

export default BottomModal;
