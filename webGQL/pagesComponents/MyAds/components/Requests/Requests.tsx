import { ApartmentRentPeriodType } from '__generated__/types';
import {
  LandlordRentRequest,
  useLandlordRentRequest,
} from 'graphql/queries/Contracts/__generated__/getLanlordRentRequest.query';
import { useClientSize, useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseModal, Button, LightButton } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { DeclineModal, ReplyModal, RequestItem, RequestsSkeleton } from '../index';

export type LandlordRentRequestType = NonNullable<LandlordRentRequest['contractRequest__forLandlord']['data']>['0'];

export const MAX_REQUESTS = 3;
const MAX_REQUESTS_FOR_MORE = 4;

const Requests: FC = () => {
  const { t } = useTranslation('myAdsPage');
  const { getIsBreakpoint } = useClientSize();
  const [isShortRequestsLoading, setIsShortRequestsLoading] = useState(false);
  const [isLongRequestsLoading, setIsLongRequestsLoading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<null | LandlordRentRequestType>(null);

  const { isOpened: isOpenReplyModal, toggle: toggleReplyModal, open: openReplyModal } = useToggle();
  const { isOpened: isOpenDeclineModal, toggle: toggleDeclineModal, close: closeDeclineModal } = useToggle();

  const goBack = () => {
    toggleReplyModal();
    toggleDeclineModal();
  };

  const openRequestReplyModal = (request: LandlordRentRequestType) => {
    setCurrentRequest(request);
    openReplyModal();
  };

  const {
    data: longTermRequestsData,
    loading: isFirstLongLoading,
    fetchMore: fetchMoreLongTermRequests,
  } = useLandlordRentRequest({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { input: { type: ApartmentRentPeriodType.LongTerm, limit: MAX_REQUESTS } },
  });

  const {
    data: shortTermRequestsData,
    loading: isFirstShortLoading,
    fetchMore: fetchMoreShortTermRequests,
  } = useLandlordRentRequest({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { input: { type: ApartmentRentPeriodType.ShortTerm, limit: MAX_REQUESTS } },
  });

  const loadMoreShortTermRequests = async () => {
    setIsShortRequestsLoading(true);
    await fetchMoreShortTermRequests({
      variables: {
        input: {
          type: ApartmentRentPeriodType.ShortTerm,
          limit: MAX_REQUESTS_FOR_MORE,
          afterCursor: shortTermRequestsData?.contractRequest__forLandlord.pageInfo?.afterCursor,
        },
      },
    });
    setIsShortRequestsLoading(false);
  };

  const longAfterCursor = longTermRequestsData?.contractRequest__forLandlord?.pageInfo?.afterCursor;
  const shortAfterCursor = shortTermRequestsData?.contractRequest__forLandlord?.pageInfo?.afterCursor;

  const loadMoreLongTermRequests = async () => {
    setIsLongRequestsLoading(true);
    await fetchMoreLongTermRequests({
      variables: {
        input: {
          type: ApartmentRentPeriodType.LongTerm,
          limit: MAX_REQUESTS_FOR_MORE,
          afterCursor: longTermRequestsData?.contractRequest__forLandlord.pageInfo?.afterCursor,
        },
      },
    });
    setIsLongRequestsLoading(false);
  };

  const shortTermRequests = shortTermRequestsData?.contractRequest__forLandlord?.data;
  const longTermRequests = longTermRequestsData?.contractRequest__forLandlord?.data;

  const isLoadingOnFirstRequest = isFirstLongLoading && isFirstShortLoading;

  const isRequestsEmpty = shortTermRequests?.length === 0 && longTermRequests?.length === 0;

  return (
    <Root>
      {isLoadingOnFirstRequest ? (
        <RequestsSkeleton />
      ) : (
        <MainContainer>
          {isRequestsEmpty ? (
            <CardsContainer>
              <AppText variant={TextVariants.SECONDARY} font="title_36_26_bold">
                {t('requests.noRequestsTitle')}
              </AppText>
              <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
                {t('requests.noRequestsInfo')}
              </AppText>
            </CardsContainer>
          ) : (
            <Content>
              {
                <CardsContainer>
                  <AppText variant={TextVariants.SECONDARY} font="title_22_18_medium">
                    {t('ads.shortTerm')}
                  </AppText>
                  {shortTermRequests?.map((request, index, arr) => {
                    return (
                      <RequestContainer key={index} $border={index === arr.length - 1}>
                        <RequestItem
                          avatar={request.tenant.avatarKey || ''}
                          name={`${request.tenant.firstName} ${request.tenant.lastName}`}
                          verifiedUser={request.tenant.isIdentityApproved}
                          message="Комментарий" // TODO: wait backend
                          apartmentsName={request.apartmentAd.description?.name || ''}
                          dateStart={request.arrivalDate || ''}
                          dateEnd={request.departureDate || ''}
                          numberOfAdults={request.guests?.numberOfAdult}
                          numberOfChilds={request.guests?.numberOfChildren}
                          numberOfPets={request.guests?.numberOfPets}
                          rentType={request.apartmentAd.rentPeriodType}
                        />
                        <RequestReply
                          text={t('requests.btnReply')}
                          size={LightButtonSize.NORMAL}
                          isUnderline
                          onClick={() => openRequestReplyModal(request)}
                        />
                      </RequestContainer>
                    );
                  })}
                  {shortAfterCursor !== null && (
                    <StyledButton
                      variant={ButtonVariant.SECONDARY}
                      size={ButtonSize.LONG_TEXT}
                      text={t('ads.btnMore')}
                      onClick={loadMoreShortTermRequests}
                      isLoading={isShortRequestsLoading}
                    />
                  )}
                </CardsContainer>
              }
              <CardsContainer>
                <AppText variant={TextVariants.SECONDARY} font="title_22_18_medium">
                  {t('ads.longTerm')}
                </AppText>
                {longTermRequests?.map((request, index, arr) => {
                  return (
                    <RequestContainer key={index} $border={index === arr.length - 1}>
                      <RequestItem
                        avatar={request.tenant.avatarKey || ''}
                        name={`${request.tenant.firstName} ${request.tenant.lastName}`}
                        verifiedUser={request.tenant.isIdentityApproved}
                        message="Комментарий" // TODO: wait backend
                        apartmentsName={request.apartmentAd.description?.name || ''}
                        numberOfAdults={request.guests?.numberOfAdult}
                        numberOfChilds={request.guests?.numberOfChildren}
                        numberOfPets={request.guests?.numberOfPets}
                        rentType={request.apartmentAd.rentPeriodType}
                      />
                      <RequestReply
                        text={t('requests.btnReply')}
                        size={LightButtonSize.NORMAL}
                        isUnderline
                        onClick={() => openRequestReplyModal(request)}
                      />
                    </RequestContainer>
                  );
                })}

                <StyledBaseModal
                  onClose={toggleReplyModal}
                  isBottomMobile={getIsBreakpoint('s')}
                  title={t('requests.replyModalTitle')}
                  isVisible={isOpenReplyModal}>
                  {currentRequest && (
                    <ReplyModal
                      currentRequest={currentRequest}
                      openDeclineModal={toggleDeclineModal}
                      closeReplyModal={toggleReplyModal}
                    />
                  )}
                </StyledBaseModal>

                <StyledBaseModal
                  onClose={toggleDeclineModal}
                  isBottomMobile={getIsBreakpoint('s')}
                  withBackOption
                  onGoBack={goBack}
                  title={t('requests.declineModalTitle')}
                  isVisible={isOpenDeclineModal}>
                  {currentRequest && <DeclineModal closeModal={closeDeclineModal} currentRequest={currentRequest} />}
                </StyledBaseModal>

                {longAfterCursor !== null && (
                  <StyledButton
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.LONG_TEXT}
                    text={t('ads.btnMore')}
                    onClick={loadMoreLongTermRequests}
                    isLoading={isLongRequestsLoading}
                  />
                )}
              </CardsContainer>
            </Content>
          )}
        </MainContainer>
      )}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme }) => css`
      background-color: ${theme.colors.greyScale[0]};
    `}
  }
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 72px;
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 848px;

  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
  `}

  padding: 8px 21px 40px 40px;
  border-radius: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 8px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RequestContainer = styled.div<{ $border: boolean }>`
  ${({ theme, $border }) => css`
    ${!$border && `border-bottom: 1px solid ${theme.colors.greyScale[30]};`}

    display: flex;
    justify-content: space-between;
    align-items: center;
    ${!$border ? `padding-bottom: 12px;` : `padding-bottom: 0px;`}
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    gap: 3px;
    align-items: flex-start;
    padding-bottom: 8px;
  }
`;

const RequestReply = styled(LightButton)`
  width: 100%;
  max-width: 195px;
  align-items: center;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-left: 58px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 16px;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;

const StyledBaseModal = styled(BaseModal)`
  width: 100%;
  max-width: 448px;
  @media (max-width: ${BreakpointsEnum.s}px) {
    .modal-header {
      border-bottom: unset;
    }
  }
`;

export default Requests;
