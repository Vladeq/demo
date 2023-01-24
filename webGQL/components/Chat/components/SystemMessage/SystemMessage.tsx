import {
  ApartmentRentPeriodType,
  MessageModel,
  SendContractOfferRequest,
  SystemMessageType,
} from '__generated__/types';
import { useContractOfferSend } from 'graphql/mutations/Contract/__generated__/contractOfferSend';
import { useGetChatById } from 'graphql/queries/Chat/__generated__/getChatById';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { dayjs } from 'services';
import SystemMessageService from 'services/systemMessage';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { getQueryFromUrl } from 'utils';

type SystemMessageProps = {
  isLandlord: boolean;
  myId: string | undefined;
  message: MessageModel;
};

const SystemMessage: FC<SystemMessageProps> = ({ message, myId, isLandlord }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.systemMessage' });
  const [sendContractOffer] = useContractOfferSend();

  const { asPath } = useRouter();
  const query = getQueryFromUrl(asPath);
  const { data: chatData } = useGetChatById({ variables: { input: { id: query.chatId } } });

  const systemMessage = new SystemMessageService({ message, myId, isLandlord }).getSystemMessage();

  const isSmallGap = message.systemMessageType === SystemMessageType.OfferRejectedBySystem;
  const isOfferRejectedBySystem =
    message.systemMessageType && message.systemMessageType === SystemMessageType.OfferRejectedBySystem;
  const isShowSameConditionsButton = isOfferRejectedBySystem && isLandlord;

  const [title, description] = systemMessage.split('/');

  const resendOffer = async () => {
    const isLongRentPeriodType =
      chatData?.chat__byId.contract.apartmentRentPeriodType === ApartmentRentPeriodType.LongTerm;

    const arrivalDate = chatData?.chat__byId.contract.arrivalDate;

    if (chatData?.chat__byId.contract.rules) {
      const { __typename, ...rules } = chatData.chat__byId.contract.rules;

      const input: SendContractOfferRequest = {
        chatId: chatData.chat__byId.id,
        arrivalDate: arrivalDate && isLongRentPeriodType ? dayjs(arrivalDate).format('YYYY-MM-DD') : undefined,
        ...rules,
      };

      await sendContractOffer({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <Root>
      <Container $isSmallGap={isSmallGap}>
        <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
          {title}
        </AppText>
        {description && <Description>{description}</Description>}
      </Container>
      {isShowSameConditionsButton && (
        <StyledButton
          size={ButtonSize.SMALL}
          variant={ButtonVariant.SECONDARY}
          text={t('sendSameConditions')}
          onClick={resendOffer}
        />
      )}
    </Root>
  );
};

export default SystemMessage;

const Root = styled.div`
  width: 100%;

  display: flex;

  padding: 16px;
  border-radius: 16px;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.greyScale[0]};
    border: 1px solid ${colors.greyScale[30]};
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;

const Container = styled.div<{ $isSmallGap: boolean }>`
  width: 100%;

  display: flex;
  flex-direction: column;

  ${({ $isSmallGap }) => css`
    gap: ${$isSmallGap ? 4 : 16}px;
  `};
`;

const Description = styled.p`
  ${({ theme: { typography, colors } }) => css`
    color: ${colors.greyScale[60]};
    ${typography.caption_16_12_regular}
  `};
`;

const StyledButton = styled(Button)`
  padding: 8px 24px;
  white-space: nowrap;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;
