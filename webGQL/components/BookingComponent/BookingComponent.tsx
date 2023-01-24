import { FEE_PERCENTS_SHORT_TERM } from 'constains';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';
import { getPercentOnRent, handleDivisionOnCategories } from 'utils';

import { FormBooking } from './FormBooking';

interface BookingComponentProps {
  cost: number;
  lockedDates?: Array<{ startDate: string; endDate: string }>;
  period: 'perMonth' | 'perDay';
  isPaused?: boolean;
  middleRequest?: string;
}

const BookingComponent: FC<BookingComponentProps> = ({ cost, period, isPaused, middleRequest, lockedDates }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });

  const serviceCommission = Math.round(getPercentOnRent(cost, FEE_PERCENTS_SHORT_TERM));
  const showServiceCommission = handleDivisionOnCategories(String(serviceCommission));
  const showTotalPrice = handleDivisionOnCategories(String(cost + serviceCommission));

  return (
    <CardContainer>
      <InfoContainer>
        <PeriodContainer>
          {isPaused ? (
            <PeriodText font="title_36_26_bold">{showTotalPrice} ₸ </PeriodText>
          ) : (
            <AppText variant={TextVariants.SECONDARY} font="title_36_26_bold">
              {showTotalPrice} ₸{' '}
            </AppText>
          )}
          <PeriodText font="title_36_26_bold">{t(`${period}`)}</PeriodText>
        </PeriodContainer>
        <FeeContainer>
          <ServicesText font="caption_16_12_regular">
            {t('serviceFee')} {showServiceCommission} ₸ {t('feeIncluded')}
          </ServicesText>
        </FeeContainer>
        <NotifyContainer>
          <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
            {middleRequest}
          </AppText>
        </NotifyContainer>
        <FormBooking cost={cost} isPaused={isPaused} lockedDates={lockedDates} />
      </InfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.greyScale[10]};
    border: none;
    border-radius: 22px;
    width: 400px;
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PeriodText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    margin: 0 10px;
  `}
`;

const FeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const ServicesText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
  `}
`;

const NotifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 24px;
  align-items: center;
`;

export default BookingComponent;
