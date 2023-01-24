import { useReactiveVar } from '@apollo/client';
import { authRoute, loginModalVar, tokenVar } from 'libs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask-next';
import { dayjs } from 'services';
import styled from 'styled-components';
import { ErrorText, Label } from 'styles/components/input';
import { BreakpointsEnum } from 'types';
import { AppText, BaseInput, Button, CheckBox, LinkTo } from 'ui';
import { patterns, setCookie } from 'utils';

import { CreateUser, useCreateUser } from '../../../../graphql/mutations/User/__generated__/createUser.mutation';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isAgree: boolean;
}

type RegistrationProps = {
  onCloseModal: () => void;
};

const MIN_AGE = 17;
const MAX_AGE = 100;

const Registration: FC<RegistrationProps> = ({ onCloseModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      birthDate: '',
      isAgree: false,
    },
  });
  const { t } = useTranslation('authPage');
  const router = useRouter();
  const { query } = router;

  const redirectPath = useReactiveVar(authRoute);

  const handleFormatDate = (date: string) => {
    return dayjs(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
  };

  const validateDate = (date: string) => {
    const isValidDate = dayjs(date, 'DD.MM.YYYY', true).isValid();
    const data = dayjs(date, 'DD.MM.YYYY', true);

    if (!isValidDate) return t('registration.fields.birthDate.errors.invalid');

    if (dayjs().get('years') - data.get('years') < MIN_AGE) {
      return t('registration.fields.birthDate.errors.age');
    }
    if (dayjs().get('years') - data.get('years') > MAX_AGE) {
      return t('registration.fields.birthDate.errors.invalid');
    }
  };

  const onSubmit = async (formData: FormValues) => {
    await fetchCreateUser({
      variables: {
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: handleFormatDate(formData.birthDate),
        },
      },
    });
  };

  const checkingOnEndRegistration = (data: CreateUser) => {
    if (!data.user__signUpByPhone_createUser.problem) {
      const token = data.user__signUpByPhone_createUser.token || '';
      const refreshToken = data.user__signUpByPhone_createUser.refreshToken || '';
      onCloseModal();
      setCookie('tokenForRegister', '');
      setCookie('refresh-token', refreshToken);
      loginModalVar({ isAuthModalOpen: false });
      setCookie('token', token);
      tokenVar(token);
      router.push({
        pathname: redirectPath,
        query: { ...query },
      });
      authRoute('');
    } else {
      setError('email', { message: data.user__signUpByPhone_createUser.problem.message });
    }
  };

  const createMaskForDate = (date: string) => {
    return [
      /[0-3]/,
      date[0] === '3' ? /[0-1]/ : /[0-9]/,
      '.',
      /[0-1]/,
      date[3] === '0' ? /[1-9]/ : /[0-2]/,
      '.',
      /[1-2]/,
      date[6] === '1' ? /[9]/ : /[0]/,
      date[6] === '1' ? /[2-9]/ : /[0]/,
      /[0-9]/,
    ];
  };
  const [fetchCreateUser, { loading }] = useCreateUser({ onCompleted: checkingOnEndRegistration });
  return (
    <ModalContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="lastName"
          rules={{
            required: `${t('error')}`,
          }}
          render={({ field }) => (
            <StyledBaseInput
              isLong
              label={`${t('registration.fields.lastName.title')}`}
              {...field}
              error={errors.lastName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: `${t('error')}`,
          }}
          render={({ field }) => (
            <StyledBaseInput
              isLong
              label={`${t('registration.fields.firstName.title')}`}
              {...field}
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: `${t('error')}`,
            pattern: {
              value: patterns.email,
              message: 'Email введен некорректно',
            },
          }}
          render={({ field }) => (
            <StyledBaseInput isLong label={t('registration.fields.email')} {...field} error={errors.email?.message} />
          )}
        />
        <Controller
          control={control}
          name="birthDate"
          rules={{
            required: `${t('error')}`,
            validate: validateDate,
          }}
          render={({ field }) => (
            <div>
              <Label font="caption_14_10_medium" isDisabled={false}>
                {t('registration.fields.birthDate.title')}
              </Label>
              <StyledInput
                mask={createMaskForDate(field.value)}
                onChange={field.onChange}
                value={field.value}
                disabled={false}
                placeholder={t('registration.fields.birthDate.placeholder')}
              />
              {errors.birthDate?.message && (
                <ErrorText font="caption_14_10_medium">{errors.birthDate.message}</ErrorText>
              )}
            </div>
          )}
        />
        <StyledButton type="submit" isLoading={loading} text={t('registration.buttons.primary')} isFullWight />
        <Controller
          name="isAgree"
          control={control}
          rules={{
            required: '',
            validate: (state) => state,
          }}
          render={({ field: { onChange, value, ...inputProps } }) => (
            <PrivacyContainer>
              <CheckBox onChange={onChange} checked={value} {...inputProps} />
              <Privacy font="caption_14_10_medium">
                {t('registration.fields.privacy.title')}
                &nbsp;
                <StyledLinkTo text={t('registration.fields.privacy.firstLink')} href="#" />
                &nbsp; {t('registration.fields.privacy.with')}&nbsp;&nbsp;
                <StyledLinkTo text={t('registration.fields.privacy.secondaryLink')} href="#" />
              </Privacy>
            </PrivacyContainer>
          )}
        />
      </StyledForm>
    </ModalContainer>
  );
};

export default Registration;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 8px;
  }
`;

const Privacy = styled(AppText)`
  max-width: 367px;
  color: ${({ theme: { colors } }) => colors.greyScale[80]} !important;

  @media (max-width: ${BreakpointsEnum.s}px) {
    ${({ theme: { typography } }) => typography.caption_16_12_regular};
  }
`;

const StyledBaseInput = styled(BaseInput)`
  max-width: 100%;
`;

const PrivacyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { typography } }) => typography.caption_16_12_medium}
  color: ${({ theme: { colors } }) => colors.greyScale[100]} !important;
`;

const StyledInput = styled(InputMask)<{ $isSuccess?: boolean; $isError?: boolean }>`
  border: ${({ theme: { colors }, $isError }) => ($isError ? `1px solid ${colors.additional.red}` : 'none')};
  padding: ${({ $isError }) => ($isError ? '11px 16px' : '12px 16px')};
  color: ${({ theme: { colors }, $isSuccess }) => ($isSuccess ? colors.additional.green : colors.greyScale[100])};

  border-radius: 12px;
  width: 100%;
  outline: none;
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};

  &:disabled {
    color: ${({ theme: { colors } }) => colors.greyScale[40]};
    cursor: not-allowed;
  }

  &:-internal-autofill-selected {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    color: ${({ theme: { colors } }) => colors.greyScale[100]} !important;
    background-image: none !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]};
    padding: 11px 15px;
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}
`;
