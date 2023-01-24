import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

import { Coins, Support } from '../../../../../public/svg/components';

interface AdvantagesProps {
  payPicSrc: string;
  ownerPicSrc: string;
}

const Advantages: FC<AdvantagesProps> = ({ payPicSrc, ownerPicSrc }) => {
  const { colors } = useTheme();
  const { t } = useTranslation('homePage', { keyPrefix: 'advantages' });
  return (
    <MainContainer>
      <Content>
        <TitleBlock>
          <LeftTitle>
            <TitleText variant={TextVariants.SECONDARY}>{t('title')}</TitleText>
          </LeftTitle>
          <RightTitle>
            <TitleInfoText>{t('titleInfo')}</TitleInfoText>
          </RightTitle>
        </TitleBlock>
        <CardsBlock>
          <LeftContainer>
            <TwoCardsBlock>
              <PaymentCard>
                <PaymentText>
                  <AppText variant={TextVariants.SECONDARY} font="title_40_32_medium">
                    {t('securePay')}
                  </AppText>
                </PaymentText>
                <ImageContainer>
                  <Image src={payPicSrc} alt="macbook" width={166} height={166} />
                </ImageContainer>
              </PaymentCard>
              <SupportCard>
                <SupportText variant={TextVariants.SECONDARY} font="title_32_24_medium">
                  {t('support')}
                </SupportText>
                <SupportIcon color={colors.greyScale[40]} />
              </SupportCard>
            </TwoCardsBlock>
            <FastDealCard>
              <FastDealText variant={TextVariants.SECONDARY} font="title_56_48_medium">
                {t('fastDeal')}
              </FastDealText>
              <IconContainer>
                <Coins color={colors.greyScale[40]} />
              </IconContainer>
            </FastDealCard>
          </LeftContainer>
          <RightContainer $src={ownerPicSrc}>
            <OwnerText font="title_56_48_medium">{t('ownersOnly')}</OwnerText>
          </RightContainer>
        </CardsBlock>
      </Content>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 64px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 56px 0;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 64px 0;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 56px 0 32px;
  }
`;

const LeftTitle = styled.div`
  display: flex;
  max-width: 357px;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 343px;
    ${({ theme: { typography } }) => typography.title_40_32_medium}
  }
`;

const RightTitle = styled.div`
  display: flex;
  max-width: 505px;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 343px;
    ${({ theme: { typography } }) => typography.body_22_14_regular}
  }
`;

const TitleText = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_56_48_regular};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_40_32_medium}
  }
`;

const TitleInfoText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[50]};
    ${theme.typography.body_28_16_regular};
    @media (max-width: ${BreakpointsEnum.sm}px) {
      ${theme.typography.body_22_14_regular}
    }
  `}
`;

const CardsBlock = styled.div`
  display: flex;
  width: 100%;
  height: 478px;
  gap: 48px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    height: auto;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
    align-items: center;
    gap: 24px;
  }
`;

const TwoCardsBlock = styled.div`
  display: flex;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const PaymentCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.greyScale[10]};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 48px 48px 0;
    max-width: 624px;
    height: 305px;
    width: 100%;
    border-radius: 24px;
  `};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
    flex-direction: column-reverse;
    align-items: flex-end;
    padding: 16px;
    gap: 26px;
    width: 343px;
    height: auto;
  }
`;

const PaymentText = styled.div`
  max-width: 194px;
  width: 100%;
  margin: 0 0 13px 8px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0 110px 0 0;
    justify-content: flex-start;
    max-width: 200px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  margin: 40px 48px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
    align-items: flex-end;
  }
`;

const SupportCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.greyScale[10]};
    display: flex;
    flex-direction: column;
    align-items: left;
    max-width: 176px;
    max-height: 305px;
    width: 100%;
    margin-bottom: 48px;
    border-radius: 24px;
  `};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    max-width: 343px;
  }
`;

const SupportText = styled(AppText)`
  margin: 12px 8px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
  }
`;

const SupportIcon = styled(Support)`
  margin: 40px 20px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
  }
`;

const RightContainer = styled.div<{ $src: string }>`
  ${({ $src }) => css`
    position: relative;
    max-width: 400px;
    max-height: 478px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 24px;
    background-image: url(${$src});

    @media (max-width: ${BreakpointsEnum.sm}px) {
      max-width: 343px;
      height: 478px;
    }
  `}
`;

const OwnerText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[0]};
    margin: 0 0 12px 8px;
    z-index: 293;
  `}
`;

const FastDealCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.greyScale[10]};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 848px;
    max-height: 130px;
    width: 100%;
    border-radius: 24px;
  `};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    align-items: flex-start;
    margin: 0;
    padding: 16px;
    gap: 36px;
    width: 343px;
  }
`;

const FastDealText = styled(AppText)`
  padding: 60px 8px 12px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
    ${({ theme: { typography } }) => typography.title_32_24_medium}
  }
`;

const IconContainer = styled.div`
  margin: 0 20px 32px 0;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
  }
`;

export default Advantages;
