import { useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, BaseModal } from 'ui';

import { ApartmentAdStatusType, RentPeriodType } from '../../../../__generated__/types';
import { DeleteModal } from '../DeleteModal';
import { SetAvailableContainer } from '../SetAvailableContainer';

type PublishedModalLinksProps = {
  id: string;
  isShortRent?: boolean;
  advertType: ApartmentAdStatusType;
  rentType: RentPeriodType;
};

const PublishedModalLinks: FC<PublishedModalLinksProps> = ({ id, isShortRent, advertType, rentType }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard' });
  const {
    isOpened: isOpenSetAvailableModal,
    toggle: toggleSetAvailableModal,
    close: closeSetAvailableModal,
  } = useToggle(false);
  const { isOpened: isOpenDeleteModal, toggle: toggleDeleteModal } = useToggle(false);
  return (
    <MainContainer>
      <TextContainerWithBorder>
        <ModalText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
          {t('dropDownLinks.paymentWay')}
        </ModalText>
      </TextContainerWithBorder>
      {isShortRent && (
        <TextContainerWithBorder onClick={toggleSetAvailableModal}>
          <ModalText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
            {t('dropDownLinks.setAvailable')}
          </ModalText>
        </TextContainerWithBorder>
      )}
      <TextContainer onClick={toggleDeleteModal}>
        <ModalRedText font="caption_16_12_regular">{t('dropDownLinks.delete')}</ModalRedText>
      </TextContainer>
      <StyledBaseModal
        onClose={toggleSetAvailableModal}
        title={t('setAvailableConteiner.setAvailable')}
        isVisible={isOpenSetAvailableModal}>
        <SetAvailableContainer onClose={closeSetAvailableModal} id={id!} />
      </StyledBaseModal>

      <StyledDeleteModal onClose={toggleDeleteModal} title={t('deleteModal.modalTitle')} isVisible={isOpenDeleteModal}>
        <DeleteModal advertType={advertType} rentType={rentType} id={id!} close={toggleDeleteModal} />
      </StyledDeleteModal>
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
  max-width: 672px;
  border-radius: 32px;
`;
const StyledDeleteModal = styled(BaseModal)`
  width: 100%;
  max-width: 448px;
`;

export default PublishedModalLinks;
