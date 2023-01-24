import { Toaster } from 'entities';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useProfileUpdate } from 'shared/qraphql/mututions/__generated__/profileUpdate.mutation';

import { EditAccountForm } from '../types';
import { GetMeToEditDocument } from './__generated__/getMeToEdit.query';

type UpdateProfileProps = {
  oldName: string;
  oldAvatar?: string;
};

const useUpdateProfileForm = ({ oldName, oldAvatar }: UpdateProfileProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<EditAccountForm>({
    defaultValues: {
      name: oldName,
      imageUrl: oldAvatar,
    },
    mode: 'onChange',
  });
  const watchName = useWatch({ control, name: 'name' });
  const [profileUpdate] = useProfileUpdate({
    refetchQueries: [{ query: GetMeToEditDocument }],
  });

  const { showToast } = Toaster.useCallToast();

  const onSubmit = async (values: EditAccountForm) => {
    try {
      const { data } = await profileUpdate({ variables: { name: values.name, avatar: values.imageUrl } });
      // TODO: remove console.log
      showToast(t('toasters.saved'), 'info');
      console.log('user on useUpdateProfileForm: ', data);
    } catch (err) {
      showToast(t('toasters.error'));
      // TODO: remove console.log
      console.log('error on update profile: ', err);
    }
  };

  // fix for sometimes lost cache data
  useEffect(() => {
    if (oldName) {
      setValue('name', oldName);
    }
  }, [oldName, setValue]);
  useEffect(() => {
    if (oldAvatar) {
      setValue('imageUrl', oldAvatar);
    }
  }, [oldAvatar, setValue]);

  return { onSubmit: handleSubmit(onSubmit), isSubmitting, isValid, watchName, control };
};

export default useUpdateProfileForm;
