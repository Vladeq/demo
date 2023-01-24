import { FEE_PERCENTS_SHORT_TERM, nightsPlural } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { handleDivisionOnCategories, handleWordsDeclination } from 'utils';

type PriceDetailProps = {
  price: string;
  nights?: number;
  total: number;
  isCorrectDate: boolean;
};

const PriceDetail: FC<PriceDetailProps> = ({ price, nights, total, isCorrectDate }) => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'priceDetail' });

  const { getIsBreakpoint } = useClientSize();

  const numberOfNightsString = nights && handleWordsDeclination(nights, nightsPlural);
  const resultText = nights ? `${handleDivisionOnCategories(String(total * nights))}` : '';
  const priceAndCountNightsSubtitle = `${price} 〒 х ${nights} ${numberOfNightsString}`;
  const displayedPriceAndCountNightsSubtitle = isCorrectDate ? priceAndCountNightsSubtitle : t('incorrectDates');

  const isWidthLgm = getIsBreakpoint('lgm');
  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthLgm ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('title')}
      </AppText>
      <Container>
        <InnerWrapper>
          <Item>
            <StyledAppText font={isWidthLgm ? 'body_20_14_regular' : 'body_24_16_regular'}>
              {displayedPriceAndCountNightsSubtitle}
            </StyledAppText>
            <AppText variant={TextVariants.SECONDARY} font={isWidthLgm ? 'body_20_14_medium' : 'body_24_16_medium'}>
              {`${resultText} 〒`}
            </AppText>
          </Item>
          <Item>
            <StyledAppText font={isWidthLgm ? 'body_20_14_regular' : 'body_24_16_regular'}>{`${t(
              'serviceCommission',
            )} ${FEE_PERCENTS_SHORT_TERM}%`}</StyledAppText>
            <AppText variant={TextVariants.SECONDARY} font={isWidthLgm ? 'body_20_14_medium' : 'body_24_16_medium'}>
              {t('feeIncluded')}
            </AppText>
          </Item>
        </InnerWrapper>
        <Item>
          <StyledAppText font={isWidthLgm ? 'body_20_14_regular' : 'body_24_16_regular'}>{t('total')}</StyledAppText>
          <AppText variant={TextVariants.SECONDARY} font={isWidthLgm ? 'body_20_14_medium' : 'body_24_16_medium'}>
            {`${resultText} 〒`}
          </AppText>
        </Item>
      </Container>
    </Root>
  );
};

export default PriceDetail;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
  }
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const Root = styled.div`
  position: static;
  margin-top: 16px;
  width: 100%;
  top: 167px;
  display: flex;
  padding: 16px 0 16px 0;
  flex-direction: column;
  gap: 24px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border-radius: 15px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    position: sticky;
    margin-top: 11px;
    padding: 16px 19px 16px 16px;
    width: 400px;
    background: ${({ theme: { colors } }) => colors.greyScale[10]};
  }
`;
