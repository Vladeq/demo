import { NotificationsSection } from '__generated__/types';
import { Toaster } from 'entities';
import { useState } from 'react';

import {
  GetNotificationsSettingsDocument,
  useGetNotificationsSettings,
} from './__generated__/getNotificationsSettings.query';
import { useUpdateNotification } from './__generated__/updateNotification.mutation';

const useNotificationSettings = () => {
  const { showToast } = Toaster.useCallToast();
  const { data } = useGetNotificationsSettings();

  const [allowNotifications, setAllowNotifications] = useState<Record<NotificationsSection, boolean>>({
    INITIATE: data
      ? data.me.notificationsSettings.allowedSections.includes(NotificationsSection.Initiate)
      : true,
    MATCH: data ? data.me.notificationsSettings.allowedSections.includes(NotificationsSection.Match) : true,
    SUPERLIKE: data
      ? data.me.notificationsSettings.allowedSections.includes(NotificationsSection.Superlike)
      : true,
  });

  const [updateNotifications] = useUpdateNotification({
    refetchQueries: [{ query: GetNotificationsSettingsDocument }],
  });

  const toggleNotification = async (notificationKey: NotificationsSection) => {
    try {
      const newAllowNotifications = {
        ...allowNotifications,
        [notificationKey]: !allowNotifications[notificationKey],
      };
      const allowNotificationsArray = Object.entries(newAllowNotifications)
        .filter((item) => item[1])
        .map((item) => item[0]) as NotificationsSection[];

      setAllowNotifications(newAllowNotifications);
      await updateNotifications({ variables: { allowedSection: allowNotificationsArray } });
    } catch (err) {
      setAllowNotifications(allowNotifications);
      showToast();
    }
  };

  return { allowNotifications, toggleNotification };
};

export default useNotificationSettings;
