import { GuarantorModel } from '__generated__/types';
import { useEditGuarantor } from 'graphql/mutations/User/__generated__/editGuarantor.mutation';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { notify } from 'services';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, BaseInput, Button, PhoneInput } from 'ui';

type EmergencyFormProps = {
  close: () => void;
  index: number;
  guarantors: GuarantorModel[];
};

const EmergencyForm: FC<EmergencyFormProps> = ({ close, index, guarantors }) => {
  const [fetchEditGuarantor] = useEditGuarantor();

  const { firstName = '', lastName = '', phone = '' } = guarantors[index] || {};

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<InputData>({
    defaultValues: {
      nameEmergency: firstName,
      surnameEmergency: lastName,
      phoneNumber: phone,
    },
    mode: 'onBlur',
  });

  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });

  const validatePhone = (phoneNumber: string) => {
    if (phoneNumber.trim().length !== 11) {
      return `${t('error')}`;
    }
  };

  const onSubmit = async (formData: InputData) => {
    const { nameEmergency, surnameEmergency, phoneNumber } = formData;
    await fetchEditGuarantor({
      variables: {
        input: {
          firstName: nameEmergency,
          lastName: surnameEmergency,
          phone: phoneNumber.length === 11 ? `+${phoneNumber}` : phoneNumber,
        },
      },
      onCompleted: () => notify(t('emergencyChanged')),
      onError: () => notify(t('somethingError')),
    });
    close();
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('name')}
          </Label>
          <Controller
            control={control}
            name="nameEmergency"
            render={({ field }) => (
              <StyledBaseInput isLong {...field} error={errors.nameEmergency && t('requiredField')} />
            )}
            rules={{ required: true }}
          />
        </FormItem>
        <FormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('surname')}
          </Label>
          <Controller
            control={control}
            name="surnameEmergency"
            render={({ field }) => (
              <StyledBaseInput isLong {...field} error={errors.surnameEmergency && t('requiredField')} />
            )}
            rules={{ required: true }}
          />
        </FormItem>
        <FormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('phoneNumber')}
          </Label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => <PhoneInput {...field} error={errors.phoneNumber?.message} />}
            rules={{
              required: `${t('error')}`,
              validate: dirtyFields.phoneNumber ? validatePhone : undefined,
            }}
          />
        </FormItem>
        <StyledButton text={t('save')} isFullWight type="submit" />
      </Form>
    </Root>
  );
};

export default EmergencyForm;

type InputData = {
  nameEmergency: string;
  surnameEmergency: string;
  phoneNumber: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormItem = styled.div`
  margin-bottom: 16px;
`;
const Form = styled.form`
  width: 100%;
`;
const Label = styled(AppText)`
  margin-bottom: 8px;
`;
const StyledButton = styled(Button)`
  margin-top: 24px;
`;
const StyledBaseInput = styled(BaseInput)`
  max-width: 100%;
  width: 100%;
`;
