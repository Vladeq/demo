import { MessageModel } from '__generated__/types';
import { ModalInnopay } from 'components/ModalInnopay';
import { Routes } from 'constains';
import { useContractOfferAccept } from 'graphql/mutations/Contract/__generated__/contractOfferAccept';
import { useContractOfferReject } from 'graphql/mutations/Contract/__generated__/contractOfferReject';
import { useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { CardSelectModal } from 'pagesComponents/ActiveRent/components';
import React, { FC } from 'react';
import SystemMessage from 'services/systemMessage';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseModal, Button, LinkTo } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { setCookie } from 'utils';

export type HeaderProps = {
  isLandlord?: boolean;
  isLastMessage: boolean;
  isShortPeriodType: boolean;
  isContractStatusOffering: boolean;
  myId?: string;

  message: MessageModel;
  advertId: string;

  hasButtons?: boolean;
  hasInfoContainer?: boolean;
};

const Header: FC<HeaderProps> = ({
  isContractStatusOffering,
  isLastMessage,
  isShortPeriodType,
  isLandlord,
  myId,
  message,
  advertId,
  hasButtons = true,
  hasInfoContainer = true,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.termsMessage' });
  const { t: tPayments } = useTranslation('profilePage', { keyPrefix: 'payments' });
  const [rejectContractOffer] = useContractOfferReject({ variables: { input: { chatId: message.chatId } } });
  const [acceptContractOfferFetch, { loading }] = useContractOfferAccept();

  const {
    isOpened: isOpenAddBankCardModal,
    close: closeAddBankCardModal,
    toggle: toggleAddBankCardModal,
  } = useToggle();
  const {
    isOpened: isOpenUsersBanksCards,
    open: openUsersBanksCards,
    close: closeUsersBanksCards,
    toggle: toggleUsersBanksCards,
  } = useToggle();

  const handleChangeCardsModal = () => {
    toggleAddBankCardModal();
    toggleUsersBanksCards();
  };

  const acceptContractOffer = async (cardId?: string) => {
    await acceptContractOfferFetch({ variables: { input: { chatId: message.chatId, cardId } } });
  };

  const checkCanAcceptContractOffer = () => {
    if (isShortPeriodType) {
      acceptContractOffer();
    } else {
      openUsersBanksCards();
      setCookie('chatId', message.chatId);
    }
  };

  const disabled = !isLastMessage && !isContractStatusOffering;
  const title = new SystemMessage({ message, myId }).getSystemMessage();
  const description = isLandlord ? t('landlordDescription') : t('tenantDescription');

  return (
    <Root>
      {hasInfoContainer && (
        <InfoContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {title}
          </AppText>
          <Description font="caption_16_12_regular">
            {description}
            {!isLandlord && <StyledLinkTo href={Routes.documents} text={t('userAgreement')} />}
          </Description>
        </InfoContainer>
      )}
      {hasButtons && (
        <>
          {isLandlord ? (
            <ButtonContainer>
              <Button
                isFullWight
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
                disabled={disabled}
                text={t('terminate')}
                onClick={() => rejectContractOffer()}
              />
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <Button onClick={checkCanAcceptContractOffer} isFullWight disabled={disabled} text={t('apply')} />
              <Button
                isFullWight
                disabled={disabled}
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
                text={t('reject')}
                onClick={() => rejectContractOffer()}
              />
            </ButtonContainer>
          )}
        </>
      )}

      <StyledVerifyModal onClose={closeUsersBanksCards} isVisible={isOpenUsersBanksCards}>
        <CardSelectModal
          isLoading={loading}
          submit={acceptContractOffer}
          onClose={closeUsersBanksCards}
          advertId={advertId}
          onOpenInnopeyModal={handleChangeCardsModal}
        />
      </StyledVerifyModal>
      <StyledVerifyModal
        onClose={closeAddBankCardModal}
        withBackOption
        onGoBack={handleChangeCardsModal}
        title={tPayments('modalTitleAddNewCard')}
        isVisible={isOpenAddBankCardModal}
        isBottomMobile>
        <ModalInnopay isPayment onComplete={closeAddBankCardModal} />
      </StyledVerifyModal>
    </Root>
  );
};

export default Header;

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  display: grid;
  gap: 4px;
`;

const ButtonContainer = styled.div`
  display: grid;
  align-content: flex-start;
  gap: 8px;
`;

const Description = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { colors, typography } }) => css`
    text-decoration: underline;
    color: ${colors.greyScale[60]};
    ${typography.caption_16_12_regular};
  `}
`;

const StyledVerifyModal = styled(BaseModal)`
  width: 100%;
  max-width: 672px;
`;
