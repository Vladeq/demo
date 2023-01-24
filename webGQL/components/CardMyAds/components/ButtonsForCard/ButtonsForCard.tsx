import { ApartmentAdStatusType, RentPeriodType } from '__generated__/types';
import { ModalInnopay, ModalVerifyDocs } from 'components';
import { FileCategory } from 'components/ModalVerifyDocs/types';
import { Routes, TWENTY_MB } from 'constains';
import { useAddPaymentMethod } from 'graphql/mutations/Advert/__generated__/addPaymentMethod.mutation';
import { useClickOutside, useToggle } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { CardSelectModal } from 'pagesComponents/ActiveRent/components';
import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BaseMyAdsCardComponentProps, BreakpointsEnum } from 'types';
import { StepsByIndex } from 'types/advert';
import { BaseModal, Button, IconButton, ModalDropDown } from 'ui';
import { ButtonSize } from 'ui/Button/Button';
import { setCookie } from 'utils';

import { More, Trash } from '../../../../../public/svg/components';
import { usegetMyApartmentAdsLazyQuery } from '../../../../graphql/queries/MyAds/__generated__/getMyApartmentAds.query';
import usePublishAdvert from '../../../../hooks/usePublishAdvert';
import {
  ActiveModalLinks,
  DeleteModal,
  ProcessModalLinks,
  PublishedModalLinks,
  StopModal,
  StoppedModalLinks,
  VerifyModal,
} from '../index';

const LAST_ADVERTS_STEP = 7;

