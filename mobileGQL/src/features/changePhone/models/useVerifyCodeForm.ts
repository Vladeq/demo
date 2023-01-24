import { CognitoUser } from 'amazon-cognito-identity-js';
import { useCallback, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { changePhoneNumber } from '../../auth/models/useCognito';
import { VerifyCodeFormType } from '../types';
import { useCustomerVerifySmsCode } from './__generated__/customerVerifySmsCode.mutation';

const useVerifyCodeForm = (cellCount: number, cognitoUser: CognitoUser | null, phone: string) => {
  const { t } = useTranslation();
  const {
    setError,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeFormType>({ defaultValues: { code: '' } });

  const {
    field: { value, onChange },
  } = useController({ control, name: 'code' });

  const [customerVerifySmsCode] = useCustomerVerifySmsCode();

  const onSubmit = async (values: VerifyCodeFormType) => {
    try {
      const { data } = await customerVerifySmsCode({ variables: { code: +values.code } });
      if (data?.customerVerifySmsCode.success) {
        try {
          await changePhoneNumber(phone, cognitoUser);
          NavigationService.navigate(AppRoutes.SettingsScreen);
        } catch (error) {
          setError('code', { message: t('features.auth.errors.changeNumberError') });
        }
      } else {
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
