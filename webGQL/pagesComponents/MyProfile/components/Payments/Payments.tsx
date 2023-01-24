import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, TextTabs } from 'ui';

import { BankCards, PaymentsTab } from './components';
import PaymentsSkeleton from './PaymentsSkeleton';

const Payments: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'payments' });
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabs = [
    { title: t('bySubscription'), value: TabsValue.BY_SUBSCRIPTION, component: <PaymentsTab /> },
    { title: t('oneTime'), value: TabsValue.ONE_TIME, component: <PaymentsTab /> },
  ];
  const currentTab = tabs[currentTabIndex];

  const handleChangeActiveTab = (currentTabIndex: number) => () => {
    setCurrentTabIndex(currentTabIndex);
  };

  return (
    <>
      <Root>
        <Title variant={TextVariants.SECONDARY}>{t('myCards')}</Title>
        <BankCards />
        <Title variant={TextVariants.SECONDARY}>{t('history')}</Title>
        <TabsContainer>
          <StyledTextTab
            isSmall
            tabs={tabs}
            activeTab={tabs[currentTabIndex]}
            handleChangeActiveTab={handleChangeActiveTab}
          />
        </TabsContainer>
        <ContentContainer>{currentTab?.component}</ContentContainer>
      </Root>
      <PaymentsSkeleton />
    </>
  );
};

export default Payments;

enum TabsValue {
  BY_SUBSCRIPTION = 'По подписке',
  ONE_TIME = 'Разовые платежи',
}

const Root = styled.div`
  max-width: 848px;
  margin-top: 32px;
  margin-bottom: 80px;
  padding: 16px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border-radius: 21px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 40px;
  }
`;

const Title = styled(AppText)`
  margin-bottom: 24px;
  ${({ theme: { typography } }) => typography.title_22_18_bold}
  @media (min-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_38_32_bold}
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 24px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;

const StyledTextTab = styled(TextTabs)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    li {
      ${({ theme: { typography } }) => typography.body_24_16_medium}
    }
  }
`;

const ContentContainer = styled.div``;
