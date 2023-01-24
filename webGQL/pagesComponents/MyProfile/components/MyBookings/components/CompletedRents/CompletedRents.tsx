import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { RentTypeEnum } from 'types';
import { TextTabs } from 'ui';

import { LongTermTab, ShortTermTab } from './components';

const CompletedRents: FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const { t } = useTranslation('profilePage', { keyPrefix: 'myBookings' });

  const tabs = [
    { title: t('short'), value: RentTypeEnum.SHORT },
    { title: t('long'), value: RentTypeEnum.LONG },
  ];

  const handleChangeActiveTab = (currentTabIndex: number) => () => {
    setCurrentTabIndex(currentTabIndex);
  };
  const currentTab = tabs[currentTabIndex];

  const isShortRentType = currentTab.value === RentTypeEnum.SHORT;

  return (
    <MainContainer>
      <>
        <TextTabs tabs={tabs} activeTab={tabs[currentTabIndex]} handleChangeActiveTab={handleChangeActiveTab} isSmall />
        {isShortRentType ? <ShortTermTab /> : <LongTermTab />}
      </>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export default CompletedRents;
