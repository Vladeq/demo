import { ApartmentRentPeriodType } from '__generated__/types';
import { useContractOfferSend } from 'graphql/mutations/Contract/__generated__/contractOfferSend';
import { GetChatById } from 'graphql/queries/Chat/__generated__/getChatById';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { dayjs } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { BaseModal, Button } from 'ui';
import { BaseModalProps } from 'ui/BaseModal/BaseModal';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { LongTermRentInfo, RulesSection, ShortTermRentInfo } from './components';

type OfferTermsModalProps = BaseModalProps & {
  chat: GetChatById['chat__byId'];
};

const OfferTermsModal: FC<OfferTermsModalProps> = ({ chat, onClose, ...props }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.OfferTermsModal' });
  const [sendContractOffer] = useContractOfferSend();

  const {
    allowedToSmoke = false,
    allowedWithChildren = false,
    allowedToHangingOut = false,
    allowedWithPets = false,
  } = chat.contract.rules || {};

  const { shortTermRentCancellationPolicyType } = chat.contract;
  const isLongRentPeriodType = chat.contract.apartmentRentPeriodType === ApartmentRentPeriodType.LongTerm;
  const costString = chat.contract.cost ? `${chat.contract.cost} 〒` : '〒';

  const defaultValues = {
    arrivalDate: chat.contract.arrivalDate || '',
    allowedToSmoke,
    allowedWithChildren,
    allowedToHangingOut,
    allowedWithPets,
  };

  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = form;

  const updateForm = () => {
    if (props.isVisible) {
      form.setValue('allowedToHangingOut', defaultValues.allowedToHangingOut);
      form.setValue('allowedToSmoke', defaultValues.allowedToSmoke);
      form.setValue('allowedWithChildren', defaultValues.allowedWithChildren);
      form.setValue('allowedWithPets', defaultValues.allowedWithPets);
      form.setValue('arrivalDate', defaultValues.arrivalDate);
    }
  };

  useEffect(updateForm, [props.isVisible]);

  const onSubmit = async ({ arrivalDate, ...values }: FormValues) => {
    await sendContractOffer({
      variables: {
        input: {
          ...values,
          chatId: chat.id,
          arrivalDate: arrivalDate && isLongRentPeriodType ? dayjs(arrivalDate).format('YYYY-MM-DD') : undefined,
        },
      },
    });

    onClose();
    reset();
  };

  return (
    <StyledBaseModal title={t('makeDeal')} onClose={onClose} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          {isLongRentPeriodType ? (
            <LongTermRentInfo form={form} costString={costString} />
          ) : (
            <ShortTermRentInfo
              shortTermRentCancellationPolicyType={shortTermRentCancellationPolicyType || null}
              costString={costString}
              arrivalDate={chat.contract?.arrivalDate || ''}
              departureDate={chat.contract?.departureDate || ''}
            />
          )}
          <RulesSection control={control} />
        </Container>
        <Footer>
          <StyledButton
            disabled={!isDirty}
            type="reset"
            text={t('reset')}
            variant={ButtonVariant.SECONDARY}
            onClick={() => reset()}
          />
          <FooterButton disabled={!isValid} type="submit" text={t('sendTerms')} size={ButtonSize.LONG_TEXT} />
        </Footer>
      </form>
    </StyledBaseModal>
  );
};

export default OfferTermsModal;

type FormValues = {
  arrivalDate: string;
  allowedToSmoke: boolean;
  allowedWithChildren: boolean;
  allowedToHangingOut: boolean;
  allowedWithPets: boolean;
};

const StyledBaseModal = styled(BaseModal)`
  max-width: 672px;
  overflow: hidden;

  .modal-header {
    h2 {
      ${({ theme: { typography } }) => typography.body_24_16_medium}
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
`;

const Footer = styled.div`
  position: sticky;
  display: flex;
  bottom: 0;

  margin: -24px;
  margin-top: 24px;
  z-index: 1;

  padding: 16px 24px;
  align-items: center;

  justify-content: space-between;
  border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    border-top: none;
  }
`;

const StyledButton = styled(Button)`
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  padding: 2px;
  ${({ theme: { typography } }) => typography.body_24_16_medium}

  @media (max-width: ${BreakpointsEnum.sm}px) {
    background: ${({ theme: { colors } }) => colors.greyScale[30]};
    ${({ theme: { typography } }) => typography.caption_16_12_medium}
    width: 100%;
    max-width: 105px;
    margin-right: 8px;
  }
`;

const FooterButton = styled(Button)`
  height: 40px;
  padding: 16px 63px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 16px 0;
    width: 100%;
    height: 100%;
  }
`;
