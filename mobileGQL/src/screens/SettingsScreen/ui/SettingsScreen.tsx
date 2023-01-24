import { Settings } from 'entities';
import { SettingsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useGetMe } from 'screens/ViewerScreen/model/__generated__/getMe.query';
import AppRoutes from 'shared/routes';
import { AppButton, BottomModal, DisableScreenWrapper } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { useRemoveAccount } from '../models';
import styles from './settings-screen.styles';

const SettingsScreen: FC<SettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { isShowMeInApp, toggleShowMeInApp } = Settings.useShowMeInApp();
  const { modal, handleRemove, isLoading } = useRemoveAccount();
  const { data: viewer } = useGetMe();

  return (
    <DefaultLayout>
      <DefaultLayout.Header title={t('screens.Settings.title')} defaultBack />
      <Settings.SettingItem
        style={styles.firstMenuItem}
        text={t('screens.Settings.menu.pushNotification')}
        onPress={() => navigation.navigate(AppRoutes.NotificationsScreen)}
      />
      {viewer?.me.phone && (
        <Settings.SettingItem
          text={t('screens.Settings.menu.phoneNumber')}
          onPress={() => navigation.navigate(AppRoutes.EditPhoneScreen)}
        />
      )}

      <View style={styles.divider} />
      <Settings.SettingItemToggler
        text={t('screens.Settings.menu.showMeInApp')}
        isActiveSwitch={isShowMeInApp}
        onToggleSwitch={toggleShowMeInApp}
      />
      <AppButton.SimpleButton
        onPress={modal.open}
        variant="text"
        style={styles.deleteButton}
        isLoading={isLoading}>
        <Text style={styles.deleteButtonText}>{t('screens.Settings.deleteAccount')}</Text>
      </AppButton.SimpleButton>

      {isLoading && <DisableScreenWrapper />}

      <BottomModal isVisible={modal.isVisibleDeleteModal} onClose={modal.close}>
        <Text style={styles.modalText}>{t('screens.Settings.deleteModal.question')}</Text>
        <AppButton.SimpleButton style={styles.modalButton} variant="text" onPress={modal.close}>
          {t('screens.Settings.deleteModal.cancel')}
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="delete" onPress={handleRemove}>
          {t('screens.Settings.deleteModal.confirm')}
        </AppButton.SimpleButton>
      </BottomModal>
    </DefaultLayout>
  );
};

export default SettingsScreen;
