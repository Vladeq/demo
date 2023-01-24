import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { useCallback, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { passwordlessVerifyOTP } from '../../models';
import { VerifyCodeFormType } from '../types';

const useVerifyCodeForm = (cellCount: number, cognitoUser: CognitoUser | null) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeFormType>({ defaultValues: { code: '' } });

  const {
    field: { value, onChange },
  } = useController({ control, name: 'code' });

  const onSubmit = async (values: VerifyCodeFormType) => {
    try {
      const newCognitoUser = await passwordlessVerifyOTP(cognitoUser, values.code);
      newCognitoUser?.getSession(
        (session: CognitoUserSession | null) =>
          session && setError('code', { message: t('features.auth.errors.verifyCodeError') }),
      );

      if (!newCognitoUser) {
        setError('code', { message: t('features.auth.errors.verifyCodeError') });
      }
    } catch (err) {
      setError('code', { message: t('features.auth.errors.verifyCodeError') });
    }
  };

  const onChangeValidNumber = useCallback(
    (_value: string) => {
      if (/^[0-9]+$/.test(_value) || _value === '') {
        onChange(_value.trim());
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (value.length === cellCount) {
      handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cellCount, handleSubmit]);

  return { value, onChange: onChangeValidNumber, errors, isSubmitting };
};

export default useVerifyCodeForm;
