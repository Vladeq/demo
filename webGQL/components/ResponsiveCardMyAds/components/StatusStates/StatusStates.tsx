import { ApartmentAdStatusType } from '__generated__/types';
import { ModalInnopay, ModalVerifyDocs } from 'components';
import { FileCategory } from 'components/ModalVerifyDocs/types';
import { Routes, TWENTY_MB } from 'constains';
import { useClientSize, useToggle } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BaseMyAdsCardComponentProps, CardStatusEnum, TextVariants } from 'types';
import { StepsByIndex } from 'types/advert';
import { AppText, BaseModal, Button, IconButton } from 'ui';
import { ButtonSize } from 'ui/Button/Button';
import { handleDivisionOnCategories, setCookie } from 'utils';

import { More, Trash } from '../../../../../public/svg/components';
import usePublishAdvert from '../../../../hooks/usePublishAdvert';
import {
  ActiveModalLinks,
  CancelModal,
  CancelRentModal,
  CancelRentReasonModal,
  DeleteModal,
  ProcessModalLinks,
  PublishedModalLinks,
  SetAvailableContainer,
  StopModal,
  StoppedModalLinks,
  VerifyModal,
} from '../index';

interface StatusStatesProps extends BaseMyAdsCardComponentProps {
  pictureSrc: string;
  title: string;
  price: string;
}

const LAST_ADVERTS_STEP = 7;

