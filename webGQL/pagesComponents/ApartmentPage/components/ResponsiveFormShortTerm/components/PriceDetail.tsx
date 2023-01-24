import { FEE_PERCENTS_SHORT_TERM, nightsPlural } from 'constains';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';
import { handleDivisionOnCategories, handleWordsDeclination } from 'utils';

type PriceDetailProps = {
  price: string;
  nights?: number;
  total: number;
  isCorrectDate: boolean;
};

const PriceDetail: FC<PriceDetailProps> = ({ price, nights, total, isCorrectDate }) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'priceDetail' });

  const numberOfNightsString = nights && handleWordsDeclination(nights, nightsPlural);
  const resultText = nights ? `${handleDivisionOnCategories(String(total * nights))}` : '';
  const priceAndCountNightsSubtitle = `${price} 〒 х ${nights} ${numberOfNightsString}`;
  const displayedPriceAndCountNightsSubtitle = isCorrectDate ? priceAndCountNightsSubtitle : t('incorrectDates');

  return (
    <Root>
      <InnerWrapper>
        <Item>
          <StyledAppText font="body_20_14_regular">{displayedPriceAndCountNightsSubtitle}</StyledAppText>
          <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
            {`${resultText} 〒`}
          </AppText>
        </Item>
        <Item>
          <StyledAppText font="body_20_14_regular">{`${t(
            'serviceCommission',
          )} ${FEE_PERCENTS_SHORT_TERM}%`}</StyledAppText>
          <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
            {t('feeIncluded')}
          </AppText>
        </Item>
      </InnerWrapper>
      <Item>
        <StyledAppText font="body_20_14_regular">{t('total')}</StyledAppText>
        <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
          {`${resultText} 〒`}
        </AppText>
      </Item>
    </Root>
  );
};

export default PriceDetail;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Root = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;
