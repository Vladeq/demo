import { useEditName } from 'graphql/mutations/User/__generated__/editName.mutation';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseInput, Button, CheckBox } from 'ui';

type NameFormProps = {
  close: () => void;
  firstName: string;
  lastName: string;
  middleName: string;
};

const NameForm: FC<NameFormProps> = ({ close, firstName, lastName, middleName }) => {
  const [isPatronymic, setIsPatronymic] = useState(true);

  const [fetchEditName] = useEditName();

  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm<InputData>({
    defaultValues: {
      firstName,
      lastName,
      middleName,
    },
    mode: 'onBlur',
  });

  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });

  const togglePatronymic = () => {
    setIsPatronymic(!isPatronymic);
  };

  const onSubmit = async (formData: InputData) => {
    await fetchEditName({
      variables: {
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: !isPatronymic ? null : formData.middleName,
        },
      },
      onCompleted: () => notify(t('fullNameChanged')),
      onError: () => notify(t('somethingError')),
    });
    close();
  };

  useEffect(() => {
    if (!isPatronymic) {
      resetField('middleName');
    }
  }, [isPatronymic, resetField]);

  return (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('name')}
          </Label>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => <StyledBaseInput isLong error={errors.firstName && t('requiredField')} {...field} />}
            rules={{ required: true }}
          />
        </FormItem>
        <FormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('surname')}
          </Label>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => <StyledBaseInput isLong error={errors.lastName && t('requiredField')} {...field} />}
            rules={{ required: true }}
          />
        </FormItem>
        <LastFormItem>
          <Label variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('patronymic')}
          </Label>
          <Controller
            control={control}
            name="middleName"
            render={({ field }) => (
              <StyledBaseInput
                disabled={!isPatronymic}
                isLong
                error={isPatronymic ? errors.middleName && t('requiredField') : undefined}
                {...field}
              />
            )}
            rules={{ required: isPatronymic }}
          />
        </LastFormItem>
        <ItemCheckbox>
          <StyledCheckBox checked={!isPatronymic} onChange={togglePatronymic} />
          <LabelCheckbox font="caption_16_12_regular">{t('notPatronymic')}</LabelCheckbox>
        </ItemCheckbox>
        <Button text={t('save')} isFullWight type="submit" />
      </Form>
    </Root>
  );
};

export default NameForm;

type InputData = {
  firstName: string;
  lastName: string;
  middleName: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledBaseInput = styled(BaseInput)`
  max-width: 100%;
  width: 100%;
`;
const FormItem = styled.div`
  margin-bottom: 16px;
`;
const LastFormItem = styled.div`
  margin-bottom: 27px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-bottom: 11px;
  }
`;
const Form = styled.form`
  width: 100%;
`;
const Label = styled(AppText)`
  margin-bottom: 8px;
`;
const ItemCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const LabelCheckbox = styled(AppText)`
  margin-left: 10px;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
const StyledCheckBox = styled(CheckBox)`
  cursor: pointer;
`;
