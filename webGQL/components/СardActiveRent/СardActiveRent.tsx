import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseCardProps, BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { RentPeriodType } from '../../__generated__/types';
import { Routes } from '../../constains';
import { hideText } from '../../styles/components/text';
import { Card } from './styled';

interface CardActiveRentProps extends BaseCardProps {
  paymentDate: string;
  rentType: RentPeriodType;
  id: string;
}

const CardActiveRent: FC<CardActiveRentProps> = ({ pictureSrc, title, address, price, paymentDate, rentType, id }) => {
  const { t } = useTranslation('ui');
  const router = useRouter();
  const isLongTerm = rentType === RentPeriodType.LongTerm;

  return (
    <ButtonWrapper onClick={() => router.push({ pathname: Routes.activeRent, query: { id } })}>
      <StyledCardContainer>
        <ImageContainer $src={pictureSrc} />
        <InfoContainer>
          <HeadContainer>
            <DescriptionContainer>
              <InnerContainer>
                <TitleContainer>
                  <TitleText variant={TextVariants.SECONDARY} font="title_22_18_medium">
                    {title}
                  </TitleText>
                  <Address>{address}</Address>
                </TitleContainer>
                <PriceContainer>
                  <PriceText variant={TextVariants.SECONDARY} font="title_36_26_bold">
                    {price} ₸{' '}
                  </PriceText>
                  <PricePeriod>{isLongTerm ? t('cards.perMonth') : t('cards.perDay')}</PricePeriod>
                </PriceContainer>
              </InnerContainer>
              <DateContainer>
                <DateText variant={TextVariants.SECONDARY} font="body_20_14_regular">
                  {t('cards.dateInfo')}
                </DateText>
                <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
                  {paymentDate}
                </AppText>
              </DateContainer>
            </DescriptionContainer>
            <ButtonContainer>
              <StyledButton text={t('buttons.btnWithSeller')} size={ButtonSize.SMALL} />
              <StyledButton
                text={t('buttons.btnWithSupport')}
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
              />
            </ButtonContainer>
          </HeadContainer>
        </InfoContainer>
      </StyledCardContainer>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  background: none;
  outline: none;
`;

const StyledCardContainer = styled(Card)`
  width: 100%;
  height: auto;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div<{ $src: string }>`
  display: flex;
  justify-content: flex-end;
  max-width: 203px;
  width: 100%;
  height: 204px;

  ${({ $src }) => css`
    background: url(${$src});
    background-size: 100%;
    background-position: center;
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: none;
    background-size: cover;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 16px;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-right: 10px;
  word-break: break-word;
  flex: 1;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

const TitleText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme }) => css`
      ${theme.typography.body_24_16_medium}
    `}
  }
  ${hideText(1)}
`;

const Address = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const PriceText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme }) => css`
      ${theme.typography.title_22_18_bold}
    `}
  }
`;

const PricePeriod = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_16_12_regular}
  `}
  padding-bottom: 5px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
`;

const DateContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    justify-content: space-between;
  }
`;

const DateText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[100]};
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme }) => css`
      color: ${theme.colors.greyScale[60]};
    `}
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 264px;
  width: 100%;
  gap: 10px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: none;
    gap: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default CardActiveRent;
