import { IconsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import {
  ArrowIcon,
  CameraIcon,
  ComplainIcon,
  CursorIcon,
  DashboardIcon,
  DeleteIcon,
  DiscoveryIcon,
  EditIcon,
  HomeIcon,
  LikeIcon,
  LocationBig,
  LocationIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  QuestionIcon,
  SecurityIcon,
  SettingsIcon,
  StarBig,
  StarIcon,
  UserIcon,
  Users,
  WalletIcon,
} from 'shared/assets/svgs';
import { DefaultLayout } from 'widgets';

const IconsScreen: FC<IconsScreenProps> = () => {
  return (
    <DefaultLayout>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, alignItems: 'center' }}>
        <ArrowIcon />
        <CameraIcon />
        <ComplainIcon />
        <CursorIcon />
        <DashboardIcon />
        <DeleteIcon />
        <DiscoveryIcon />
        <EditIcon />
        <HomeIcon />
        <LikeIcon />
        <LocationIcon />
        <LogoutIcon />
        <NotificationIcon />
        <ProfileIcon />
        <QuestionIcon />
        <SecurityIcon />
        <SettingsIcon />
        <StarIcon />
        <UserIcon />
        <WalletIcon />
        <StarBig />
        <Users />

        <LocationBig />
      </ScrollView>
    </DefaultLayout>
  );
};

export default IconsScreen;
