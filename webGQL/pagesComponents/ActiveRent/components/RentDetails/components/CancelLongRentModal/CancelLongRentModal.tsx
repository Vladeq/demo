import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, DatePicker } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { CancelRentRulesEnum } from '../../RentDetails';

type CancelLongRentModalProps = {
  hasActiveRent: boolean;
  onClose: () => void;
  rule: CancelRentRulesEnum;
};

type FormProps = {
  departureDate: string;
};

export const CancelLongRentModal: FC<CancelLongRentModalProps> = ({ hasActiveRent, rule, onClose }) => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'cancelRentModal' });
  const { t: tRules } = useTranslation('activeRentPage', { keyPrefix: 'cancelRentModal.longRentRules' });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormProps>({
    defaultValues: {
      departureDate: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (formData: FormProps) => {
    console.log(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const isAttention =
    rule === CancelRentRulesEnum.after24HoursBeforeRent ||
    rule === CancelRentRulesEnum.less14daysBeforeRent ||
    rule === CancelRentRulesEnum.less30DaysAfterRent;

  const cancelRentRules = {
    [CancelRentRulesEnum.beforeRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('beforeRent')}
        </Rules>
      </>
    ),
    [CancelRentRulesEnum.after24HoursBeforeRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('after24HoursBeforeRent')}
        </Rules>
      </>
    ),
    [CancelRentRulesEnum.less14daysBeforeRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('less14daysBeforeRent')}
        </Rules>
      </>
    ),
    [CancelRentRulesEnum.less30DaysAfterRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('less30DaysAfterRent')}
        </Rules>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('less30DaysAfterRentExtraPayment')}
        </Rules>
        <Cost font="body_20_14_medium" variant={TextVariants.SECONDARY}>
          ХХХ тенге
        </Cost>
      </>
    ),
    [CancelRentRulesEnum.after30DaysAndChargebackAfterRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('after30DaysAndChargebackAfterRent')}
        </Rules>
        <Cost font="body_20_14_medium" variant={TextVariants.SECONDARY}>
          ХХХ тенге
        </Cost>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('contactSupport')}
        </Rules>
      </>
    ),
    [CancelRentRulesEnum.after30DaysAndRechargeAfterRent]: (
      <>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {tRules('after30DaysAndRechargeAfterRent')}
        </Rules>
        <Cost font="body_20_14_medium" variant={TextVariants.SECONDARY}>
          ХХХ тенге
        </Cost>
      </>
    ),
    [CancelRentRulesEnum.after30DaysNoChargebackNoRechargeAfterRent]: <></>,
  };

  const isRulesVisible = isDirty && rule !== CancelRentRulesEnum.after30DaysNoChargebackNoRechargeAfterRent;

  return (
    <Root>
      <Inner>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {hasActiveRent ? (
            <>
              <Controller
                name="departureDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <InputContainer>
                    <StyledDatePicker
                      label={t('selectDepartureDateLabel')}
                      placeholderText={t('selectDepartureDate')}
                      onChange={onChange}
                    />
                  </InputContainer>
                )}
              />
              {isRulesVisible && (
                <RulesConteainer $isAttention={isAttention}>
                  <RulesTitle font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                    {t('shortRentRulesTitle')}
                  </RulesTitle>
                  {cancelRentRules[rule]}
                </RulesConteainer>
              )}
            </>
          ) : (
            <RulesConteainer $isAttention={isAttention}>
              <RulesTitle font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                {t('shortRentRulesTitle')}
              </RulesTitle>
              {cancelRentRules[rule]}
            </RulesConteainer>
          )}

          <Footer>
            <StyledButton
              isFullWight
              text={t('goBack')}
              size={ButtonSize.CARDS}
              variant={ButtonVariant.SECONDARY}
              onClick={handleCancel}
            />
            <StyledButton
              type="submit"
              isFullWight
              text={t('cancelRent')}
              size={ButtonSize.CARDS}
              variant={ButtonVariant.PRIMARY}
            />
          </Footer>
        </StyledForm>
      </Inner>
    </Root>
  );
};

const Root = styled.div`
  padding: 8px;
`;

const Inner = styled.div``;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  height: 48px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
  }
`;

const StyledForm = styled.form``;

const InputContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledDatePicker = styled(DatePicker)`
  max-width: 100%;
`;

const RulesConteainer = styled.div<{ $isAttention: boolean }>`
  padding: 16px 24px;
  background-color: ${({ $isAttention, theme: { colors } }) =>
    $isAttention ? colors.additional.redLight : colors.greyScale[10]};
  border-radius: 12px;
  margin-bottom: 24px;
`;

const RulesTitle = styled(AppText)`
  margin-bottom: 8px;
`;

const Rules = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const Cost = styled(AppText)`
  margin-top: 8px;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;