const ButtonsForCard: FC<BaseMyAdsCardComponentProps> = ({
  id,
  status,
  rentType,
  confirmData,
  confirmPhone,
  confirmDocuments,
  currentStep,
  payMethod,
}) => {
  const { t } = useTranslation('ui');
  const { t: tIdentity } = useTranslation('profilePage', { keyPrefix: 'security' });
  const { t: tPayments } = useTranslation('profilePage', { keyPrefix: 'payments' });

  const { publishAdvert, loading: publishLoading } = usePublishAdvert(id!, rentType!);
  const [refetch] = usegetMyApartmentAdsLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { status: ApartmentAdStatusType.Processing } },
  });

  const [setPaymentMethod, { loading }] = useAddPaymentMethod();
  const router = useRouter();
  const isShortRentType = rentType !== RentPeriodType.LongTerm;
  const { query } = router;
  const advertIdFromQuery = query.advertId;
  const isConfirmedInfo = confirmData && confirmPhone && confirmDocuments && payMethod;

  const closeVerifyModalWithClearQuery = async () => {
    closeVerifyModal();
    router.push(
      {
        pathname: Routes.myAds,
        query: {},
      },
      undefined,
      { shallow: true },
    );
  };

  const handleChangeCardsModal = () => {
    toggleAddBankCardModal();
    toggleUsersBanksCards();
  };

  const { isOpened, toggle, close } = useToggle();

  const { isOpened: isOpenStopModal, toggle: toggleStopModal } = useToggle();
  const { isOpened: isOpenDeleteModal, toggle: toggleDeleteModal } = useToggle();
  const { isOpened: isOpenVerifyModal, open: openVerifyModal, close: closeVerifyModal } = useToggle();
  const {
    isOpened: isOpenOwnershipDocsModal,
    open: openOwnershipDocsModal,
    close: closeOwnershipDocsModal,
  } = useToggle();
  const { isOpened: isOpenIdentityModal, open: openIdentityModal, close: closeOpenIdentityModal } = useToggle();
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

  const goBack = () => {
    openVerifyModal();
    closeOwnershipDocsModal();
    closeOpenIdentityModal();
    closeAddBankCardModal();
  };

  const handleCloseInnopeyModal = async () => {
    closeAddBankCardModal();
    await refetch();
  };

  const cardModalRef = useRef<HTMLDivElement>(null);

  const goToEdit = async () => {
    setCookie('advertId', id!);
    if (currentStep !== LAST_ADVERTS_STEP) {
      await router.push(StepsByIndex[currentStep!]);
    } else {
      await router.push(StepsByIndex[0]);
    }
  };

  const submitCard = async (cardId: string) => {
    await setPaymentMethod({
      variables: {
        input: {
          id: id!,
          cardId,
        },
      },
    });
  };

  useClickOutside(cardModalRef, () => close());

  const openVerifyModalBeforeCreatedAd = () => {
    if (advertIdFromQuery === id) {
      openVerifyModal();
    }
  };

  useEffect(() => {
    openVerifyModalBeforeCreatedAd();
  }, [router.query]);

  const states = {
    [ApartmentAdStatusType.Active]: (
      <>
        <Button text={t('cards.editAd')} size={ButtonSize.CARDS} />
        <ModalContainer ref={cardModalRef}>
          <StyledIconButton IconComponent={More} onClick={toggle} />
          <StyledModalDropDown isOpen={isOpened}>
            <ActiveModalLinks />
          </StyledModalDropDown>
        </ModalContainer>
      </>
    ),
    [ApartmentAdStatusType.Published]: (
      <>
        <Button text={t('cards.stopAd')} size={ButtonSize.CARDS} onClick={toggleStopModal} />
        <ModalContainer ref={cardModalRef}>
          <StyledIconButton IconComponent={More} onClick={toggle} />
          <StyledModalDropDown isOpen={isOpened}>
            <PublishedModalLinks
              id={id!}
              advertType={ApartmentAdStatusType.Published}
              rentType={rentType!}
              isShortRent={isShortRentType}
            />
          </StyledModalDropDown>
        </ModalContainer>
        <StyledBaseModal
          onClose={toggleStopModal}
          title={t('myAdsCard.stopModal.modalTitle')}
          isVisible={isOpenStopModal}>
          <StopModal periodType={rentType!} close={toggleStopModal} id={id!} />
        </StyledBaseModal>
      </>
    ),
    [ApartmentAdStatusType.Processing]: (
      <>
        {!isConfirmedInfo && (
          <StyledButton text={t('buttons.btnVerify')} size={ButtonSize.CARDS} onClick={openVerifyModal} />
        )}

        <ModalContainer ref={cardModalRef}>
          <StyledIconButton IconComponent={More} onClick={toggle} />
          <StyledModalDropDown isOpen={isOpened}>
            <ProcessModalLinks id={id!} advertType={ApartmentAdStatusType.Processing} rentType={rentType!} />
          </StyledModalDropDown>
        </ModalContainer>

        <StyledVerifyModal
          onClose={closeVerifyModalWithClearQuery}
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
            openAddBankCardModal={openUsersBanksCards}
            closeVerifyModal={closeVerifyModal}
          />
        </StyledVerifyModal>

        <StyledVerifyModal
          title={t('chat.termsMessage.cardSelectModalTitle')}
          onClose={closeUsersBanksCards}
          isVisible={isOpenUsersBanksCards}>
          <CardSelectModal
            submit={submitCard}
            isLoading={loading}
            onClose={closeUsersBanksCards}
            advertId={id!}
            onOpenInnopeyModal={handleChangeCardsModal}
          />
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={closeOwnershipDocsModal}
          withBackOption
          isDropZoneModal
          onGoBack={goBack}
          title={t('cards.addDocumentModalTitle')}
          isVisible={isOpenOwnershipDocsModal}
          isBottomMobile>
          <ModalVerifyDocsContainer>
            <ModalVerifyDocs
              content={t('myAdsCard.verifyModal.documentDescription')}
              onSaveClick={goBack}
              apartmentAd={id}
              typeDocs={FileCategory.APARTMENT_AD_DOCUMENTS}
              maxSize={TWENTY_MB}
            />
          </ModalVerifyDocsContainer>
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={closeOpenIdentityModal}
          withBackOption
          onGoBack={goBack}
          title={tIdentity('personTitle')}
          isVisible={isOpenIdentityModal}
          isBottomMobile>
          <ModalVerifyDocsContainer>
            <ModalVerifyDocs
              onSaveClick={goBack}
              maxFiles={3}
              content={tIdentity('identifyContent')}
              typeDocs={FileCategory.IDENTITY_DOCUMENTS}
              maxSize={TWENTY_MB}
            />
          </ModalVerifyDocsContainer>
        </StyledVerifyModal>

        <StyledVerifyModal
          onClose={handleCloseInnopeyModal}
          withBackOption
          onGoBack={handleChangeCardsModal}
          title={tPayments('modalTitleAddNewCard')}
          isVisible={isOpenAddBankCardModal}
          isBottomMobile>
          <ModalInnopay onComplete={goBack} />
        </StyledVerifyModal>
      </>
    ),
    [ApartmentAdStatusType.Paused]: (
      <>
        <Button
          onClick={publishAdvert}
          text={t('cards.activateAd')}
          size={ButtonSize.CARDS}
          isLoading={publishLoading}
        />
        <ModalContainer ref={cardModalRef}>
          <StyledIconButton IconComponent={More} onClick={toggle} />
          <StyledModalDropDown isOpen={isOpened}>
            <StoppedModalLinks id={id!} advertType={ApartmentAdStatusType.Paused} rentType={rentType!} />
          </StyledModalDropDown>
        </ModalContainer>
      </>
    ),
    [ApartmentAdStatusType.Draft]: (
      <>
        <Button onClick={goToEdit} text={t('cards.goToEdit')} size={ButtonSize.CARDS} />

        <StyledIconButton IconComponent={Trash} onClick={toggleDeleteModal} />

        <StyledBaseModal
          onClose={toggleDeleteModal}
          title={t('myAdsCard.deleteModal.modalTitle')}
          isVisible={isOpenDeleteModal}>
          <DeleteModal
            id={id!}
            advertType={ApartmentAdStatusType.Draft}
            rentType={rentType!}
            close={toggleDeleteModal}
          />
        </StyledBaseModal>
      </>
    ),
  };

  return <MainContainer>{states[status]}</MainContainer>;
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalContainer = styled.div``;

const StyledIconButton = styled(IconButton)``;

const StyledModalDropDown = styled(ModalDropDown)`
  width: 195px;
  z-index: 103;
`;

const StyledBaseModal = styled(BaseModal)`
  width: 100%;
  max-width: 448px;
`;

const StyledButton = styled(Button)`
  padding: 16px 64px;
`;

const StyledVerifyModal = styled(BaseModal)`
  width: 100%;
  max-width: 672px;
`;

const ModalVerifyDocsContainer = styled.div`
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 8px;
  }
`;

export default ButtonsForCard;
