import { ShortTermRentCancellationPolicyType } from '__generated__/types';
import { rentCancellationPolicyMapping } from 'constains';
import dayjs from 'dayjs';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

type ShortTermRentInfoProps = {
  arrivalDate: string;
  departureDate: string;
  costString: string;
  shortTermRentCancellationPolicyType: ShortTermRentCancellationPolicyType | null;
};

const ShortTermRentInfo: FC<ShortTermRentInfoProps> = ({
  arrivalDate,
  departureDate,
  costString,
  shortTermRentCancellationPolicyType,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.OfferTermsModal' });

  const formattedArrivalDate = arrivalDate ? dayjs(arrivalDate).format('DD MMMM YYYY') : '';
  const formattedDepartureDate = departureDate ? dayjs(departureDate).format('DD MMMM YYYY') : '';

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <ItemContainer>
        <Item>
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {formattedArrivalDate}
          </AppText>
          <Label font="body_20_14_medium">{t('startDate')}</Label>
        </Item>
        <Item>
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {formattedDepartureDate}
          </AppText>
          <Label font="body_20_14_medium">{t('endDate')}</Label>
        </Item>
      </ItemContainer>
      <FormItem>
        {!isMobile && (
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {t('priceInDay')}
          </AppText>
        )}
        <FormItemWrapper>
          <Item>
            <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
              {costString}
            </AppText>
            {isMobile && <Label font="body_20_14_medium">{t('priceInDay')}</Label>}
          </Item>
        </FormItemWrapper>
      </FormItem>
      <ItemWrapper>
        <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
          {t('rentCancellationPolicy')}
        </AppText>
        {shortTermRentCancellationPolicyType && (
          <RulesWrapper>
            <AppText font="caption_16_12_medium" variant={TextVariants.SECONDARY}>
              {rentCancellationPolicyMapping[shortTermRentCancellationPolicyType].label}
            </AppText>
            <RulesText font="caption_16_12_regular">
              {rentCancellationPolicyMapping[shortTermRentCancellationPolicyType].text}
            </RulesText>
          </RulesWrapper>
        )}
      </ItemWrapper>
    </Root>
  );
};

export default ShortTermRentInfo;

const Root = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  gap: 24px;
`;

const RulesWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  gap: 8px;
  padding: 16px 24px;

  background: ${({ theme: { colors } }) => colors.greyScale[10]};
  border-radius: 12px;
`;

const Item = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  padding: 8px;

  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;

const Label = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;

const ItemContainer = styled.div`
  display: flex;

  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  gap: 16px;
`;

const FormItem = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const FormItemWrapper = styled.div`
  width: 100%;
  max-width: 288px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
  }
`;

const RulesText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
