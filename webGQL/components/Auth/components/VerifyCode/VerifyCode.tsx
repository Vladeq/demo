import { useReactiveVar } from '@apollo/client';
import { ConfirmCode, useConfirmCode } from 'graphql/mutations/User/__generated__/confirmCode.mutation';
import useCountDown from 'hooks/useCountDown';
import { authRoute, loginModalVar, tokenVar } from 'libs/apollo-client/react-variables';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button, CodeInput, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';
import { setCookie } from 'utils/cookie';
import { formatPhoneNumber } from 'utils/phone';

import { useSignIn } from '../../../../graphql/mutations/User/__generated__/sendCode.mutation';
import { SendCodeStepsEnum } from '../../Auth';

interface FormValues {
  code: string;
}
const BREAK = 60;

type VerifyCodeProps = {
  phone: string;
  onCloseModal: () => void;
  onChangeStep: (step: SendCodeStepsEnum) => void;
};

const VerifyCode: FC<VerifyCodeProps> = ({ phone, onChangeStep, onCloseModal }) => {
  const [timeIndex, setTimeIndex] = useState(0);
  const secondsLeft = useCountDown(BREAK, timeIndex);
  const isShowTimer = secondsLeft > 0;
  const { t } = useTranslation('authPage');
  const redirectPath = useReactiveVar(authRoute);
  const router = useRouter();
  const { query } = router;

  const settingFormErrors = (data: ConfirmCode) => {
    if (data.user__signInByPhone_confirmCode.problem?.message) {
      setError('code', { message: data.user__signInByPhone_confirmCode.problem?.message });
    } else if (data.user__signInByPhone_confirmCode.user?.id) {
      const token = data.user__signInByPhone_confirmCode.token || '';
      const refreshToken = data.user__signInByPhone_confirmCode.refreshToken || '';

      onCloseModal();
      loginModalVar({ isAuthModalOpen: false });

      setCookie('token', token);
      setCookie('refresh-token', refreshToken);
      tokenVar(token);

      router.push({
        pathname: redirectPath,
        query: { ...query },
      });
      authRoute('');
    } else {
      setCookie('tokenForRegister', data.user__signInByPhone_confirmCode.token!);
      onChangeStep(SendCodeStepsEnum.THIRD);
    }
  };

  const [fetchSignIn, { loading }] = useSignIn({ onCompleted: () => setTimeIndex(timeIndex + 1) });

  const [fetchConfirmCode] = useConfirmCode({ onCompleted: settingFormErrors });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const validateCode = (code: string) => {
    if (code?.length !== 4) {
      return t('confirm.error');
    }
  };

  const sendCode = async () => {
    await fetchSignIn({ variables: { input: { phone: `+${phone}` } } });
  };

  const onSubmit = async (formData: FormValues) => {
    await fetchConfirmCode({ variables: { input: { smscode: formData.code, phone: `+${phone}` } } });
  };

  return (
    <ModalContainer>
      <Description font="body_24_16_medium" variant={TextVariants.SECONDARY}>
        {t('confirm.description')} {formatPhoneNumber(phone)}
      </Description>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="code"
          control={control}
          rules={{
            required: t('error'),
            validate: validateCode,
          }}
          render={({ field: { onChange } }) => <CodeInput count={4} onChange={onChange} error={errors.code?.message} />}
        />
        <StyledButton type="submit" text={t('confirm.buttons.primary')} isFullWight isLoading={loading} />
      </StyledForm>

      <GuestContainer>
        <GuestText font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          Не получили код?
        </GuestText>
        {isShowTimer ? (
          <Time font="body_20_14_medium" variant={TextVariants.SECONDARY}>
            00:{secondsLeft}
          </Time>
        ) : (
          <StyledLightButton
            text={t('confirm.buttons.secondary')}
            isUnderline
            size={LightButtonSize.NORMAL}
            onClick={sendCode}
          />
        )}
      </GuestContainer>
    </ModalContainer>
  );
};

export default VerifyCode;

const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StyledLightButton = styled(LightButton)`
  font-size: 14px;
`;

const GuestContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-top: 16px;
  align-items: center;
  height: 40px;
`;

const GuestText = styled(AppText)``;

const StyledForm = styled.form`
  width: 100%;
`;

const Description = styled(AppText)`
  margin-bottom: 16px;
  max-width: 350px;
`;

const Time = styled(AppText)``;
