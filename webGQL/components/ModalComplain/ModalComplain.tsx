import { UserComplaintType } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, OptionType, TextVariants } from 'types';
import { AppText, BaseInput, BaseModal, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { Complains } from './components';

type ModalComplainProps = {
  isVisible: boolean;
  isLoading?: boolean;
  complains: OptionType[];
  close: () => void;
  submit: (complains: string[], reason: string) => void | Promise<void>;
};

type FormValues = {
  causes: string[];
  reason: string;
};

export const ModalComplain: FC<ModalComplainProps> = ({ close, submit, isLoading = false, isVisible, complains }) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'header' });

  const { handleSubmit, control, reset, watch } = useForm<FormValues>({
    defaultValues: { causes: [] },
  });

  const causes = watch('causes');
  const isOtherCause = causes.includes(UserComplaintType.Other);

  const onSubmit = async (values: FormValues) => {
    await submit(values.causes, isOtherCause ? values.reason : '');

    close();
    reset();
  };

  return (
    <Root isDropZoneModal onClose={close} title={t('modalComplainHeader')} isVisible={isVisible} isBottomMobile>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Complains hasUnderline={isOtherCause} complains={complains} control={control} />
          {isOtherCause && (
            <Container>
              <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
                {t('comment')}
              </AppText>
              <Controller
                control={control}
                name="reason"
                render={({ field }) => <StyledBaseInput isLong placeholder={t('commentPlaceholder')} {...field} />}
              />
            </Container>
          )}
        </Body>
        <Footer>
          <StyledButton
            type="submit"
            isFullWight
            text={t('modalComplainSubmit')}
            size={ButtonSize.CARDS}
            variant={ButtonVariant.PRIMARY}
            isLoading={isLoading}
          />
        </Footer>
      </Form>
    </Root>
  );
};

const Root = styled(BaseModal)`
  width: 100%;
  max-width: 688px;

  h2 {
    ${({ theme: { typography } }) => typography.body_24_16_medium};
  }
`;
const Form = styled.form`
  margin-top: -8px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 8px 8px 8px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 8px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-left: -24px;
    margin-right: -24px;
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  margin-top: 24px;
  height: 48px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 240px;
    margin-top: 16px;
    margin-right: 40px;
    margin-bottom: -8px;
    height: 40px;
  }
`;

const StyledBaseInput = styled(BaseInput)`
  width: 100%;
  max-width: 100%;
  height: 50px;

  ${({ theme: { typography } }) => typography.body_20_14_regular}
`;
