import { EditEmail, useEditEmail } from 'graphql/mutations/User/__generated__/editEmail.mutation';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, BaseInput, BaseModal, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { patterns } from 'utils';

type ModalEmailProps = {
  onClose: () => void;
  isVisible: boolean;
};

type InputData = {
  email: string;
};

export const ModalEmail: FC<ModalEmailProps> = ({ onClose, isVisible }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();

  const [fetchEditEmail, { loading }] = useEditEmail();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isValid, errors },
  } = useForm<InputData>({
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const handleCompleteEditEmail = (data: EditEmail) => {
    if (data.user__profile_editEmail.problem?.message) {
      setError('email', { message: data.user__profile_editEmail.problem?.message });
    } else {
      setIsSubmited(true);
      setEmail(data.user__profile_editEmail.user?.email);
      notify(t('emailChanged'));
    }
  };

  const onSubmit = async (formData: InputData) => {
    await fetchEditEmail({
      variables: {
        input: {
          email: formData.email,
        },
      },
      onCompleted: handleCompleteEditEmail,
      onError: () => notify(t('somethingError')),
    });
  };

  return (
    <StyledModal
      $isSubmited={isSubmited}
      onClose={onClose}
      title={isSubmited ? t('emailModalTitleSubmit') : t('emailTitle')}
      isVisible={isVisible}
      isBottomMobile>
      {isSubmited ? (
        <ModalContentContainer>
          <ModalContent>
            {t('emailModalContent')}
            <Email>{email}</Email>
          </ModalContent>
          <ModalContent>{t('emailModalNote')}</ModalContent>
        </ModalContentContainer>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => <StyledBaseInput isLong error={errors.email?.message} {...field} />}
            rules={{
              required: { value: true, message: 'Обязательное поле' },
              pattern: { value: patterns.email, message: 'Некорректный Email' },
            }}
          />
          <Button
            isFullWight
            type="submit"
            text={t('emailSubmit')}
            size={ButtonSize.NORMAL}
            variant={ButtonVariant.PRIMARY}
            disabled={!isValid}
            isLoading={loading}
          />
        </Form>
      )}
    </StyledModal>
  );
};

const StyledModal = styled(BaseModal)<{ $isSubmited: boolean }>`
  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: ${({ $isSubmited }) => ($isSubmited ? '448px' : '442px')};
  }
`;

const ModalContentContainer = styled.div`
  padding: 8px;
`;

const ModalContent = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
  ${({ theme: { typography } }) => typography.body_24_16_regular}
`;

const Email = styled.span`
  text-decoration: underline;
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
  ${({ theme: { typography } }) => typography.body_24_16_medium}
`;

const Form = styled.form`
  padding: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const StyledBaseInput = styled(BaseInput)`
  max-width: 100%;
  width: 100%;
  max-height: 40px;
`;
