import { useSubscribe } from 'entities/subscribe/models';
import React, { FC, memo } from 'react';
import Modal from 'react-native-modal';
import { colors } from 'shared/styles';

import SubscribeContent from '../SubscribeContent';

type ModalSubscribeProps = {
  isVisible: boolean;
  onClose: () => void;
  onModalHide?: () => void;
};

const ModalSubscribe: FC<ModalSubscribeProps> = ({ isVisible, onClose, onModalHide }) => {
  const { handleSubscriptionPayment, isSubscriptionLoading, subscriptions } = useSubscribe();

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.7}
      backdropColor={colors.black}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      useNativeDriver
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onModalHide}>
      <SubscribeContent
        onClose={onClose}
        price={subscriptions[0]?.localizedPrice}
        handleSubscriptionPayment={handleSubscriptionPayment}
        isSubscriptionLoading={isSubscriptionLoading}
      />
    </Modal>
  );
};

export default memo(ModalSubscribe);
