import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { NetInfo } from 'entities';
import React, { FC } from 'react';
import {
  AddLocationScreen,
  ButtonsScreen,
  CodeScreen,
  CreateAccountScreen,
  CropAvatarScreen,
  EditInterestsScreen,
  EditPhoneCodeScreen,
  EditPhoneScreen,
  EditViewerScreen,
  IconsScreen,
  InputsScreen,
  MatchScreen,
  NotificationsScreen,
  OnboardingScreen,
  ProfileScreen,
  SettingsScreen,
  SignInScreen,
  SubscriptionsScreen,
  UIKitScreen,
  UIOtherScreen,
} from 'screens';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';
import { ScreenBaseProps } from 'shared/types';

import MainTabNavigator, { MainTabNavigatorParams } from '../main-tab/MainTabNavigator';
import { useInitApp } from '../model';
import { DEFAULT_SCREEN_OPTIONS, MODAL_SCREEN_OPTIONS } from './Navigator.options';

const Stack = createNativeStackNavigator<NavigatorParams>();

const MainStackNavigator: FC = () => {
  const { initRouteName, isInitSuccess } = useInitApp();

  return isInitSuccess ? (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <NetInfo.NetInfoUpdate />
      <Stack.Navigator initialRouteName={initRouteName}>
        <Stack.Screen
          name={AppRoutes.SignInScreen}
          component={SignInScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen name={AppRoutes.CodeScreen} component={CodeScreen} options={DEFAULT_SCREEN_OPTIONS} />
        <Stack.Screen
          name={AppRoutes.CreateAccountScreen}
          component={CreateAccountScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.OnboardingScreen}
          component={OnboardingScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.MainBottomTab}
          component={MainTabNavigator}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen name={AppRoutes.MatchScreen} component={MatchScreen} options={MODAL_SCREEN_OPTIONS} />
        <Stack.Screen
          name={AppRoutes.ProfileScreen}
          component={ProfileScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.EditViewerScreen}
          component={EditViewerScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.EditInterestsScreen}
          component={EditInterestsScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.SettingsScreen}
          component={SettingsScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.NotificationsScreen}
          component={NotificationsScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.EditPhoneScreen}
          component={EditPhoneScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.EditPhoneCodeScreen}
          component={EditPhoneCodeScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.SubscriptionsScreen}
          component={SubscriptionsScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.AddLocationScreen}
          component={AddLocationScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />
        <Stack.Screen
          name={AppRoutes.CropAvatarScreen}
          component={CropAvatarScreen}
          options={DEFAULT_SCREEN_OPTIONS}
        />

        {/* test ui kit screens  */}
        <Stack.Screen name={AppRoutes.UIKitScreen} component={UIKitScreen} />
        <Stack.Screen name={AppRoutes.UIOtherScreen} component={UIOtherScreen} />
        <Stack.Screen name={AppRoutes.IconsScreen} component={IconsScreen} />
        <Stack.Screen name={AppRoutes.ButtonsScreen} component={ButtonsScreen} />
        <Stack.Screen name={AppRoutes.InputsScreen} component={InputsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
};

export type NavigatorParams = {
  [AppRoutes.SignInScreen]: undefined;
  [AppRoutes.CodeScreen]: { cognitoUser: CognitoUser | null; phone: string };
  [AppRoutes.CreateAccountScreen]: undefined;
  [AppRoutes.OnboardingScreen]: undefined;
  [AppRoutes.MainBottomTab]: NavigatorScreenParams<MainTabNavigatorParams>;

  // initiates tab
  [AppRoutes.MatchScreen]: { userId: string };
  [AppRoutes.ProfileScreen]: { userId?: string; isMutual?: boolean; isFromMatch?: boolean };

  // viewer tab
  [AppRoutes.EditViewerScreen]: undefined;
  [AppRoutes.EditInterestsScreen]: undefined;
  [AppRoutes.SettingsScreen]: undefined;
  [AppRoutes.NotificationsScreen]: undefined;
  [AppRoutes.EditPhoneScreen]: undefined;
  [AppRoutes.EditPhoneCodeScreen]: { cognitoUser: CognitoUser | null; phone: string };
  [AppRoutes.SubscriptionsScreen]: undefined;

  // other
  [AppRoutes.AddLocationScreen]: undefined;
  [AppRoutes.CropAvatarScreen]: undefined;

  // test ui kit screens
  [AppRoutes.UIKitScreen]: undefined;
  [AppRoutes.UIOtherScreen]: undefined;
  [AppRoutes.IconsScreen]: undefined;
  [AppRoutes.ButtonsScreen]: undefined;
  [AppRoutes.InputsScreen]: undefined;
};

export type SignInScreenProps = ScreenBaseProps<AppRoutes.SignInScreen, NavigatorParams>;
export type CodeScreenProps = ScreenBaseProps<AppRoutes.CodeScreen, NavigatorParams>;
export type CreateAccountScreenProps = ScreenBaseProps<AppRoutes.CreateAccountScreen, NavigatorParams>;
export type OnboardingScreenProps = ScreenBaseProps<AppRoutes.OnboardingScreen, NavigatorParams>;
export type MainBottomTabProps = ScreenBaseProps<AppRoutes.MainBottomTab, NavigatorParams>;
export type MatchScreenProps = ScreenBaseProps<AppRoutes.MatchScreen, NavigatorParams>;
export type ProfileScreenProps = ScreenBaseProps<AppRoutes.ProfileScreen, NavigatorParams>;
export type EditViewerScreenProps = ScreenBaseProps<AppRoutes.EditViewerScreen, NavigatorParams>;
export type EditInterestsScreenProps = ScreenBaseProps<AppRoutes.EditInterestsScreen, NavigatorParams>;
export type SettingsScreenProps = ScreenBaseProps<AppRoutes.SettingsScreen, NavigatorParams>;
export type NotificationsScreenProps = ScreenBaseProps<AppRoutes.NotificationsScreen, NavigatorParams>;
export type EditPhoneScreenProps = ScreenBaseProps<AppRoutes.EditPhoneScreen, NavigatorParams>;
export type EditPhoneCodeScreenProps = ScreenBaseProps<AppRoutes.EditPhoneCodeScreen, NavigatorParams>;
export type SubscriptionsScreenProps = ScreenBaseProps<AppRoutes.SubscriptionsScreen, NavigatorParams>;
export type AddLocationScreenProps = ScreenBaseProps<AppRoutes.AddLocationScreen, NavigatorParams>;
export type CropAvatarScreenProps = ScreenBaseProps<AppRoutes.CropAvatarScreen, NavigatorParams>;
// test ui kit screens
export type UIKitScreenProps = ScreenBaseProps<AppRoutes.UIKitScreen, NavigatorParams>;
export type UIOtherScreenProps = ScreenBaseProps<AppRoutes.UIOtherScreen, NavigatorParams>;
export type IconsScreenProps = ScreenBaseProps<AppRoutes.IconsScreen, NavigatorParams>;
export type ButtonsScreenProps = ScreenBaseProps<AppRoutes.ButtonsScreen, NavigatorParams>;
export type InputsScreenProps = ScreenBaseProps<AppRoutes.InputsScreen, NavigatorParams>;

export default MainStackNavigator;
