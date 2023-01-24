import { useToggle } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, BaseModal } from 'ui';

import { ApartmentAdStatusType, RentPeriodType } from '../../../../__generated__/types';
import { Routes } from '../../../../constains';
import { setCookie } from '../../../../utils';
import { DeleteModal } from '../index';

type StoppedModalLinksProps = {
  id: string;
  advertType: ApartmentAdStatusType;
  rentType: RentPeriodType;
};

const StoppedModalLinks: FC<StoppedModalLinksProps> = ({ id, advertType, rentType }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard' });
  const { push } = useRouter();
  const { isOpened: isOpenDeleteModal, toggle: setIsOpenDeleteModal } = useToggle(false);

  const redirectOnEditAdvertPage = () => {
    setCookie('advertId', id);
    push(Routes.adCreate);
  };

  return (
    <MainContainer>
      <TextContainerWithBorder onClick={redirectOnEditAdvertPage}>
        <ModalText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
          {t('dropDownLinks.edit')}
        </ModalText>
      </TextContainerWithBorder>
      <TextContainer onClick={setIsOpenDeleteModal}>
        <ModalRedText font="caption_16_12_regular">{t('dropDownLinks.delete')}</ModalRedText>
      </TextContainer>
      <StyledDeleteModal
        onClose={() => {
          setIsOpenDeleteModal();
        }}
        title={t('deleteModal.modalTitle')}
        isVisible={isOpenDeleteModal}>
        <DeleteModal advertType={advertType} rentType={rentType} id={id!} close={setIsOpenDeleteModal} />
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

const StyledDeleteModal = styled(BaseModal)`
  width: 100%;
  max-width: 448px;
`;

export default StoppedModalLinks;
