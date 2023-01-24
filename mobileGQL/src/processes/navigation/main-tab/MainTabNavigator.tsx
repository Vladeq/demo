import { useReactiveVar } from '@apollo/client';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { History, Notification } from 'entities';
import { Location } from 'features';
import { useFirstTimePermission } from 'features/location';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { HistoryScreen, HomeScreen, ViewerScreen } from 'screens';
import { HomeIcon, StarIcon, UserIcon } from 'shared/assets/svgs';
import AppRoutes from 'shared/routes';
import { colors } from 'shared/styles';

import { NavigatorParams } from '../main-stack/MainStackNavigator';
import CustomTabBar from '../ui/CustomTabBar';
import { DEFAULT_TAB_OPTIONS } from './TabNavigator.options';

const MainTab = createBottomTabNavigator<MainTabNavigatorParams>();

const MainTabNavigator: FC = () => {
  const [isHasPermissions, setIsHasPermissions] = useState(false);
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);

  const hasNotViewedHistory = useReactiveVar(History.hasNotViewedHistoryVar);
  const { isFirstTimePermission, toggleFirstTimePermission } = useFirstTimePermission();

  History.useHasNotViewedHistory();

  const { t } = useTranslation();
  const renderCustomTabBar = useCallback((props: BottomTabBarProps) => <CustomTabBar {...props} />, []);

  Notification.usePushNotification();
  const {
    locationUsers,
    LocationsSdkService,
    usersIds,
    isNotCanBeInitiatedUserIds,
    setInitiateByCustomerId,
  } = Location.useLocationSDK();
  const { getPermissions, askBackgroundLocationPermission } = Location.useLocation();

  const tabsOptions: Record<'home' | 'history' | 'viewer', BottomTabNavigationOptions> = useMemo(() => {
    return {
      home: {
        unmountOnBlur: true,
        tabBarLabel: t('ui.customTabBar.home'),
        tabBarIcon: ({ focused }) => (
          <HomeIcon fill={focused ? colors.secondary.normal : colors.grayscale[40]} />
        ),
      },
      history: {
        unmountOnBlur: true,
        tabBarLabel: t('ui.customTabBar.history'),
        tabBarIcon: ({ focused }) => (
          <StarIcon fill={focused ? colors.secondary.normal : colors.grayscale[40]} />
        ),
        tabBarBadge: hasNotViewedHistory ? 1 : 0,
      },
      viewer: {
        tabBarLabel: t('ui.customTabBar.viewer'),
        tabBarIcon: ({ focused }) => (
          <UserIcon fill={focused ? colors.secondary.normal : colors.grayscale[40]} />
        ),
      },
    };
  }, [t, hasNotViewedHistory]);

  useEffect(() => {
    const initLocationPermissions = async () => {
      const permissionResult = await getPermissions();
      setIsHasPermissions(Boolean(permissionResult));
      if (Platform.OS === 'android' && Platform.Version > 28 && isFirstTimePermission) {
        await askBackgroundLocationPermission();
        toggleFirstTimePermission();
      }
    };
    initLocationPermissions();

    if (Platform.OS === 'ios') {
      BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        preventSuspend: true,
        heartbeatInterval: 60,
      }).then(() => BackgroundGeolocation.start((state) => setIsBackgroundReady(state.enabled)));
      return () => {
        BackgroundGeolocation.stop();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Location.LocationSdkContext.Provider
      value={{
        LocationsSdkService,
        locationUsers,
        usersIds,
        isHasPermissions,
        setIsHasPermissions,
        isNotCanBeInitiatedUserIds,
        setInitiateByCustomerId,
        isBackgroundReady,
      }}>
      {isHasPermissions && <Location.UpdateLocation />}
      <MainTab.Navigator
        screenOptions={DEFAULT_TAB_OPTIONS}
        tabBar={renderCustomTabBar}
        backBehavior="history">
        <MainTab.Screen name={AppRoutes.HomeScreen} component={HomeScreen} options={tabsOptions.home} />
        <MainTab.Screen
          name={AppRoutes.HistoryScreen}
          component={HistoryScreen}
          options={tabsOptions.history}
        />
        <MainTab.Screen name={AppRoutes.ViewerScreen} component={ViewerScreen} options={tabsOptions.viewer} />
      </MainTab.Navigator>
    </Location.LocationSdkContext.Provider>
  );
};

export type MainTabNavigatorParams = {
  [AppRoutes.HomeScreen]: undefined;
  [AppRoutes.HistoryScreen]: undefined;
  [AppRoutes.ViewerScreen]: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigatorParams, AppRoutes.HomeScreen>,
  NativeStackScreenProps<NavigatorParams>
>;
export type HistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigatorParams, AppRoutes.HistoryScreen>,
  NativeStackScreenProps<NavigatorParams>
>;
export type ViewerScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigatorParams, AppRoutes.ViewerScreen>,
  NativeStackScreenProps<NavigatorParams>
>;

export default MainTabNavigator;
