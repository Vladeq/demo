import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { TabsValueType, TabType } from 'types/tabs';
import { AppText, Tabs } from 'ui';
import { v4 as uuid } from 'uuid';

import { StepComponent } from './components';

const HowItWorks: FC = () => {
  const { t } = useTranslation('homePage');
  const longTermSteps = [
    { title: t('longTerm.title1'), info: t('longTerm.info1') },
    { title: t('longTerm.title2'), info: t('longTerm.info2') },
    { title: t('longTerm.title3'), info: t('longTerm.info3') },
    { title: t('longTerm.title4'), info: t('longTerm.info4') },
  ];
  const shortTermSteps = [
    { title: t('shortTerm.title1'), info: t('shortTerm.info1') },
    { title: t('shortTerm.title2'), info: t('shortTerm.info2') },
    { title: t('shortTerm.title3'), info: t('shortTerm.info3') },
    { title: t('shortTerm.title4'), info: t('shortTerm.info4') },
  ];
  const tabs = [
    { title: 'Краткосрочная', value: TabsValueType.SHORT, id: uuid() },
    { title: 'Долгосрочная', value: TabsValueType.LONG, id: uuid() },
  ];
  const [actualTab, setActualTab] = useState(tabs[0]);

  const changeTab = (actualTab: TabType) => () => {
    tabs.map((tab) => {
      if (tab.value === actualTab.value) {
        setActualTab(actualTab);
      }
      return tab;
    });
  };

  return (
    <MainContainer>
      <Content>
        <TitleContainer>
          <TitleText variant={TextVariants.SECONDARY} font="title_56_48_regular">
            {t('howItWorks.title')}
          </TitleText>
          <TitleInfo font="body_28_16_regular">{t('howItWorks.info')}</TitleInfo>
        </TitleContainer>
        <InnerContainer>
          <TabsContainer>
            <Tabs tabs={tabs} activeTab={actualTab} handleChangeActiveTab={changeTab} />
          </TabsContainer>
          {actualTab.value === TabsValueType.LONG ? (
            <StepsContainer>
              {longTermSteps.map((item, index) => {
                return <StepComponent key={index} index={index + 1} info={item.info} title={item.title} />;
              })}
            </StepsContainer>
          ) : (
            <StepsContainer>
              {shortTermSteps.map((item, index) => {
                return <StepComponent key={index} index={index + 1} info={item.info} title={item.title} />;
              })}
            </StepsContainer>
          )}
        </InnerContainer>
      </Content>
    </MainContainer>
  );
};

export default HowItWorks;

const MainContainer = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.greyScale[30]};
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 56px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 96px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 56px 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 624px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 343px;
  }
`;

const TitleText = styled(AppText)`
  text-align: center;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_40_32_medium}
  }
`;

const TitleInfo = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[50]};
    text-align: center;
  `}
`;

const TabsContainer = styled.div`
  width: 100%;
  max-width: 285px;
  margin-bottom: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 32px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 40px;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
