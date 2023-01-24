import { Settings, Toaster } from 'entities';
import { Auth } from 'features';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import { LogoutIcon, QuestionIcon, SecurityIcon, SettingsIcon, WalletIcon } from 'shared/assets/svgs';
import { LANDING_URL, TERMS_URL } from 'shared/constants';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';
import { colors } from 'shared/styles';

import styles from './menu.styles';

const Menu: FC = () => {
  const { t } = useTranslation();
  const { isVisibleLogoutModal, onOpenLogoutModal, onCloseLogoutModal, onLogOut, isPendingLogout } =
    Auth.logout.useLogout();

  const { showToast } = Toaster.useCallToast();

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      showToast();
    }
  };

  return (
    <>
      <View style={styles.menuWrapper}>
        <Settings.SettingItem
          onPress={() => NavigationService.navigate(AppRoutes.SettingsScreen)}
          text={t('screens.Viewer.settings')}
          IconComponent={SettingsIcon}
        />
        <Settings.SettingItem
          onPress={() => NavigationService.navigate(AppRoutes.SubscriptionsScreen)}
          text={t('screens.Viewer.subscription')}
          IconComponent={WalletIcon}
        />
        <Settings.SettingItem
          onPress={() => openUrl(TERMS_URL)}
          text={t('screens.Viewer.privacyPolicy')}
          IconComponent={SecurityIcon}
        />
        <Settings.SettingItem
          onPress={() => openUrl(LANDING_URL)}
          text={t('screens.Viewer.aboutApp')}
          IconComponent={QuestionIcon}
        />
        <Settings.SettingItem
          onPress={onOpenLogoutModal}
          text={t('screens.Viewer.logout')}
          IconComponent={LogoutIcon}
          iconColor={colors.additional.error}
        />
      </View>
      <Auth.logout.LogoutModal
        isVisible={isVisibleLogoutModal}
        onClose={onCloseLogoutModal}
        onConfirm={onLogOut}
        isPendingLogout={isPendingLogout}
      />
    </>
  );
};

export default Menu;
