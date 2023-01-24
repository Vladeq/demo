import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { DashboardIcon, DiscoveryIcon } from 'shared/assets/svgs';
import colors from 'shared/styles/themes/light';

import styles from './styles';
import { HomeTabsEnum } from './types';

type HomeTabsProps = TouchableOpacityProps & {
  onToggleTab: () => void;
  activeTab: HomeTabsEnum;
};

const HomeTabs: FC<HomeTabsProps> = ({ onToggleTab, activeTab, ...props }) => {
  return (
    <TouchableOpacity {...props} style={styles.root} onPress={onToggleTab} activeOpacity={1}>
      <DashboardIcon
        fill={activeTab === HomeTabsEnum.LIST_TAB ? colors.secondary.normal : colors.grayscale[40]}
      />
      <DiscoveryIcon
        fill={activeTab === HomeTabsEnum.MAP_TAB ? colors.secondary.normal : colors.grayscale[40]}
      />
    </TouchableOpacity>
  );
};

export default HomeTabs;
