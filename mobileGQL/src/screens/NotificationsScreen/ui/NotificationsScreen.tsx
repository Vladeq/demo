import { NotificationsSection } from '__generated__/types';
import { Settings } from 'entities';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'widgets';

import { useNotificationSettings } from '../models';
import styles from './notifications-screen.styles';

const NotificationsScreen: FC = () => {
  const { t } = useTranslation();
  const { allowNotifications, toggleNotification } = useNotificationSettings();

  return (
    <DefaultLayout>
      <DefaultLayout.Header title={t('screens.Notifications.title')} defaultBack />

      <Settings.SettingItemToggler
        style={styles.firstItem}
        text={t('screens.Notifications.newInitiate.title')}
        description={t('screens.Notifications.newInitiate.description')}
        onToggleSwitch={() => toggleNotification(NotificationsSection.Initiate)}
        isActiveSwitch={allowNotifications.INITIATE}
      />
      <Settings.SettingItemToggler
        style={styles.item}
        text={t('screens.Notifications.mutualInitiate.title')}
        description={t('screens.Notifications.mutualInitiate.description')}
        onToggleSwitch={() => toggleNotification(NotificationsSection.Match)}
        isActiveSwitch={allowNotifications.MATCH}
      />
      <Settings.SettingItemToggler
        style={styles.item}
        text={t('screens.Notifications.superLike.title')}
        description={t('screens.Notifications.superLike.description')}
        onToggleSwitch={() => toggleNotification(NotificationsSection.Superlike)}
        isActiveSwitch={allowNotifications.SUPERLIKE}
      />
    </DefaultLayout>
  );
};

export default NotificationsScreen;
