import notifee, { EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { hasNotViewedHistoryVar } from 'entities/history';
import { NavigatorParams } from 'processes/navigation/main-stack/MainStackNavigator';
import { useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AppRoutes from 'shared/routes';

import { usefcmTokenUpdate } from './__generated__/fcmTokenUpdate.mutation';
import { PushNotificationKeys } from './push-notification-key';

const usePushNotification = () => {
  const [token, setToken] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>();
  const notificationListener = useRef(messaging()).current;

  const [fcmTokenUpdate] = usefcmTokenUpdate();

  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  const setFsmToken = async (newToken: string) => {
    if (!token) {
      try {
        setToken(newToken);
        const deviceId = await getUniqueId();
        await fcmTokenUpdate({ variables: { deviceId, fcmToken: newToken } });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const updateFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await setFsmToken(fcmToken);
      }
    } catch (error) {
      console.warn('firebase.messaging().getToken() error', error);
    }
  };

  const onNotificationNavigation = (notificationResponse: FirebaseMessagingTypes.RemoteMessage | null) => {
    switch (notificationResponse?.data?.key) {
      case PushNotificationKeys.INITIATE_MATCH:
      case PushNotificationKeys.INITIATE_SUPERLIKE_MATCH:
        navigation.navigate(AppRoutes.MatchScreen, { userId: notificationResponse.data?.senderId });
        break;
      case PushNotificationKeys.INITIATE_NEW:
        navigation.navigate(AppRoutes.MainBottomTab, { screen: AppRoutes.HistoryScreen });
        break;
      case PushNotificationKeys.INITIATE_SUPERLIKE_NEW:
        navigation.navigate(AppRoutes.ProfileScreen, { userId: notificationResponse.data?.senderId });
        break;
    }
  };

  //Closed app
  const getInitialNotification = async () => {
    const initialNotification = await notificationListener.getInitialNotification();
    onNotificationNavigation(initialNotification);
  };

  useEffect(() => {
    let unsubscribeOnNotification: () => void;
    let unsubscribeOnLocalNotification: () => void;
    let unsubscribeOnNotificationOpened: () => void;
    let hasPermission = false;

    const setNotificationHandlers = async () => {
      hasPermission = await checkPermission();

      if (!hasPermission) {
        hasPermission = await requestUserPermission();
      }

      await updateFcmToken();

      notificationListener.onTokenRefresh(updateFcmToken);

      if (hasPermission && token) {
        getInitialNotification();

        //Foreground app
        unsubscribeOnNotification = notificationListener.onMessage(async (remoteMessage) => {
          if (remoteMessage.notification) {
            const channelId = await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
            });

            switch (remoteMessage?.data?.key) {
              case PushNotificationKeys.INITIATE_MATCH:
              case PushNotificationKeys.INITIATE_SUPERLIKE_MATCH:
                navigation.navigate(AppRoutes.MatchScreen, { userId: remoteMessage.data?.senderId });
                break;
              case PushNotificationKeys.INITIATE_NEW:
              case PushNotificationKeys.INITIATE_SUPERLIKE_NEW:
                hasNotViewedHistoryVar(true);
                notifee.displayNotification({
                  title: remoteMessage.notification.title,
                  data: {
                    key: remoteMessage?.data?.key,
                    senderId: remoteMessage.data?.senderId || '',
                  },
                  body: remoteMessage.notification.body,
                  android: {
                    channelId,
                    pressAction: {
                      id: 'default',
                      launchActivity: 'default',
                    },
                  },
                });
                break;
            }
          }

          Vibration.vibrate();
        });

        //Foreground app press
        unsubscribeOnLocalNotification = notifee.onForegroundEvent(({ type, detail }) => {
          if (type === EventType.PRESS) {
            switch (detail.notification?.data?.key) {
              case PushNotificationKeys.INITIATE_NEW:
                navigation.navigate(AppRoutes.MainBottomTab, { screen: AppRoutes.HistoryScreen });
                break;
              case PushNotificationKeys.INITIATE_SUPERLIKE_NEW:
                navigation.navigate(AppRoutes.ProfileScreen, { userId: detail.notification?.data?.senderId });
                break;
            }
          }
        });

        //Background app
        unsubscribeOnNotificationOpened = notificationListener.onNotificationOpenedApp(
          async (remoteMessage) => onNotificationNavigation(remoteMessage),
        );
      }
    };

    setNotificationHandlers();

    return () => {
      unsubscribeOnNotification && unsubscribeOnNotification();
      unsubscribeOnLocalNotification && unsubscribeOnLocalNotification();
      unsubscribeOnNotificationOpened && unsubscribeOnNotificationOpened();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, notificationListener]);

  return null;
};

export default usePushNotification;
