import { Toaster } from 'entities';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useGetMe } from 'screens/ViewerScreen/model/__generated__/getMe.query';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { getAuthUser } from '../../auth/models/useCognito';
import { ChangePhoneFormType } from '../types';
import { useCustomerSendSmsCode } from './__generated__/customerSendSmsCode.mutation';

const useChangePhoneForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ChangePhoneFormType>({ defaultValues: { phone: '' }, mode: 'onBlur' });
  const watchPhone = useWatch({ control, name: 'phone' });
  const { t } = useTranslation();
  const { showToast } = Toaster.useCallToast();
  const [customerSendSmsCode] = useCustomerSendSmsCode();
  const { data: viewer } = useGetMe();

  const onSubmit = async (values: ChangePhoneFormType) => {
    try {
      const { data } = await customerSendSmsCode({ variables: { phone: `+${values.phone}` } });
      if (data?.customerSendSmsCode.success) {
        const cognitoUser = await getAuthUser();
        NavigationService.navigate(AppRoutes.EditPhoneCodeScreen, { phone: `+${values.phone}`, cognitoUser });
      } else {
        showToast(t('errors.phoneAlreadyExistsError'));
      }
    } catch (e) {
      console.log('e', e);
      showToast(t('errors.unknownError'));
    }
  };

  useEffect(() => {
    viewer?.me.phone && setValue('phone', viewer?.me.phone);
  }, [viewer, setValue]);

  return { onSubmit: handleSubmit(onSubmit), isSubmitting, watchPhone, control };
};

export default useChangePhoneForm;
