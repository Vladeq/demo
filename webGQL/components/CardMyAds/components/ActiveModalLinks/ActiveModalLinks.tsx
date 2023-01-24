import { useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, BaseModal } from 'ui';

import { CancelRentModal, CancelRentReasonModal } from '../index';

const ActiveModalLinks: FC = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard' });
  const { isOpened: isOpenCancelRentModal, open: OpenCancelRentModal, close: CloseCancelRentModal } = useToggle();
  const {
    isOpened: isOpenCancelRentReasonModal,
    open: OpenCancelRentReasonModal,
    close: CloseCancelRentReasonModal,
  } = useToggle();

  return (
    <MainContainer>
      <TextContainerWithBorder>
        <ModalText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
          {t('dropDownLinks.paymentWay')}
        </ModalText>
      </TextContainerWithBorder>
      <TextContainer onClick={OpenCancelRentModal}>
        <ModalRedText font="caption_16_12_regular">{t('dropDownLinks.cancelRent')}</ModalRedText>
      </TextContainer>
      <StyledBaseModal
        onClose={CloseCancelRentModal}
        title={t('dropDownLinks.cancelRent')}
        isVisible={isOpenCancelRentModal}>
        <CancelRentModal close={CloseCancelRentModal} openNext={OpenCancelRentReasonModal} />
      </StyledBaseModal>
      <StyledBaseModal
        onClose={CloseCancelRentReasonModal}
        title={t('dropDownLinks.cancelRent')}
        isVisible={isOpenCancelRentReasonModal}>
        <CancelRentReasonModal close={CloseCancelRentReasonModal} />
      </StyledBaseModal>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
`;

const TextContainerWithBorder = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
    &:hover {
      cursor: pointer;
    }
  `}
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const ModalText = styled(AppText)`
  padding: 12px 0;
`;

const ModalRedText = styled(AppText)`
  ${({ theme }) => css`
    padding: 12px 0;
    color: ${theme.colors.additional.red};
  `}
`;

const StyledBaseModal = styled(BaseModal)`
  width: 100%;
  max-width: 448px;
`;

export default ActiveModalLinks;