const StatusStates: FC<StatusStatesProps> = ({
  id,
  pictureSrc,
  title,
  price,
  status,
  rentType,
  confirmData,
  confirmPhone,
  currentStep,
  confirmDocuments,
  payMethod,
}) => {
  const { t } = useTranslation('ui');
  const { t: tIdentity } = useTranslation('profilePage', { keyPrefix: 'security' });
  const { t: tPayments } = useTranslation('profilePage', { keyPrefix: 'payments' });

  const { publishAdvert, loading: publishLoading } = usePublishAdvert(id!, rentType!);

  const router = useRouter();
  const { query } = router;
  const advertIdFromQuery = query.advertId;

  const isStopped = status === ApartmentAdStatusType.Paused;
  const isConfirmedInfo = confirmData && confirmPhone && confirmDocuments && payMethod;

  const { getIsBreakpoint } = useClientSize();

  const { isOpened: isOpenDeleteModal, toggle: toggleDeleteModal } = useToggle();
  const { isOpened: isOpenStopModal, toggle: toggleStopModal } = useToggle();
  const { isOpened: isOpenCancelModal, toggle: toggleCancelModal } = useToggle();
  const { isOpened: isOpenVerifyModal, open: openVerifyModal, close: closeVerifyModal } = useToggle();
  const { isOpened: isOpenActiveLinkModal, open: openActiveLinkModal, close: closeActiveLinkModal } = useToggle();
  const { isOpened: isOpenCancelRentModal, open: openCancelRentModal, close: closeCancelRentModal } = useToggle();
  const { isOpened: isOpenSetAvailableModal, toggle: toggleSetAvailableModal } = useToggle();
  const {
    isOpened: isOpenPubblishedLinkModal,
    open: openPubblishedLinkModal,
    close: closePubblishedLinkModal,
  } = useToggle();
  const { isOpened: isOpenProcessLinkModal, open: openProcessLinkModal, close: closeProcessLinkModal } = useToggle();
  const { isOpened: isOpenStoppedLinkModal, open: openStoppedLinkModal, close: closeStoppedLinkModal } = useToggle();
  const {
    isOpened: isOpenCancelRentReasonModal,
    open: openCancelRentReasonModal,
    close: closeCancelRentReasonModal,
  } = useToggle();
  const {
    isOpened: isOpenOwnershipDocsModal,
    open: openOwnershipDocsModal,
    close: closeOwnershipDocsModal,
  } = useToggle();
  const { isOpened: isOpenIdentityModal, open: openIdentityModal, close: closeOpenIdentityModal } = useToggle();
  const { isOpened: isOpenAddBankCardModal, open: openAddBankCardModal, close: closeAddBankCardModal } = useToggle();

  const goBack = () => {
    openVerifyModal();
    closeOwnershipDocsModal();
    closeOpenIdentityModal();
    closeAddBankCardModal();
  };

  const openVerifyModalBeforeCreatedAd = () => {
    if (advertIdFromQuery === id) {
      openVerifyModal();
    }
  };

  const handleCloseVerifyModal = () => {
    router.push(
      {
        pathname: Routes.myAds,
        query: {},
      },
      undefined,
      { shallow: true },
    );
    closeVerifyModal();
  };

  const goToEdit = async () => {
    setCookie('advertId', id!);
    if (currentStep !== LAST_ADVERTS_STEP) {
      await router.push(StepsByIndex[currentStep!]);
    } else {
      await router.push(StepsByIndex[0]);
    }
  };

  useEffect(() => {
    openVerifyModalBeforeCreatedAd();
  }, [router.query, id]);

  const states = {
    [CardStatusEnum.ACTIVE]: (
      <>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc}>
          <StyledIconButton IconComponent={More} onClick={openActiveLinkModal} />
        </ImageContainer>
        <DescriptionContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>{t('cards.pricePeriod')}</PricePeriod>
          </PriceContainer>
          <TitleContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {title}
            </AppText>
          </TitleContainer>
          <StyledButton text={t('cards.editAd')} size={ButtonSize.SMALL} />
        </DescriptionContainer>
        <StyledBaseModal isBottomMobile whithoutHeader onClose={closeActiveLinkModal} isVisible={isOpenActiveLinkModal}>
          <ActiveModalLinks
            openAvailableModal={toggleSetAvailableModal}
            close={closeActiveLinkModal}
            openNext={openCancelRentModal}
          />
        </StyledBaseModal>
        <StyledBaseModal
          onClose={closeCancelRentModal}
          title={t('myAdsCard.dropDownLinks.cancelRent')}
          isBottomMobile
          isVisible={isOpenCancelRentModal}>
          <CancelRentModal close={closeCancelRentModal} openNext={openCancelRentReasonModal} />
        </StyledBaseModal>
        <FullScreenCancelModal
          onClose={closeCancelRentReasonModal}
          withBackOption
          title={t('myAdsCard.dropDownLinks.cancelRent')}
          isVisible={isOpenCancelRentReasonModal}>
          <CancelRentReasonModal close={closeCancelRentReasonModal} />
        </FullScreenCancelModal>
        <FullScreenModal
          onClose={toggleSetAvailableModal}
          withBackOption
          onGoBack={toggleSetAvailableModal}
          title={t('myAdsCard.setAvailableConteiner.setAvailable')}
          isVisible={isOpenSetAvailableModal}>
          <SetAvailableContainer id={id!} onClose={toggleSetAvailableModal} />
        </FullScreenModal>
      </>
    ),
    [CardStatusEnum.PUBLISHED]: (
      <>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc}>
          <StyledIconButton IconComponent={More} onClick={openPubblishedLinkModal} />
        </ImageContainer>
        <DescriptionContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>{t('cards.pricePeriod')}</PricePeriod>
          </PriceContainer>
          <TitleContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {title}
            </AppText>
          </TitleContainer>
          <StyledButton text={t('cards.stopAd')} size={ButtonSize.SMALL} onClick={toggleStopModal} />
        </DescriptionContainer>
        <StyledBaseModal
          isBottomMobile
          whithoutHeader
          onClose={closePubblishedLinkModal}
          isVisible={isOpenPubblishedLinkModal}>
          <PublishedModalLinks
            close={closePubblishedLinkModal}
            openDelete={toggleDeleteModal}
            openAvailable={toggleSetAvailableModal}
          />
        </StyledBaseModal>
        <FullScreenModal
          onClose={toggleSetAvailableModal}
          withBackOption
          withOutsideClick={false}
          onGoBack={toggleSetAvailableModal}
          title={t('myAdsCard.setAvailableConteiner.setAvailable')}
          isVisible={isOpenSetAvailableModal}>
          <SetAvailableContainer id={id!} onClose={toggleSetAvailableModal} />
        </FullScreenModal>
        <StyledBaseModal
          onClose={toggleStopModal}
          isBottomMobile
          title={t('myAdsCard.stopModal.modalTitle')}
          isVisible={isOpenStopModal}>
          <StopModal close={toggleStopModal} periodType={rentType!} id={id!} />
        </StyledBaseModal>
      </>
    ),
    [CardStatusEnum.PROCESSING]: (
      <>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc}>
          <StyledIconButton IconComponent={More} onClick={openProcessLinkModal} />
        </ImageContainer>
        <DescriptionContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>{t('cards.pricePeriod')}</PricePeriod>
          </PriceContainer>
          <TitleContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {title}
            </AppText>
          </TitleContainer>
          {!isConfirmedInfo && (
            <StyledButton text={t('buttons.btnVerify')} size={ButtonSize.SMALL} onClick={openVerifyModal} />
          )}
        </DescriptionContainer>
        <StyledBaseModal
          isBottomMobile
          whithoutHeader
          onClose={closeProcessLinkModal}
          isVisible={isOpenProcessLinkModal}>
          <ProcessModalLinks
            close={closeProcessLinkModal}
            openDelete={toggleDeleteModal}
            openCancel={toggleCancelModal}
          />
        </StyledBaseModal>
        <StyledBaseModal
          onClose={toggleCancelModal}
          isBottomMobile
          title={t('myAdsCard.cancelModal.modalTitle')}
          isVisible={isOpenCancelModal}>
          <CancelModal close={toggleCancelModal} />
        </StyledBaseModal>
        <StyledVerifyModal
          onClose={handleCloseVerifyModal}
          title={t('cards.verifyModalTitle')}
          isVisible={isOpenVerifyModal}
          isBottomMobile>
          <VerifyModal
            rentType={rentType!}
            confirmData={confirmData}
            confirmPhone={confirmPhone}
            confirmDocuments={confirmDocuments}
            payMethod={payMethod}
            openIdentityModal={openIdentityModal}
            openOwnershipDocsModal={openOwnershipDocsModal}
            openAddBankCardModal={openAddBankCardModal}
            closeVerifyModal={closeVerifyModal}
          />
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={closeOwnershipDocsModal}
          withBackOption
          onGoBack={goBack}
          title={t('cards.addDocumentModalTitle')}
          isVisible={isOpenOwnershipDocsModal}
          isBottomMobile>
          <ModalVerifyDocs
            onSaveClick={goBack}
            apartmentAd={id}
            typeDocs={FileCategory.APARTMENT_AD_DOCUMENTS}
            maxSize={TWENTY_MB}
          />
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={closeOpenIdentityModal}
          withBackOption
          onGoBack={goBack}
          title={tIdentity('personTitle')}
          isVisible={isOpenIdentityModal}
          isBottomMobile>
          <ModalVerifyDocs
            onSaveClick={goBack}
            maxFiles={3}
            content={tIdentity('identifyContent')}
            typeDocs={FileCategory.IDENTITY_DOCUMENTS}
            maxSize={TWENTY_MB}
          />
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={closeAddBankCardModal}
          withBackOption
          onGoBack={goBack}
          title={tPayments('modalTitleAddNewCard')}
          isVisible={isOpenAddBankCardModal}
          isBottomMobile>
          <ModalInnopay onComplete={goBack} />
        </StyledVerifyModal>
      </>
    ),
    [CardStatusEnum.PAUSED]: (
      <>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc}>
          <StyledIconButton IconComponent={More} onClick={openStoppedLinkModal} />
        </ImageContainer>
        <DescriptionContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>{t('cards.pricePeriod')}</PricePeriod>
          </PriceContainer>
          <TitleContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {title}
            </AppText>
          </TitleContainer>
          <StyledButton
            onClick={publishAdvert}
            isLoading={publishLoading}
            text={t('cards.activateAd')}
            size={ButtonSize.SMALL}
          />
        </DescriptionContainer>
        <StyledBaseModal
          isBottomMobile
          whithoutHeader
          onClose={closeStoppedLinkModal}
          isVisible={isOpenStoppedLinkModal}>
          <StoppedModalLinks id={id!} close={closeStoppedLinkModal} openDelete={toggleDeleteModal} />
        </StyledBaseModal>
      </>
    ),
    [CardStatusEnum.DRAFT]: (
      <>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc}>
          <StyledIconButton IconComponent={Trash} onClick={toggleDeleteModal} />
        </ImageContainer>
        <DescriptionContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>{t('cards.pricePeriod')}</PricePeriod>
          </PriceContainer>
          <TitleContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {title}
            </AppText>
          </TitleContainer>
          <StyledButton onClick={goToEdit} text={t('cards.goToEdit')} size={ButtonSize.SMALL} />
        </DescriptionContainer>
      </>
    ),
  };
  return (
    <InfoContainer>
      {states[status]}
      <StyledBaseModal
        onClose={toggleDeleteModal}
        isBottomMobile={getIsBreakpoint('s')}
        title={t('myAdsCard.deleteModal.modalTitle')}
        isVisible={isOpenDeleteModal}>
        <DeleteModal rentType={rentType!} advertType={status} id={id!} close={toggleDeleteModal} />
      </StyledBaseModal>
    </InfoContainer>
  );
};

const ImageContainer = styled.div<{ $isStopped: boolean; $src: string }>`
  display: flex;
  justify-content: flex-end;
  max-width: 343px;
  width: 100%;
  height: 171px;
  ${({ $isStopped, $src }) => css`
    filter: ${$isStopped && `grayscale(100%);`};
    background: url(${$src});
    background-size: 100%;
    background-position: center;
    border-radius: 24px 24px 0 0;
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const PricePeriod = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_16_12_regular}
  `}
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledIconButton = styled(IconButton)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin: 16px;
`;

const StyledVerifyModal = styled(BaseModal)`
  width: 100%;
  max-width: 672px;
  height: auto;
  max-height: 100%;
  background-color: ${({ theme }) => theme.colors.greyScale[0]};
  overflow: scroll;
`;

const StyledBaseModal = styled(BaseModal)`
  width: 100%;
  .modal-header {
    border-bottom: none;
  }
`;

const FullScreenCancelModal = styled(BaseModal)`
  max-width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: unset;

  .modal-header {
    padding: 16px;
  }
`;

const FullScreenModal = styled(BaseModal)`
  max-width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: unset;
`;

export default StatusStates;
