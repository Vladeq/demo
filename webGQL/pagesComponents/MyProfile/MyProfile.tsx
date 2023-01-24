import { useClientSize } from 'hooks';
import { MainLayout } from 'layouts';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import TextTabs from 'ui/TextTabs/TextTabs';

import { MyBookings, Notifications, Payments, PersonalInfo, Security } from './components';

const MyProfile: FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const { getIsBreakpoint } = useClientSize();
  const { t } = useTranslation('profilePage', { keyPrefix: 'myProfile' });

  const tabs = useMemo(
    () => [
      { title: t('personalInformation'), value: TabsValue.PERSONAL_INFO, component: <PersonalInfo /> },
      { title: t('notifications'), value: TabsValue.NOTIFICATIONS, component: <Notifications /> },
      { title: t('security'), value: TabsValue.SECURITY, component: <Security /> },
      { title: t('payments'), value: TabsValue.PAYMENTS, component: <Payments /> },
      { title: t('myBookings'), value: TabsValue.MY_BOOKINGS, component: <MyBookings /> },
    ],

    [t],
  );

  const currentTab = tabs[currentTabIndex];

  const handleChangeActiveTab = (currentTabIndex: number) => () => {
    setCurrentTabIndex(currentTabIndex);
  };

  const isWidthLg = getIsBreakpoint('lg');

  return (
    <StyledMainLayout headTitle={t('headTitle')} isSecondaryBackground>
      <Root>
        <TopContainer>
          <TopContentContainer>
            <TopInnerContentContainer>
              <Container>
                <StyledAppText variant={TextVariants.SECONDARY}>{t('personalAccount')}</StyledAppText>
                <TabsContainer>
                  <TextTabs
                    isSmall={isWidthLg}
                    tabs={tabs}
                    activeTab={tabs[currentTabIndex]}
                    handleChangeActiveTab={handleChangeActiveTab}
                  />
                </TabsContainer>
              </Container>
            </TopInnerContentContainer>
          </TopContentContainer>
        </TopContainer>
        <ContentContainer>
          <InnerContentContainer>
            <InnerContainer>{currentTab?.component}</InnerContainer>
          </InnerContentContainer>
        </ContentContainer>
      </Root>
    </StyledMainLayout>
  );
};

export default MyProfile;

enum TabsValue {
  PERSONAL_INFO = 'Личная информация',
  NOTIFICATIONS = 'Уведомления',
  SECURITY = 'Безопасность',
  PAYMENTS = 'Платежи',
  MY_BOOKINGS = 'Мои бронирования',
  BUSINESS_TRIPS = 'Деловые поездки',
}

const StyledAppText = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_48_40_bold};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_38_32_bold}
  }
`;
const StyledMainLayout = styled(MainLayout)`
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
`;
const ContentContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: ${BreakpointsEnum.md}px) {
    margin: 0;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const TopContentContainer = styled(ContentContainer)`
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const InnerContentContainer = styled.div`
  padding: 0 72px;

  @media (max-width: ${BreakpointsEnum.md}px) {
    padding: 0 16px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
`;
const TopInnerContentContainer = styled.div`
  padding: 0 72px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (max-width: ${BreakpointsEnum.md}px) {
    padding: 0 16px;
  }
`;
const Root = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: -32px;
  margin-bottom: -32px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: -15px;
  }
`;
const Container = styled.div`
  width: 100%;
  padding-top: 36px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (max-width: ${BreakpointsEnum.md}px) {
    padding-top: 25px;
  }
`;
const TabsContainer = styled.div`
  margin-top: 37px;

  @media (max-width: ${BreakpointsEnum.lgm}px) {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 33px;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const InnerContainer = styled.div`
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;
