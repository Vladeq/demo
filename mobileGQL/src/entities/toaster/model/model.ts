import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';

type ToastVariant = 'error' | 'info';

const useCallToast = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const showToast = (message?: string, type: ToastVariant = 'error') =>
    toast.show(message || t('entities.toaster.defaultMessage'), {
      type: type,
      placement: 'top',
      duration: 4000,
      animationType: 'zoom-in',
    });

  return { showToast };
};

export default useCallToast;
