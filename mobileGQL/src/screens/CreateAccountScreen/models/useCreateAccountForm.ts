import { useFormContext, useWatch } from 'react-hook-form';
import { useProfileUpdate } from 'shared/qraphql/mututions/__generated__/profileUpdate.mutation';

import { CreateAccountForm } from '../types';

const useCreateAccountForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<CreateAccountForm>();
  const watchName = useWatch({ control, name: 'name' });
  const [profileUpdate] = useProfileUpdate();
  // TODO: remove comment
  //   const { showToast } = Toaster.useCallToast();

  const onSubmit = async (values: CreateAccountForm) => {
    try {
      const { data } = await profileUpdate({
        variables: { name: values.name, avatar: values.imageUrl, tagIds: values.tags },
      });
      // TODO: remove console.log
      console.log('user on useCreateAccountForm: ', data);
    } catch (err) {
      // TODO: remove console.log
      console.log('error on update profile: ', err);
    }
  };

  return { onSubmit: handleSubmit(onSubmit), isSubmitting, isValid, watchName, control };
};

export default useCreateAccountForm;
