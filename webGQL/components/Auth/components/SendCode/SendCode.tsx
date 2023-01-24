import { SignIn, useSignIn } from 'graphql/mutations/User/__generated__/sendCode.mutation';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, LightButton, PhoneInput } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { SendCodeStepsEnum } from '../../Auth';

interface FormValues {
  phone: string;
}

type SendCodeTypes = {
  isLogin?: boolean;
  onToggle: () => void;
  onSetPhone: (phone: string) => void;
  onChangeStep: (step: SendCodeStepsEnum) => void;
};

const SendCode: FC<SendCodeTypes> = ({ isLogin, onToggle, onChangeStep, onSetPhone }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const { t } = useTranslation('authPage');

  const handleValidateForm = (data: SignIn) => {
    if (data.user__signInByPhone_sendCode.problem?.message) {
      setError('phone', { message: data.user__signInByPhone_sendCode.problem?.message });
    } else {
      onChangeStep(SendCodeStepsEnum.SECOND);
    }
  };

  const [fetchSignIn, { loading }] = useSignIn({ onCompleted: handleValidateForm });

  const onSubmit = async (data: FormValues) => {
    await fetchSignIn({ variables: { input: { phone: `+${data.phone}` } } });
    onSetPhone(data.phone);
  };

  const validatePhone = (phone: string) => {
    if (phone.trim().length !== 11) {
      return `${t('login.error')}`;
    }
  };

  return (
    <ModalContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          rules={{
            required: `${t('error')}`,
            validate: validatePhone,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <StyledPhoneInput error={errors.phone?.message} onChange={onChange} value={value} />
          )}
        />
        <StyledButton
          type="submit"
          text={isLogin ? `${t('login.buttons.primaryButton')}` : `${t('registration.buttons.third')}`}
          isFullWight
          isLoading={loading}
        />
      </StyledForm>

      <GuestContainer>
        <GuestText font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {isLogin ? t('login.prompt') : t('registration.prompt')}
        </GuestText>
        <LightButton
          text={isLogin ? `${t('login.buttons.secondaryButton')}` : `${t('login.buttons.primaryButton')}`}
          isUnderline
          size={LightButtonSize.SMALL}
          onClick={onToggle}
        />
      </GuestContainer>
    </ModalContainer>
  );
};

export default SendCode;

const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${BreakpointsEnum.s}px) {
    justify-content: space-between;
  }
`;

const StyledPhoneInput = styled(PhoneInput)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

const GuestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 32px;
  align-items: center;
  height: 40px;
`;

const GuestText = styled(AppText)``;

const StyledForm = styled.form`
  width: 100%;
`;
