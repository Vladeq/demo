import { Toaster } from 'entities';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { passwordlessSignIn, useAuthContext } from '../../models';
import { AuthFormType } from '../types';

const useAuthForm = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormType>({ defaultValues: { phone: '' }, mode: 'onBlur' });
  const watchPhone = useWatch({ control, name: 'phone' });
  const { setIsLoadingByPhone } = useAuthContext();
  const { showToast } = Toaster.useCallToast();

  const onSubmit = async (values: AuthFormType) => {
    try {
      setIsLoadingByPhone(true);
      const cognitoUser = await passwordlessSignIn(`+${values.phone}`);
      NavigationService.navigate(AppRoutes.CodeScreen, { cognitoUser, phone: `+${values.phone}` });
    } catch (e) {
      // TODO: remove console.log
      console.log('e from resend: ', e);
      showToast(t('errors.unknownError'));
    } finally {
      setIsLoadingByPhone(false);
    }
  };

  return { onSubmit: handleSubmit(onSubmit), isSubmitting, watchPhone, control };
};

export default useAuthForm;
