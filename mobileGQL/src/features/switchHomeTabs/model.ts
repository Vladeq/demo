import { useState } from 'react';

import { HomeTabsEnum } from './types';

const useSwitchHomeTabs = () => {
  const [activeTab, setActiveTab] = useState<HomeTabsEnum>(HomeTabsEnum.MAP_TAB);

  const onToggleTab = () =>
    activeTab === HomeTabsEnum.MAP_TAB
      ? setActiveTab(HomeTabsEnum.LIST_TAB)
      : setActiveTab(HomeTabsEnum.MAP_TAB);

  return {
    activeTab,
    onToggleTab,
  };
};

export default useSwitchHomeTabs;
