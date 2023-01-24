import { Routes } from 'constains';
import { useContractRequestAccept } from 'graphql/mutations/Contract/__generated__/contractRequestAccept';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { RequestItem } from '../RequestItem';
import { LandlordRentRequestType } from '../Requests/Requests';

interface ReplyModalProps {
  currentRequest: LandlordRentRequestType;
  closeReplyModal: () => void;
  openDeclineModal: () => void;
}

const ReplyModal: FC<ReplyModalProps> = ({ closeReplyModal, openDeclineModal, currentRequest }) => {
  const router = useRouter();
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'requests' });

  const [acceptContractRequest, { loading: isAcceptLoading }] = useContractRequestAccept();

  const isLoading = isAcceptLoading;
  const message = currentRequest.comment;

  const decline = () => {
    closeReplyModal();
    openDeclineModal();
  };

  const acceptRequest = async () => {
    const data = await acceptContractRequest({ variables: { input: { contractRequestId: currentRequest.id } } });
    const chatId = data.data?.contractRequest__accept.chatId;

    closeReplyModal();

    await router.push(Routes.myAds, {
      query: {
        isChat: 1,
        chatId,
      },
    });
    router.reload();
  };

  return (
    <MainContainer>
      <RequestContainer>
        <RequestItem
          avatar={currentRequest.tenant.avatarKey || ''}
          name={currentRequest.tenant.firstName || ''}
          verifiedUser={!!currentRequest.tenant.isIdentityApproved}
          apartmentsName={currentRequest.apartmentAd.description?.name || ''}
          dateStart={currentRequest.arrivalDate || ''}
          dateEnd={currentRequest.departureDate || ''}
          numberOfAdults={currentRequest.guests?.numberOfAdult}
          numberOfChilds={currentRequest.guests?.numberOfChildren}
          numberOfPets={currentRequest.guests?.numberOfPets}
          rentType={currentRequest.apartmentAd.rentPeriodType!}
          isToModal
        />
        <Message variant={TextVariants.PRIMARY} font="body_20_14_regular">
          {message}
        </Message>
      </RequestContainer>
      <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
        {t('declineInfo')}
      </AppText>
      <ButtonContainer>
        <StyledButton
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.NORMAL}
          text={t('btnDecline')}
          onClick={decline}
          disabled={isLoading}
        />
        <StyledButton
          onClick={acceptRequest}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.NORMAL}
          text={t('btnGoToChat')}
          disabled={isLoading}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 8px 8px;
  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 0;
  }
`;

const RequestContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[10]};
  `}
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 192px;
  font-weight: 500;
  padding: 16px 0;
`;

const Message = styled(AppText)`
  word-break: break-word;
`;

export default ReplyModal;
