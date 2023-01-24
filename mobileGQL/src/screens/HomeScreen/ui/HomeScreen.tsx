import { useReactiveVar } from '@apollo/client';
import { Location, SwitchHomeTabs } from 'features';
import React, { FC } from 'react';
import { View } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { globalStyle } from 'shared/styles';
import { DefaultLayout } from 'widgets';

import { useHome } from '../model';
import { EmptyLocationBlock, MapTab, UsersListTab } from './components';
import styles from './home-screen.style';

const HomeScreen: FC = () => {
  const {
    IsMapTab,
    activeTab,
    isHasPermissions,
    onToggleTab,
    isRefreshUsers,
    users,
    usersAsPins,
    onGetUsers,
  } = useHome();
  const position = useReactiveVar(Location.positionVar);
  const insets = useSafeAreaInsets();

  return (
    <DefaultLayout>
      <View style={styles.topContainer}>
        <SwitchHomeTabs.HomeTabs activeTab={activeTab} onToggleTab={onToggleTab} />
      </View>

      {isHasPermissions ? (
        IsMapTab ? (
          <MapTab users={users} pins={usersAsPins} position={position} />
        ) : (
          <UsersListTab users={users} position={position} isRefresh={isRefreshUsers} onRefresh={onGetUsers} />
        )
      ) : (
        <EmptyLocationBlock onPress={openSettings} />
      )}

      {IsMapTab ? (
        !position && <View style={[globalStyle.tabBarShadow, { height: TAB_BAR_HEIGHT + insets.bottom }]} />
      ) : (
        <View style={[globalStyle.tabBarShadow, { height: TAB_BAR_HEIGHT + insets.bottom }]} />
      )}
    </DefaultLayout>
  );
};

export default React.memo(HomeScreen);
