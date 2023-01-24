import { UserChatRole } from '__generated__/types';
import { Chat } from 'components';
import { Routes } from 'constains';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, IconButton, TextTabs } from 'ui';
import { ButtonSize } from 'ui/Button/Button';
import { IconButtonSize } from 'ui/IconButton/IconButton';
import { getQueryFromUrl, setCookie } from 'utils';

import { Add } from '../../../../../public/svg/components';
import { Ads, Requests } from '../index';

enum TabsValueType {
  ADS = 'ADS',
  REQUESTS = 'REQUESTS',
  CHAT = 'CHAT',
}

const CHAT_TAB_INDEX = 2;

const Header: FC = () => {
  const router = useRouter();
  const query = getQueryFromUrl(router.asPath);

  const isChat = Boolean(+query.isChat);

  const [currentTabIndex, setCurrentTabIndex] = useState(isChat ? CHAT_TAB_INDEX : 0);
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'header' });
  const { ref, inView } = useInView();

  const tabs = [
    { title: t('adsTab'), value: TabsValueType.ADS, component: <Ads /> },
    { title: t('requestTab'), value: TabsValueType.REQUESTS, component: <Requests /> },
    { title: t('chatTab'), value: TabsValueType.CHAT, component: <StyledChat chatRole={UserChatRole.Landlord} /> },
  ];

  const currentTab = tabs[currentTabIndex];

  const isCurrentTabChat = currentTab.value === TabsValueType.CHAT;

  const handleChangeActiveTab = (currentTabIndex: number) => () => {
    const isChatIndex = currentTabIndex === CHAT_TAB_INDEX;

    router.push({
      pathname: router.pathname,
      query: { ...query, isChat: +isChatIndex },
    });

    setCurrentTabIndex(currentTabIndex);
  };

  const goToCreateAdd = () => {
    setCookie('advertId', '');
    router.push(Routes.adCreate);
  };

  return (
    <MainContainer>
      <HeadContainer>
        <TitleBlock ref={ref}>
          <TitleText variant={TextVariants.SECONDARY} font="title_48_40_bold">
            {t('myAds')}
          </TitleText>
          <ButtonsContainer>
            <NewAddButton onClick={goToCreateAdd} size={ButtonSize.LONG_TEXT} text={t('btnAddNewAd')} />
            <StyledIconButton onClick={goToCreateAdd} IconComponent={Add} />
          </ButtonsContainer>
        </TitleBlock>
        <TextTabs tabs={tabs} activeTab={tabs[currentTabIndex]} handleChangeActiveTab={handleChangeActiveTab} />
      </HeadContainer>
      <FixedTitleBlock $isVisible={!inView}>
        <FixedTitleText variant={TextVariants.SECONDARY} font="body_20_14_medium">
          {t('myAds')}
        </FixedTitleText>
        <IconButton IconComponent={Add} size={IconButtonSize.SMALL} />
      </FixedTitleBlock>
      <InnerContainer>
        <Content $isCurrentTabChat={isCurrentTabChat}>{currentTab?.component}</Content>
      </InnerContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeadContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 24px 72px 0;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 25px 16px 0;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 17px auto 40px;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0px auto 33px;
  }
`;

const FixedTitleBlock = styled.div<{ $isVisible: boolean }>`
  display: none;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ $isVisible, theme: { colors } }) =>
      css`
        ${$isVisible &&
        css`
          display: flex;
          width: 100%;
          position: fixed;
          top: 72px;
          align-items: center;
          justify-content: space-between;
          background-color: ${colors.greyScale[10]};
          padding: 0 16px;
          z-index: 999;
        `}
      `}
  }
`;

const FixedTitleText = styled(AppText)`
  padding: 14px 0px;
`;

const TitleText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_38_32_bold}
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const NewAddButton = styled(Button)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const StyledIconButton = styled(IconButton)`
  display: none;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: block;
  }
`;

const InnerContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[30]};
  `}
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme }) => css`
      background-color: ${theme.colors.greyScale[0]};
    `}
  }
`;

const Content = styled.div<{ $isCurrentTabChat: boolean }>`
  display: flex;
  flex-direction: column;
  margin: ${({ $isCurrentTabChat }) => ($isCurrentTabChat ? '16px 72px 24px' : '40px 80px')};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
  }
`;

const StyledChat = styled(Chat)`
  height: 618px;
`;

export default Header;
