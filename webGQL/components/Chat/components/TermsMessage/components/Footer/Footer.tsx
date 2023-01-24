import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { formatDateToRange, handleDivisionOnCategories } from 'utils';

import { Header } from '../Header';
import { HeaderProps } from '../Header/Header';

interface FooterProps extends HeaderProps {
  cost: string;
  arrivalDate: string | null;
  departureDate: string | null;
  isShortPeriodType: boolean;
}

const Footer: FC<FooterProps> = ({ arrivalDate, cost, departureDate, isShortPeriodType, message, ...headerProps }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.termsMessage' });

  const priceInDate = isShortPeriodType ? t('priceInDay') : t('priceInMonth');

  const formattedPrice = `${handleDivisionOnCategories(cost)} ₸`;
  const formattedArrivalDate = arrivalDate ? formatDateToRange(arrivalDate) : '';
  const formattedDepartureDate = departureDate ? formatDateToRange(departureDate) : '';

  const isShowDepartureDate = formattedDepartureDate && isShortPeriodType;

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <InfoCard>
        <InfoTitle font="body_20_14_medium">{priceInDate}</InfoTitle>
        <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
          {formattedPrice}
        </AppText>
      </InfoCard>
      {formattedArrivalDate && (
        <InfoCard>
          <InfoTitle font="body_20_14_medium">{t('startDate')}</InfoTitle>
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {formattedArrivalDate}
          </AppText>
        </InfoCard>
      )}
      {isShowDepartureDate && (
        <InfoCard>
          <InfoTitle font="body_20_14_medium">{t('endDate')}</InfoTitle>
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {formattedDepartureDate}
          </AppText>
        </InfoCard>
      )}

      {isMobile && <Header {...headerProps} isShortPeriodType={isShortPeriodType} message={message} />}
    </Root>
  );
};

export default Footer;

const Root = styled.div`
  display: flex;
  grid-gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;

const InfoCard = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    padding: 12px 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;

    background-color: ${colors.greyScale[10]};
    border-radius: 8px;
  `}
`;

const InfoTitle = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;
