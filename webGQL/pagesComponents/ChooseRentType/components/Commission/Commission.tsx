import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';
import { handleDivisionOnCategories } from 'utils';

import { RentPeriodType } from '../../../../__generated__/types';

type CommissionType = {
  price: string;
  percent: number;
  rentType: RentPeriodType;
};

const getPlusPercentOnRent = (count: number, percent: number) => {
  const strResult = String(Math.round(count + (count / 100) * percent));

  return handleDivisionOnCategories(strResult);
};

const getMinusPercentOnRent = (count: number, percent: number) => {
  const strResult = String(Math.round(count - (count / 100) * percent));

  return handleDivisionOnCategories(strResult);
};

const Commission: FC<CommissionType> = ({ price, percent, rentType }) => {
  const { t } = useTranslation('formatPage', { keyPrefix: 'commission' });
  const priceNumber = Number(price.replaceAll(' ', ''));
  const isShortRent = rentType === RentPeriodType.ShortTerm;
  return (
    <CommissionContainer>
      <CommissionTitle font="caption_16_12_medium" variant={TextVariants.SECONDARY}>
        {isShortRent
          ? t('short.title', { price: getMinusPercentOnRent(priceNumber, 3) })
          : t('long.title', { price: getPlusPercentOnRent(priceNumber, 0) })}
      </CommissionTitle>
      <CommissionDescription font="caption_16_12_regular" $isLongRent={rentType === RentPeriodType.LongTerm}>
        {isShortRent
          ? t('short.description', { price: getPlusPercentOnRent(priceNumber, percent) })
          : t('long.description')}
      </CommissionDescription>
    </CommissionContainer>
  );
};

const CommissionTitle = styled(AppText)``;

const CommissionDescription = styled(AppText)<{ $isLongRent?: boolean }>`
  max-width: ${({ $isLongRent }) => ($isLongRent ? '316px' : '285px')};
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const CommissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  max-width: 366px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
  border-radius: 12px;
  margin-top: 16px;
`;

export default Commission;
