import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { BaseModalProps } from 'types/card';
import { AppText, Button, DropdownDefault, Textarea } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

interface InputData {
  reason: string;
  annotation: string;
}

const CancelRentReasonModal: FC<BaseModalProps> = ({ close }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard.cancelRentReasonModal' });

  const onSubmit: SubmitHandler<InputData> = (data) => console.log(data);

  const options = [
    { label: t('reason1'), value: t('reason1') },
    { label: t('reason2'), value: t('reason2') },
    { label: t('reason3'), value: t('reason3') },
    { label: t('reason4'), value: t('reason4') },
    { label: t('reason5'), value: t('reason5') },
    { label: t('reason6'), value: t('reason6') },
  ];

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<InputData>({
    defaultValues: {
      reason: '',
      annotation: '',
    },
    mode: 'onChange',
  });

  return (
    <MainContainer>
      <TextContainer>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t('modalText')}
        </AppText>
        <WarningText font="body_20_14_regular">{t('warning')}</WarningText>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="reason"
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <StyledDropdownDefault
                  {...field}
                  isSearchable={false}
                  placeholder={t('reasonPlaceholder')}
                  label={t('reasonLabel')}
                  options={options}
                  onChange={(e) => field.onChange(e.value)}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="annotation"
            rules={{
              required: true,
              validate: (value) => {
                if (value?.length > 500) {
                  return 'isLong';
                }
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <StyledTextarea
                placeholder={t('annotationPlaceholder')}
                error={error}
                hasCounter
                maxLength={500}
                maxRows={5}
                {...field}
              />
            )}
          />
          <ButtonContainer>
            <StyledButton
              text={t('leftBtn')}
              size={ButtonSize.LONG_TEXT}
              variant={ButtonVariant.SECONDARY}
              onClick={close}
            />
            <StyledRightButton
              type="submit"
              text={t('rightBtn')}
              disabled={!isValid}
              size={ButtonSize.NORMAL}
              variant={ButtonVariant.PRIMARY}
            />
          </ButtonContainer>
        </StyledForm>
      </TextContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WarningText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 86px;
  padding: 0;
`;
const StyledRightButton = styled(Button)`
  width: 249px;
  padding: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 140px;

  textarea {
    min-height: auto;
  }

  overflow: hidden;
`;

const StyledDropdownDefault = styled(DropdownDefault)`
  .dropdown__placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
  .dropdown__menu-list {
    overflow: hidden;
  }
`;

export default CancelRentReasonModal;
