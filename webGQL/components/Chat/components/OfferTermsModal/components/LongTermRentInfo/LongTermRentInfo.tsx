import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, DatePicker } from 'ui';

type LongTermRentInfoProps = {
  costString: string;
  form: UseFormReturn<any, any>;
};

const LongTermRentInfo: FC<LongTermRentInfoProps> = ({ costString, form }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.OfferTermsModal' });

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <FormItem>
        {isMobile ? (
          <AppText font="caption_14_10_regular" variant={TextVariants.SECONDARY}>
            {t('arrivalDate')}
          </AppText>
        ) : (
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {t('arrivalDate')}
          </AppText>
        )}

        <FormItemWrapper>
          <FormProvider {...form}>
            <Controller
              name="arrivalDate"
              control={form.control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderText={t('arrivalDatePlaceholder')}
                  minDate={new Date()}
                  popperPlacement="top-end"
                  value={value}
                  hasReset
                  onChange={onChange}
                />
              )}
            />
          </FormProvider>
        </FormItemWrapper>
      </FormItem>
      <FormItem>
        {!isMobile && (
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {t('priceInMonth')}
          </AppText>
        )}
        <FormItemWrapper>
          <Item>
            {isMobile && (
              <StyledAppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
                {t('priceInMonth')}
              </StyledAppText>
            )}
            <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
              {costString}
            </AppText>
          </Item>
        </FormItemWrapper>
      </FormItem>
    </Root>
  );
};

export default LongTermRentInfo;

const Root = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
  padding: 8px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
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

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: row;
  }
`;

const FormItem = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: space-between;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    align-items: flex-start;
    flex-direction: column;
    row-gap: 4px;
  }
`;

const FormItemWrapper = styled.div`
  width: 100%;
  max-width: 288px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
  }
`;

const StyledAppText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    color: ${({ theme: { colors } }) => colors.greyScale[70]};
  }
`;
