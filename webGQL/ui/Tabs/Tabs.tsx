import { FC } from 'react';
import styled from 'styled-components';
import { TabType } from 'types/tabs';

import { Tab } from './styled';

interface TabsProps {
  handleChangeActiveTab: (tab: TabType) => () => void;
  activeTab: TabType;
  tabs: Array<TabType>;
  isSmall?: boolean;
}

const Tabs: FC<TabsProps> = ({ tabs, activeTab, handleChangeActiveTab, isSmall = false }) => (
  <Root>
    {tabs.map((tab) => {
      const isActive = tab.value === activeTab.value;
      return (
        <StyledTab isActive={isActive} key={tab.id} $isSmall={isSmall} onClick={handleChangeActiveTab(tab)}>
          {tab.title}
        </StyledTab>
      );
    })}
  </Root>
);

export default Tabs;

const Root = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTab = styled(Tab)`
  width: 50%;
  height: 48px;
`;
