import { useEditBirthdate } from 'graphql/mutations/User/__generated__/editBirthdate.mutation';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask-next';
import { dayjs, notify } from 'services';
import styled from 'styled-components';
import { ErrorText } from 'styles/components/input';
import { Button } from 'ui';

type BirthdateFormProps = {
  close: () => void;
  birthDate: string;
};

const MIN_AGE = 17;
const MAX_AGE = 100;

const BirthdateForm: FC<BirthdateFormProps> = ({ close, birthDate }) => {
  const [fetchBirthdate] = useEditBirthdate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputData>({
    defaultValues: {
      birthDate,
    },
    mode: 'onBlur',
  });

  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });

  const onSubmit = async (data: InputData) => {
    await fetchBirthdate({
      variables: {
        input: {
          birthdate: handleFormatDate(data.birthDate),
        },
      },
      onCompleted: () => notify(t('birthdateChanged')),
      onError: () => notify(t('somethingError')),
    });
    close();
  };

  const handleFormatDate = (date: string) => {
    return dayjs(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
  };

  const validateDate = (date: string) => {
    const isValidDate = dayjs(date, 'DD.MM.YYYY', true).isValid();
    const data = dayjs(date, 'DD.MM.YYYY', true);

    if (!isValidDate) return t('birthdateErrorInvalid');

    if (dayjs().get('years') - data.get('years') < MIN_AGE) {
      return t('birthdateErrorAge');
    }
    if (dayjs().get('years') - data.get('years') > MAX_AGE) {
      return t('birthdateErrorInvalid');
    }
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="birthDate"
          rules={{
            required: `${t('requiredField')}`,
            validate: validateDate,
          }}
          render={({ field }) => (
            <div>
              <StyledInput
                mask="99.99.9999"
                value={field.value}
                disabled={false}
                placeholder={t('formatDate')}
                onChange={field.onChange}
                $isError={Boolean(errors.birthDate?.message)}
              />
              {errors.birthDate?.message && (
                <ErrorText font="caption_14_10_regular">{errors.birthDate.message}</ErrorText>
              )}
            </div>
          )}
        />
        <StyledButton text={t('save')} isFullWight type="submit" />
      </Form>
    </Root>
  );
};

export default BirthdateForm;

type InputData = {
  birthDate: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  width: 100%;
`;
const StyledButton = styled(Button)`
  margin-top: 24px;
`;
const StyledInput = styled(InputMask)<{ $isSuccess?: boolean; $isError?: boolean }>`
  border: ${({ theme: { colors }, $isError }) => ($isError ? `1px solid ${colors.additional.red}` : 'none')};
  padding: ${({ $isError }) => ($isError ? '11px 16px' : '12px 16px')};
  color: ${({ theme: { colors }, $isSuccess }) => ($isSuccess ? colors.additional.green : colors.greyScale[100])};

  border-radius: 12px;
  width: 100%;
  outline: none;
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};

  &:disabled {
    color: ${({ theme: { colors } }) => colors.greyScale[40]};
    cursor: not-allowed;
  }

  &:-internal-autofill-selected {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    color: ${({ theme: { colors } }) => colors.greyScale[100]} !important;
    background-image: none !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]};
    padding: 11px 15px;
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}
`;
