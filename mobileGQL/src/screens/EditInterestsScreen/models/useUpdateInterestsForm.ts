import { Toaster } from 'entities';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetMeToEditDocument } from 'screens/EditViewerScreen/models/__generated__/getMeToEdit.query';

import { UpdateInterestsForm, UpdateInterestsProps } from '../types';
import { useUpdateInterests } from './__generated__/updateInterest.mutation';

const useUpdateInterestsForm = ({ oldInterests }: UpdateInterestsProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateInterestsForm>({
    defaultValues: {
      interests: oldInterests,
    },
    mode: 'onChange',
  });
  const [updateInterests] = useUpdateInterests({
    refetchQueries: [{ query: GetMeToEditDocument }],
  });

  const { showToast } = Toaster.useCallToast();

  const onSubmit = async (values: UpdateInterestsForm) => {
    try {
      const { data } = await updateInterests({ variables: { tagIds: values.interests } });
      // TODO: remove console.log
      showToast(t('toasters.saved'), 'info');
      console.log('user on useUpdateInterestsForm: ', data);
    } catch (err) {
      // TODO: remove console.log
      showToast(t('toasters.error'));
      console.log('error on update profile: ', err);
    }
  };

  return { onSubmit: handleSubmit(onSubmit), isSubmitting, control };
};

export default useUpdateInterestsForm;
