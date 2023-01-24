import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton, AppText, BottomModal } from 'shared/ui';

import styles from './ui.styles';

type LogoutModal = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPendingLogout: boolean;
};

const LogoutModal: FC<LogoutModal> = ({ isVisible, onClose, onConfirm, isPendingLogout }) => {
  const { t } = useTranslation();

  return (
    <BottomModal isVisible={isVisible} onClose={onClose}>
      <AppText style={styles.modalText}>{t('features.auth.logout.modalText')}</AppText>
      <AppButton.SimpleButton
        style={styles.modalButton}
        variant="text"
        onPress={onClose}
        isDisabled={isPendingLogout}>
        {t('features.auth.logout.cancel')}
      </AppButton.SimpleButton>
      <AppButton.SimpleButton variant="delete" onPress={onConfirm} isLoading={isPendingLogout}>
        {t('features.auth.logout.confirm')}
      </AppButton.SimpleButton>
    </BottomModal>
  );
};

export default LogoutModal;
